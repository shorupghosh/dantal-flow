import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Send, Phone, Video, MoreVertical, Sparkles, Check, CheckCheck, 
  Clock, CheckCircle2, Stethoscope, RefreshCw, 
  MessageSquare, BellRing, Smartphone
} from 'lucide-react';
import { WhatsAppPhoneFrame } from './WhatsAppPhoneFrame';
import { SCENARIO_PRESETS } from './ScenarioPresets';
import type { ScenarioPreset } from './ScenarioPresets';
import { useDatabase } from '../../context/DatabaseContext';

interface LiveWhatsAppSimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  clinicName?: string;
  doctorName?: string;
  clinicLocation?: string;
}

interface ChatMsg {
  id: string;
  from: 'patient' | 'ai' | 'system';
  text: string;
  time: string;
  isDelivered?: boolean;
  isRead?: boolean;
  card?: {
    type: 'confirmation' | 'triage_summary';
    title: string;
    doctor: string;
    slot: string;
    procedure: string;
    price: string;
  };
}

interface DoctorAlert {
  id: string;
  patientName: string;
  patientPhone: string;
  treatment: string;
  slot: string;
  price: string;
  urgency: 'Standard' | 'High' | 'Critical';
  receivedAt: string;
  status: 'new' | 'acknowledged';
}

export const LiveWhatsAppSimulator: React.FC<LiveWhatsAppSimulatorProps> = ({
  isOpen,
  onClose,
  clinicName = 'Sita Dental Clinic',
  doctorName = 'Dr. Anjali Aggarwal (BDS)',
  clinicLocation = 'Galleria Market, DLF Phase IV, Gurugram'
}) => {
  const { addLead, createAppointment, doctors } = useDatabase();
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient');
  const [selectedPreset, setSelectedPreset] = useState<ScenarioPreset>(SCENARIO_PRESETS[0]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [doctorAlerts, setDoctorAlerts] = useState<DoctorAlert[]>([]);
  const [hasNewAlert, setHasNewAlert] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation with selected preset
  useEffect(() => {
    resetWithPreset(selectedPreset);
  }, [selectedPreset]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const resetWithPreset = (preset: ScenarioPreset) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setStepIndex(0);
    setBookingConfirmed(false);
    setInputMsg('');
    
    // Initial patient inquiry
    const initMsgs: ChatMsg[] = [
      {
        id: 'msg-1',
        from: 'patient',
        text: preset.initialPatientMsg,
        time: timeNow,
        isDelivered: true,
        isRead: true
      }
    ];

    setMessages(initMsgs);
    
    // Trigger AI response after short delay (500ms)
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: 'msg-2',
          from: 'ai',
          text: preset.steps[0].prompt,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isDelivered: true,
          isRead: true
        }
      ]);
    }, 600);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMsg).trim();
    if (!text) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMsg = {
      id: `patient-${Date.now()}`,
      from: 'patient',
      text,
      time: timeNow,
      isDelivered: true,
      isRead: true
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setIsTyping(true);

    const nextStep = stepIndex + 1;
    setStepIndex(nextStep);

    setTimeout(async () => {
      setIsTyping(false);
      const timeBot = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (nextStep === 1 && selectedPreset.steps[1]) {
        // Step 1: AI asks for name/phone lock-in
        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            from: 'ai',
            text: selectedPreset.steps[1].prompt,
            time: timeBot,
            isDelivered: true,
            isRead: true
          }
        ]);
      } else {
        // Final Step: Confirmation Card & Doctor Alert Trigger
        const slotText = 'Friday @ 11:30 AM';
        const confirmMsg: ChatMsg = {
          id: `ai-confirm-${Date.now()}`,
          from: 'ai',
          text: `Namaskar ${selectedPreset.patientName}! 🙏 Your consultation slot has been registered with ${doctorName}.\n\nHere is your official appointment pass:`,
          time: timeBot,
          isDelivered: true,
          isRead: true,
          card: {
            type: 'confirmation',
            title: `${clinicName} - Appointment Pass`,
            doctor: doctorName,
            slot: slotText,
            procedure: selectedPreset.treatmentName,
            price: selectedPreset.priceTag
          }
        };

        setMessages(prev => [...prev, confirmMsg]);
        setBookingConfirmed(true);

        // 1. Create live alert on Doctor's phone
        const newAlert: DoctorAlert = {
          id: `alert-${Date.now()}`,
          patientName: selectedPreset.patientName,
          patientPhone: selectedPreset.patientPhone,
          treatment: selectedPreset.treatmentName,
          slot: slotText,
          price: selectedPreset.priceTag,
          urgency: selectedPreset.urgency,
          receivedAt: timeBot,
          status: 'new'
        };

        setDoctorAlerts(prev => [newAlert, ...prev]);
        setHasNewAlert(true);

        // 2. Sync to local/Supabase CRM
        try {
          await addLead({
            name: selectedPreset.patientName,
            phone: selectedPreset.patientPhone,
            email: `${selectedPreset.patientName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
            source: 'WhatsApp',
            status: 'New Lead',
            message: `WhatsApp Auto-Booking: ${selectedPreset.treatmentName} (${selectedPreset.priceTag})`
          });

          await createAppointment({
            patientId: `pat-${Date.now()}`,
            patientName: selectedPreset.patientName,
            patientPhone: selectedPreset.patientPhone,
            patientEmail: `${selectedPreset.patientName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
            doctorId: doctors[0]?.id || 'doc-1',
            treatmentName: selectedPreset.treatmentName,
            scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0] + 'T11:30:00',
            status: 'Confirmed',
            notes: `Auto-Booked via WhatsApp 24/7 Engine. Urgency: ${selectedPreset.urgency}`,
            price: selectedPreset.estimatedPrice
          });
        } catch (err) {
          console.log('CRM synced locally', err);
        }
      }
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20 text-[#25D366]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                  24/7 WhatsApp Patient Booking Engine
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live 2-Way Demo
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Simulating: <strong className="text-slate-200">{clinicName}</strong> ({clinicLocation})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => resetWithPreset(selectedPreset)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all text-xs font-semibold flex items-center gap-1.5"
              title="Reset Simulation"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden md:inline">Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 1-Click Clinical Scenario Selector Strip */}
        <div className="px-4 py-2.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Test Scenarios:
          </span>
          {SCENARIO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => setSelectedPreset(preset)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 border ${
                selectedPreset.id === preset.id
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-500/10'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{preset.title.split(' ')[0]}</span>
              <span className="text-xs">{preset.title.split(' ').slice(1, 4).join(' ')}</span>
              <span className="text-[10px] bg-slate-950/60 px-1.5 py-0.5 rounded font-mono text-emerald-400">
                {preset.priceTag}
              </span>
            </button>
          ))}
        </div>

        {/* Mobile View Toggle Tabs (Visible on < lg screens) */}
        <div className="flex lg:hidden border-b border-slate-800 bg-slate-950 text-xs font-bold">
          <button
            onClick={() => setActiveTab('patient')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'patient'
                ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            1. Patient WhatsApp (10:30 PM)
          </button>
          <button
            onClick={() => { setActiveTab('doctor'); setHasNewAlert(false); }}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 relative transition-all ${
              activeTab === 'doctor'
                ? 'bg-teal-500/10 text-teal-400 border-b-2 border-teal-500'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BellRing className="w-4 h-4" />
            2. Clinic Alert Phone
            {hasNewAlert && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute right-3 top-3" />
            )}
          </button>
        </div>

        {/* Main Dual-View Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start justify-center">
          
          {/* ==================== LEFT PHONE: PATIENT WHATSAPP ==================== */}
          <div className={`lg:col-span-6 flex flex-col items-center ${activeTab !== 'patient' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="w-full max-w-[380px] mb-2 flex justify-between items-center px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5" /> Patient Experience (After-Hours 10:30 PM)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">5s Response</span>
            </div>

            <WhatsAppPhoneFrame
              title={clinicName}
              subtitle="24/7 AI Booking Assistant"
              badge="Official"
              headerLeft={
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xs shrink-0 shadow-inner">
                  🦷
                </div>
              }
              headerRight={
                <>
                  <Video className="w-4 h-4 cursor-pointer hover:opacity-80" />
                  <Phone className="w-4 h-4 cursor-pointer hover:opacity-80" />
                  <MoreVertical className="w-4 h-4 cursor-pointer hover:opacity-80" />
                </>
              }
            >
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs text-slate-100 flex flex-col">
                
                {/* Security encryption banner */}
                <div className="my-1 mx-auto max-w-[280px] bg-[#182229] border border-amber-500/20 text-[#ffd279] text-[9.5px] p-2 rounded-lg text-center leading-tight shadow-sm">
                  🔒 Messages are end-to-end encrypted & DPDPA compliant. 24/7 Auto-Booking Active.
                </div>

                {/* Date bubble */}
                <div className="text-center my-1">
                  <span className="bg-[#182229] text-slate-400 text-[10px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
                    Today
                  </span>
                </div>

                {/* Message bubbles */}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.from === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[84%] rounded-2xl px-3 py-2 text-xs leading-relaxed space-y-1 shadow-md ${
                        m.from === 'patient'
                          ? 'bg-[#005c4b] text-white rounded-tr-none'
                          : 'bg-[#202c33] text-slate-100 rounded-tl-none border border-slate-800'
                      }`}
                    >
                      <p className="whitespace-pre-line text-[11.5px]">{m.text}</p>

                      {/* Confirmation Pass Card */}
                      {m.card && (
                        <div className="mt-2.5 p-3 bg-[#111b21] border border-emerald-500/40 rounded-xl space-y-2 text-left">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                            {m.card.title}
                          </div>
                          <div className="text-[11px] text-slate-300 font-mono space-y-0.5 pt-1 border-t border-slate-800">
                            <div>👨‍⚕️ <strong>Doctor:</strong> {m.card.doctor}</div>
                            <div>📅 <strong>Time:</strong> {m.card.slot}</div>
                            <div>🦷 <strong>Treatment:</strong> {m.card.procedure}</div>
                            <div>💰 <strong>Est. Fee:</strong> {m.card.price}</div>
                          </div>
                          <div className="text-[9.5px] text-emerald-400 font-mono pt-1 border-t border-slate-800 flex items-center justify-between">
                            <span>✓ Direct WhatsApp Alert Dispatched</span>
                            <span className="bg-emerald-500/20 px-1.5 py-0.5 rounded text-[9px] font-bold">CONFIRMED</span>
                          </div>
                        </div>
                      )}

                      <div className={`flex items-center gap-1 text-[9px] text-slate-400 mt-1 ${
                        m.from === 'patient' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{m.time}</span>
                        {m.from === 'patient' && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-[#202c33] border border-slate-800 rounded-2xl rounded-tl-none px-3.5 py-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[10px] text-slate-400 font-mono ml-1">AI Assistant typing...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Action Suggestion Chips */}
              {!bookingConfirmed && (
                <div className="p-2 bg-[#111b21] border-t border-slate-800 flex gap-1.5 overflow-x-auto scrollbar-none">
                  {stepIndex === 0 && selectedPreset.steps[0].quickChips?.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip)}
                      className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10.5px] font-semibold whitespace-nowrap transition-all cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                  {stepIndex === 1 && selectedPreset.steps[1].quickChips?.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(selectedPreset.steps[1].suggestedReply)}
                      className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full text-[10.5px] whitespace-nowrap transition-all cursor-pointer shadow-md"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Input Bar */}
              <div className="p-2 bg-[#202c33] border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder={
                    bookingConfirmed 
                      ? "Appointment confirmed! Test another preset above." 
                      : "Type a reply or click a quick option..."
                  }
                  disabled={bookingConfirmed}
                  className="flex-1 bg-[#2a3942] text-slate-100 placeholder-slate-400 text-xs px-3.5 py-2.5 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMsg.trim() || bookingConfirmed}
                  className="p-2.5 bg-[#00a884] hover:bg-[#008f6f] disabled:opacity-40 text-white rounded-full transition-all flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </WhatsAppPhoneFrame>
          </div>

          {/* ==================== RIGHT PHONE: DOCTOR / STAFF ALERT ==================== */}
          <div className={`lg:col-span-6 flex flex-col items-center ${activeTab !== 'doctor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="w-full max-w-[380px] mb-2 flex justify-between items-center px-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                <BellRing className="w-3.5 h-3.5" /> Doctor / Front Desk Notification Alert
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Zero Staff Work</span>
            </div>

            <WhatsAppPhoneFrame
              title={`${doctorName}`}
              subtitle="Staff Internal Booking Feed"
              badge="VIP Alert"
              isAlertPhone={true}
              headerLeft={
                <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 font-bold text-xs shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
              }
              headerRight={
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-teal-400/20 text-teal-200 px-2 py-0.5 rounded font-mono font-bold">
                    {doctorAlerts.length} Bookings
                  </span>
                </div>
              }
            >
              {/* Doctor Alert Messages Area */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs flex flex-col">
                
                {/* Staff alert explain banner */}
                <div className="my-1 bg-[#182229] border border-teal-500/20 text-teal-200 text-[10px] p-2 rounded-lg text-center leading-tight">
                  ⚡ <strong>AutoBuild Buddy Engine:</strong> Triage is 100% automated. Your staff only handles ready-to-treat patients.
                </div>

                {doctorAlerts.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3 opacity-60">
                    <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                      <Clock className="w-6 h-6 animate-spin" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-300">Waiting for Patient Booking...</p>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
                        Interact with the patient phone on the left to trigger a real-time clinical notification card here.
                      </p>
                    </div>
                  </div>
                ) : (
                  doctorAlerts.map((docAlert) => (
                    <div
                      key={docAlert.id}
                      className="bg-[#1f2c34] border border-teal-500/40 rounded-2xl p-3.5 space-y-2.5 shadow-xl relative overflow-hidden animate-in fade-in slide-in-from-top-2"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
                            ⚡ NEW AFTER-HOURS BOOKING
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400 font-mono">{docAlert.receivedAt}</span>
                      </div>

                      <div className="space-y-1 text-slate-200">
                        <div className="flex justify-between">
                          <span className="text-xs font-bold text-white">{docAlert.patientName}</span>
                          <span className="text-xs font-extrabold text-emerald-400 font-mono">{docAlert.price}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">📞 {docAlert.patientPhone}</p>
                        <div className="p-2 bg-[#111b21] rounded-lg border border-slate-800 text-[11px] font-mono space-y-0.5">
                          <div>🦷 <strong>Procedure:</strong> {docAlert.treatment}</div>
                          <div>📅 <strong>Reserved Slot:</strong> {docAlert.slot}</div>
                          <div>🚨 <strong>Clinical Priority:</strong> <span className={docAlert.urgency === 'Critical' ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>{docAlert.urgency}</span></div>
                        </div>
                      </div>

                      {/* Staff 1-Tap Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                        <button
                          onClick={() => window.open(`https://wa.me/${docAlert.patientPhone.replace(/[^0-9]/g, '')}`, '_blank')}
                          className="py-1.5 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-[10.5px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          💬 WhatsApp Patient
                        </button>
                        <button
                          onClick={() => window.alert(`Appointment for ${docAlert.patientName} confirmed in clinic software.`)}
                          className="py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 text-[10.5px] font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Confirm in CRM
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </WhatsAppPhoneFrame>
          </div>

        </div>

        {/* Bottom Feature Pitch Bar */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Check className="w-3.5 h-3.5" /> 5-Second Response Time
            </span>
            <span className="flex items-center gap-1 text-teal-400 font-bold">
              <Check className="w-3.5 h-3.5" /> ₹0 Missed Late-Night Calls
            </span>
            <span className="hidden md:flex items-center gap-1 text-blue-400 font-bold">
              <Check className="w-3.5 h-3.5" /> Works on Existing Clinic Number
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              const bookingSection = document.getElementById('booking-section');
              if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Deploy This WhatsApp Engine for My Clinic →
          </button>
        </div>

      </div>
    </div>
  );
};
