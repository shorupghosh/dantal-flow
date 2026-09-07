export interface ScenarioPreset {
  id: string;
  badge: string;
  title: string;
  priceTag: string;
  category: 'implant' | 'cosmetic' | 'emergency' | 'general';
  initialPatientMsg: string;
  patientName: string;
  patientPhone: string;
  treatmentName: string;
  estimatedPrice: number;
  urgency: 'Standard' | 'High' | 'Critical';
  aiScore: number;
  steps: {
    prompt: string;
    suggestedReply: string;
    quickChips?: string[];
  }[];
}

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: 'implant-consult',
    badge: 'High-Ticket ₹65k+',
    title: '🦷 Dental Implant & Bone Graft Consultation',
    priceTag: '₹65,000',
    category: 'implant',
    initialPatientMsg: 'Namaskar, I need an implant consultation for my upper molar. I have bone loss and want to know if same-day implant is possible.',
    patientName: 'Vikram Malhotra',
    patientPhone: '+91 98183 92011',
    treatmentName: 'Dental Implants',
    estimatedPrice: 65000,
    urgency: 'High',
    aiScore: 9,
    steps: [
      {
        prompt: 'Namaskar Vikram Ji! 🙏 Welcome to our clinic. Yes, our senior Implant Surgeon specializes in advanced CBCT 3D guided implants and bone graft evaluations. Single-tooth implants start from ₹65,000 with lifetime warranty options.\n\nWould you like to schedule an in-clinic 3D digital scan consultation this Friday?',
        suggestedReply: 'Yes please. What time slots do you have available this Friday?',
        quickChips: ['Friday Morning (11:30 AM)', 'Friday Evening (5:00 PM)', 'Saturday Afternoon']
      },
      {
        prompt: 'We have reserved Friday at 11:30 AM for your Dental Implant 3D Scan consultation. May I have your full name and WhatsApp number to lock in your appointment slot?',
        suggestedReply: 'Vikram Malhotra, +91 98183 92011. Please confirm the clinic location.',
        quickChips: ['Confirm My Booking 🔒']
      }
    ]
  },
  {
    id: 'aligners-cosmetic',
    badge: 'Cosmetic ₹80k',
    title: '✨ Clear Aligners & Smile Makeover (0% EMI)',
    priceTag: '₹80,000',
    category: 'cosmetic',
    initialPatientMsg: 'Hi, I want clear aligners for mild crowding. Do you provide 3D digital smile simulation before starting, and is Bajaj Finserv 0% EMI available?',
    patientName: 'Rhea Sengupta',
    patientPhone: '+91 99204 81723',
    treatmentName: 'Orthodontic Braces',
    estimatedPrice: 80000,
    urgency: 'High',
    aiScore: 8,
    steps: [
      {
        prompt: 'Hello Rhea! ✨ Yes, we use iTero 3D digital scanners to show you your exact post-treatment smile transformation on Day 1! We offer 0% interest EMI options starting at just ₹3,500/month via Bajaj Finserv & credit cards.\n\nWe have priority slots for digital smile scans this Saturday. Would you like a morning or afternoon slot?',
        suggestedReply: 'Saturday afternoon around 3:30 PM works great for me.',
        quickChips: ['Saturday 3:30 PM', 'Sunday 11:00 AM', 'Thursday 5:30 PM']
      },
      {
        prompt: 'Perfect! Saturday at 3:30 PM is locked for your 3D Smile Scan with our Orthodontist specialist. Please confirm your details below.',
        suggestedReply: 'Rhea Sengupta, +91 99204 81723. Thank you!',
        quickChips: ['Confirm My Booking 🔒']
      }
    ]
  },
  {
    id: 'emergency-pain',
    badge: '10:30 PM Acute Pain',
    title: '⚡ After-Hours Emergency Root Canal Triage',
    priceTag: '₹12,000',
    category: 'emergency',
    initialPatientMsg: 'Hello, severe throbbing pain in lower molar since tonight, cannot sleep. Need emergency appointment first thing tomorrow morning.',
    patientName: 'Amitabh Saxena',
    patientPhone: '+91 98711 44520',
    treatmentName: 'Root Canal Therapy',
    estimatedPrice: 12000,
    urgency: 'Critical',
    aiScore: 10,
    steps: [
      {
        prompt: 'Namaskar Amitabh Ji! 🚨 We understand severe dental pain is distressing. Our Endodontist (Root Canal Specialist) has reserved an Emergency Priority Slot tomorrow at 9:30 AM.\n\nIn the meantime: please avoid hot foods and do not apply pain balms directly on gums. Shall we confirm the 9:30 AM emergency slot for you?',
        suggestedReply: 'Yes please, lock the 9:30 AM slot tomorrow morning. It hurts a lot.',
        quickChips: ['Lock 9:30 AM Emergency Slot', 'Hold 10:30 AM Slot']
      },
      {
        prompt: 'Your emergency slot is locked for tomorrow 9:30 AM. Our on-call clinical manager has been notified. Please confirm your name and contact.',
        suggestedReply: 'Amitabh Saxena, +91 98711 44520.',
        quickChips: ['Confirm Emergency Booking 🔒']
      }
    ]
  },
  {
    id: 'whitening-cleaning',
    badge: 'Preventive ₹8k',
    title: '💎 Laser Teeth Whitening & Prophy Cleaning',
    priceTag: '₹8,000',
    category: 'general',
    initialPatientMsg: 'Hello! What is the price for in-clinic laser teeth whitening? I have a family wedding next week.',
    patientName: 'Pooja Kashyap',
    patientPhone: '+91 98102 77419',
    treatmentName: 'Teeth Whitening',
    estimatedPrice: 8000,
    urgency: 'Standard',
    aiScore: 7,
    steps: [
      {
        prompt: 'Hello Pooja! 🌟 Our 1-Hour In-Clinic Laser Whitening brightens teeth by 4–6 shades instantly for events and weddings! It is currently ₹8,000 (includes complimentary ultrasonic scaling).\n\nWe have slots open this Thursday and Friday. Would you like a consultation slot?',
        suggestedReply: 'Thursday 4:00 PM would be ideal for me.',
        quickChips: ['Thursday 4:00 PM', 'Friday 2:00 PM', 'Saturday 11:30 AM']
      },
      {
        prompt: 'Great choice! Thursday at 4:00 PM is reserved. Please provide your contact details to receive the WhatsApp confirmation card.',
        suggestedReply: 'Pooja Kashyap, +91 98102 77419.',
        quickChips: ['Confirm My Booking 🔒']
      }
    ]
  }
];
