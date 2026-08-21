// DentalFlow AI - Clean Database & API Entity Types

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
