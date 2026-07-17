import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Award, Target, MessageSquare, Bot, AlertTriangle, Send, Sparkles, RefreshCw, Star, CheckCircle, Clock } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';
import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const isGeminiConfigured = Boolean(geminiKey);

export const AdminDashboard: React.FC = () => {
  const { 
    appointments, 
    patients, 
    doctors, 
    reviews, 
    leads, 
    updateAppointmentStatus, 
    updateLeadStatus,
    updateReviewResponse 
  } = useDatabase();

  const [role, setRole] = useState<'admin' | 'doctor'>('admin');
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'kpis' | 'crm' | 'leads' | 'reviews' | 'whatsapp'>('kpis');
  
  // AI State
  const [selectedLeadForAI, setSelectedLeadForAI] = useState<any | null>(null);
  const [aiReport, setAiReport] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const [selectedReviewForAI, setSelectedReviewForAI] = useState<any | null>(null);
  const [aiReviewReply, setAiReviewReply] = useState('');
  const [loadingReviewAI, setLoadingReviewAI] = useState(false);

  // Stats calculation
  const totalRevenue = appointments
    .filter(a => a.status === 'Completed')
    .reduce((sum, a) => sum + a.price, 0);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.scheduledAt.startsWith(todayStr));
  
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const cancellationRate = appointments.length > 0 
    ? Math.round((appointments.filter(a => a.status === 'Cancelled').length / appointments.length) * 100)
    : 0;

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const pipelineStages = ['New Lead', 'Consultation', 'Appointment', 'Treatment', 'Completed', 'Recall'] as const;

  // CRM status change helper
  const handleMoveLead = async (leadId: string, direction: 'forward' | 'backward') => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;
    
    const currentIndex = pipelineStages.indexOf(lead.status as any);
    if (currentIndex === -1) return;
    
    let nextIndex = currentIndex;
    if (direction === 'forward' && currentIndex < pipelineStages.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (direction === 'backward' && currentIndex > 0) {
      nextIndex = currentIndex - 1;
    }

    if (nextIndex !== currentIndex) {
      await updateLeadStatus(leadId, pipelineStages[nextIndex]);
    }
  };

  // AI Lead Scorer & Qualification Generator via Gemini
  const runAILeadScoring = async (lead: any) => {
    setSelectedLeadForAI(lead);
    setAiReport('');
    setLoadingAI(true);

    const prompt = `Analyze this clinical dental lead:
Name: ${lead.name}
Phone: ${lead.phone}
Inquiry Message: "${lead.message}"
Source: ${lead.source}

Please output a qualification summary:
1. MOTIVATION LEVEL: (High / Medium / Low)
2. CLINICAL CONCERN: (Identify what the patient needs e.g., root canal, braces, scaling)
3. ESTIMATED REVENUE VALUE: INR estimate (Refer to Whitening INR 8000, Implants INR 65000, Root Canal INR 12000, Braces INR 80000, Clean/Check INR 1500)
4. AI PRIORITY SCORE (1-10)
5. WhatsApp Outreach Draft Template: A short, personalized opening text message referencing their inquiry, keeping it friendly and professional.`;

    if (isGeminiConfigured) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        setAiReport(result.response.text());
      } catch (e) {
        console.error("Gemini API Error, using fallback engine", e);
        setAiReport(getMockAIScoreReport(lead));
      } finally {
        setLoadingAI(false);
      }
    } else {
      setTimeout(() => {
        setAiReport(getMockAIScoreReport(lead));
        setLoadingAI(false);
      }, 1000);
    }
  };

  const getMockAIScoreReport = (lead: any) => {
    const text = lead.message.toLowerCase();
    let score = 6;
    let concern = "General Consulting";
    let rev = "INR 1,500";
    
    if (text.includes('whitening')) {
      score = 8; concern = "Teeth Whitening"; rev = "INR 8,000";
    } else if (text.includes('implants')) {
      score = 9; concern = "Dental Implants Restoration"; rev = "INR 65,000";
    } else if (text.includes('braces')) {
      score = 9; concern = "Orthodontic Braces"; rev = "INR 80,000";
    } else if (text.includes('pain') || text.includes('toothache')) {
      score = 10; concern = "Emergency Root Canal Therapy"; rev = "INR 12,000";
    }

    return `### AI LEAD EVALUATION REPORT

* **Patient Name:** ${lead.name}
* **Clinical Assessment:** Patient is seeking treatment for **${concern}**
* **Priority Score:** ${score}/10 (Urgency: ${score >= 9 ? 'CRITICAL' : 'Standard'})
* **Potential Lifetime Value:** ${rev}
* **WhatsApp Outreach Copy:**
  "Hi ${lead.name}, thank you for reaching out to DentalFlow AI. We noted your interest regarding ${concern}. We have slots available with our specialist this week. Would you prefer a morning or afternoon appointment?"`;
  };

  // AI Review Reply Generator via Gemini
  const runAIReviewResponse = async (review: any) => {
    setSelectedReviewForAI(review);
    setAiReviewReply('');
    setLoadingReviewAI(true);

    const prompt = `You are the lead manager for DentalFlow AI. Respond to this patient review:
Patient Name: ${review.patientName}
Rating: ${review.rating} Stars
Review Comment: "${review.comment}"
Assigned Specialist: ${review.doctorName}

Write a professional, HIPAA-compliant response thanking the patient and highlighting clinic values. Keep it under 3 sentences. Do not mention specific medical details.`;

    if (isGeminiConfigured) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent(prompt);
        setAiReviewReply(result.response.text());
      } catch (e) {
        console.error("Gemini API Error, using fallback response", e);
        setAiReviewReply(`Dear ${review.patientName}, thank you for your review! We're glad to hear that you had a positive experience at our clinic with ${review.doctorName}. We look forward to serving you again.`);
      } finally {
        setLoadingReviewAI(false);
      }
    } else {
      setTimeout(() => {
        setAiReviewReply(`Dear ${review.patientName}, thank you for your review! We're glad to hear that you had a positive experience at our clinic with ${review.doctorName}. We look forward to serving you again.`);
        setLoadingReviewAI(false);
      }, 1000);
    }
  };

  const saveAiResponseToReview = async () => {
    if (!selectedReviewForAI || !aiReviewReply) return;
    await updateReviewResponse(selectedReviewForAI.id, aiReviewReply);
    setSelectedReviewForAI(null);
    setAiReviewReply('');
  };

  // Simulated WhatsApp Automations Logger
  const getWhatsAppAutomationsLog = () => {
    return appointments.slice(0, 8).map((appt, idx) => {
      const timeStr = new Date(appt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const actions = [
        { type: "Booking Confirmation Sent", status: "Success", node: "WhatsApp Node #1" },
        { type: "24-Hour Recall Reminder Queued", status: "Active", node: "WhatsApp Node #2" },
        { type: "2-Hour Alert Prepared", status: "Active", node: "WhatsApp Node #3" },
        { type: "Follow-up Feedback Request Sent", status: "Success", node: "WhatsApp Node #4" }
      ];
      const action = actions[idx % actions.length];
      return {
        id: `WA-${1000 + idx}`,
        patientName: appt.patientName,
        phone: appt.patientPhone,
        type: action.type,
        status: action.status,
        node: action.node,
        time: timeStr
      };
    });
  };

  const waLogs = getWhatsAppAutomationsLog();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-left space-y-8">
      
      {/* Role and Tab Toggles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-border gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Clinic Management Desk</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Manage schedules, CRM, billing logs, and WhatsApp sequences.</p>
        </div>

        <div className="flex bg-muted p-1 rounded-xl">
          <button
            onClick={() => setRole('admin')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'admin' ? 'bg-primary text-primary-foreground shadow' : 'text-foreground/70 hover:text-foreground'}`}
          >
            Admin Portal
          </button>
          <button
            onClick={() => setRole('doctor')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${role === 'doctor' ? 'bg-primary text-primary-foreground shadow' : 'text-foreground/70 hover:text-foreground'}`}
          >
            Doctor Portal
          </button>
        </div>
      </div>

      {/* -------------------- ROLE: DOCTOR PORTAL -------------------- */}
      {role === 'doctor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Calendar List */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="text-lg font-bold">Today's Appointment Board ({todayAppointments.length})</h3>
            
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted border-b border-border font-bold text-muted-foreground text-left">
                    <th className="p-4">Time</th>
                    <th className="p-4">Patient</th>
                    <th className="p-4">Treatment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {appointments.slice(0, 10).map((appt) => {
                    const time = new Date(appt.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                      <tr key={appt.id} className="hover:bg-muted/30">
                        <td className="p-4 font-mono font-bold text-primary">{time}</td>
                        <td className="p-4">
                          <span className="font-bold text-foreground block">{appt.patientName}</span>
                          <span className="text-[10px] text-muted-foreground block">{appt.patientPhone}</span>
                        </td>
                        <td className="p-4 font-semibold">{appt.treatmentName}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                            appt.status === 'Completed' ? 'bg-green-500/10 text-green-600' :
                            appt.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-600' :
                            appt.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-600'
                          }`}>
                            {appt.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <select
                            value={appt.status}
                            onChange={(e) => updateAppointmentStatus(appt.id, e.target.value as any)}
                            className="bg-background border border-border text-[10px] rounded px-2 py-1 focus:outline-none focus:border-primary"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="No-show">No-show</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Doctor Info card */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-bold">Specialist Info</h3>
            {doctors.length > 0 ? (
              <div className="bg-card border border-border rounded-2xl p-5 space-y-4 shadow-sm">
                <div className="flex gap-4">
                  <img src={doctors[0].imageUrl} alt={doctors[0].name} className="w-16 h-16 object-cover rounded-xl" />
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{doctors[0].name}</h4>
                    <span className="text-xs text-primary font-semibold">{doctors[0].specialization}</span>
                    <div className="flex items-center text-yellow-500 text-xs font-semibold mt-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-500 mr-0.5" />
                      {doctors[0].rating} Rating
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{doctors[0].bio}</p>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm text-center text-xs text-muted-foreground py-8">
                No specialists registered in the database.
              </div>
            )}
          </div>

        </div>
      )}

      {/* -------------------- ROLE: ADMIN PORTAL -------------------- */}
      {role === 'admin' && (
        <div className="space-y-6">
          
          {/* Sub Navigation */}
          <div className="flex border-b border-border gap-2">
            <button
              onClick={() => setActiveAdminSubTab('kpis')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 ${activeAdminSubTab === 'kpis' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
            >
              <Target className="h-4 w-4" />
              Overview KPIs
            </button>
            <button
              onClick={() => setActiveAdminSubTab('crm')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 ${activeAdminSubTab === 'crm' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
            >
              <Users className="h-4 w-4" />
              CRM Pipeline
            </button>
            <button
              onClick={() => setActiveAdminSubTab('leads')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 ${activeAdminSubTab === 'leads' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
            >
              <Bot className="h-4 w-4" />
              AI Lead Grading
            </button>
            <button
              onClick={() => setActiveAdminSubTab('reviews')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 ${activeAdminSubTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
            >
              <MessageSquare className="h-4 w-4" />
              Reviews Manager
            </button>
            <button
              onClick={() => setActiveAdminSubTab('whatsapp')}
              className={`px-4 py-2.5 text-xs font-bold border-b-2 flex items-center gap-1.5 ${activeAdminSubTab === 'whatsapp' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
            >
              <CheckCircle className="h-4 w-4" />
              WhatsApp Sequences
            </button>
          </div>

          <div className="mt-4">
            
            {/* SUBTAB: OVERVIEW KPIs */}
            {activeAdminSubTab === 'kpis' && (
              <div className="space-y-8">
                {/* Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-2">
                    <div className="p-2 bg-primary/10 text-primary w-fit rounded-lg"><Calendar className="h-5 w-5" /></div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Today's Appointments</span>
                    <h4 className="text-xl font-black">{todayAppointments.length}</h4>
                  </div>
                  <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-2">
                    <div className="p-2 bg-primary/10 text-primary w-fit rounded-lg"><DollarSign className="h-5 w-5" /></div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Settled Revenue</span>
                    <h4 className="text-xl font-black">INR {totalRevenue.toLocaleString()}</h4>
                  </div>
                  <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-2">
                    <div className="p-2 bg-primary/10 text-primary w-fit rounded-lg"><Users className="h-5 w-5" /></div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">New Patients</span>
                    <h4 className="text-xl font-black">{patients.length}</h4>
                  </div>
                  <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-2">
                    <div className="p-2 bg-primary/10 text-primary w-fit rounded-lg"><Award className="h-5 w-5" /></div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Average Google Score</span>
                    <h4 className="text-xl font-black">{averageRating} / 5.0</h4>
                  </div>
                </div>

                {/* Operations logs */}
                <div className="bg-card border border-border p-5 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-bold text-sm text-foreground">Recent Check-in Logs</h4>
                  <div className="space-y-2">
                    {appointments.slice(0, 5).map((appt) => (
                      <div key={appt.id} className="flex justify-between items-center text-xs p-3 bg-background border border-border rounded-xl">
                        <div>
                          <span className="font-bold">{appt.patientName}</span>
                          <span className="text-muted-foreground"> check-in for </span>
                          <span className="font-semibold text-primary">{appt.treatmentName}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono">{appt.scheduledAt.split('T')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SUBTAB: CRM PIPELINE */}
            {activeAdminSubTab === 'crm' && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4">
                {pipelineStages.map((stage) => {
                  const stageLeads = leads.filter(l => l.status === stage);
                  return (
                    <div key={stage} className="bg-card border border-border rounded-2xl p-4 space-y-4 min-w-[200px] shrink-0">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <span className="text-[11px] font-bold text-foreground">{stage}</span>
                        <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">{stageLeads.length}</span>
                      </div>

                      <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {stageLeads.map((lead) => (
                          <div key={lead.id} className="bg-background border border-border rounded-xl p-3 space-y-2 shadow-sm text-left">
                            <div>
                              <span className="font-bold text-xs text-foreground block">{lead.name}</span>
                              <span className="text-[10px] text-muted-foreground block">{lead.source}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">"{lead.message}"</p>
                            <div className="flex justify-between items-center pt-2">
                              <button
                                onClick={() => handleMoveLead(lead.id, 'backward')}
                                className="px-1 py-0.5 bg-muted text-[9px] font-bold rounded"
                              >
                                ◀
                              </button>
                              <button
                                onClick={() => handleMoveLead(lead.id, 'forward')}
                                className="px-1 py-0.5 bg-muted text-[9px] font-bold rounded"
                              >
                                ▶
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUBTAB: AI LEAD GRADING */}
            {activeAdminSubTab === 'leads' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Leads List */}
                <div className="lg:col-span-5 space-y-3">
                  <h3 className="text-base font-bold">Recent Leads Inbox ({leads.length})</h3>
                  <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
                    {leads.slice(0, 8).map((lead) => (
                      <button
                        key={lead.id}
                        onClick={() => runAILeadScoring(lead)}
                        className={`w-full p-4 border rounded-xl text-left transition-all flex flex-col justify-between gap-1 ${
                          selectedLeadForAI?.id === lead.id 
                            ? 'border-primary bg-primary/5 shadow-sm' 
                            : 'border-border bg-card hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-bold text-sm text-foreground">{lead.name}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            lead.aiScore >= 9 ? 'bg-red-500/10 text-red-600' : 'bg-primary/10 text-primary'
                          }`}>
                            Score: {lead.aiScore}/10
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">"{lead.message}"</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Scorer Panel */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-base font-bold flex items-center gap-1">
                    <Bot className="h-4.5 w-4.5 text-primary" />
                    AI Qualification Panel
                  </h3>

                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
                    {selectedLeadForAI ? (
                      <div className="space-y-4 text-left">
                        <div className="flex justify-between items-center pb-3 border-b border-border">
                          <div>
                            <h4 className="font-bold text-sm">{selectedLeadForAI.name}</h4>
                            <span className="text-xs text-muted-foreground">{selectedLeadForAI.phone}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2.5 py-1 rounded-full font-bold">
                            <Sparkles className="h-3 w-3" />
                            {isGeminiConfigured ? 'Gemini AI Evaluated' : 'Heuristic evaluated'}
                          </div>
                        </div>

                        {loadingAI ? (
                          <div className="py-16 text-center space-y-2 text-muted-foreground">
                            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
                            <p className="text-xs font-semibold">Gemini is qualifying inquiry concerns...</p>
                          </div>
                        ) : (
                          <div className="whitespace-pre-line text-xs leading-relaxed text-foreground/80 bg-background p-4 rounded-xl border border-border font-mono max-h-[300px] overflow-y-auto">
                            {aiReport}
                          </div>
                        )}

                        {!loadingAI && (
                          <button
                            onClick={() => window.open(`https://wa.me/${selectedLeadForAI.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                          >
                            <Send className="h-4 w-4" />
                            Send Message via WhatsApp
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <AlertTriangle className="h-8 w-8 text-primary mb-2" />
                        <p className="text-xs font-semibold">Select a lead from the inbox list to execute the AI Grading pipeline.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* SUBTAB: REVIEWS MANAGER */}
            {activeAdminSubTab === 'reviews' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Reviews List */}
                <div className="lg:col-span-5 space-y-3">
                  <h3 className="text-base font-bold">Google Reviews Feed</h3>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {reviews.slice(0, 6).map((rev) => (
                      <button
                        key={rev.id}
                        onClick={() => runAIReviewResponse(rev)}
                        className={`w-full p-4 border rounded-xl text-left transition-all space-y-2 ${
                          selectedReviewForAI?.id === rev.id 
                            ? 'border-primary bg-primary/5 shadow-sm' 
                            : 'border-border bg-card hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs">{rev.patientName}</span>
                          <div className="flex text-yellow-500">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-[11px] text-muted-foreground italic">"{rev.comment}"</p>
                        {rev.aiResponse && (
                          <div className="p-2 bg-green-500/5 border border-green-500/10 rounded text-[9px] text-green-600 dark:text-green-500">
                            Replied: "{rev.aiResponse.slice(0, 50)}..."
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Review Replier */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-base font-bold flex items-center gap-1">
                    <MessageSquare className="h-4.5 w-4.5 text-primary" />
                    AI Response Generator
                  </h3>

                  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
                    {selectedReviewForAI ? (
                      <div className="space-y-4 text-left">
                        <div className="pb-3 border-b border-border space-y-1">
                          <h4 className="font-bold text-sm">{selectedReviewForAI.patientName}</h4>
                          <p className="text-xs text-muted-foreground">Original review: "{selectedReviewForAI.comment}"</p>
                        </div>

                        {loadingReviewAI ? (
                          <div className="py-16 text-center space-y-2 text-muted-foreground">
                            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
                            <p className="text-xs font-semibold">Gemini is writing polite clinical reply...</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Draft Response</span>
                            <textarea
                              value={aiReviewReply}
                              onChange={e => setAiReviewReply(e.target.value)}
                              rows={4}
                              className="w-full bg-background border border-border p-3 rounded-xl text-xs focus:outline-none focus:border-primary resize-none"
                            />
                          </div>
                        )}

                        {!loadingReviewAI && (
                          <button
                            onClick={saveAiResponseToReview}
                            className="w-full py-3 bg-primary text-primary-foreground font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve & Publish Response
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <MessageSquare className="h-8 w-8 text-primary mb-2" />
                        <p className="text-xs font-semibold">Select a review from the feed to draft responses via Gemini AI.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* SUBTAB: WHATSAPP AUTOMATION LOG */}
            {activeAdminSubTab === 'whatsapp' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold">Simulated WhatsApp Automation Engine Logs</h3>
                
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted border-b border-border font-bold text-muted-foreground text-left">
                        <th className="p-4">Action ID</th>
                        <th className="p-4">Patient</th>
                        <th className="p-4">WhatsApp Node</th>
                        <th className="p-4">Action Type</th>
                        <th className="p-4">Trigger Time</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {waLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-muted/30">
                          <td className="p-4 font-mono font-bold text-muted-foreground">{log.id}</td>
                          <td className="p-4">
                            <span className="font-bold block">{log.patientName}</span>
                            <span className="text-[10px] text-muted-foreground block">{log.phone}</span>
                          </td>
                          <td className="p-4 font-mono text-[10px] text-primary">{log.node}</td>
                          <td className="p-4 font-semibold">{log.type}</td>
                          <td className="p-4 font-mono">{log.time}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                              log.status === 'Success' ? 'bg-green-500/10 text-green-600' : 'bg-blue-500/10 text-blue-600'
                            }`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};
