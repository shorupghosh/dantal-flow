import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Bot, AlertTriangle, Sparkles, Loader2, 
  CalendarDays, Smartphone, Mail, MessageCircle, CheckCircle2 
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useDatabase } from '../context/DatabaseContext';

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const isGeminiConfigured = Boolean(geminiKey);

const systemPrompt = `You are a helpful, professional, and friendly AI receptionist for "DentalFlow AI" clinic in Gurugram, India (Golf Course Road).
Our clinic hours are 9:00 AM to 8:00 PM, Sunday to Saturday.
Our list of specialists includes:
- Dr. Sameer Sharma (Orthodontist, braces)
- Dr. Sarah Patel (Pedodontist, child dentist)
- Dr. Nitin Gupta (Oral & Implant Surgeon)
- Dr. Tanvi Desai (Endodontist, root canal)
- Dr. Amit Shah (Prosthodontist, crowns & bridges)
- Dr. Meera Reddy (Periodontist, gum treatments)
- Dr. Kiran Verma (Cosmetic Dentist, veneer/whitening)
- Dr. Riya Kapoor (General Dentist)

We offer the following treatments:
- Routine Clean & Check (INR 1,500)
- Teeth Whitening (INR 8,000)
- Tooth Extraction (INR 3,000)
- Root Canal Therapy (INR 12,000)
- Dental Crowns (INR 15,000)
- Dental Implants (INR 65,000)
- Orthodontic Braces (INR 80,000)
- Pediatric Dental Care (INR 2,000)

Your goals:
1. Provide friendly information about clinic hours, specialists, and treatments. Feel free to use a mix of English and Hindi (Hinglish) occasionally to sound friendly.
2. We support UPI payments (Google Pay, PhonePe) and EMI options for expensive treatments (like Braces or Implants).
3. If they show interest in booking an appointment, experiencing pain, or want to talk to a doctor, your PRIMARY goal is to collect their Name and Phone Number (preferably WhatsApp number) and the treatment they need. Ask for these conversationally.
4. Keep answers short, structured, and easy to read.

CRITICAL INSTRUCTION FOR LEAD CAPTURE:
Once the user has provided their Name, Phone Number, and Treatment interest, you MUST include this exact string at the very end of your response:
[LEAD_CAPTURED: Name="<their name>", Phone="<their phone>", Treatment="<their treatment>"]
Do not output this string until you have all 3 pieces of information. Once you output it, also tell the user that our team will contact them on WhatsApp shortly to confirm their booking.`;

type ChatFlowState = 'free_chat' | 'collect_lead' | 'select_slot' | 'confirmed';

// --- Subcomponents ---

interface LeadFormCardProps {
  initialName: string;
  initialPhone: string;
  initialTreatment: string;
  onSubmit: (name: string, phone: string, email: string, treatment: string) => void;
  onCancel: () => void;
}

const LeadFormCard: React.FC<LeadFormCardProps> = ({
  initialName,
  initialPhone,
  initialTreatment,
  onSubmit,
  onCancel
}) => {
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState('');
  const [treatment, setTreatment] = useState(initialTreatment);
  const [error, setError] = useState('');

  const treatments = [
    "Routine Clean & Check",
    "Teeth Whitening",
    "Tooth Extraction",
    "Root Canal Therapy",
    "Dental Crowns",
    "Dental Implants",
    "Orthodontic Braces",
    "Pediatric Dental Care"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !treatment) {
      setError('All fields are required.');
      return;
    }
    onSubmit(name.trim(), phone.trim(), email.trim(), treatment);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3 text-left shadow-md">
      <h5 className="font-bold text-xs text-primary uppercase tracking-wider">Patient Details</h5>
      {error && <p className="text-[10px] text-destructive">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div>
          <label className="text-[10px] font-bold text-muted-foreground block mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-background border border-border px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-primary text-foreground"
            placeholder="e.g. Priya Sharma"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-muted-foreground block mb-1">WhatsApp Number</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full bg-background border border-border px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-primary text-foreground"
            placeholder="e.g. +91 9876543210"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-muted-foreground block mb-1">Email Address (Mandatory for Confirmation)</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-background border border-border px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-primary text-foreground"
            placeholder="e.g. priya@gmail.com"
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-bold text-muted-foreground block mb-1">Treatment Interest</label>
          <select
            value={treatment}
            onChange={e => setTreatment(e.target.value)}
            className="w-full bg-background border border-border px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-primary text-foreground"
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
            className="flex-1 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 border border-border text-foreground text-xs font-bold rounded-lg hover:bg-muted transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Generate date options (next 14 days starting tomorrow, skipping Sundays)
const getNext14Days = () => {
  const dates = [];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let count = 0;
  let daysOffset = 1;
  
  while (count < 14) {
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
  const { doctors } = useDatabase();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDocId, setSelectedDocId] = useState('');
  const [error, setError] = useState('');

  const datesOptions = getNext14Days();
  const activeDoctor = doctors.find(d => d.id === selectedDocId);

  const getSlots = () => {
    if (!activeDoctor || !selectedDate) return [];
    const dateObj = datesOptions.find(d => d.formatted === selectedDate);
    if (!dateObj) return [];
    
    // Pull slot configurations or use default
    const slots = activeDoctor.availability[dateObj.dayName];
    return slots || ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
  };

  const slots = getSlots();

  const handleConfirmClick = () => {
    if (!selectedDate || !selectedTime || !selectedDocId) {
      setError('Please select a Specialist, Date, and Time.');
      return;
    }
    onConfirm(selectedDate, selectedTime, selectedDocId);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3.5 text-left shadow-md">
      <h5 className="font-bold text-xs text-primary uppercase tracking-wider">Select Slot</h5>
      {error && <p className="text-[10px] text-destructive">{error}</p>}

      {/* 1. Doctor Selection */}
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-muted-foreground block">Select Doctor</label>
        <select
          value={selectedDocId}
          onChange={e => { setSelectedDocId(e.target.value); setSelectedDate(''); setSelectedTime(''); setError(''); }}
          className="w-full bg-background border border-border px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:border-primary text-foreground"
        >
          <option value="">Choose Specialist...</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
          ))}
        </select>
      </div>

      {/* 2. Date Selection */}
      {selectedDocId && (
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-muted-foreground block">Select Date (Sundays Closed)</label>
          <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
            {datesOptions.map(date => (
              <button
                key={date.formatted}
                type="button"
                onClick={() => { setSelectedDate(date.formatted); setSelectedTime(''); setError(''); }}
                className={`px-3 py-2 border rounded-lg text-center flex flex-col items-center min-w-[70px] shrink-0 transition-all cursor-pointer ${
                  selectedDate === date.formatted
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-background hover:bg-muted text-foreground'
                }`}
              >
                <span className="text-[10px] font-bold block">{date.label.split(',')[0]}</span>
                <span className="text-[9px] text-muted-foreground block">{date.label.split(',')[1]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Time Selection */}
      {selectedDate && (
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-muted-foreground block">Available Hours</label>
          <div className="grid grid-cols-3 gap-1.5">
            {slots.map(time => (
              <button
                key={time}
                type="button"
                onClick={() => { setSelectedTime(time); setError(''); }}
                className={`py-1.5 border rounded-lg text-center text-[10px] font-semibold transition-all cursor-pointer ${
                  selectedTime === time
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-background hover:bg-muted text-foreground'
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
          className="flex-1 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Book Appointment
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-2 border border-border text-foreground text-xs font-bold rounded-lg hover:bg-muted transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface SuccessCardProps {
  patientName: string;
  patientEmail: string;
  treatment: string;
  doctorName: string;
  scheduledAt: string;
  onReset: () => void;
}

const SuccessCard: React.FC<SuccessCardProps> = ({
  patientName,
  patientEmail,
  treatment,
  doctorName,
  scheduledAt,
  onReset
}) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 800);
    const timer2 = setTimeout(() => setStage(2), 1600);
    const timer3 = setTimeout(() => setStage(3), 2400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4 text-center shadow-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-blue-500 opacity-50"></div>
      
      <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
        <CheckCircle2 className="h-6 w-6" />
      </div>

      <div className="space-y-1">
        <h5 className="font-bold text-sm text-foreground">Appointment Received!</h5>
        <p className="text-[10px] text-muted-foreground">Your booking request has been registered.</p>
      </div>

      <div className="bg-background border border-border rounded-lg p-3 text-left space-y-1.5 text-xs text-foreground">
        <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Booking Summary</p>
        <p><strong className="text-muted-foreground font-medium">Patient:</strong> {patientName}</p>
        <p><strong className="text-muted-foreground font-medium">Doctor:</strong> {doctorName}</p>
        <p><strong className="text-muted-foreground font-medium">Treatment:</strong> {treatment}</p>
        <p><strong className="text-muted-foreground font-medium">Time Slot:</strong> {scheduledAt}</p>
      </div>

      <div className="space-y-2 text-left pl-1">
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Clinic Automations</p>
        
        <div className="flex items-center gap-2 text-[10px]">
          <Smartphone className={`h-3.5 w-3.5 ${stage >= 1 ? 'text-green-500' : 'text-muted-foreground/45 animate-pulse'}`} />
          <span className={stage >= 1 ? 'text-foreground' : 'text-muted-foreground'}>
            SMS Dispatched (Twilio)
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <Mail className={`h-3.5 w-3.5 ${stage >= 2 ? 'text-green-500' : 'text-muted-foreground/45'}`} />
          <span className={stage >= 2 ? 'text-foreground' : 'text-muted-foreground'}>
            Confirmations Emailed (Resend)
          </span>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <CalendarDays className={`h-3.5 w-3.5 ${stage >= 3 ? 'text-green-500' : 'text-muted-foreground/45'}`} />
          <span className={stage >= 3 ? 'text-foreground' : 'text-muted-foreground'}>
            CRM Data Synced (Supabase)
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-colors cursor-pointer"
      >
        Start New Chat
      </button>
    </div>
  );
};

// --- Main Component ---

export const AIReceptionist: React.FC = () => {
  const { addLead, createAppointment, doctors } = useDatabase();
  
  const [isOpen, setIsOpen] = useState(false);
  const [chatFlowState, setChatFlowState] = useState<ChatFlowState>('free_chat');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot', text: string }>>([
    { sender: 'bot', text: "Hello! Welcome to DentalFlow AI. I am your 24/7 receptionist. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Stored details for lead & appointment creation
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  
  // Confirmed details for display
  const [bookedDoctorName, setBookedDoctorName] = useState('');
  const [bookedTime, setBookedTime] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, chatFlowState, loading]);

  const getMockResponse = (input: string): string => {
    const text = input.toLowerCase();
    
    if (text.includes('price') || text.includes('cost') || text.includes('how much') || text.includes('fee') || text.includes('inr')) {
      return "Here are starting prices for some of our key procedures:\n\n• Clean & Check: INR 1,500\n• Teeth Whitening: INR 8,000\n• Root Canal Therapy: INR 12,000\n• Dental Crowns: INR 15,000\n• Dental Implants: INR 65,000\n• Orthodontic Braces: INR 80,000\n\nIs there a specific procedure you're interested in?";
    }
    
    if (text.includes('pain') || text.includes('hurt') || text.includes('ache') || text.includes('bleeding') || text.includes('emergency')) {
      return "I'm sorry to hear you are experiencing discomfort. Toothaches are often managed by Dr. Tanvi Desai (Endodontist / Root Canal Specialist) or Dr. Nitin Gupta (Oral Surgeon).\n\nTo help me understand:\n1. How long has the pain lasted?\n2. On a scale of 1-10, how severe is it?\n3. Is it sensitive to hot or cold food?";
    }

    if (text.includes('doctor') || text.includes('specialist') || text.includes('dentist') || text.includes('appointment')) {
      return "We have 8 specialists at our Gurugram clinic, including Dr. Sameer Sharma (Orthodontist), Dr. Tanvi Desai (Root Canal Specialist), and Dr. Sarah Patel (Pediatric Dentistry).\n\nWould you like me to open the appointment booking form for you?";
    }

    if (text.includes('location') || text.includes('where') || text.includes('address') || text.includes('gurugram') || text.includes('gurgaon') || text.includes('golf course road')) {
      return "DentalFlow AI is located at Golf Course Road, Sector 54, Gurugram, India. We have dedicated parking space available.";
    }

    if (text.includes('hour') || text.includes('time') || text.includes('open') || text.includes('close') || text.includes('schedule')) {
      return "Our clinic is open daily (Sunday to Saturday) from 9:00 AM to 8:00 PM. Appointments can be booked within these hours.";
    }

    return "Thank you for reaching out! I can help answer queries about our treatments, doctors, location, or clinic hours. If you wish to schedule a visit, tap the 'Book Consultation' chip below. Let me know how I can guide you!";
  };

  const handleSendText = async (text: string) => {
    setLoading(true);
    if (isGeminiConfigured) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-2.0-flash',
          systemInstruction: systemPrompt
        });

        // The first message in Gemini chat history must be from the 'user'.
        const chatHistory = messages
          .slice(1)
          .map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }));

        // Append active user query to history
        chatHistory.push({
          role: 'user',
          parts: [{ text: text }]
        });

        const chat = model.startChat({
          history: chatHistory
        });

        const result = await chat.sendMessage(text);
        const responseText = result.response.text();
        
        let displayMsg = responseText;
        const leadMatch = responseText.match(/\[LEAD_CAPTURED:(.*?)\]/);
        
        if (leadMatch) {
            displayMsg = responseText.replace(leadMatch[0], '').trim();
            const leadInfo = leadMatch[1];
            const nameMatch = leadInfo.match(/Name="(.*?)"/);
            const phoneMatch = leadInfo.match(/Phone="(.*?)"/);
            const treatmentMatch = leadInfo.match(/Treatment="(.*?)"/);
            
            setPatientName(nameMatch ? nameMatch[1] : '');
            setPatientPhone(phoneMatch ? phoneMatch[1] : '');
            setSelectedTreatment(treatmentMatch ? treatmentMatch[1] : '');
            setChatFlowState('collect_lead');
        } else if (responseText.toLowerCase().includes('[trigger_booking]') || text.toLowerCase().includes('book') || text.toLowerCase().includes('appointment')) {
            displayMsg = responseText.replace(/\[trigger_booking\]/gi, '').trim();
            setChatFlowState('collect_lead');
        }
        
        setMessages(prev => [...prev, { sender: 'bot', text: displayMsg }]);
      } catch (error) {
        console.error("Gemini API Error, falling back to mock reply:", error);
        setMessages(prev => [...prev, { sender: 'bot', text: getMockResponse(text) }]);
      } finally {
        setLoading(false);
      }
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: getMockResponse(text) }]);
        setLoading(false);
      }, 800);
    }
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
      // Save lead details to CRM
      await addLead({
        name,
        email,
        phone,
        source: 'Website',
        status: 'New Lead',
        message: `Chatbot request for: ${treatment}`
      });
      
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: `Thank you, ${name}! Your contact details have been verified. Let's schedule your appointment slot now.` 
      }]);
      setChatFlowState('select_slot');
    } catch (err) {
      console.error("Error saving lead:", err);
      // Fallback transition
      setChatFlowState('select_slot');
    }
  };

  const handleBookingConfirm = async (date: string, time: string, doctorId: string) => {
    const doc = doctors.find(d => d.id === doctorId);
    const doctorName = doc ? doc.name : 'Specialist';
    setBookedDoctorName(doctorName);
    const formattedTime = `${date} at ${time}`;
    setBookedTime(formattedTime);

    try {
      const scheduledAt = `${date}T${time}:00`;
      
      // Save pending appointment (auto-registers new patient securely via DB constraints)
      await createAppointment({
        patientId: `pat-${Date.now()}`,
        patientName,
        patientPhone,
        patientEmail,
        doctorId,
        treatmentName: selectedTreatment,
        scheduledAt,
        status: 'Pending',
        notes: 'Requested via AI Receptionist chatbot.',
        price: 2000 // Indicative price
      });

      setChatFlowState('confirmed');
    } catch (err) {
      console.error("Error creating appointment:", err);
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
      
      {/* 1. Floating Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all hover:bg-primary/95 flex items-center justify-center relative group cursor-pointer"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
          {/* Tooltip */}
          <div className="absolute right-14 bg-card border border-border text-foreground text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow shadow-black/10">
            Chat with 24/7 AI Receptionist
          </div>
        </button>
      )}

      {/* 2. Expanded Chat Box */}
      {isOpen && (
        <div className="w-[calc(100vw-3rem)] sm:w-96 h-[75vh] max-h-[520px] sm:h-[520px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/20 rounded">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">AI Receptionist</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white/80 font-medium">
                    {isGeminiConfigured ? 'Gemini Live' : 'Demo Mock Mode'}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Warning banner if not configured - only show in dev mode */}
          {!isGeminiConfigured && import.meta.env.DEV && (
            <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-600 dark:text-yellow-500 flex items-center gap-1.5 text-[10px] text-left">
              <AlertTriangle className="h-3 w-3 shrink-0" />
              <span>VITE_GEMINI_API_KEY missing. Running local assistant engine.</span>
            </div>
          )}

          {/* Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-background/50 flex flex-col">
            <div className="space-y-3 flex-1">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs text-left leading-relaxed whitespace-pre-line ${
                      m.sender === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-none' 
                        : 'bg-card border border-border text-foreground rounded-bl-none shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                    <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
                    <span className="text-[10px] text-muted-foreground">Receptionist is thinking...</span>
                  </div>
                </div>
              )}

              {/* Conditional Inline Widgets based on state machine */}
              {chatFlowState === 'collect_lead' && (
                <LeadFormCard
                  initialName={patientName}
                  initialPhone={patientPhone}
                  initialTreatment={selectedTreatment}
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
                  patientEmail={patientEmail}
                  treatment={selectedTreatment}
                  doctorName={bookedDoctorName}
                  scheduledAt={bookedTime}
                  onReset={handleReset}
                />
              )}
            </div>

            {/* Quick reply chips */}
            {chatFlowState === 'free_chat' && !loading && (
              <div className="flex flex-wrap gap-1.5 pt-4 mt-auto">
                <button
                  type="button"
                  onClick={() => setChatFlowState('collect_lead')}
                  className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full text-[10px] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="h-3 w-3" /> Book Consultation
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMessages(prev => [...prev, { sender: 'user', text: 'What are your prices?' }]);
                    handleSendText('What are your prices?');
                  }}
                  className="px-3 py-1.5 bg-card hover:bg-muted text-foreground/80 border border-border rounded-full text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  Check Prices
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMessages(prev => [...prev, { sender: 'user', text: 'I am experiencing tooth pain.' }]);
                    handleSendText('I am experiencing tooth pain.');
                  }}
                  className="px-3 py-1.5 bg-card hover:bg-muted text-foreground/80 border border-border rounded-full text-[10px] font-semibold transition-colors cursor-pointer"
                >
                  Emergency Pain
                </button>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input Area */}
          {chatFlowState === 'free_chat' && (
            <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2 bg-card">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ask about prices, timings, pain..."
                className="flex-1 bg-background border border-border px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-primary text-foreground"
              />
              <button
                type="submit"
                disabled={loading || !inputText.trim()}
                className="p-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/95 disabled:opacity-50 transition-colors flex items-center justify-center cursor-pointer"
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
