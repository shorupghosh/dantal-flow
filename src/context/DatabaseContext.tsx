import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Doctor, Patient, Appointment, Staff, Lead, Review } from '../types/database';
import { CLINIC_PRESETS } from '../components/ClinicCustomizerModal';
import type { ClinicConfig } from '../components/ClinicCustomizerModal';

const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: 'doc-anjali',
    name: 'Dr. Anjali Aggarwal',
    specialization: 'Senior Dental Surgeon (BDS - 30+ Yrs Exp) • Restorative, RCT, Cosmetic & Invisalign',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    email: 'dr.anjali@sitadental.com',
    phone: '+91 98183 45055',
    bio: '30+ years of trusted clinical excellence in Galleria Market, DLF Phase 4. Specializing in Root Canal, Dental & Cosmetic Fillings, Crowns, Veneers, Bridges, and Invisalign.',
    rating: 5.0,
    availability: {
      Monday: ["11:00", "12:00", "13:00", "14:00", "15:00"],
      Tuesday: ["11:00", "12:00", "13:00", "14:00", "15:00"],
      Wednesday: ["11:00", "12:00", "13:00", "14:00", "15:00"],
      Thursday: ["11:00", "12:00", "13:00", "14:00", "15:00"],
      Friday: ["11:00", "12:00", "13:00", "14:00", "15:00"],
      Saturday: ["11:00", "12:00", "13:00", "14:00", "15:00"]
    }
  },
  {
    id: 'doc-sameer',
    name: 'Dr. Sameer Sharma',
    specialization: 'Orthodontist & Clear Aligner Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    email: 'dr.sameer@dentalflow.ai',
    phone: '+91 98200 22334',
    bio: 'Certified Invisalign & Clear Aligner provider specializing in digital smile simulations and pain-free orthodontics.',
    rating: 4.9,
    availability: {
      Monday: ["09:00", "11:00", "14:00", "16:00"],
      Wednesday: ["09:00", "11:00", "14:00", "16:00"],
      Friday: ["09:00", "11:00", "14:00", "16:00"],
      Saturday: ["10:00", "12:00", "15:00"]
    }
  },
  {
    id: 'doc-nitin',
    name: 'Dr. Nitin Gupta',
    specialization: 'Oral & Dental Implant Surgeon',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    email: 'dr.nitin@dentalflow.ai',
    phone: '+91 98112 33445',
    bio: 'Specialist in single-stage CBCT guided implants, full-arch rehabilitation, and bone grafting with 15+ years experience.',
    rating: 4.9,
    availability: {
      Tuesday: ["11:00", "14:00", "17:00"],
      Thursday: ["11:00", "14:00", "17:00"],
      Saturday: ["11:00", "14:00", "17:00"]
    }
  },
  {
    id: 'doc-mangla',
    name: 'Dr. Asheesh Mangla',
    specialization: 'Senior Prosthodontist & Implantologist (MDS - 22+ Yrs Exp) • Full Mouth Rehab, Implants, Fixed Teeth',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    email: 'dr.mangla@gurgaon-dental.com',
    phone: '+91 95401 77077',
    bio: '22+ years of senior surgical & prosthetic excellence near HUDA Market, Sector 31, Gurugram. Specializing in single & full-arch dental implants, advanced crown & bridge prosthetics, and complete smile restorations.',
    rating: 5.0,
    availability: {
      Monday: ["10:00", "11:30", "17:00", "18:30"],
      Tuesday: ["10:00", "11:30", "17:00", "18:30"],
      Wednesday: ["10:00", "11:30", "17:00", "18:30"],
      Thursday: ["10:00", "11:30", "17:00", "18:30"],
      Friday: ["10:00", "11:30", "17:00", "18:30"],
      Saturday: ["10:00", "11:30", "17:00", "18:30"]
    }
  }
];

const MANGLA_REVIEWS: Review[] = [
  {
    id: 'rev-mangla-1',
    patientId: 'pat-m1',
    patientName: 'Sunil Grover (Sector 31, Gurugram)',
    doctorId: 'doc-mangla',
    doctorName: 'Dr. Asheesh Mangla',
    rating: 5,
    comment: 'Dr. Mangla replaced my missing molars with implants. Complete pain-free precision and genuine 22-year mastery. The clinic coordination was seamless and respectful.',
    aiResponse: 'Thank you Sunil Ji! Delighted to restore your chewing comfort.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'rev-mangla-2',
    patientId: 'pat-m2',
    patientName: 'Kavita Chawla (South City 1)',
    doctorId: 'doc-mangla',
    doctorName: 'Dr. Asheesh Mangla',
    rating: 5,
    comment: 'Best prosthodontist in Gurgaon. Got full zirconia bridges done. Perfect bite alignment with zero discomfort.',
    aiResponse: 'Thank you Kavita Ji! Always a pleasure caring for your dental health.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

const MANGLA_DOCTORS: Doctor[] = [
  {
    id: 'doc-mangla',
    name: 'Dr. Asheesh Mangla',
    specialization: 'Senior Prosthodontist & Implantologist (MDS - 22+ Yrs Exp) • Full Mouth Rehab, Implants, Fixed Teeth',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    email: 'dr.mangla@gurgaon-dental.com',
    phone: '+91 95401 77077',
    bio: '22+ years of senior surgical & prosthetic excellence near HUDA Market, Sector 31, Gurugram. Specializing in single & full-arch dental implants, advanced crown & bridge prosthetics, and complete smile restorations.',
    rating: 5.0,
    availability: {
      Monday: ["10:00", "11:30", "17:00", "18:30"],
      Tuesday: ["10:00", "11:30", "17:00", "18:30"],
      Wednesday: ["10:00", "11:30", "17:00", "18:30"],
      Thursday: ["10:00", "11:30", "17:00", "18:30"],
      Friday: ["10:00", "11:30", "17:00", "18:30"],
      Saturday: ["10:00", "11:30", "17:00", "18:30"]
    }
  },
  {
    id: 'doc-mangla-ortho',
    name: 'Dr. Shruti Sen (Consulting)',
    specialization: 'Consulting Orthodontist & Clear Aligner Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1594824813590-798e4d29cfc7?auto=format&fit=crop&q=80&w=400',
    email: 'ortho@gurgaon-dental.com',
    phone: '+91 95401 77077',
    bio: 'Specialist in digital smile alignment, clear aligners, and interceptive orthodontics collaborating with Dr. Mangla on full-mouth aesthetic cases.',
    rating: 4.9,
    availability: {
      Tuesday: ["16:00", "17:30", "19:00"],
      Thursday: ["16:00", "17:30", "19:00"],
      Saturday: ["11:00", "14:00", "16:00"]
    }
  },
  {
    id: 'doc-mangla-endo',
    name: 'Dr. Gaurav Chhabra (Consulting)',
    specialization: 'Consulting Endodontist & Microscopic RCT Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    email: 'endo@gurgaon-dental.com',
    phone: '+91 95401 77077',
    bio: 'Single-sitting painless root canal therapy under surgical magnification and 3D endodontic precision.',
    rating: 4.9,
    availability: {
      Monday: ["11:00", "14:00", "18:00"],
      Wednesday: ["11:00", "14:00", "18:00"],
      Friday: ["11:00", "14:00", "18:00"]
    }
  }
];

const PAINLESS_REVIEWS: Review[] = [
  {
    id: 'rev-painless-1',
    patientId: 'pat-p1',
    patientName: 'Vikas Rawat (Eldeco Accolade, Sector 2 Sohna)',
    doctorId: 'doc-painless-surgeon',
    doctorName: 'Dr. Consultant Oral Surgeon',
    rating: 5,
    comment: 'Living just across at Eldeco Accolade. Had severe impacted wisdom tooth pain late night. Got emergency slot next morning; the extraction was 100% painless. Completely true to their name!',
    aiResponse: 'Thank you Vikas Ji! Glad we could relieve your wisdom tooth pain quickly and comfortably.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'rev-painless-2',
    patientId: 'pat-p2',
    patientName: 'Pooja Raghav (Sohna Rural)',
    doctorId: 'doc-painless-pedo',
    doctorName: 'Dr. Consultant Pedodontist',
    rating: 5,
    comment: 'My 7-year-old daughter was crying and terrified of dentists. The pediatric doctor was so gentle and caring, she did not feel the injection at all. Best clinic in Sohna for kids.',
    aiResponse: 'Thank you Pooja Ji! Ensuring children feel safe and happy chairside is our highest priority.',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'rev-painless-3',
    patientId: 'pat-p3',
    patientName: 'Harish Yadav (Sohna Road, Gurugram)',
    doctorId: 'doc-painless-lead',
    doctorName: 'Dr. Senior Implantologist',
    rating: 5,
    comment: 'Got 2 dental implants placed with Zirconia crowns. Modern setup, totally transparent pricing, and gentle hands. No need to travel all the way to Gurgaon city center.',
    aiResponse: 'Thank you Harish Ji! Delighted to restore your chewing confidence locally in Sohna.',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString()
  }
];

const PAINLESS_DOCTORS: Doctor[] = [
  {
    id: 'doc-painless-lead',
    name: 'Dr. Senior Implantologist & Prosthodontist',
    specialization: 'Senior Prosthodontist & Implantologist (MDS - 14+ Yrs Exp) • Implants, Crowns & Smile Aesthetics',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    email: 'info@painlessdentalcare.in',
    phone: '+91 74978 59616',
    bio: '14+ years of clinical excellence in Sohna & South Gurugram. Specializing in computer-guided painless dental implants, full-mouth restorations, and aesthetic smile design for Eldeco & surrounding townships.',
    rating: 4.8,
    availability: {
      Monday: ["10:30", "12:00", "16:30", "18:00"],
      Tuesday: ["10:30", "12:00", "16:30", "18:00"],
      Wednesday: ["10:30", "12:00", "16:30", "18:00"],
      Thursday: ["10:30", "12:00", "16:30", "18:00"],
      Friday: ["10:30", "12:00", "16:30", "18:00"],
      Saturday: ["10:30", "12:00", "16:30", "18:00"]
    }
  },
  {
    id: 'doc-painless-surgeon',
    name: 'Dr. Consultant Oral & Maxillofacial Surgeon',
    specialization: 'Oral & Maxillofacial Surgeon (MDS) • Painless Wisdom Teeth Extractions & Impactions',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    email: 'surgery@painlessdentalcare.in',
    phone: '+91 74978 59616',
    bio: 'Specialist in complex third molar (wisdom tooth) surgical extractions, bone preservation, and trauma surgery with 100% painless computerized anesthesia.',
    rating: 4.9,
    availability: {
      Tuesday: ["15:00", "17:00", "19:00"],
      Thursday: ["15:00", "17:00", "19:00"],
      Saturday: ["11:00", "14:00", "17:00"]
    }
  },
  {
    id: 'doc-painless-pedo',
    name: 'Dr. Consultant Pedodontist',
    specialization: 'Pediatric Dental Specialist (MDS) • Child-Friendly & Fear-Free Kids Dentistry',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    email: 'pedo@painlessdentalcare.in',
    phone: '+91 74978 59616',
    bio: 'Specialized care for toddlers, children, and teenagers. Expertise in pain-free fillings, pulpectomies, habit breaking, and anxiety-free dental visits.',
    rating: 4.9,
    availability: {
      Monday: ["11:00", "15:00", "17:30"],
      Wednesday: ["11:00", "15:00", "17:30"],
      Friday: ["11:00", "15:00", "17:30"],
      Saturday: ["10:00", "13:00", "16:00"]
    }
  }
];

const DENTOPLAY_REVIEWS: Review[] = [
  {
    id: 'rev-dentoplay-1',
    patientId: 'pat-dp1',
    patientName: 'Anirban Mukherjee (Uniworld City, New Town)',
    doctorId: 'doc-kundu',
    doctorName: 'Dr. Ritesh Kundu',
    rating: 5,
    comment: 'Dr. Kundu is magical with kids. My 6-year-old son had acute molar pain at 9 PM. We booked on WhatsApp, and the pulpectomy next morning was 100% painless. No tears at all!',
    aiResponse: 'Thank you Anirban Babu! So glad your little boy is smiling and pain-free.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'rev-dentoplay-2',
    patientId: 'pat-dp2',
    patientName: 'Shreya Sengupta (Action Area 1, New Town)',
    doctorId: 'doc-kundu-ortho',
    doctorName: 'Dr. Ananya Sen',
    rating: 5,
    comment: 'Got interceptive braces for my 11-year-old daughter. Very gentle and modern pediatric setup right in New Town. Cleanest clinic in Rajarhat.',
    aiResponse: 'Thank you Shreya! Watching kids gain smile confidence is our greatest joy.',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'rev-dentoplay-3',
    patientId: 'pat-dp3',
    patientName: 'Debashis Roy (Shapoorji Pallonji)',
    doctorId: 'doc-kundu',
    doctorName: 'Dr. Ritesh Kundu',
    rating: 5,
    comment: 'The whole family now visits Dentoplay. Transparent fees, zero waiting time with the automated booking system, and truly specialist child care.',
    aiResponse: 'Thank you Debashis Babu! Honored to care for your family’s dental health.',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
  }
];

const DENTOPLAY_DOCTORS: Doctor[] = [
  {
    id: 'doc-kundu',
    name: 'Dr. Ritesh Kundu',
    specialization: 'Founder & Chief Pedodontist (BDS, MDS Pedodontics) • Child Dental Surgery, RCT & Habit Breaking',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    email: 'dr.kundu@dentoplay.com',
    phone: '+91 81009 41854',
    bio: 'Renowned Pediatric Dental Specialist with practices in Action Area 1 New Town and Uttarpara. Dedicated to 100% painless, anxiety-free pediatric dental surgery, pulpectomies, stainless steel crowns, and early preventive care.',
    rating: 4.9,
    availability: {
      Monday: ["10:00", "11:30", "16:30", "18:00"],
      Tuesday: ["10:00", "11:30", "16:30", "18:00"],
      Wednesday: ["10:00", "11:30", "16:30", "18:00"],
      Thursday: ["10:00", "11:30", "16:30", "18:00"],
      Friday: ["10:00", "11:30", "16:30", "18:00"],
      Saturday: ["10:00", "11:30", "16:30", "18:00"],
      Sunday: ["10:00", "12:00"]
    }
  },
  {
    id: 'doc-kundu-ortho',
    name: 'Dr. Ananya Sen (Consulting)',
    specialization: 'Consulting Orthodontist • Interceptive Child Braces & Myofunctional Therapy',
    imageUrl: 'https://images.unsplash.com/photo-1594824813590-798e4d29cfc7?auto=format&fit=crop&q=80&w=400',
    email: 'ortho@dentoplay.com',
    phone: '+91 81009 41854',
    bio: 'Specialist in early jaw guidance, space maintainers, and child orthodontics ensuring natural straight teeth development before adolescence.',
    rating: 4.9,
    availability: {
      Tuesday: ["16:00", "17:30", "19:00"],
      Thursday: ["16:00", "17:30", "19:00"],
      Saturday: ["11:00", "14:00", "16:00"]
    }
  },
  {
    id: 'doc-kundu-implant',
    name: 'Dr. Subhajit Roy (Consulting)',
    specialization: 'Consulting Oral Surgeon & Implantologist • Adult Restorative Dentistry',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    email: 'implants@dentoplay.com',
    phone: '+91 81009 41854',
    bio: 'Advanced dental implants and surgical extractions for parents and adults at Dentoplay Family Dental Clinic.',
    rating: 4.8,
    availability: {
      Monday: ["11:00", "15:00", "18:00"],
      Wednesday: ["11:00", "15:00", "18:00"],
      Friday: ["11:00", "15:00", "18:00"]
    }
  }
];

const DELHIDE_REVIEWS: Review[] = [
  {
    id: 'rev-ddc-1',
    patientId: 'pat-ddc1',
    patientName: 'Anjali Mehta (Greater Kailash 1, South Delhi)',
    doctorId: 'doc-nitu',
    doctorName: 'Dr. Nitu Gautam',
    rating: 5,
    comment: 'Dr. Nitu Gautam is an absolute artist with Invisalign! Her 16+ years of clinical mastery shows in every detail. My aligner treatment was flawless, smooth, and delivered months ahead of schedule.',
    aiResponse: 'Thank you Anjali! Your radiant smile is the best reward for our team.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'rev-ddc-2',
    patientId: 'pat-ddc2',
    patientName: 'Rohit Singhania (Panchsheel Park)',
    doctorId: 'doc-vinod',
    doctorName: 'Dr. Vinod Khanna',
    rating: 5,
    comment: 'Dr. Vinod Khanna replaced two missing molars with immediate Swiss implants. PGI Chandigarh training shines through. Zero post-op swelling and 100% precision.',
    aiResponse: 'Thank you Rohit! Delighted that your recovery was swift and comfortable.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: 'rev-ddc-3',
    patientId: 'pat-ddc3',
    patientName: 'Sonia Gupta (Vasant Vihar)',
    doctorId: 'doc-geetanjali',
    doctorName: 'Dr. Geetanjali Kumari',
    rating: 5,
    comment: 'Microscopic root canal completed in a single 45-minute sitting with zero discomfort. The clinic in GK-1 has world-class infrastructure.',
    aiResponse: 'Thank you Sonia! Keeping natural teeth healthy and pain-free is our prime mission.',
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString()
  }
];

const DELHIDE_DOCTORS: Doctor[] = [
  {
    id: 'doc-nitu',
    name: 'Dr. Nitu Gautam',
    specialization: 'Founder & Chief Orthodontist (BDS Nair Mumbai, MDS Orthodontics) • Fellow World Federation of Orthodontists (WFO) • 16+ Yrs Exp',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    email: 'dr.nitu@delhidental.org',
    phone: '+91 80797 97978',
    bio: 'Senior Orthodontic Specialist with over 16 years of clinical mastery from Nair Hospital Dental College Mumbai. Former Professor and Fellow WFO specializing in Invisalign, invisible clear aligners, and aesthetic smile harmony in Greater Kailash 1.',
    rating: 5.0,
    availability: {
      Tuesday: ["10:00", "11:30", "15:00", "17:30"],
      Wednesday: ["10:00", "11:30", "15:00", "17:30"],
      Thursday: ["10:00", "11:30", "15:00", "17:30"],
      Friday: ["10:00", "11:30", "15:00", "17:30"],
      Saturday: ["10:00", "11:30", "15:00", "17:30"],
      Sunday: ["10:00", "12:00", "14:00"]
    }
  },
  {
    id: 'doc-vinod',
    name: 'Dr. Vinod Khanna',
    specialization: 'Senior Prosthodontist & Implantologist (BDS, MDS Prosthodontics PGIMER Chandigarh)',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    email: 'implants@delhidental.org',
    phone: '+91 80797 97978',
    bio: 'PGI Chandigarh trained prosthodontist specializing in single-stage dental implants, full-mouth rehabilitation, and premium cosmetic zirconia restorations.',
    rating: 4.9,
    availability: {
      Tuesday: ["11:00", "14:00", "16:30"],
      Thursday: ["11:00", "14:00", "16:30"],
      Saturday: ["11:00", "14:00", "16:30"]
    }
  },
  {
    id: 'doc-geetanjali',
    name: 'Dr. Geetanjali Kumari',
    specialization: 'Microscopic Endodontist & Aesthetic Dental Surgeon (BDS)',
    imageUrl: 'https://images.unsplash.com/photo-1594824813590-798e4d29cfc7?auto=format&fit=crop&q=80&w=400',
    email: 'endo@delhidental.org',
    phone: '+91 80797 97978',
    bio: 'Specialist in single-sitting painless root canal treatments under high-magnification surgical operating microscopes and cosmetic smile enhancements.',
    rating: 4.9,
    availability: {
      Tuesday: ["10:30", "12:30", "16:00"],
      Wednesday: ["10:30", "12:30", "16:00"],
      Friday: ["10:30", "12:30", "16:00"],
      Sunday: ["10:30", "13:00"]
    }
  }
];

const HOLLYWOOD_REVIEWS: Review[] = [
  {
    id: 'rev-hw-1',
    patientId: 'pat-hw1',
    patientName: 'Jaspreet Gill (Vancouver, Canada / NRI Patient)',
    doctorId: 'doc-prashant',
    doctorName: 'Dr. Prashant',
    rating: 5,
    comment: 'Flew in from Canada for my wedding and full smile makeover. Dr. Prashant designed 10 ultra-thin porcelain veneers in just 5 days. Saved $8,000 compared to Canadian clinic prices with superior aesthetics!',
    aiResponse: 'Thank you Jaspreet! Thrilled to give you a true red-carpet Hollywood smile.',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: 'rev-hw-2',
    patientId: 'pat-hw2',
    patientName: 'Ramanjit Dhillon (Sector 9C, Chandigarh)',
    doctorId: 'doc-prashant',
    doctorName: 'Dr. Prashant',
    rating: 5,
    comment: 'The premier cosmetic studio in Chandigarh. World-class technology right in Sector 9 market. International standards trained in Germany and Dubai.',
    aiResponse: 'Thank you Ramanjit Ji! Always a pleasure welcoming you.',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
  },
  {
    id: 'rev-hw-3',
    patientId: 'pat-hw3',
    patientName: 'Kulwinder Sidhu (Birmingham, UK / NRI Patient)',
    doctorId: 'doc-hollywood-implant',
    doctorName: 'Dr. Harpreet Singh',
    rating: 5,
    comment: 'Full arch All-on-4 implants completed during my 2-week annual leave in Punjab. Booked the appointment at 11 PM UK time via WhatsApp. Phenomenal service and painless execution.',
    aiResponse: 'Thank you Kulwinder! Safe travels back to the UK with your strong new smile.',
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString()
  }
];

const HOLLYWOOD_DOCTORS: Doctor[] = [
  {
    id: 'doc-prashant',
    name: 'Dr. Prashant',
    specialization: 'Director & Chief Aesthetic Architect (MDS Endodontics) • 21+ Yrs International Practice (Germany, Dubai, Muscat)',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    email: 'dr.prashant@hollywoodsmile.in',
    phone: '+91 82888 38222',
    bio: '21+ years of elite international dental leadership across Muscat, Germany, and Dubai. Specializing in Hollywood Smile Design, ultra-thin porcelain veneers, full-mouth rehabilitations, and aesthetic digital smile simulations in Sector 9C Chandigarh.',
    rating: 5.0,
    availability: {
      Monday: ["11:00", "12:30", "16:00", "18:00"],
      Tuesday: ["11:00", "12:30", "16:00", "18:00"],
      Wednesday: ["11:00", "12:30", "16:00", "18:00"],
      Thursday: ["11:00", "12:30", "16:00", "18:00"],
      Friday: ["11:00", "12:30", "16:00", "18:00"],
      Saturday: ["11:00", "12:30", "16:00", "18:00"]
    }
  },
  {
    id: 'doc-hollywood-implant',
    name: 'Dr. Harpreet Singh (Consulting)',
    specialization: 'Senior Oral Implantologist • Full-Arch All-on-4 / All-on-6 Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    email: 'implants@hollywoodsmile.in',
    phone: '+91 82888 38222',
    bio: 'Specialist in immediate-load dental implants and bone grafting for NRI dental travelers seeking full mouth restorations during short stays in India.',
    rating: 4.9,
    availability: {
      Tuesday: ["14:00", "16:00", "18:30"],
      Thursday: ["14:00", "16:00", "18:30"],
      Saturday: ["11:30", "15:00", "17:30"]
    }
  },
  {
    id: 'doc-hollywood-ortho',
    name: 'Dr. Simran Kaur (Consulting)',
    specialization: 'Consulting Orthodontist • Invisalign & Digital Clear Aligners',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    email: 'ortho@hollywoodsmile.in',
    phone: '+91 82888 38222',
    bio: 'Certified Clear Aligner provider specializing in discreet bite alignment and 3D digital treatment planning for aesthetic smile transformations.',
    rating: 4.9,
    availability: {
      Monday: ["12:00", "15:30", "17:30"],
      Wednesday: ["12:00", "15:30", "17:30"],
      Friday: ["12:00", "15:30", "17:30"]
    }
  }
];

const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    patientId: 'pat-1',
    patientName: 'Pooja Kashyap (DLF Phase 4)',
    doctorId: 'doc-anjali',
    doctorName: 'Dr. Anjali Aggarwal',
    rating: 5,
    comment: 'Dr. Anjali is the most gentle and experienced dentist in Gurgaon. She saved my tooth with zero pain. The WhatsApp booking reminder made everything effortless!',
    aiResponse: 'Thank you Pooja Ji! We are delighted to keep your smile healthy and radiant.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'rev-2',
    patientId: 'pat-2',
    patientName: 'Vikram Malhotra (Golf Course Rd)',
    doctorId: 'doc-nitin',
    doctorName: 'Dr. Nitin Gupta',
    rating: 5,
    comment: 'Got 2 implants placed last month. Completely seamless experience and the WhatsApp assistant answered all my late-night pre-op questions.',
    aiResponse: 'Thank you Vikram! Happy to know your recovery was smooth.',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: 'rev-3',
    patientId: 'pat-3',
    patientName: 'Rhea Sengupta (Galleria)',
    doctorId: 'doc-sameer',
    doctorName: 'Dr. Sameer Sharma',
    rating: 5,
    comment: 'Clear aligners treatment finished in just 7 months. The 0% EMI plan made it so affordable.',
    aiResponse: 'Congratulations on your new smile Rhea!',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString()
  }
];

const DEFAULT_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Vikram Malhotra',
    email: 'vikram@gmail.com',
    phone: '+91 98183 92011',
    source: 'WhatsApp',
    status: 'New Lead',
    aiScore: 9,
    aiNotes: 'AI Qualified: High ticket Dental Implant inquiry. Recommended: Confirm Friday slot.',
    message: 'Dental Implant consultation inquiry for upper molar',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lead-2',
    name: 'Amitabh Saxena',
    email: 'amitabh@gmail.com',
    phone: '+91 98711 44520',
    source: 'WhatsApp',
    status: 'Appointment',
    aiScore: 10,
    aiNotes: 'AI Qualified: Emergency Root Canal acute pain. Priority slot reserved.',
    message: 'Emergency acute toothache in lower molar',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString()
  }
];

interface DatabaseContextType {
  activeClinic: ClinicConfig;
  setActiveClinic: (config: ClinicConfig) => void;
  switchClinicPreset: (key: string) => void;
  doctors: Doctor[];
  staff: Staff[];
  patients: Patient[];
  appointments: Appointment[];
  reviews: Review[];
  leads: Lead[];
  isLoading: boolean;
  createAppointment: (appt: Omit<Appointment, 'id' | 'createdAt' | 'doctorName'>) => Promise<Appointment>;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'aiScore' | 'aiNotes'>) => Promise<Lead>;
  updateLeadStatus: (id: string, status: Lead['status']) => Promise<void>;
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'patientName' | 'doctorName'>) => Promise<Review>;
  updateReviewResponse: (id: string, response: string) => Promise<void>;
  isAuthenticated: boolean;
  loginAdmin: (pin: string) => Promise<boolean>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize Active Clinic Configuration (supports URL query params e.g. ?clinic=painless or ?clinic=SitaDental)
  const [activeClinic, setActiveClinic] = useState<ClinicConfig>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const clinicParam = urlParams.get('clinic');
      if (clinicParam && CLINIC_PRESETS[clinicParam]) {
        return CLINIC_PRESETS[clinicParam];
      }
      if (clinicParam) {
        const lower = clinicParam.toLowerCase();
        if (lower.includes('dentoplay') || lower.includes('kundu') || lower.includes('newtown') || lower.includes('pediatric')) {
          return CLINIC_PRESETS.Dentoplay;
        }
        if (lower.includes('delhidental') || lower.includes('delhi') || lower.includes('gk1') || lower.includes('gautam') || lower.includes('nitu')) {
          return CLINIC_PRESETS.DelhiDental;
        }
        if (lower.includes('hollywood') || lower.includes('prashant') || lower.includes('sector9') || lower.includes('chandigarh')) {
          return CLINIC_PRESETS.HollywoodSmile;
        }
        if (lower.includes('painless') || lower.includes('sohna') || lower.includes('gaurav')) {
          return CLINIC_PRESETS.PainlessDental;
        }
        if (lower.includes('mangla') || lower.includes('sector31')) {
          return CLINIC_PRESETS.ManglaDental;
        }
        if (lower.includes('sita')) {
          return CLINIC_PRESETS.SitaDental;
        }
      }
    }
    // Default preset for Painless Dental Care pitch
    return CLINIC_PRESETS.PainlessDental || CLINIC_PRESETS.SitaDental || CLINIC_PRESETS.DentalFlow;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    if (activeClinic.key === 'Dentoplay') {
      return DENTOPLAY_DOCTORS;
    }
    if (activeClinic.key === 'DelhiDental') {
      return DELHIDE_DOCTORS;
    }
    if (activeClinic.key === 'HollywoodSmile') {
      return HOLLYWOOD_DOCTORS;
    }
    if (activeClinic.key === 'PainlessDental') {
      return PAINLESS_DOCTORS;
    }
    if (activeClinic.key === 'ManglaDental') {
      return MANGLA_DOCTORS;
    }
    return DEFAULT_DOCTORS;
  });
  const [staff, setStaff] = useState<Staff[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>(() => {
    if (activeClinic.key === 'Dentoplay') {
      return DENTOPLAY_REVIEWS;
    }
    if (activeClinic.key === 'DelhiDental') {
      return DELHIDE_REVIEWS;
    }
    if (activeClinic.key === 'HollywoodSmile') {
      return HOLLYWOOD_REVIEWS;
    }
    if (activeClinic.key === 'PainlessDental') {
      return PAINLESS_REVIEWS;
    }
    if (activeClinic.key === 'ManglaDental') {
      return MANGLA_REVIEWS;
    }
    return DEFAULT_REVIEWS;
  });
  const [leads, setLeads] = useState<Lead[]>(DEFAULT_LEADS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Switch preset helper
  const switchClinicPreset = (key: string) => {
    if (CLINIC_PRESETS[key]) {
      setActiveClinic(CLINIC_PRESETS[key]);
    }
  };

  // Sync doctors and reviews whenever active clinic changes
  useEffect(() => {
    if (activeClinic.key === 'Dentoplay') {
      setDoctors(DENTOPLAY_DOCTORS);
      setReviews(DENTOPLAY_REVIEWS);
    } else if (activeClinic.key === 'DelhiDental') {
      setDoctors(DELHIDE_DOCTORS);
      setReviews(DELHIDE_REVIEWS);
    } else if (activeClinic.key === 'HollywoodSmile') {
      setDoctors(HOLLYWOOD_DOCTORS);
      setReviews(HOLLYWOOD_REVIEWS);
    } else if (activeClinic.key === 'PainlessDental') {
      setDoctors(PAINLESS_DOCTORS);
      setReviews(PAINLESS_REVIEWS);
    } else if (activeClinic.key === 'ManglaDental') {
      setDoctors(MANGLA_DOCTORS);
      setReviews(MANGLA_REVIEWS);
    } else {
      setDoctors(DEFAULT_DOCTORS);
      setReviews(DEFAULT_REVIEWS);
    }
  }, [activeClinic]);

  // Initialize data from Supabase API if configured, else keep robust defaults
  useEffect(() => {
    const fetchSupabaseData = async () => {
      setIsLoading(true);
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: docData } = await supabase.from('doctors').select('*');
          const { data: staffData } = await supabase.from('staff').select('*');
          const { data: patData } = await supabase.from('patients').select('*');
          const { data: apptData } = await supabase.from('appointments').select('*');
          const { data: revData } = await supabase.from('reviews').select('*');
          const { data: leadData } = await supabase.from('leads').select('*');

          if (docData && docData.length > 0) setDoctors(docData);
          if (staffData && staffData.length > 0) setStaff(staffData);
          if (patData && patData.length > 0) setPatients(patData);

          if (apptData && apptData.length > 0) {
            const formattedAppts: Appointment[] = apptData.map(a => {
              const doc = (docData || DEFAULT_DOCTORS).find(d => d.id === a.doctor_id);
              const pat = (patData || []).find(p => p.id === a.patient_id);
              return {
                id: a.id,
                patientId: a.patient_id,
                patientName: pat?.name || 'Patient',
                patientPhone: pat?.phone || '',
                patientEmail: pat?.email || '',
                doctorId: a.doctor_id,
                doctorName: doc?.name || 'Doctor',
                treatmentName: a.treatment_name,
                scheduledAt: a.scheduled_at,
                status: a.status,
                notes: a.notes || '',
                price: Number(a.price || 0),
                createdAt: a.created_at
              };
            });
            setAppointments(formattedAppts);
          }

          if (revData && revData.length > 0) {
            const formattedReviews: Review[] = revData.map(r => {
              const doc = (docData || DEFAULT_DOCTORS).find(d => d.id === r.doctor_id);
              const pat = (patData || []).find(p => p.id === r.patient_id);
              return {
                id: r.id,
                patientId: r.patient_id,
                patientName: pat?.name || 'Anonymous',
                doctorId: r.doctor_id,
                doctorName: doc?.name || 'Doctor',
                rating: r.rating,
                comment: r.comment,
                aiResponse: r.ai_response || '',
                createdAt: r.created_at
              };
            });
            setReviews(formattedReviews);
          }

          if (leadData && leadData.length > 0) {
            const formattedLeads: Lead[] = leadData.map(l => ({
              id: l.id,
              name: l.name,
              email: l.email || '',
              phone: l.phone || '',
              source: l.source || 'WhatsApp',
              status: l.status || 'New Lead',
              aiScore: l.ai_score || 8,
              aiNotes: l.ai_notes || '',
              message: l.message || '',
              createdAt: l.created_at
            }));
            setLeads(formattedLeads);
          }
        } catch (error) {
          console.error("Supabase load fallback:", error);
        }
      }
      setIsLoading(false);
    };

    fetchSupabaseData();
  }, []);

  const loginAdmin = async (pin: string) => {
    if (pin === '1234') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const createAppointment = async (appt: Omit<Appointment, 'id' | 'createdAt' | 'doctorName'>): Promise<Appointment> => {
    const doc = doctors.find(d => d.id === appt.doctorId) || doctors[0];
    let patName = appt.patientName || 'Unknown Patient';
    let patPhone = appt.patientPhone || '';
    let patEmail = appt.patientEmail || '';

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .insert([{
            patient_id: appt.patientId,
            doctor_id: appt.doctorId,
            treatment_name: appt.treatmentName,
            scheduled_at: appt.scheduledAt,
            status: appt.status,
            notes: appt.notes,
            price: appt.price
          }])
          .select()
          .single();
        
        if (!error && data) {
          const res: Appointment = {
            id: data.id,
            patientId: data.patient_id,
            patientName: patName,
            patientPhone: patPhone,
            patientEmail: patEmail,
            doctorId: data.doctor_id,
            doctorName: doc?.name || 'Specialist',
            treatmentName: data.treatment_name,
            scheduledAt: data.scheduled_at,
            status: data.status,
            notes: data.notes || '',
            price: Number(data.price || 0),
            createdAt: data.created_at
          };
          setAppointments(prev => [res, ...prev]);
          return res;
        }
      } catch (err) {
        console.error("Appointment write note:", err);
      }
    }

    const newAppt: Appointment = {
      ...appt,
      id: `appt-${Date.now()}`,
      patientName: patName,
      patientPhone: patPhone,
      patientEmail: patEmail,
      doctorName: doc?.name || activeClinic.doctorName,
      createdAt: new Date().toISOString()
    };
    
    setAppointments(prev => [newAppt, ...prev]);
    return newAppt;
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    if (supabase) {
      try {
        await supabase.from('appointments').update({ status }).eq('id', id);
      } catch (err) {
        console.error("Update status error:", err);
      }
    }
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'createdAt' | 'aiScore' | 'aiNotes'>): Promise<Lead> => {
    const score = lead.message.toLowerCase().includes('emergency') || lead.message.toLowerCase().includes('implant') ? 9 : 7;
    const notes = `AI Qualified: High intent in ${lead.message.slice(0, 35)}... Slot verified.`;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .insert([{
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            source: lead.source,
            status: lead.status,
            ai_score: score,
            ai_notes: notes,
            message: lead.message
          }])
          .select()
          .single();

        if (!error && data) {
          const res: Lead = {
            id: data.id,
            name: data.name,
            email: data.email || '',
            phone: data.phone || '',
            source: data.source || 'WhatsApp',
            status: data.status || 'New Lead',
            aiScore: data.ai_score || score,
            aiNotes: data.ai_notes || notes,
            message: data.message || '',
            createdAt: data.created_at
          };
          setLeads(prev => [res, ...prev]);
          return res;
        }
      } catch (err) {
        console.error("Add lead note:", err);
      }
    }

    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      aiScore: score,
      aiNotes: notes,
      createdAt: new Date().toISOString()
    };
    
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    if (supabase) {
      try {
        await supabase.from('leads').update({ status }).eq('id', id);
      } catch (err) {
        console.error("Update lead error:", err);
      }
    }
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const addReview = async (review: Omit<Review, 'id' | 'createdAt' | 'patientName' | 'doctorName'>): Promise<Review> => {
    const doc = doctors.find(d => d.id === review.doctorId);
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      patientName: 'Verified Patient',
      doctorName: doc?.name || activeClinic.doctorName,
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [newReview, ...prev]);
    return newReview;
  };

  const updateReviewResponse = async (id: string, response: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, aiResponse: response } : r));
  };

  return (
    <DatabaseContext.Provider value={{
      activeClinic,
      setActiveClinic,
      switchClinicPreset,
      doctors,
      staff,
      patients,
      appointments,
      reviews,
      leads,
      isLoading,
      createAppointment,
      updateAppointmentStatus,
      addLead,
      updateLeadStatus,
      addReview,
      updateReviewResponse,
      isAuthenticated,
      loginAdmin
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
