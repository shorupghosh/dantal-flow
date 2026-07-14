import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Doctor, Patient, Appointment, Staff, Lead, Review } from '../lib/mockData';

interface DatabaseContextType {
  doctors: Doctor[];
  staff: Staff[];
  patients: Patient[];
  appointments: Appointment[];
  reviews: Review[];
  leads: Lead[];
  isLocalMock: boolean;
  createAppointment: (appt: Omit<Appointment, 'id' | 'createdAt' | 'patientName' | 'doctorName'>) => Promise<Appointment>;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'aiScore' | 'aiNotes'>) => Promise<Lead>;
  updateLeadStatus: (id: string, status: Lead['status']) => Promise<void>;
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'patientName' | 'doctorName'>) => Promise<Review>;
  updateReviewResponse: (id: string, response: string) => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLocalMock, setIsLocalMock] = useState(!isSupabaseConfigured);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  // Initialize data
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // Fetch from Supabase
      const fetchSupabaseData = async () => {
        try {
          const { data: docData } = await supabase!.from('doctors').select('*');
          const { data: staffData } = await supabase!.from('staff').select('*');
          const { data: patData } = await supabase!.from('patients').select('*');
          const { data: apptData } = await supabase!.from('appointments').select('*');
          const { data: revData } = await supabase!.from('reviews').select('*');
          const { data: leadData } = await supabase!.from('leads').select('*');

          if (docData) setDoctors(docData);
          if (staffData) setStaff(staffData);
          if (patData) setPatients(patData);
          if (apptData) setAppointments(apptData);
          if (revData) setReviews(revData);
          if (leadData) setLeads(leadData);
          setIsLocalMock(false);
        } catch (error) {
          console.error("Failed to load Supabase data", error);
        }
      };

      fetchSupabaseData();
    } else {
      console.warn("Supabase is not configured. Database will remain empty.");
    }
  }, []);



  const createAppointment = async (appt: Omit<Appointment, 'id' | 'createdAt' | 'patientName' | 'doctorName'>): Promise<Appointment> => {
    const doc = doctors.find(d => d.id === appt.doctorId);
    const pat = patients.find(p => p.id === appt.patientId);

    const newAppt: Appointment = {
      ...appt,
      id: `appt-${Date.now()}`,
      patientName: pat?.name || 'Unknown Patient',
      patientPhone: pat?.phone || '',
      doctorName: doc?.name || 'Unknown Doctor',
      createdAt: new Date().toISOString()
    };

    if (supabase) {
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
      
      if (error) throw error;
      
      const res: Appointment = {
        id: data.id,
        patientId: data.patient_id,
        doctorId: data.doctor_id,
        treatmentName: data.treatment_name,
        scheduledAt: data.scheduled_at,
        status: data.status,
        notes: data.notes,
        price: data.price,
        createdAt: data.created_at,
        patientName: pat?.name,
        doctorName: doc?.name
      };

      setAppointments(prev => [res, ...prev]);
      return res;
    }
    
    // Throw error if Supabase is not configured
    throw new Error("Supabase is not configured. Cannot create appointment.");
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    if (supabase) {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    }
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'createdAt' | 'aiScore' | 'aiNotes'>): Promise<Lead> => {
    // Generate simple local AI Scoring rule
    const score = lead.message.toLowerCase().includes('emergency') || lead.message.toLowerCase().includes('pain') ? 9 : 6;
    const notes = `AI Qualified: High interest in ${lead.message.slice(0, 30)}... Recommendation: Schedule ASAP.`;

    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      aiScore: score,
      aiNotes: notes,
      createdAt: new Date().toISOString()
    };

    if (supabase) {
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
        email: data.email,
        phone: data.phone,
        source: data.source,
        status: data.status,
        aiScore: data.ai_score,
        aiNotes: data.ai_notes,
        message: data.message,
        createdAt: data.created_at
      };

      setLeads(prev => [res, ...prev]);
      return res;
    }
    
    throw new Error("Supabase is not configured. Cannot add lead.");
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    if (supabase) {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    }
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

    if (supabase) {
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
        aiResponse: data.ai_response,
        createdAt: data.created_at,
        patientName: pat?.name,
        doctorName: doc?.name
      };

      setReviews(prev => [res, ...prev]);
      return res;
    }
    
    throw new Error("Supabase is not configured. Cannot add review.");
  };

  const updateReviewResponse = async (id: string, response: string) => {
    if (supabase) {
      const { error } = await supabase
        .from('reviews')
        .update({ ai_response: response })
        .eq('id', id);
      if (error) throw error;
      setReviews(prev => prev.map(r => r.id === id ? { ...r, aiResponse: response } : r));
    }
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
      updateReviewResponse
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
