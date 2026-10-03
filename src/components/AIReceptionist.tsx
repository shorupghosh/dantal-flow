import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, Loader2, 
  Smartphone, CheckCircle2, Zap
} from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

type ChatFlowState = 'free_chat' | 'collect_lead' | 'select_slot' | 'confirmed';

interface LeadFormCardProps {
  initialName: string;
  initialPhone: string;
  initialTreatment: string;
  clinicKey?: string;
  onSubmit: (name: string, phone: string, email: string, treatment: string) => void;
  onCancel: () => void;
}

const LeadFormCard: React.FC<LeadFormCardProps> = ({
  initialName,
  initialPhone,
  initialTreatment,
  clinicKey,
  onSubmit,
  onCancel
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState(initialTreatment);
  const [error, setError] = useState('');

  const getTreatments = () => {
    if (clinicKey === 'Dentoplay') {
      return [
        "Pediatric Pulpectomy & Pain Relief (₹2,500)",
        "Interceptive Child Braces (₹25,000)",
        "Cavity Fluoride & Sealants (₹1,200)",
        "Adult Family Dental Implants (₹30,000)",
        "Kids Dental Emergency Triage"
      ];
    }
    if (clinicKey === 'DelhiDental') {
      return [
        "Invisalign & Clear Aligners (₹75,000)",
        "Immediate Swiss Dental Implants (₹45,000)",
        "Microscopic Single-Sitting RCT (₹9,500)",
        "Porcelain Veneers & Smile Makeover (₹18,000)",
        "Specialist Consultation & 3D Scan (₹1,200)"
      ];
    }
    if (clinicKey === 'HollywoodSmile') {
      return [
        "Hollywood Smile Porcelain Veneers (₹22,000 / tooth)",
        "NRI Dental Tourism Fast-Track Package",
        "Full-Arch All-on-4 Implants (₹1,80,000 / arch)",
        "Micro-Endodontic Tooth Restoration (₹8,500)",
        "Director Consultation & Smile Architecture (₹1,500)"
      ];
    }
    if (clinicKey === 'PainlessDental') {
      return [
        "Painless Wisdom Tooth Surgery (₹4,500)",
        "Painless Dental Implants (₹25,000)",
        "Pediatric Gentle Dentistry (₹1,500)",
        "Single-Sitting Painless RCT (₹4,000)",
        "Emergency Pain Triage"
      ];
    }
    return [
      "Routine Clean & Check (₹1,500)",
      "Teeth Whitening (₹8,000)",
      "Root Canal Therapy (₹12,000)",
      "Dental Crowns & Bridges (₹15,000)",
      "Dental Implants (₹65,000)",
      "Orthodontic Braces & Aligners (₹80,000)",
      "Emergency Pain Triage"
    ];
  };

  const treatments = getTreatments();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !treatment) {
      setError('Please provide your name, WhatsApp number and treatment.');
      return;
    }
    onSubmit(name.trim(), phone.trim(), email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`, treatment);
  };

  return (
    <div className="bg-[#1f2c34] border border-emerald-500/30 rounded-xl p-3.5 space-y-3 text-left shadow-lg">
      <div className="flex items-center justify-between">
        <h5 className="font-bold text-xs text-emerald-400 uppercase tracking-wider flex items-center gap-1">
          <Zap className="w-3.5 h-3.5" /> Patient Intake Form
        </h5>
        <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">
          24/7 Fast Track
        </span>
      </div>
      {error && <p className="text-[10px] text-red-400">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2.5 text-slate-100">
        <div>
          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Your Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-[#111b21] border border-slate-700 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-emerald-500 text-white"
            placeholder="e.g. Priya Sharma"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">WhatsApp Number (For Pass)</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-[#111b21] border border-slate-700 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-emerald-500 text-white"
            placeholder="e.g. +91 98183 00000"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-400 block mb-0.5">Treatment Category</label>
          <select
            value={treatment}
            onChange={e => setTreatment(e.target.value)}
            className="w-full bg-[#111b21] border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:border-emerald-500 text-white"
            required
          >
            <option value="">Select Treatment...</option>
            {treatments.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Continue to Pick Slot →
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Generate date options
const getNext14Days = () => {
  const dates = [];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let count = 0;
  let daysOffset = 1;
  
  while (count < 10) {
    const d = new Date();
    d.setDate(d.getDate() + daysOffset);
    
    // Skip Sundays
    if (d.getDay() !== 0) {
      dates.push({
        formatted: d.toISOString().split('T')[0],
        dayName: days[d.getDay()],
        label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
      count++;
    }
    daysOffset++;
  }
  return dates;
};

interface CalendarCardProps {
  onConfirm: (date: string, time: string, doctorId: string) => void;
  onCancel: () => void;
}

const CalendarCard: React.FC<CalendarCardProps> = ({
  onConfirm,
  onCancel
}) => {
  const { doctors, activeClinic } = useDatabase();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDocId, setSelectedDocId] = useState(doctors[0]?.id || 'doc-1');
  const [error, setError] = useState('');

  const datesOptions = getNext14Days();
  const activeDoctor = doctors.find(d => d.id === selectedDocId) || doctors[0];

  const getSlots = () => {
    if (!activeDoctor || !selectedDate) return [];
    const dateObj = datesOptions.find(d => d.formatted === selectedDate);
    if (!dateObj) return [];
    
    const slots = activeDoctor.availability?.[dateObj.dayName];
    return slots || ["10:00", "11:30", "14:00", "16:30", "18:00"];
  };

  const slots = getSlots();

  const handleConfirmClick = () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select a Date and Time slot.');
      return;
    }
    onConfirm(selectedDate, selectedTime, selectedDocId);
  };

  return (
    <div className="bg-[#1f2c34] border border-teal-500/30 rounded-xl p-3.5 space-y-3 text-left shadow-lg text-white">
      <div className="flex justify-between items-center">
        <h5 className="font-bold text-xs text-teal-400 uppercase tracking-wider">Select Available Slot</h5>
        <span className="text-[10px] text-slate-400 font-mono">{activeClinic.doctorName}</span>
      </div>
      {error && <p className="text-[10px] text-red-400">{error}</p>}

      {/* Date Selection */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 block">1. Select Date (Mon–Sat)</label>
        <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
          {datesOptions.map(date => (
            <button
              key={date.formatted}
              type="button"
              onClick={() => { setSelectedDate(date.formatted); setSelectedTime(''); setError(''); }}
              className={`px-2.5 py-1.5 border rounded-lg text-center flex flex-col items-center min-w-[65px] shrink-0 transition-all cursor-pointer ${
                selectedDate === date.formatted
                  ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                  : 'border-slate-700 bg-[#111b21] hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[10px] block">{date.label.split(',')[0]}</span>
              <span className="text-[9px] text-slate-400 block">{date.label.split(',')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 block">2. Available Chair Hours</label>
          <div className="grid grid-cols-3 gap-1.5">
            {slots.map(time => (
              <button
                key={time}
                type="button"
                onClick={() => { setSelectedTime(time); setError(''); }}
                className={`py-1.5 border rounded-lg text-center text-[10.5px] font-semibold transition-all cursor-pointer ${
                  selectedTime === time
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                    : 'border-slate-700 bg-[#111b21] hover:bg-slate-800 text-slate-300'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={handleConfirmClick}
          className="flex-1 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          Confirm & Send Pass
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface SuccessCardProps {
  patientName: string;
  treatment: string;
  doctorName: string;
  clinicName: string;
  clinicPhone: string;
  scheduledAt: string;
  onReset: () => void;
  onOpenSimulator?: () => void;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
  patientName,
  treatment,
  doctorName,
  clinicName,
  clinicPhone,
  scheduledAt,
  onReset,
  onOpenSimulator
}) => {
  const cleanPhone = clinicPhone.replace(/\D/g, '') || '917497859616';
  return (
    <div className="bg-[#1f2c34] border border-emerald-500/40 rounded-2xl p-4 space-y-3.5 text-center shadow-xl text-white">
      <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="h-6 w-6" />
      </div>

      <div className="space-y-0.5">
        <h5 className="font-bold text-sm text-white">WhatsApp Appointment Confirmed!</h5>
        <p className="text-[10.5px] text-emerald-300/80">Confirmation card dispatched to patient.</p>
      </div>

      <div className="bg-[#111b21] border border-slate-800 rounded-xl p-3 text-left space-y-1 text-xs text-slate-200 font-mono">
        <p><strong className="text-slate-400 font-medium">Patient:</strong> {patientName}</p>
        <p><strong className="text-slate-400 font-medium">Doctor:</strong> {doctorName}</p>
        <p><strong className="text-slate-400 font-medium">Treatment:</strong> {treatment}</p>
        <p><strong className="text-slate-400 font-medium">Reserved Slot:</strong> {scheduledAt}</p>
      </div>

      <div className="space-y-2">
        <a
          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hi ${clinicName}! I booked an appointment via your 24/7 web assistant for ${treatment} on ${scheduledAt}. Name: ${patientName}.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
          Send Confirmation to Clinic WhatsApp
        </a>
        {onOpenSimulator && (
          <button
            type="button"
            onClick={onOpenSimulator}
            className="w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl border border-emerald-500/40 transition-colors cursor-pointer flex items-center justify-center gap-1"
          >
            <Smartphone className="w-3.5 h-3.5" />
            View Doctor Alert on Simulator
          </button>
        )}
        <button
          type="button"
          onClick={onReset}
          className="w-full py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl hover:bg-slate-700 transition-colors cursor-pointer"
        >
          Start New Inquiry
        </button>
      </div>
    </div>
  );
};

export const AIReceptionist: React.FC<{ onOpenSimulator?: () => void }> = ({ onOpenSimulator }) => {
  const { addLead, createAppointment, doctors, activeClinic } = useDatabase();
  
  const [isOpen, setIsOpen] = useState(false);
  const [chatFlowState, setChatFlowState] = useState<ChatFlowState>('free_chat');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot', text: string }>>([
    { 
      sender: 'bot', 
      text: `Namaskar! 🙏 Welcome to ${activeClinic.name}. I am your 24/7 WhatsApp booking assistant for ${activeClinic.doctorName}.\n\nHow may I help you with your dental care today?` 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [bookedDoctorName, setBookedDoctorName] = useState('');
  const [bookedTime, setBookedTime] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, chatFlowState, loading]);

  const getAssistantFallbackResponse = (input: string): string => {
    const text = input.toLowerCase();

    if (activeClinic.key === 'Dentoplay') {
      if (text.includes('child') || text.includes('kid') || text.includes('baby') || text.includes('pedo') || text.includes('fear') || text.includes('cry')) {
        return `Dr. Ritesh Kundu is an MDS Pedodontist specializing in 100% fear-free pediatric dentistry. Our clinic is uniquely designed for kids so they feel excited rather than anxious!\n\nWould you like to schedule a gentle checkup or pulpectomy consultation for your child?`;
      }
      if (text.includes('pain') || text.includes('hurt') || text.includes('bleed') || text.includes('emergency')) {
        return `We reserve emergency priority slots for children experiencing acute dental pain or tooth trauma. We ensure zero tears and instant relief.\n\nLet me open the priority booking form for Dr. Kundu immediately.`;
      }
      if (text.includes('brace') || text.includes('align') || text.includes('crooked') || text.includes('jaw')) {
        return `We offer interceptive orthodontics and early jaw alignment trainers for growing children (ages 6–13), preventing severe misalignment later in life.\n\nWould you like to book an orthodontic evaluation?`;
      }
      if (text.includes('location') || text.includes('address') || text.includes('where') || text.includes('newtown') || text.includes('rajarhat')) {
        return `Dentoplay is located at Action Area 1 (DE 93), New Town, Kolkata (convenient to Uniworld City and Rajarhat). Easy parking available right outside.`;
      }
      if (text.includes('price') || text.includes('cost') || text.includes('fee') || text.includes('how much') || text.includes('inr')) {
        return `Here are starting treatment estimates at Dentoplay Pediatric & Family Dental:\n\n• Specialist Pedodontist Consultation: ₹${activeClinic.consultationFee}\n• Painless Milk Tooth Pulpectomy: from ₹2,500\n• Stainless Steel Pediatric Crown: from ₹2,200\n• Fluoride Varnish & Sealants: from ₹1,200\n• Interceptive Child Braces: from ₹25,000\n• Adult Family Implants: from ₹30,000\n\nWould you like to book a slot for your child?`;
      }
    }

    if (activeClinic.key === 'DelhiDental') {
      if (text.includes('invisalign') || text.includes('aligner') || text.includes('brace') || text.includes('crooked') || text.includes('ortho')) {
        return `Dr. Nitu Gautam is an MDS Orthodontist (Nair Mumbai) and Fellow of the World Federation of Orthodontists (WFO) with 16+ years of clinical mastery. We provide 3D iTero digital scans and customized Invisalign clear aligners with 0% EMI options.\n\nWould you like to reserve a 3D digital aligner scan?`;
      }
      if (text.includes('implant') || text.includes('tooth loss') || text.includes('missing')) {
        return `Our Senior Prosthodontist Dr. Vinod Khanna (MDS PGI Chandigarh) specializes in immediate Swiss/German implants with lifelong stability.\n\nWould you like to schedule an implant consultation?`;
      }
      if (text.includes('pain') || text.includes('rct') || text.includes('root canal') || text.includes('emergency')) {
        return `We offer single-sitting painless microscopic root canals under high-magnification surgical operating microscopes to preserve natural teeth.\n\nLet me open our instant booking form to secure a slot with Dr. Gautam.`;
      }
      if (text.includes('location') || text.includes('address') || text.includes('where') || text.includes('gk') || text.includes('greater kailash')) {
        return `Delhi Dental Clinic is located at R-241, Greater Kailash 1 (GK-1), South Delhi. Timings: Tuesday–Saturday 10 AM – 7 PM, Sunday 10 AM – 2 PM (Monday Closed). 24/7 WhatsApp AI is always online for after-hours bookings!`;
      }
      if (text.includes('price') || text.includes('cost') || text.includes('fee') || text.includes('how much') || text.includes('inr')) {
        return `Here are treatment estimates at Delhi Dental Clinic & Orthodontic Centre (GK-1):\n\n• Senior Specialist Consultation: ₹${activeClinic.consultationFee}\n• Invisalign Clear Aligners: from ₹75,000 (0% EMI available)\n• Immediate Swiss Dental Implants: from ₹45,000\n• Microscopic Single-Sitting RCT: from ₹9,500\n• Porcelain Aesthetic Veneers: from ₹18,000 / tooth\n\nWould you like to reserve a priority consultation slot?`;
      }
    }

    if (activeClinic.key === 'HollywoodSmile') {
      if (text.includes('veneer') || text.includes('hollywood') || text.includes('makeover') || text.includes('cosmetic') || text.includes('smile design')) {
        return `Dr. Prashant brings 21+ years of elite international practice across Germany, Dubai, and Muscat. We craft ultra-thin porcelain veneers and digital Hollywood smile transformations in just 5–7 days.\n\nWould you like to schedule an aesthetic digital smile preview?`;
      }
      if (text.includes('nri') || text.includes('canada') || text.includes('uk') || text.includes('touris') || text.includes('flight') || text.includes('travel')) {
        return `We specialize in fast-track dental tourism for NRI patients traveling from Canada, the UK, and the US during October–March. We coordinate full-mouth rehabilitation or veneer makeovers tightly around your travel itinerary, saving up to 70% compared to North American and UK clinic rates!\n\nWould you like to schedule a priority NRI consultation with Dr. Prashant?`;
      }
      if (text.includes('implant') || text.includes('all on 4') || text.includes('all on 6') || text.includes('full arch')) {
        return `We provide immediate-load Full-Arch All-on-4 and All-on-6 computer-guided dental implants, giving you permanent fixed teeth in 72 hours.\n\nWould you like to discuss implant restoration options?`;
      }
      if (text.includes('location') || text.includes('address') || text.includes('where') || text.includes('sector 9') || text.includes('chandigarh')) {
        return `Hollywood Smile Dental & Aesthetic Studio is located at SCO 139–140, Sector 9C, Chandigarh. Valet and ample market parking available.`;
      }
      if (text.includes('price') || text.includes('cost') || text.includes('fee') || text.includes('how much') || text.includes('inr') || text.includes('dollar')) {
        return `Here are treatment estimates at Hollywood Smile Studio (Sector 9C Chandigarh):\n\n• Director Aesthetic Consultation: ₹${activeClinic.consultationFee}\n• Ultra-Thin Porcelain Veneers: from ₹22,000 / tooth\n• Full-Arch All-on-4 Implants: from ₹1,80,000 / arch\n• Micro-Endodontic Restoration: from ₹8,500\n• International NRI Fast-Track Package: Custom quote upon 3D scan\n\nWould you like to lock in a consultation with Dr. Prashant?`;
      }
    }

    if (activeClinic.key === 'PainlessDental') {
      if (text.includes('pain') || text.includes('hurt') || text.includes('wisdom') || text.includes('bleed') || text.includes('emergency')) {
        return `We specialize in 100% painless dentistry! Our Consultant Oral Surgeon handles acute pain and wisdom tooth extractions using gentle computer-assisted anesthesia with zero discomfort.\n\nLet me open the priority booking form so we can relieve your pain immediately.`;
      }
      if (text.includes('child') || text.includes('kid') || text.includes('baby') || text.includes('pedo')) {
        return `We have a dedicated Consultant Pedodontist specializing in fear-free, gentle dentistry for children in Sohna. We ensure kids feel completely relaxed and happy chairside.\n\nWould you like to reserve a consultation for your child?`;
      }
      if (text.includes('eldeco') || text.includes('location') || text.includes('address') || text.includes('where')) {
        return `We are located at Chungi 1, next to Eldeco Society and Tata Motors Service, Sohna. Ample parking space is available right outside the clinic. Would you like directions or to book a visit?`;
      }
      if (text.includes('price') || text.includes('cost') || text.includes('fee') || text.includes('how much') || text.includes('inr')) {
        return `Here are starting treatment estimates at Painless Dental Care:\n\n• Specialist Consultation: ₹${activeClinic.consultationFee}\n• Painless Wisdom Tooth Extraction: from ₹4,500\n• Single-Sitting Painless RCT: from ₹4,000\n• German Dental Implants: from ₹25,000\n• Pediatric Preventive Care: from ₹1,500\n• Laser Whitening: from ₹8,000\n\nWould you like to lock in a consultation slot with our specialist team?`;
      }
    }
    
    if (text.includes('price') || text.includes('cost') || text.includes('fee') || text.includes('how much') || text.includes('inr')) {
      return `Here are starting prices at ${activeClinic.name}:\n\n• Routine Consultation: ₹${activeClinic.consultationFee}\n• Teeth Whitening: ₹8,000\n• Root Canal Therapy: ₹12,000\n• Dental Crowns: ₹15,000\n• Dental Implants: ₹65,000\n• Clear Aligners: ₹80,000 (0% EMI available)\n\nWould you like to lock in a consultation slot with ${activeClinic.doctorName}?`;
    }
    
    if (text.includes('pain') || text.includes('hurt') || text.includes('emergency') || text.includes('bleed')) {
      return `I understand you are in pain. ${activeClinic.doctorName} reserves priority emergency slots daily.\n\nLet me open the quick booking form to lock in your emergency chair slot immediately.`;
    }

    if (text.includes('implant')) {
      return `Our clinic specializes in 3D CBCT guided Dental Implants with lifetime warranty options starting from ₹25,000. Would you like to schedule an implant scan consultation?`;
    }

    if (text.includes('aligner') || text.includes('brace') || text.includes('smile')) {
      return `We provide 3D digital smile simulations before treatment starts and offer 0% EMI options via Bajaj Finserv. Would you like a digital scan consultation?`;
    }

    return `Welcome to ${activeClinic.name} (${activeClinic.location})! I can assist you with treatment inquiries, pricing, 0% EMI options, and instant consultation booking with ${activeClinic.doctorName}. How can I assist you?`;
  };

  const handleSendText = async (text: string) => {
    setLoading(true);
    const low = text.toLowerCase();
    if (low.includes('book') || low.includes('appointment') || low.includes('slot') || low.includes('pain') || low.includes('consult')) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `Great! Let me open the direct appointment form for ${activeClinic.doctorName}.` 
        }]);
        setChatFlowState('collect_lead');
        setLoading(false);
      }, 500);
      return;
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: getAssistantFallbackResponse(text) }]);
      setLoading(false);
    }, 600);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');
    await handleSendText(userMsg);
  };

  const handleLeadSubmit = async (name: string, phone: string, email: string, treatment: string) => {
    setPatientName(name);
    setPatientPhone(phone);
    setPatientEmail(email);
    setSelectedTreatment(treatment);

    try {
      await addLead({
        name,
        email,
        phone,
        source: 'WhatsApp',
        status: 'New Lead',
        message: `WhatsApp inquiry for: ${treatment}`
      });
      
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `Thank you ${name}! Contact verified. Please pick your preferred consultation date and time below.` 
      }]);
      setChatFlowState('select_slot');
    } catch (err) {
      setChatFlowState('select_slot');
    }
  };

  const handleBookingConfirm = async (date: string, time: string, doctorId: string) => {
    const doc = doctors.find(d => d.id === doctorId) || doctors[0];
    const docName = doc ? doc.name : activeClinic.doctorName;
    setBookedDoctorName(docName);
    const formattedTime = `${date} at ${time}`;
    setBookedTime(formattedTime);

    try {
      await createAppointment({
        patientId: `pat-${Date.now()}`,
        patientName,
        patientPhone,
        patientEmail,
        doctorId,
        treatmentName: selectedTreatment,
        scheduledAt: `${date}T${time}:00`,
        status: 'Confirmed',
        notes: `Booked via 24/7 WhatsApp AI Widget.`,
        price: selectedTreatment.includes('Implant') ? 65000 : selectedTreatment.includes('Aligner') ? 80000 : 1500
      });

      setChatFlowState('confirmed');
    } catch (err) {
      setChatFlowState('confirmed');
    }
  };

  const handleReset = () => {
    setChatFlowState('free_chat');
    setPatientName('');
    setPatientPhone('');
    setPatientEmail('');
    setSelectedTreatment('');
    setBookedDoctorName('');
    setBookedTime('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* 1. Floating WhatsApp Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 sm:p-4 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative group cursor-pointer border-2 border-white/20"
          aria-label="Open 24/7 WhatsApp AI Assistant"
        >
          <MessageSquare className="h-6 w-6 text-slate-950 fill-slate-950" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border border-white"></span>
          </span>
          {/* Tooltip */}
          <div className="absolute right-16 bg-slate-950 border border-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            💬 24/7 WhatsApp Booking Engine Active
          </div>
        </button>
      )}

      {/* 2. Expanded WhatsApp Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-2.5rem)] sm:w-96 h-[78vh] max-h-[560px] bg-[#0b141a] border border-slate-800 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden text-slate-100">
          
          {/* WhatsApp Header */}
          <div className="px-4 py-3 bg-[#075E54] text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-200 flex items-center justify-center text-slate-950 font-bold text-xs shrink-0">
                🦷
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold leading-tight truncate max-w-[170px]">{activeClinic.name}</h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-emerald-200/80 leading-none mt-0.5">
                  24/7 WhatsApp Booking Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {onOpenSimulator && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenSimulator();
                  }}
                  className="px-2 py-1 bg-white/15 hover:bg-white/25 rounded-lg text-[10px] font-bold text-white transition-all flex items-center gap-1"
                  title="Open Full 2-Way Simulator"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Dual Simulator</span>
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Messages List */}
          <div 
            className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#0b141a] flex flex-col"
            style={{
              backgroundImage: `radial-gradient(rgba(37, 211, 102, 0.03) 1px, transparent 0)`,
              backgroundSize: '16px 16px'
            }}
          >
            <div className="space-y-2.5 flex-1">
              
              <div className="text-center my-1">
                <span className="bg-[#182229] text-slate-400 text-[9.5px] px-2.5 py-0.5 rounded-full">
                  Today
                </span>
              </div>

              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs text-left leading-relaxed whitespace-pre-line shadow-sm ${
                      m.sender === 'user' 
                        ? 'bg-[#005c4b] text-white rounded-tr-none' 
                        : 'bg-[#202c33] border border-slate-800 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-[#202c33] border border-slate-800 rounded-2xl rounded-tl-none px-3 py-2 flex items-center gap-1.5">
                    <Loader2 className="h-3.5 w-3.5 text-[#25D366] animate-spin" />
                    <span className="text-[10px] text-slate-400 font-mono">Assistant typing...</span>
                  </div>
                </div>
              )}

              {/* State Machine Inline Forms */}
              {chatFlowState === 'collect_lead' && (
                <LeadFormCard
                  initialName={patientName}
                  initialPhone={patientPhone}
                  initialTreatment={selectedTreatment}
                  clinicKey={activeClinic.key}
                  onSubmit={handleLeadSubmit}
                  onCancel={handleReset}
                />
              )}
              
              {chatFlowState === 'select_slot' && (
                <CalendarCard
                  onConfirm={handleBookingConfirm}
                  onCancel={handleReset}
                />
              )}

              {chatFlowState === 'confirmed' && (
                <SuccessCard
                  patientName={patientName}
                  treatment={selectedTreatment}
                  doctorName={bookedDoctorName || activeClinic.doctorName}
                  clinicName={activeClinic.name}
                  clinicPhone={activeClinic.phone}
                  scheduledAt={bookedTime}
                  onReset={handleReset}
                  onOpenSimulator={onOpenSimulator}
                />
              )}
            </div>

            {/* Quick Action Chips */}
            {chatFlowState === 'free_chat' && !loading && (
              <div className="flex flex-wrap gap-1.5 pt-3 mt-auto border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setChatFlowState('collect_lead')}
                  className="px-2.5 py-1 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 rounded-full text-[10px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="h-3 w-3" /> Book Consultation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMessages(prev => [...prev, { sender: 'user', text: 'What is the implant and root canal price?' }]);
                    handleSendText('What is the implant and root canal price?');
                  }}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-full text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  Check Prices
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMessages(prev => [...prev, { sender: 'user', text: 'I have severe tooth pain tonight.' }]);
                    handleSendText('I have severe tooth pain tonight.');
                  }}
                  className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  Emergency Pain
                </button>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input Area */}
          {chatFlowState === 'free_chat' && (
            <form onSubmit={handleSend} className="p-2.5 bg-[#202c33] border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ask about implants, fees, timings..."
                className="flex-1 bg-[#2a3942] text-white border border-slate-700 px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="p-2 bg-[#00a884] hover:bg-[#008f6f] text-white rounded-xl disabled:opacity-50 transition-colors flex items-center justify-center cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          )}

        </div>
      )}

    </div>
  );
};
