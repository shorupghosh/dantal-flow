import React, { useState } from 'react';
import { Calendar, FileText, CreditCard, Stethoscope, LogIn, LogOut, CheckCircle2, AlertTriangle, Key, Search, Clock, FileBadge } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

export const PatientPortal: React.FC = () => {
  const { patients, appointments, reviews } = useDatabase();
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'medical' | 'billing'>('appointments');
  
  // Payment simulation state
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Filter 4 sample patients for easy login in demo
  const samplePatients = patients.slice(0, 4);

  const currentPatient = patients.find(p => p.id === selectedPatientId);
  const patientAppointments = appointments.filter(a => a.patientId === selectedPatientId);

  // Mock treatment plan / prescriptions based on patient id hash
  const getMedicalData = (id: string) => {
    // Deterministic mock records using id hash
    const val = id.charCodeAt(id.length - 1) || 0;
    
    const plans = [
      { name: "Full Arch Orthodontics", steps: ["Initial Scan & Consultation (Completed)", "Braces Bond & Alignment (Active)", "Retainers (Pending)"], progress: 40 },
      { name: "Molar Restoration", steps: ["Painless Root Canal (Completed)", "Teeth Core build-up (Completed)", "Zirconia Crown Placement (Active)"], progress: 75 },
      { name: "Aesthetic Enhancements", steps: ["Scaling & Polish (Completed)", "Laser bleaching session (Completed)"], progress: 100 }
    ];

    const prescriptions = [
      { name: "Amoxicillin 500mg", instructions: "1 capsule every 8 hours for 5 days. Complete full course.", reason: "Tooth Infection Prevention" },
      { name: "Ketorolac 10mg", instructions: "1 tablet after meals when pain is severe. Max 3 tablets daily.", reason: "Pain Management" },
      { name: "Chlorhexidine Gluconate 0.2%", instructions: "Rinse mouth with 10ml for 1 minute twice daily after brushing.", reason: "Gum antiseptic rinse" }
    ];

    return {
      plan: plans[val % plans.length],
      prescription: prescriptions.slice(0, (val % 2) + 2)
    };
  };

  const handleLogin = (id: string) => {
    setSelectedPatientId(id);
    setIsLoggedIn(true);
  };

  const handlePayInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setPaymentSuccess(false);
  };

  const executePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      // Update local invoice state
      if (selectedInvoice) {
        selectedInvoice.status = 'Completed'; // mutating locally for visual update
      }
      setTimeout(() => setSelectedInvoice(null), 1500);
    }, 1500);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xl space-y-6 text-left">
          <div className="text-center space-y-2">
            <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit mx-auto">
              <Key className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold">Patient Portal Access</h2>
            <p className="text-xs text-muted-foreground">Select a verified patient below to log in instantly and review medical histories.</p>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Select Demo Patient Profile</span>
            <div className="grid grid-cols-1 gap-2.5">
              {samplePatients.map((p) => {
                const count = appointments.filter(a => a.patientId === p.id).length;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleLogin(p.id)}
                    className="p-3.5 border border-border bg-background rounded-xl hover:border-primary text-left flex justify-between items-center group transition-all"
                  >
                    <div>
                      <span className="font-bold text-sm text-foreground block group-hover:text-primary">{p.name}</span>
                      <span className="text-[10px] text-muted-foreground block mt-0.5">{p.phone}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">{count} Appts</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const medicalData = currentPatient ? getMedicalData(currentPatient.id) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-left">
      
      {/* Portal Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-border gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome Back, {currentPatient?.name}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Patient ID: <span className="font-mono">{currentPatient?.id}</span></p>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-1.5 px-4 py-2 border border-border hover:bg-muted text-xs font-semibold rounded-lg text-foreground/80 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mt-6">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center gap-2 ${
            activeTab === 'appointments' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Calendar className="h-4 w-4" />
          Appointments ({patientAppointments.length})
        </button>
        <button
          onClick={() => setActiveTab('medical')}
          className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center gap-2 ${
            activeTab === 'medical' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <FileText className="h-4 w-4" />
          Medical Records & Plans
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`px-4 py-3 text-xs font-bold border-b-2 flex items-center gap-2 ${
            activeTab === 'billing' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <CreditCard className="h-4 w-4" />
          Billing & Payments
        </button>
      </div>

      <div className="mt-8">
        
        {/* TAB 1: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Appointment Scheduling Records</h3>
            {patientAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No appointments logged yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patientAppointments.map((appt) => (
                  <div key={appt.id} className="bg-card border border-border rounded-xl p-5 space-y-3 shadow-sm flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-primary">{appt.treatmentName}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          appt.status === 'Completed' ? 'bg-green-500/10 text-green-600' :
                          appt.status === 'Confirmed' ? 'bg-blue-500/10 text-blue-600' :
                          appt.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-600' : 'bg-red-500/10 text-red-600'
                        }`}>
                          {appt.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-foreground">{appt.doctorName}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(appt.scheduledAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {appt.notes && (
                      <div className="p-2.5 bg-background border border-border/40 rounded-lg text-[10px] text-muted-foreground mt-2 italic leading-relaxed">
                        "Notes: {appt.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MEDICAL RECORDS */}
        {activeTab === 'medical' && medicalData && (
          <div className="space-y-8">
            {/* Treatment Plan Progress */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileBadge className="h-5 w-5 text-primary" />
                Active Treatment Plan: {medicalData.plan.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-muted-foreground mb-1">
                    <span>Treatment Completion</span>
                    <span>{medicalData.plan.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${medicalData.plan.progress}%` }}></div>
                  </div>
                </div>

                <div className="space-y-2.5 mt-4 pt-4 border-t border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Timeline Progression</span>
                  {medicalData.plan.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-foreground/80">
                      <div className={`w-2.5 h-2.5 rounded-full ${step.includes('Completed') ? 'bg-green-500' : step.includes('Active') ? 'bg-primary animate-pulse' : 'bg-muted'}`}></div>
                      <span className={step.includes('Completed') ? 'line-through text-muted-foreground' : 'font-semibold'}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Active Medical Prescriptions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicalData.prescription.map((rx, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-xl p-5 space-y-2 shadow-sm text-left">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-foreground">{rx.name}</h4>
                      <span className="text-[10px] text-primary bg-primary/10 font-bold px-2 py-0.5 rounded">{rx.reason}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{rx.instructions}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BILLING & PAYMENTS */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Invoices & Statements</h3>
            
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted border-b border-border font-bold text-muted-foreground text-left">
                    <th className="p-4">Invoice ID</th>
                    <th className="p-4">Treatment</th>
                    <th className="p-4">Scheduled Date</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {patientAppointments.map((appt, idx) => {
                    const invoiceId = `INV-${appt.id.split('-')[1] || idx + 1024}`;
                    return (
                      <tr key={appt.id} className="hover:bg-muted/30">
                        <td className="p-4 font-mono font-bold text-foreground/80">{invoiceId}</td>
                        <td className="p-4 font-semibold">{appt.treatmentName}</td>
                        <td className="p-4 text-muted-foreground">{appt.scheduledAt.split('T')[0]}</td>
                        <td className="p-4 font-bold">INR {appt.price}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            appt.status === 'Completed' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                          }`}>
                            {appt.status === 'Completed' ? 'Paid' : 'Pending Payment'}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {appt.status !== 'Completed' ? (
                            <button
                              onClick={() => handlePayInvoice({ id: invoiceId, apptId: appt.id, treatment: appt.treatmentName, price: appt.price, status: 'Pending' })}
                              className="px-3 py-1 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/95 text-[10px]"
                            >
                              Pay Invoice
                            </button>
                          ) : (
                            <span className="text-[10px] text-green-600 font-bold flex items-center justify-center gap-0.5">
                              <CheckCircle2 className="h-3 w-3" />
                              Settled
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Payment simulation modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-sm rounded-2xl p-6 shadow-2xl text-left space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <h4 className="font-bold text-foreground">Secure Payment Simulation</h4>
              <button 
                onClick={() => setSelectedInvoice(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogIn className="h-5 w-5 rotate-180" />
              </button>
            </div>

            {paymentSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h5 className="font-bold text-foreground">Payment Settled Successfully</h5>
                <p className="text-xs text-muted-foreground">Invoice {selectedInvoice.id} has been marked as fully paid.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted p-3.5 rounded-xl space-y-1">
                  <span className="text-[10px] text-muted-foreground block">INVOICE: {selectedInvoice.id}</span>
                  <span className="text-xs font-bold text-foreground block">{selectedInvoice.treatment}</span>
                  <span className="text-sm font-extrabold text-primary block mt-1">Amount Due: INR {selectedInvoice.price}</span>
                </div>

                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 rounded-lg flex gap-1.5 text-[10px] leading-relaxed">
                  <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                  <span>This is a simulated secure transaction. Clicking 'Process' will authorize a mock payment settlement in the local database.</span>
                </div>

                <button
                  onClick={executePayment}
                  disabled={isPaying}
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 text-xs flex items-center justify-center gap-1.5"
                >
                  {isPaying ? 'Processing Transaction...' : 'Process Demo Payment'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
