// DentalFlow AI - Procedural Mock Data Generator for High-Performance Demo
export * from '../types/database';
import type { Doctor, Patient, Appointment, Staff, Lead, Review } from '../types/database';

export const mockDoctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Nitin Gupta',
    specialization: 'Chief Oral & Implant Surgeon',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    email: 'dr.nitin@dentalflow.com',
    phone: '+91 98200-22331',
    bio: 'BDS, MDS (Oral & Maxillofacial Surgery), FICOI (USA). Over 18 years of clinical excellence specializing in full-arch guided implantology, bone augmentation, and traumatic maxillofacial reconstruction.',
    rating: 4.9,
    availability: {
      Monday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
      Tuesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
      Thursday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Friday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
      Saturday: ['10:00', '11:00', '12:00', '14:00', '15:00'],
      Sunday: []
    }
  },
  {
    id: 'doc-2',
    name: 'Dr. Sameer Sharma',
    specialization: 'Lead Orthodontist (Invisalign Platinum)',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    email: 'dr.sameer@dentalflow.com',
    phone: '+91 98200-22332',
    bio: 'BDS, MDS (Orthodontics & Dentofacial Orthopedics). Certified Platinum Invisalign provider with 14+ years experience transforming smiles via self-ligating ceramic braces and digital clear aligners.',
    rating: 5.0,
    availability: {
      Monday: ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00'],
      Tuesday: ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'],
      Wednesday: ['10:00', '11:00', '12:00', '15:00', '16:00'],
      Thursday: ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00'],
      Friday: ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00'],
      Saturday: ['09:00', '10:00', '11:00', '12:00', '14:00'],
      Sunday: []
    }
  },
  {
    id: 'doc-3',
    name: 'Dr. Tanvi Desai',
    specialization: 'Microscopic Endodontist (Root Canal Specialist)',
    imageUrl: 'https://images.unsplash.com/photo-1594824813581-22fe60049444?auto=format&fit=crop&q=80&w=600',
    email: 'dr.tanvi@dentalflow.com',
    phone: '+91 98200-22333',
    bio: 'BDS, MDS (Conservative Dentistry & Endodontics). Pioneer in single-sitting rotary root canal treatments under Zeiss surgical operating microscopes with 12+ years experience.',
    rating: 4.9,
    availability: {
      Monday: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00'],
      Tuesday: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00'],
      Wednesday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Thursday: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00'],
      Friday: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      Saturday: ['10:00', '11:00', '12:00', '14:00'],
      Sunday: []
    }
  },
  {
    id: 'doc-4',
    name: 'Dr. Kiran Verma',
    specialization: 'Aesthetic & Cosmetic Dentist',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    email: 'dr.kiran@dentalflow.com',
    phone: '+91 98200-22334',
    bio: 'BDS, AACD (USA Fellowship in Digital Smile Design). Expert in ultra-thin porcelain veneers, laser teeth whitening, and complete composite smile rejuvenations with 13+ years practice.',
    rating: 4.8,
    availability: {
      Monday: ['11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      Tuesday: ['11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      Wednesday: ['11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      Thursday: ['11:00', '12:00', '14:00', '15:00', '16:00'],
      Friday: ['11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
      Saturday: ['09:00', '10:00', '11:00', '14:00', '15:00'],
      Sunday: []
    }
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'pat-101',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91 98201-11223',
    medicalHistory: 'Class II malocclusion, ongoing clear aligner therapy. No known drug allergies.',
    createdAt: '2026-06-10T10:30:00Z'
  },
  {
    id: 'pat-102',
    name: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    phone: '+91 98112-33445',
    medicalHistory: 'Lower right first molar (46) pulpitis; completed single-visit RCT, pending Zirconia crown.',
    createdAt: '2026-06-18T14:15:00Z'
  },
  {
    id: 'pat-103',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@example.com',
    phone: '+91 98334-55667',
    medicalHistory: 'Completed 60-min in-office laser whitening. Enamel healthy, mild temporary sensitivity.',
    createdAt: '2026-07-02T11:00:00Z'
  },
  {
    id: 'pat-104',
    name: 'Rohan Verma',
    email: 'rohan.v@example.com',
    phone: '+91 98776-88990',
    medicalHistory: 'Upper premolar missing tooth (14). Straumann SLA titanium implant placed with guided stent.',
    createdAt: '2026-07-12T09:45:00Z'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'appt-201',
    patientId: 'pat-101',
    patientName: 'Priya Sharma',
    patientPhone: '+91 98201-11223',
    patientEmail: 'priya.sharma@example.com',
    doctorId: 'doc-2',
    doctorName: 'Dr. Sameer Sharma',
    treatmentName: 'Orthodontic Braces',
    scheduledAt: `${new Date().toISOString().split('T')[0]}T10:00:00`,
    status: 'Confirmed',
    notes: 'Tray #12 progress evaluation and refinement scan.',
    price: 80000,
    createdAt: '2026-08-10T10:00:00Z'
  },
  {
    id: 'appt-202',
    patientId: 'pat-102',
    patientName: 'Vikram Malhotra',
    patientPhone: '+91 98112-33445',
    patientEmail: 'vikram.m@example.com',
    doctorId: 'doc-3',
    doctorName: 'Dr. Tanvi Desai',
    treatmentName: 'Root Canal Therapy',
    scheduledAt: `${new Date().toISOString().split('T')[0]}T11:30:00`,
    status: 'Confirmed',
    notes: 'Tooth #46 core buildup and digital impression.',
    price: 12000,
    createdAt: '2026-08-11T12:00:00Z'
  },
  {
    id: 'appt-203',
    patientId: 'pat-103',
    patientName: 'Ananya Iyer',
    patientPhone: '+91 98334-55667',
    patientEmail: 'ananya.iyer@example.com',
    doctorId: 'doc-4',
    doctorName: 'Dr. Kiran Verma',
    treatmentName: 'Teeth Whitening',
    scheduledAt: `${new Date().toISOString().split('T')[0]}T15:00:00`,
    status: 'Completed',
    notes: 'Completed in-office laser whitening session.',
    price: 8000,
    createdAt: '2026-08-12T09:30:00Z'
  },
  {
    id: 'appt-204',
    patientId: 'pat-104',
    patientName: 'Rohan Verma',
    patientPhone: '+91 98776-88990',
    patientEmail: 'rohan.v@example.com',
    doctorId: 'doc-1',
    doctorName: 'Dr. Nitin Gupta',
    treatmentName: 'Dental Implants',
    scheduledAt: `${new Date().toISOString().split('T')[0]}T16:30:00`,
    status: 'Pending',
    notes: 'Post-op osseointegration assessment at 8 weeks.',
    price: 65000,
    createdAt: '2026-08-14T15:00:00Z'
  },
  {
    id: 'appt-205',
    patientId: 'pat-101',
    patientName: 'Priya Sharma',
    patientPhone: '+91 98201-11223',
    patientEmail: 'priya.sharma@example.com',
    doctorId: 'doc-2',
    doctorName: 'Dr. Sameer Sharma',
    treatmentName: 'Routine Clean & Check',
    scheduledAt: '2026-08-01T10:00:00',
    status: 'Completed',
    notes: 'Full mouth ultrasonic scaling and fluoride varnish.',
    price: 1500,
    createdAt: '2026-07-28T10:00:00Z'
  }
];

export const mockStaff: Staff[] = [
  { id: 'st-1', name: 'Sunita Kapoor', role: 'Receptionist', email: 'sunita@dentalflow.com', phone: '+91 98200-11001' },
  { id: 'st-2', name: 'Rajesh Mehra', role: 'Admin', email: 'admin@dentalflow.com', phone: '+91 98200-11002' },
  { id: 'st-3', name: 'Pooja Nair', role: 'Assistant', email: 'pooja@dentalflow.com', phone: '+91 98200-11003' }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    patientId: 'pat-104',
    patientName: 'Rohan Verma',
    doctorId: 'doc-1',
    doctorName: 'Dr. Nitin Gupta',
    rating: 5,
    comment: 'Got my dental implant placed by Dr. Nitin Gupta. The 3D scan and guided surgery made the entire procedure 100% painless. Highly recommend DentalFlow AI!',
    aiResponse: 'Dear Rohan, thank you for sharing your experience! We are delighted that your guided implant procedure with Dr. Nitin was comfortable and seamless.',
    createdAt: '2026-08-15T14:20:00Z'
  },
  {
    id: 'rev-2',
    patientId: 'pat-101',
    patientName: 'Priya Sharma',
    doctorId: 'doc-2',
    doctorName: 'Dr. Sameer Sharma',
    rating: 5,
    comment: 'Dr. Sameer is an absolute artist with Invisalign. The clinic ambiance on Golf Course Road feels like a 5-star hotel, and the 24/7 WhatsApp booking made scheduling effortless.',
    aiResponse: 'Thank you Priya! It has been an absolute pleasure managing your smile alignment journey with Dr. Sameer.',
    createdAt: '2026-08-16T09:40:00Z'
  },
  {
    id: 'rev-3',
    patientId: 'pat-103',
    patientName: 'Ananya Iyer',
    doctorId: 'doc-4',
    doctorName: 'Dr. Kiran Verma',
    rating: 5,
    comment: 'Laser teeth whitening here was fantastic. Walked out with a 6-shade brighter smile in exactly 45 minutes before my sister’s wedding!',
    aiResponse: 'Congratulations Ananya! We are so glad Dr. Kiran was able to give you a glowing, radiant smile for the celebrations.',
    createdAt: '2026-08-18T16:15:00Z'
  },
  {
    id: 'rev-4',
    patientId: 'pat-102',
    patientName: 'Vikram Malhotra',
    doctorId: 'doc-3',
    doctorName: 'Dr. Tanvi Desai',
    rating: 5,
    comment: 'I was terrified of root canals, but Dr. Tanvi used the surgical microscope and completed it in a single visit without any pain. True clinical excellence.',
    aiResponse: '',
    createdAt: '2026-08-19T11:00:00Z'
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'lead-301',
    name: 'Kabir Singhania',
    email: 'kabir.s@gmail.com',
    phone: '+91 98119-44556',
    source: 'WhatsApp',
    status: 'New Lead',
    aiScore: 9,
    aiNotes: 'AI Qualified: High urgency for full arch dental implants. Recommendation: Schedule immediate specialist consultation with Dr. Nitin.',
    message: 'I have 2 missing molar teeth on my upper right jaw and want permanent dental implants with 0% EMI financing.',
    createdAt: '2026-08-20T10:15:00Z'
  },
  {
    id: 'lead-302',
    name: 'Meenakshi Sundaram',
    email: 'meenakshi.s@outlook.com',
    phone: '+91 98205-66778',
    source: 'Website',
    status: 'Consultation',
    aiScore: 8,
    aiNotes: 'AI Qualified: Seeking Digital Smile Makeover for wedding in 2 months. High aesthetic priority.',
    message: 'Looking for porcelain veneers and teeth whitening package before October wedding.',
    createdAt: '2026-08-19T14:30:00Z'
  },
  {
    id: 'lead-303',
    name: 'Arjun Khanna',
    email: 'arjun.khanna@yahoo.com',
    phone: '+91 98711-22334',
    source: 'Google',
    status: 'Appointment',
    aiScore: 10,
    aiNotes: 'AI Qualified: Acute throbbing toothache with cold sensitivity. Emergency root canal required.',
    message: 'Severe tooth pain when drinking cold water or chewing. Need emergency root canal slot today.',
    createdAt: '2026-08-21T08:45:00Z'
  },
  {
    id: 'lead-304',
    name: 'Deepika Sen',
    email: 'deepika.sen@gmail.com',
    phone: '+91 98300-77889',
    source: 'Instagram',
    status: 'Treatment',
    aiScore: 8,
    aiNotes: 'AI Qualified: Clear aligner orthodontic inquiry for crowded lower teeth.',
    message: 'Interested in Invisalign clear aligners for crooked front teeth. How long does the treatment take?',
    createdAt: '2026-08-18T16:00:00Z'
  },
  {
    id: 'lead-305',
    name: 'Harsh Vardhan',
    email: 'harsh.v@gmail.com',
    phone: '+91 98188-99001',
    source: 'Website',
    status: 'Completed',
    aiScore: 7,
    aiNotes: 'AI Qualified: Routine maintenance and scaling.',
    message: 'Completed routine dental scaling and polishing checkup.',
    createdAt: '2026-08-15T11:20:00Z'
  },
  {
    id: 'lead-306',
    name: 'Sneha Chawla',
    email: 'sneha.c@gmail.com',
    phone: '+91 98101-55443',
    source: 'Referral',
    status: 'Recall',
    aiScore: 6,
    aiNotes: 'AI Qualified: 6-month preventive hygiene recall scheduled.',
    message: '6-month preventive hygiene recall checkup.',
    createdAt: '2026-08-10T12:00:00Z'
  }
];
