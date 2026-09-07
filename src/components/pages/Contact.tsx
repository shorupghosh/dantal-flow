import React, { useState } from 'react';
import { Phone, MapPin, Mail, CheckCircle2, Clock, AlertCircle, Calendar, Clock4, MessageCircle, Sparkles } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const Contact: React.FC = () => {
  const { addLead, activeClinic } = useDatabase();
  const [contactForm, setContactForm] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    treatment: '',
    preferredDate: '',
    preferredTime: '',
    message: '' 
  });
  const [submittedContact, setSubmittedContact] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;
    
    await addLead({
      name: contactForm.name,
      email: contactForm.email,
      phone: contactForm.phone,
      source: 'Website',
      status: 'New Lead',
      message: `Treatment: ${contactForm.treatment} | Date: ${contactForm.preferredDate} | Time: ${contactForm.preferredTime} | Msg: ${contactForm.message || "No message"}`
    });

    setSubmittedContact(true);
    setContactForm({ name: '', email: '', phone: '', treatment: '', preferredDate: '', preferredTime: '', message: '' });
  };

  return (
    <div className="bg-background text-foreground transition-colors duration-300 relative">
      
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-primary/5 border-b border-border">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-semibold mx-auto">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{activeClinic.name} • {activeClinic.location}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Schedule Consultation with <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent">{activeClinic.doctorName}</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Reserve your clinical appointment slot or connect with our team directly on WhatsApp for instant confirmation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Clinic Information */}
            <div className="lg:col-span-5 text-left space-y-10">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight mb-4">
                  Clinic Location &amp; Hours
                </h2>
                <p className="text-muted-foreground mb-8 text-sm">
                  Conveniently situated in the prime commercial hub of {activeClinic.location}.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Clinic Address</span>
                      <span className="font-bold text-base block">{activeClinic.name}</span>
                      <span className="text-sm text-foreground/80">{activeClinic.location}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Phone / WhatsApp Booking</span>
                      <a href={`tel:${activeClinic.phone}`} className="font-bold text-lg block text-foreground hover:text-primary transition-colors">
                        {activeClinic.phone}
                      </a>
                      <span className="text-xs text-emerald-400 font-semibold">24/7 WhatsApp Assistant Active</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Clinic Working Hours</span>
                      <span className="font-bold text-sm block">Monday – Saturday: 10:00 AM – 8:00 PM</span>
                      <span className="font-bold text-sm block text-muted-foreground">Sunday: By Prior Appointment</span>
                      <span className="text-xs text-emerald-400 block mt-1">
                        ★ After 8 PM: WhatsApp Engine answers in 5 seconds
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Instant Slot Booking</span>
                      <span className="font-bold text-sm block">1-Tap WhatsApp Triage</span>
                      <span className="text-xs text-muted-foreground">Get your appointment slot locked in under 30 seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Form */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 shadow-xl shadow-primary/5 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 blur-2xl"></div>
                
                {submittedContact ? (
                  <div className="py-20 text-center space-y-6">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <h4 className="text-2xl font-bold text-foreground">Appointment Request Received!</h4>
                    <p className="text-base text-muted-foreground max-w-md mx-auto">
                      Thank you for choosing {activeClinic.name}. Our front desk team will contact you on WhatsApp shortly to confirm your booking date and time.
                    </p>
                    <button 
                      onClick={() => setSubmittedContact(false)}
                      className="mt-6 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors text-xs"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold">Book Consultation</h3>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        Fee: ₹{activeClinic.consultationFee}
                      </span>
                    </div>

                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-semibold text-foreground/80 block">Full Name *</label>
                          <input 
                            type="text" 
                            id="name"
                            required
                            value={contactForm.name}
                            onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="e.g. Pooja Sharma"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-xs font-semibold text-foreground/80 block">WhatsApp Number *</label>
                          <input 
                            type="tel" 
                            id="phone"
                            required
                            value={contactForm.phone}
                            onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                            className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="e.g. +91 98183 XXXXX"
                          />
                        </div>
                      </div>

                      {/* Email & Treatment */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-semibold text-foreground/80 block">Email Address</label>
                          <input 
                            type="email" 
                            id="email"
                            value={contactForm.email}
                            onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="e.g. pooja@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="treatment" className="text-xs font-semibold text-foreground/80 block">Treatment of Interest</label>
                          <select
                            id="treatment"
                            value={contactForm.treatment}
                            onChange={e => setContactForm({ ...contactForm, treatment: e.target.value })}
                            className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                          >
                            <option value="">Select a treatment</option>
                            <option value="Cosmetic Veneers & Smile Makeover">Cosmetic Veneers &amp; Smile Makeover</option>
                            <option value="Dental Implants (3D Guided)">Dental Implants (3D Guided)</option>
                            <option value="Single Sitting Root Canal">Single Sitting Root Canal</option>
                            <option value="Clear Aligners / Invisible Braces">Clear Aligners / Invisible Braces</option>
                            <option value="Crowns & Ceramic Bridges">Crowns &amp; Ceramic Bridges</option>
                            <option value="Comprehensive Dental Checkup">Comprehensive Dental Checkup</option>
                          </select>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2 relative">
                          <label htmlFor="date" className="text-xs font-semibold text-foreground/80 block">Preferred Date</label>
                          <div className="relative">
                            <input 
                              type="date" 
                              id="date"
                              value={contactForm.preferredDate}
                              onChange={e => setContactForm({ ...contactForm, preferredDate: e.target.value })}
                              className="w-full bg-background border border-border pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>
                        <div className="space-y-2 relative">
                          <label htmlFor="time" className="text-xs font-semibold text-foreground/80 block">Preferred Time</label>
                          <div className="relative">
                            <input 
                              type="time" 
                              id="time"
                              value={contactForm.preferredTime}
                              onChange={e => setContactForm({ ...contactForm, preferredTime: e.target.value })}
                              className="w-full bg-background border border-border pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <Clock4 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-semibold text-foreground/80 block">Message or Symptoms</label>
                        <textarea 
                          id="message"
                          rows={3}
                          value={contactForm.message}
                          onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-background border border-border px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all"
                          placeholder="Describe any symptoms, tooth pain, or desired cosmetic outcome..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/95 transition-all text-sm shadow-lg shadow-primary/25 cursor-pointer"
                      >
                        Confirm Appointment Request
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="border-y border-border">
        <div className="w-full h-[400px] bg-muted relative">
          <div className="absolute top-6 left-6 z-10 bg-background/90 backdrop-blur-sm p-4 border border-border rounded-2xl shadow-lg max-w-xs hidden sm:block text-left">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-1">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">{activeClinic.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeClinic.location}
                </p>
                <a href="https://maps.google.com/?q=Galleria+Market+DLF+Phase+4+Gurugram" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary mt-2 inline-block hover:underline">Open in Google Maps →</a>
              </div>
            </div>
          </div>
          {/* Gurugram DLF Phase 4 Map Embed */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.478950669869!2d77.08051747614066!3d28.46510309165706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18de38988629%3A0xe543fa0f6d611b8a!2sDLF%20Galleria%20Market!5e0!3m2!1sen!2sin!4v1721245000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale opacity-90 contrast-125 dark:invert dark:hue-rotate-180"
          ></iframe>
        </div>
      </section>

      {/* Sticky WhatsApp Direct Button */}
      <a 
        href={`https://wa.me/${activeClinic.phone.replace(/[^0-9]/g, '')}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-[5.5rem] right-6 z-50 p-4 bg-[#25D366] text-slate-950 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 fill-slate-950 stroke-none" />
        <span className="absolute right-full mr-4 bg-background border border-border text-foreground px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          Chat with {activeClinic.doctorName.split(' ')[1] || 'Clinic'}
        </span>
      </a>

      {/* Footer */}
      <footer className="py-8 bg-card border-t border-border text-center text-xs text-muted-foreground">
        <p>&copy; 2026 {activeClinic.name} ({activeClinic.location}). Powered by AutoBuild Buddy 24/7 AI Growth Engine.</p>
      </footer>
    </div>
  );
};
