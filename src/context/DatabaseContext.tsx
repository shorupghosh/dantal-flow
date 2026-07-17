import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Doctor, Patient, Appointment, Staff, Lead, Review } from '../lib/mockData';
import { 
  mockDoctors, 
  mockPatients, 
  mockAppointments, 
  mockStaff, 
  mockReviews, 
  mockLeads 
} from '../lib/mockData';

interface DatabaseContextType {
  doctors: Doctor[];
  staff: Staff[];
  patients: Patient[];
  appointments: Appointment[];
  reviews: Review[];
  leads: Lead[];
  isLocalMock: boolean;
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
  const [isLocalMock, setIsLocalMock] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize data
  useEffect(() => {
    const loadFallbackData = () => {
      setDoctors(mockDoctors);
      setStaff(mockStaff);
      setPatients(mockPatients);
      setAppointments(mockAppointments);
      setReviews(mockReviews);
      setLeads(mockLeads);
      setIsLocalMock(true);
    };

    if (isSupabaseConfigured && supabase) {
      const fetchSupabaseData = async () => {
        try {
          const { data: docData } = await supabase!.from('doctors').select('*');
          const { data: staffData } = await supabase!.from('staff').select('*');
          const { data: patData } = await supabase!.from('patients').select('*');
          const { data: apptData } = await supabase!.from('appointments').select('*');
          const { data: revData } = await supabase!.from('reviews').select('*');
          const { data: leadData } = await supabase!.from('leads').select('*');

          let hasRealData = false;

          if (docData && docData.length > 0) {
            setDoctors(docData);
            hasRealData = true;
          } else {
            setDoctors(mockDoctors);
          }

          if (staffData && staffData.length > 0) {
            setStaff(staffData);
            hasRealData = true;
          } else {
            setStaff(mockStaff);
          }

          if (patData && patData.length > 0) {
            setPatients(patData);
            hasRealData = true;
          } else {
            setPatients(mockPatients);
          }

          if (apptData && apptData.length > 0) {
            const formattedAppts: Appointment[] = apptData.map(a => {
              const doc = (docData || mockDoctors).find(d => d.id === a.doctor_id);
              const pat = (patData || mockPatients).find(p => p.id === a.patient_id);
              return {
                id: a.id,
                patientId: a.patient_id,
                patientName: pat?.name || 'Unknown Patient',
                patientPhone: pat?.phone || '',
                doctorId: a.doctor_id,
                doctorName: doc?.name || 'Unknown Doctor',
                treatmentName: a.treatment_name,
                scheduledAt: a.scheduled_at,
                status: a.status,
                notes: a.notes || '',
                price: Number(a.price || 0),
                createdAt: a.created_at
              };
            });
            setAppointments(formattedAppts);
            hasRealData = true;
          } else {
            setAppointments(mockAppointments);
          }

          if (revData && revData.length > 0) {
            const formattedReviews: Review[] = revData.map(r => {
              const doc = (docData || mockDoctors).find(d => d.id === r.doctor_id);
              const pat = (patData || mockPatients).find(p => p.id === r.patient_id);
              return {
                id: r.id,
                patientId: r.patient_id,
                patientName: pat?.name || 'Anonymous',
                doctorId: r.doctor_id,
                doctorName: doc?.name || 'Unknown Doctor',
                rating: r.rating,
                comment: r.comment,
                aiResponse: r.ai_response || '',
                createdAt: r.created_at
              };
            });
            setReviews(formattedReviews);
            hasRealData = true;
          } else {
            setReviews(mockReviews);
          }

          if (leadData && leadData.length > 0) {
            const formattedLeads: Lead[] = leadData.map(l => ({
              id: l.id,
              name: l.name,
              email: l.email || '',
              phone: l.phone || '',
              source: l.source || 'Website',
              status: l.status || 'New Lead',
              aiScore: l.ai_score || 5,
              aiNotes: l.ai_notes || '',
              message: l.message || '',
              createdAt: l.created_at
            }));
            setLeads(formattedLeads);
            hasRealData = true;
          } else {
            setLeads(mockLeads);
          }

          setIsLocalMock(!hasRealData);
        } catch (error) {
          console.error("Failed to load Supabase data, loading local fallback database", error);
          loadFallbackData();
        }
      };

      fetchSupabaseData();
    } else {
      console.warn("Supabase is not configured. Seeding local mock database.");
      loadFallbackData();
    }
  }, []);

  const loginAdmin = async (pin: string) => {
    if (pin === '1234') {
      setIsAuthenticated(true);
      if (supabase && !isLocalMock) {
        try {
          const { data: staffData } = await supabase.from('staff').select('*');
          const { data: patData } = await supabase.from('patients').select('*');
          const { data: apptData } = await supabase.from('appointments').select('*');
          const { data: leadData } = await supabase.from('leads').select('*');

          if (staffData) setStaff(staffData);
          if (patData) setPatients(patData);
          if (leadData) {
            setLeads(leadData.map(l => ({
              id: l.id, name: l.name, email: l.email || '', phone: l.phone || '',
              source: l.source || 'Website', status: l.status || 'New Lead',
              aiScore: l.ai_score || 5, aiNotes: l.ai_notes || '', message: l.message || '',
              createdAt: l.created_at
            })));
          }
          if (apptData) {
            setAppointments(apptData.map(a => {
              const doc = doctors.find(d => d.id === a.doctor_id);
              const pat = patData?.find(p => p.id === a.patient_id);
              return {
                id: a.id, patientId: a.patient_id, patientName: pat?.name || 'Unknown',
                patientPhone: pat?.phone || '', doctorId: a.doctor_id, doctorName: doc?.name || 'Unknown',
                treatmentName: a.treatment_name, scheduledAt: a.scheduled_at, status: a.status,
                notes: a.notes || '', price: Number(a.price || 0), createdAt: a.created_at
              };
            }));
          }
        } catch (err) {
          console.error("Failed to fetch admin data", err);
        }
      } else {
        setStaff(mockStaff);
        setPatients(mockPatients);
        setAppointments(mockAppointments);
        setLeads(mockLeads);
      }
      return true;
    }
    return false;
  };

  const createAppointment = async (appt: Omit<Appointment, 'id' | 'createdAt' | 'doctorName'>): Promise<Appointment> => {
    const doc = doctors.find(d => d.id === appt.doctorId);
    let pat = patients.find(p => p.id === appt.patientId);
    let finalPatientId = appt.patientId;
    let patName = appt.patientName || pat?.name || 'Unknown Patient';
    let patPhone = appt.patientPhone || pat?.phone || '';
    let patEmail = appt.patientEmail || pat?.email || '';

    if (supabase && !isLocalMock) {
      try {
        // If patientId is a temporary client-side ID (e.g. pat-1234), create a patient record first
        if (appt.patientId.startsWith('pat-')) {
          const { data: newPat, error: patErr } = await supabase
            .from('patients')
            .insert([{
              name: patName,
              phone: patPhone,
              email: patEmail,
              medical_history: appt.notes || ''
            }])
            .select()
            .single();

          if (patErr) throw patErr;
          finalPatientId = newPat.id;
          patName = newPat.name;
          patPhone = newPat.phone;
          patEmail = newPat.email || '';

          // Add to local patients state
          const patRecord: Patient = {
            id: newPat.id,
            name: newPat.name,
            email: newPat.email || '',
            phone: newPat.phone || '',
            medicalHistory: newPat.medical_history || '',
            createdAt: newPat.created_at
          };
          setPatients(prev => [...prev, patRecord]);
          pat = patRecord;
        }

        const { data, error } = await supabase
          .from('appointments')
          .insert([{
            patient_id: finalPatientId,
            doctor_id: appt.doctorId,
            treatment_name: appt.treatmentName,
            scheduled_at: appt.scheduledAt,
            status: appt.status,
            notes: appt.notes,
            price: appt.price
          }])
          .select()
          .single();
        
        if (error) throw error;
        
        const res: Appointment = {
          id: data.id,
          patientId: data.patient_id,
          patientName: patName,
          patientPhone: patPhone,
          patientEmail: patEmail,
          doctorId: data.doctor_id,
          doctorName: doc?.name || 'Unknown Doctor',
          treatmentName: data.treatment_name,
          scheduledAt: data.scheduled_at,
          status: data.status,
          notes: data.notes || '',
          price: Number(data.price || 0),
          createdAt: data.created_at
        };

        setAppointments(prev => [res, ...prev]);
        return res;
      } catch (err) {
        console.error("Failed to write appointment to Supabase, saving to local state", err);
      }
    }

    const newAppt: Appointment = {
      ...appt,
      id: `appt-${Date.now()}`,
      patientName: patName,
      patientPhone: patPhone,
      patientEmail: patEmail,
      doctorName: doc?.name || 'Unknown Doctor',
      createdAt: new Date().toISOString()
    };
    
    setAppointments(prev => [newAppt, ...prev]);
    return newAppt;
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    if (supabase && !isLocalMock) {
      try {
        const { error } = await supabase
          .from('appointments')
          .update({ status })
          .eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error("Failed to update appointment in Supabase, updating locally only", err);
      }
    }
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'createdAt' | 'aiScore' | 'aiNotes'>): Promise<Lead> => {
    const score = lead.message.toLowerCase().includes('emergency') || lead.message.toLowerCase().includes('pain') ? 9 : 6;
    const notes = `AI Qualified: High interest in ${lead.message.slice(0, 30)}... Recommendation: Schedule ASAP.`;

    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      aiScore: score,
      aiNotes: notes,
      createdAt: new Date().toISOString()
    };

    if (supabase && !isLocalMock) {
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

        if (error) throw error;

        const res: Lead = {
          id: data.id,
          name: data.name,
          email: data.email || '',
          phone: data.phone || '',
          source: data.source || 'Website',
          status: data.status || 'New Lead',
          aiScore: data.ai_score || score,
          aiNotes: data.ai_notes || notes,
          message: data.message || '',
          createdAt: data.created_at
        };

        setLeads(prev => [res, ...prev]);
        return res;
      } catch (err) {
        console.error("Failed to add lead to Supabase, saving to local state", err);
      }
    }
    
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    if (supabase && !isLocalMock) {
      try {
        const { error } = await supabase
          .from('leads')
          .update({ status })
          .eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error("Failed to update lead status in Supabase, updating locally only", err);
      }
    }
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const addReview = async (review: Omit<Review, 'id' | 'createdAt' | 'patientName' | 'doctorName'>): Promise<Review> => {
    const pat = patients.find(p => p.id === review.patientId);
    const doc = doctors.find(d => d.id === review.doctorId);

    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      patientName: pat?.name || 'Anonymous',
      doctorName: doc?.name || '',
      createdAt: new Date().toISOString()
    };

    if (supabase && !isLocalMock) {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .insert([{
            patient_id: review.patientId,
            doctor_id: review.doctorId,
            rating: review.rating,
            comment: review.comment
          }])
          .select()
          .single();

        if (error) throw error;

        const res: Review = {
          id: data.id,
          patientId: data.patient_id,
          doctorId: data.doctor_id,
          rating: data.rating,
          comment: data.comment,
          aiResponse: data.ai_response || '',
          createdAt: data.created_at,
          patientName: pat?.name,
          doctorName: doc?.name
        };

        setReviews(prev => [res, ...prev]);
        return res;
      } catch (err) {
        console.error("Failed to add review to Supabase, saving to local state", err);
      }
    }
    
    setReviews(prev => [newReview, ...prev]);
    return newReview;
  };

  const updateReviewResponse = async (id: string, response: string) => {
    if (supabase && !isLocalMock) {
      try {
        const { error } = await supabase
          .from('reviews')
          .update({ ai_response: response })
          .eq('id', id);
        if (error) throw error;
      } catch (err) {
        console.error("Failed to update review response in Supabase, updating locally only", err);
      }
    }
    setReviews(prev => prev.map(r => r.id === id ? { ...r, aiResponse: response } : r));
  };

  return (
    <DatabaseContext.Provider value={{
      doctors,
      staff,
      patients,
      appointments,
      reviews,
      leads,
      isLocalMock,
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
