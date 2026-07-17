import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle2, User, Activity, AlertCircle, ArrowLeft, ArrowRight, MessageSquare, Smartphone, Mail, MessageCircle, CalendarDays, Server, Sparkles, Droplets, Syringe, Shield, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDatabase } from '../context/DatabaseContext';

interface BookingWizardProps {
  initialTreatment?: string;
  initialDoctorId?: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

const treatmentPrices: Record<string, number> = {
  "Routine Clean & Check": 1500,
  "Teeth Whitening": 8000,
  "Tooth Extraction": 3000,
  "Root Canal Therapy": 12000,
  "Dental Crowns": 15000,
  "Dental Implants": 65000,
  "Orthodontic Braces": 80000,
  "Pediatric Dental Care": 2000
};

const treatmentIcons: Record<string, any> = {
  "Routine Clean & Check": Sparkles,
  "Teeth Whitening": Droplets,
  "Tooth Extraction": Syringe,
  "Root Canal Therapy": Activity,
  "Dental Crowns": Shield,
  "Dental Implants": Activity,
  "Orthodontic Braces": Smile,
  "Pediatric Dental Care": User
};

export const BookingWizard: React.FC<BookingWizardProps> = ({ 
  initialTreatment = '', 
  initialDoctorId = '', 
  onSuccess,
  onCancel
}) => {
  const { doctors, createAppointment } = useDatabase();

  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState(initialTreatment);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<any>(null);

  // Sync initial props
  useEffect(() => {
    if (initialTreatment) setTreatment(initialTreatment);
  }, [initialTreatment]);

  useEffect(() => {
    if (initialDoctorId) setSelectedDoctorId(initialDoctorId);
  }, [initialDoctorId]);

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId);

  // Generate date options (next 7 days starting tomorrow)
  const getNext7Days = () => {
    const dates = [];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      dates.push({
        formatted: d.toISOString().split('T')[0],
        dayName: days[d.getDay()],
        label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    return dates;
  };

  const datesOptions = getNext7Days();

  // Get available time slots for the selected doctor on the selected date's day of week
  const getAvailableSlots = () => {
    if (!selectedDoctor || !selectedDate) return [];
    const dateObj = datesOptions.find(d => d.formatted === selectedDate);
    if (!dateObj) return [];
    
    const slots = selectedDoctor.availability[dateObj.dayName];
    return slots || ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]; // fallback
  };

  const slots = getAvailableSlots();

  const handleNext = () => {
    if (step === 1 && !treatment) {
      setError('Please choose a treatment to proceed.');
      return;
    }
    if (step === 2 && !selectedDoctorId) {
      setError('Please select a doctor to proceed.');
      return;
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      setError('Please pick a date and time slot.');
      return;
    }
    if (step === 4 && (!patientDetails.name || !patientDetails.phone)) {
      setError('Name and Phone fields are required.');
      return;
    }

    setError('');
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      const scheduledAt = `${selectedDate}T${selectedTime}:00`;
      
      const appt = await createAppointment({
        patientId: `pat-${Date.now()}`, // Temporary patient registration
        doctorId: selectedDoctorId,
        treatmentName: treatment,
        scheduledAt,
        status: 'Confirmed',
        notes: patientDetails.notes,
        price: treatmentPrices[treatment] || 2000
      });

      setBookingResult(appt);
      setStep(6);
    } catch (e) {
      console.error(e);
      setError('Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:px-6">
      
      {/* Steps Header */}
      {step < 6 && (
        <div className="mb-8">
          <div className="flex justify-between items-center text-[10px] sm:text-xs font-semibold text-muted-foreground overflow-x-auto whitespace-nowrap gap-3 sm:gap-0 pb-1 scrollbar-hide">
            <span className={step === 1 ? 'text-primary font-bold' : ''}>1. Treatment</span>
            <span className={step === 2 ? 'text-primary font-bold' : ''}>2. Doctor</span>
            <span className={step === 3 ? 'text-primary font-bold' : ''}>3. Slot</span>
            <span className={step === 4 ? 'text-primary font-bold' : ''}>4. Details</span>
            <span className={step === 5 ? 'text-primary font-bold' : ''}>5. Confirm</span>
          </div>
          <div className="w-full bg-muted h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl flex items-center gap-2 text-sm text-left">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: CHOOSE TREATMENT */}
      {step === 1 && (
        <div className="space-y-6 text-left">
          <div>
            <h2 className="text-xl font-bold text-foreground">Select Treatment Procedure</h2>
            <p className="text-sm text-muted-foreground mt-1">Select the dental therapy you are seeking. Prices are indicative.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.keys(treatmentPrices).map((name, idx) => {
              const Icon = treatmentIcons[name] || Activity;
              return (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={name}
                  onClick={() => { setTreatment(name); setError(''); }}
                  className={`p-4 rounded-xl flex items-start gap-4 text-left transition-all border ${
                    treatment === name 
                      ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 ring-1 ring-primary/50' 
                      : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <div className={`p-3 rounded-xl shrink-0 transition-colors ${treatment === name ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted/80 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <span className={`font-bold text-sm block transition-colors ${treatment === name ? 'text-primary' : 'text-foreground'}`}>{name}</span>
                    <span className="text-xs text-muted-foreground block mt-1">Duration: ~45 Mins</span>
                    <span className="text-sm font-extrabold text-primary block mt-2">INR {treatmentPrices[name]}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <div className="flex justify-between pt-6">
            {onCancel ? (
              <button
                onClick={onCancel}
                className="px-5 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted text-sm flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div></div>
            )}
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 flex items-center gap-1.5 text-sm shadow-md"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT DOCTOR */}
      {step === 2 && (
        <div className="space-y-6 text-left">
          <div>
            <h2 className="text-xl font-bold text-foreground">Select Specialist</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose a doctor for your {treatment} treatment.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {doctors.map((doc) => (
              <button
                key={doc.id}
                onClick={() => { setSelectedDoctorId(doc.id); setError(''); }}
                className={`p-4 border rounded-xl flex items-center gap-4 text-left transition-all ${
                  selectedDoctorId === doc.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border bg-card hover:bg-muted/50'
                }`}
              >
                <img src={doc.imageUrl} alt={doc.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-bold text-sm block">{doc.name}</span>
                  <span className="text-xs text-primary block">{doc.specialization}</span>
                  <span className="text-[10px] text-muted-foreground block line-clamp-1">{doc.bio}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleBack}
              className="px-5 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted text-sm flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 flex items-center gap-1.5 text-sm"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PICK SLOT */}
      {step === 3 && (
        <div className="space-y-6 text-left">
          <div>
            <h2 className="text-xl font-bold text-foreground">Pick Date & Time</h2>
            <p className="text-sm text-muted-foreground mt-1">Doctor: <span className="font-bold text-primary">{selectedDoctor?.name}</span></p>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">1. Select Date</span>
              <div className="grid grid-cols-4 gap-2">
                {datesOptions.map((date) => (
                  <button
                    key={date.formatted}
                    onClick={() => { setSelectedDate(date.formatted); setSelectedTime(''); setError(''); }}
                    className={`p-2.5 border rounded-xl text-center flex flex-col justify-center gap-1 transition-all ${
                      selectedDate === date.formatted 
                        ? 'border-primary bg-primary/5 shadow-sm' 
                        : 'border-border bg-card hover:bg-muted/50'
                    }`}
                  >
                    <span className="text-xs font-bold block">{date.label.split(',')[0]}</span>
                    <span className="text-[10px] text-muted-foreground block">{date.label.split(',')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">2. Available Time Slots</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {slots.map((time) => (
                    <button
                      key={time}
                      onClick={() => { setSelectedTime(time); setError(''); }}
                      className={`p-2.5 border rounded-xl text-center text-xs font-semibold transition-all ${
                        selectedTime === time 
                          ? 'border-primary bg-primary/5 shadow-sm' 
                          : 'border-border bg-card hover:bg-muted/50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleBack}
              className="px-5 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted text-sm flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 flex items-center gap-1.5 text-sm"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PATIENT DETAILS */}
      {step === 4 && (
        <div className="space-y-6 text-left">
          <div>
            <h2 className="text-xl font-bold text-foreground">Patient Information</h2>
            <p className="text-sm text-muted-foreground mt-1">Please enter patient identity details. We will text confirmations on this number.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <div className="space-y-1.5">
              <label htmlFor="patient-name" className="text-xs font-bold text-foreground/80">Full Name *</label>
              <input
                type="text"
                id="patient-name"
                required
                value={patientDetails.name}
                onChange={e => setPatientDetails({ ...patientDetails, name: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary"
                placeholder="e.g. Priya Patel"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="patient-phone" className="text-xs font-bold text-foreground/80">Phone Number *</label>
              <input
                type="tel"
                id="patient-phone"
                required
                value={patientDetails.phone}
                onChange={e => setPatientDetails({ ...patientDetails, phone: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary"
                placeholder="e.g. +91 98200-xxxxx"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="patient-email" className="text-xs font-bold text-foreground/80">Email Address</label>
              <input
                type="email"
                id="patient-email"
                value={patientDetails.email}
                onChange={e => setPatientDetails({ ...patientDetails, email: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary"
                placeholder="e.g. priya@gmail.com"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="patient-notes" className="text-xs font-bold text-foreground/80">Notes / Symptoms (Optional)</label>
              <textarea
                id="patient-notes"
                value={patientDetails.notes}
                onChange={e => setPatientDetails({ ...patientDetails, notes: e.target.value })}
                rows={3}
                className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary resize-none"
                placeholder="Briefly state if tooth pain is present, or sensitivities..."
              />
            </div>
          </form>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleBack}
              className="px-5 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted text-sm flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 flex items-center gap-1.5 text-sm"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: FINAL CONFIRMATION */}
      {step === 5 && (
        <div className="space-y-6 text-left">
          <div>
            <h2 className="text-xl font-bold text-foreground">Confirm Appointment</h2>
            <p className="text-sm text-muted-foreground mt-1">Please review details before submission.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex gap-3 pb-3 border-b border-border">
              <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Treatment</span>
                <span className="font-bold text-sm text-foreground">{treatment}</span>
              </div>
            </div>

            <div className="flex gap-3 pb-3 border-b border-border">
              <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Doctor</span>
                <span className="font-bold text-sm text-foreground">{selectedDoctor?.name}</span>
                <span className="text-xs text-muted-foreground block">{selectedDoctor?.specialization}</span>
              </div>
            </div>

            <div className="flex gap-3 pb-3 border-b border-border">
              <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground block">Scheduled Time</span>
                <span className="font-bold text-sm text-foreground">{selectedDate} at {selectedTime}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-muted-foreground font-bold uppercase">Estimated Bill</span>
              <span className="text-lg font-extrabold text-primary">INR {treatmentPrices[treatment]}</span>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleBack}
              className="px-5 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted text-sm flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 disabled:opacity-50 text-sm"
            >
              {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: BOOKING SUCCESS & AUTOMATION UI SIMULATION */}
      {step === 6 && bookingResult && (
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
          
          <div className="space-y-2">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-foreground"
            >
              Appointment Received
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-muted-foreground max-w-sm mx-auto"
            >
              Thank you! Your appointment with {selectedDoctor?.name} has been processed.
            </motion.p>
          </div>

          {/* Animated Automation Nodes */}
          <div className="bg-card border border-border rounded-2xl p-5 text-left space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-blue-500 opacity-50"></div>
            
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-6">
              <Server className="h-4 w-4 text-primary" />
              Live System Automations
            </h4>

            <div className="space-y-4 pl-4">
              {/* 1. SMS */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                  <Smartphone className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase block">SMS Dispatched</span>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">Sent to {patientDetails.phone} via Twilio API</p>
                </div>
              </motion.div>

              {/* 2. Email */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0 border border-orange-200 dark:border-orange-800">
                  <Mail className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-orange-700 dark:text-orange-400 uppercase block">Email Sent</span>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">Sent to {patientDetails.email || 'patient'} via SendGrid</p>
                </div>
              </motion.div>

              {/* 3. WhatsApp Confirmation */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 border border-green-200 dark:border-green-800">
                  <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase block">WhatsApp Confirmation</span>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">Rich media message sent to {patientDetails.phone}</p>
                </div>
              </motion.div>

              {/* 4. Calendly Event */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 3.2, duration: 0.4 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                  <CalendarDays className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase block">Calendly Synced</span>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">Added to {selectedDoctor?.name}'s calendar slot at {selectedTime}</p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.0 }}
            onClick={onSuccess}
            className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 transition-all text-sm shadow-md"
          >
            Return to Homepage
          </motion.button>
        </div>
      )}

    </div>
  );
};
