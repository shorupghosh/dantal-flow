import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Doctor, Patient, Appointment, Staff, Lead, Review } from '../types/database';
import { CLINIC_PRESETS } from '../components/ClinicCustomizerModal';
import type { ClinicConfig } from '../components/ClinicCustomizerModal';

const DEFAULT_DOCTORS: Doctor[] = [
  {
    id: 'doc-anjali',
    name: 'Dr. Anjali Aggarwal',
    specialization: 'Senior Dental Surgeon & Restorative Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    email: 'dr.anjali@sitadental.com',
    phone: '+91 98183 45055',
    bio: '30+ years of clinical excellence in cosmetic smile design, crowns, and advanced restorative dentistry in DLF Phase 4, Gurugram.',
    rating: 5.0,
    availability: {
      Monday: ["10:00", "11:30", "14:00", "16:30", "18:00"],
      Tuesday: ["10:00", "11:30", "14:00", "16:30", "18:00"],
      Wednesday: ["10:00", "11:30", "14:00", "16:30", "18:00"],
      Thursday: ["10:00", "11:30", "14:00", "16:30", "18:00"],
      Friday: ["10:00", "11:30", "14:00", "16:30", "18:00"],
      Saturday: ["10:00", "11:30", "14:00", "16:00"]
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
  // Initialize Active Clinic Configuration (supports URL query params e.g. ?clinic=SitaDental)
  const [activeClinic, setActiveClinic] = useState<ClinicConfig>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const clinicParam = urlParams.get('clinic');
      if (clinicParam && CLINIC_PRESETS[clinicParam]) {
        return CLINIC_PRESETS[clinicParam];
      }
      if (clinicParam && clinicParam.toLowerCase().includes('sita')) {
        return CLINIC_PRESETS.SitaDental;
      }
    }
    // Default preset for Dr. Anjali / Sita Dental pitch
    return CLINIC_PRESETS.SitaDental || CLINIC_PRESETS.DentalFlow;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(DEFAULT_DOCTORS);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [leads, setLeads] = useState<Lead[]>(DEFAULT_LEADS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Switch preset helper
  const switchClinicPreset = (key: string) => {
    if (CLINIC_PRESETS[key]) {
      setActiveClinic(CLINIC_PRESETS[key]);
    }
  };

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
