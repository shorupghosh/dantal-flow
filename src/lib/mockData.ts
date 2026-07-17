// DentalFlow AI - Procedural Mock Data Generator for High-Performance Demo

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  imageUrl: string;
  email: string;
  phone: string;
  bio: string;
  rating: number;
  availability: Record<string, string[]>;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  medicalHistory: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName?: string;
  patientPhone?: string;
  patientEmail?: string;
  doctorId: string;
  doctorName?: string;
  treatmentName: string;
  scheduledAt: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';
  notes: string;
  price: number;
  createdAt: string;
}

export interface Staff {
  id: string;
  name: string;
  role: 'Admin' | 'Receptionist' | 'Assistant' | 'Accountant' | 'Marketing';
  email: string;
  phone: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Website' | 'Google' | 'WhatsApp' | 'Referral' | 'Instagram' | 'Facebook';
  status: 'New Lead' | 'Consultation' | 'Appointment' | 'Treatment' | 'Completed' | 'Recall';
  aiScore: number;
  aiNotes: string;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  patientId: string;
  patientName?: string;
  doctorId: string;
  doctorName?: string;
  rating: number;
  comment: string;
  aiResponse?: string;
  createdAt: string;
}

// --- Realistic Seed Data for Demo Fallbacks ---

export const mockDoctors: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Sameer Sharma",
    specialization: "Orthodontist (Smile Alignment)",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400",
    email: "sameer@dentalflow.com",
    phone: "+91 98200-10101",
    bio: "Globally trained orthodontist with 12+ years experience in digital smile alignment, traditional braces, and invisible clear aligners.",
    rating: 4.9,
    availability: {
      "Monday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Tuesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Wednesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Thursday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Saturday": ["10:00", "11:00", "12:00", "14:00", "15:00"],
      "Sunday": ["10:00", "11:00", "12:00"]
    }
  },
  {
    id: "doc-2",
    name: "Dr. Sarah Patel",
    specialization: "Pedodontist (Child Specialist)",
    imageUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400&h=400",
    email: "sarah@dentalflow.com",
    phone: "+91 98200-10202",
    bio: "Specializes in pediatric dental therapy and creating a warm, anxiety-free clinical atmosphere for children.",
    rating: 4.8,
    availability: {
      "Monday": ["10:00", "11:00", "12:00", "15:00", "16:00"],
      "Wednesday": ["10:00", "11:00", "12:00", "15:00", "16:00"],
      "Saturday": ["09:00", "10:00", "11:00", "12:00"],
      "Sunday": ["09:00", "10:00", "11:00", "12:00"]
    }
  },
  {
    id: "doc-3",
    name: "Dr. Nitin Gupta",
    specialization: "Oral & Implant Surgeon",
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400",
    email: "nitin@dentalflow.com",
    phone: "+91 98200-10303",
    bio: "Expert maxillofacial surgeon specialized in computer-guided same-day dental implants, wisdom teeth extractions, and trauma management.",
    rating: 4.9,
    availability: {
      "Monday": ["09:00", "10:00", "14:00", "15:00", "17:00"],
      "Tuesday": ["09:00", "10:00", "14:00", "15:00", "17:00"],
      "Thursday": ["09:00", "10:00", "14:00", "15:00", "17:00"],
      "Saturday": ["10:00", "11:00", "14:00", "15:00"]
    }
  },
  {
    id: "doc-4",
    name: "Dr. Tanvi Desai",
    specialization: "Endodontist (Root Canal Specialist)",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400",
    email: "tanvi@dentalflow.com",
    phone: "+91 98200-10404",
    bio: "Clinical pioneer in single-visit painless root canal therapy, digital pulp diagnostics, and complex endodontic retreatments.",
    rating: 4.7,
    availability: {
      "Tuesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Wednesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Thursday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Saturday": ["09:00", "10:00", "11:00", "14:00", "15:00"]
    }
  },
  {
    id: "doc-5",
    name: "Dr. Amit Shah",
    specialization: "Prosthodontist (Crowns & Bridges)",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400",
    email: "amit@dentalflow.com",
    phone: "+91 98200-10505",
    bio: "Specialist in crowns, bridges, dentures, and full mouth smile rehabilitation using state-of-the-art CAD/CAM digital scanners.",
    rating: 4.8,
    availability: {
      "Monday": ["09:00", "10:00", "14:00", "15:00"],
      "Wednesday": ["09:00", "10:00", "14:00", "15:00"],
      "Saturday": ["09:00", "10:00", "14:00", "15:00"]
    }
  },
  {
    id: "doc-6",
    name: "Dr. Meera Reddy",
    specialization: "Periodontist (Gum Specialist)",
    imageUrl: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=400&h=400",
    email: "meera@dentalflow.com",
    phone: "+91 98200-10606",
    bio: "Specializes in minimally invasive laser gum therapies, cosmetic gum contouring, bone grafting, and treatment of loose teeth.",
    rating: 4.7,
    availability: {
      "Tuesday": ["10:00", "11:00", "14:00", "15:00"],
      "Thursday": ["10:00", "11:00", "14:00", "15:00"],
      "Saturday": ["10:00", "11:00", "14:00", "15:00"]
    }
  },
  {
    id: "doc-7",
    name: "Dr. Kiran Verma",
    specialization: "Cosmetic Dentist (Veneer & Whitening)",
    imageUrl: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=400&h=400",
    email: "kiran@dentalflow.com",
    phone: "+91 98200-10707",
    bio: "Expert aesthetic dentist specializing in high-fidelity porcelain veneers, cosmetic composite bonding, and advanced laser teeth whitening.",
    rating: 4.9,
    availability: {
      "Monday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Wednesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Friday": ["15:00", "16:00", "17:00", "18:00"],
      "Saturday": ["09:00", "10:00", "11:00", "14:00", "15:00"]
    }
  },
  {
    id: "doc-8",
    name: "Dr. Riya Kapoor",
    specialization: "General Dentist",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400&h=400",
    email: "riya@dentalflow.com",
    phone: "+91 98200-10808",
    bio: "Handles preventive checkups, diagnostic scaling, fillings, patient education, and coordinate multi-doctor treatment plans.",
    rating: 4.8,
    availability: {
      "Monday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Tuesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Wednesday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Thursday": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      "Saturday": ["09:00", "10:00", "11:00", "14:00", "15:00"],
      "Sunday": ["09:00", "10:00", "11:00", "12:00"]
    }
  }
];

export const mockPatients: Patient[] = [
  {
    id: "pat-1",
    name: "Rahul Mehta",
    email: "rahul.mehta@gmail.com",
    phone: "+91 98200-11111",
    medicalHistory: "None. Slight temperature sensitivity in the lower left molar.",
    createdAt: "2026-06-15T10:00:00Z"
  },
  {
    id: "pat-2",
    name: "Priya Nair",
    email: "priya.nair@yahoo.co.in",
    phone: "+91 98200-22222",
    medicalHistory: "Completing Invisalign treatment. History of orthodontic braces.",
    createdAt: "2026-06-20T11:30:00Z"
  },
  {
    id: "pat-3",
    name: "Amit Singhal",
    email: "amit.singhal@outlook.com",
    phone: "+91 98200-33333",
    medicalHistory: "Missing lower right molar. Scheduled implant evaluation.",
    createdAt: "2026-07-01T15:00:00Z"
  },
  {
    id: "pat-4",
    name: "Sunita Rao",
    email: "sunita.rao@gmail.com",
    phone: "+91 98200-44444",
    medicalHistory: "Mild gingivitis, regular scaling and gum care visits.",
    createdAt: "2026-07-10T17:00:00Z"
  }
];

export const mockStaff: Staff[] = [
  {
    id: "staff-1",
    name: "Neha Sharma",
    role: "Receptionist",
    email: "neha.reception@dentalflow.com",
    phone: "+91 98200-55555"
  },
  {
    id: "staff-2",
    name: "Vikram Malhotra",
    role: "Admin",
    email: "vikram.admin@dentalflow.com",
    phone: "+91 98200-66666"
  }
];

export const mockReviews: Review[] = [
  {
    id: "rev-1",
    patientId: "pat-1",
    patientName: "Rahul Mehta",
    doctorId: "doc-4",
    doctorName: "Dr. Tanvi Desai",
    rating: 5,
    comment: "Incredible experience! The root canal treatment by Dr. Tanvi was completely painless. The AI scheduling was super fast, and I was in the chair within minutes.",
    aiResponse: "Dear Rahul, thank you for sharing your experience! We are delighted to hear that your root canal treatment with Dr. Tanvi Desai was comfortable and pain-free. We strive to combine dental expertise with high-tech hospitality.",
    createdAt: "2026-07-12T14:30:00Z"
  },
  {
    id: "rev-2",
    patientId: "pat-2",
    patientName: "Priya Nair",
    doctorId: "doc-1",
    doctorName: "Dr. Sameer Sharma",
    rating: 5,
    comment: "I got clear aligners from Dr. Sameer. The digital smile design showed me the final outcome beforehand. Absolutely loved the WhatsApp reminders throughout my treatment!",
    aiResponse: "Dear Priya, thank you for your wonderful review! We are thrilled that you loved the digital smile preview and our automated WhatsApp updates. Dr. Sameer and the team look forward to seeing your finished smile!",
    createdAt: "2026-07-14T09:15:00Z"
  },
  {
    id: "rev-3",
    patientId: "pat-3",
    patientName: "Amit Singhal",
    doctorId: "doc-3",
    doctorName: "Dr. Nitin Gupta",
    rating: 5,
    comment: "Dr. Nitin Gupta placed a dental implant for me. The process was explained so clearly, and the EMI option made it highly affordable. 5 stars to the entire team!",
    aiResponse: "Dear Amit, thank you for the feedback. We are happy that your implant surgery with Dr. Nitin went smoothly and that our flexible EMI options helped make the procedure accessible. We are always here for you.",
    createdAt: "2026-07-15T11:00:00Z"
  },
  {
    id: "rev-4",
    patientId: "pat-4",
    patientName: "Sunita Rao",
    doctorId: "doc-7",
    doctorName: "Dr. Kiran Verma",
    rating: 5,
    comment: "The teeth whitening session with Dr. Kiran made my teeth 4 shades whiter in just an hour. Excellent care and a beautiful premium clinic environment.",
    createdAt: "2026-07-16T16:20:00Z"
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: "appt-1",
    patientId: "pat-1",
    patientName: "Rahul Mehta",
    patientPhone: "+91 98200-11111",
    doctorId: "doc-4",
    doctorName: "Dr. Tanvi Desai",
    treatmentName: "Root Canal Therapy",
    scheduledAt: "2026-07-18T10:00:00Z",
    status: "Confirmed",
    price: 12000,
    notes: "Requires single visit root canal on lower molar.",
    createdAt: "2026-07-17T10:00:00Z"
  },
  {
    id: "appt-2",
    patientId: "pat-2",
    patientName: "Priya Nair",
    patientPhone: "+91 98200-22222",
    doctorId: "doc-1",
    doctorName: "Dr. Sameer Sharma",
    treatmentName: "Orthodontic Braces",
    scheduledAt: "2026-07-18T11:30:00Z",
    status: "Confirmed",
    price: 80000,
    notes: "Regular aligner tray swap checkup.",
    createdAt: "2026-07-17T11:30:00Z"
  },
  {
    id: "appt-3",
    patientId: "pat-3",
    patientName: "Amit Singhal",
    patientPhone: "+91 98200-33333",
    doctorId: "doc-3",
    doctorName: "Dr. Nitin Gupta",
    treatmentName: "Dental Implants",
    scheduledAt: "2026-07-19T15:00:00Z",
    status: "Pending",
    price: 65000,
    notes: "Guided surgical guide measurement appointment.",
    createdAt: "2026-07-17T15:00:00Z"
  },
  {
    id: "appt-4",
    patientId: "pat-4",
    patientName: "Sunita Rao",
    patientPhone: "+91 98200-44444",
    doctorId: "doc-7",
    doctorName: "Dr. Kiran Verma",
    treatmentName: "Teeth Whitening",
    scheduledAt: "2026-07-16T17:00:00Z",
    status: "Completed",
    price: 8000,
    notes: "Laser whitening completed, patient highly satisfied.",
    createdAt: "2026-07-16T16:00:00Z"
  }
];

export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Vikram Sen",
    email: "vikram.sen@gmail.com",
    phone: "+91 98111-22222",
    source: "Google",
    status: "New Lead",
    aiScore: 9,
    aiNotes: "AI Qualified: High interest in Dental Implants. Mentions painful chewing. Priority: High.",
    message: "I need to replace my lower front tooth. What is the starting price for premium dental implants?",
    createdAt: "2026-07-17T09:00:00Z"
  },
  {
    id: "lead-2",
    name: "Anjali Gupta",
    email: "anjali.g@gmail.com",
    phone: "+91 98222-33333",
    source: "Instagram",
    status: "Consultation",
    aiScore: 8,
    aiNotes: "AI Qualified: Smile design. Interested in veneers or aligners to fix tooth gap.",
    message: "Saw your smile gallery on Instagram. I have a minor spacing issue in my upper teeth, how many visits do I need for clear aligners?",
    createdAt: "2026-07-17T10:15:00Z"
  },
  {
    id: "lead-3",
    name: "Karan Johar",
    email: "karan.johar@rediffmail.com",
    phone: "+91 98333-44444",
    source: "Website",
    status: "New Lead",
    aiScore: 10,
    aiNotes: "AI Qualified: Urgent toothache emergency. Root canal needed.",
    message: "Severe pain in my back tooth since last night. Is Dr. Tanvi available for an emergency slot today?",
    createdAt: "2026-07-17T11:45:00Z"
  }
];
