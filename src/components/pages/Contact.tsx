import React, { useState } from 'react';
import { Phone, MapPin, Mail, CheckCircle2, Clock, AlertCircle, Calendar, Clock4, MessageCircle } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

export const Contact: React.FC = () => {
  const { addLead } = useDatabase();
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
      <section className="relative py-24 overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Contact & <span className="text-primary">Book Consultation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Schedule your appointment or reach out to our team. We're here to provide you with the best dental care in Gurugram.
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
                  Clinic Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our state-of-the-art clinic is conveniently located in Golf Course Road, Gurugram. We offer flexible hours to accommodate your schedule.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Phone Number</span>
                      <span className="font-bold text-lg block">+91 98200-22334</span>
                      <span className="text-sm text-muted-foreground">Available 9 AM - 9 PM</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Email Address</span>
                      <span className="font-bold text-lg block">support@dentalflow.com</span>
                      <span className="text-sm text-muted-foreground">We reply within 2 hours</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Clinic Hours</span>
                      <span className="font-bold block">Saturday - Thursday: 9:00 AM - 9:00 PM</span>
                      <span className="font-bold block">Friday: 3:00 PM - 9:00 PM</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-destructive/10 text-destructive rounded-xl shrink-0">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground block mb-1">Emergency Contact</span>
                      <span className="font-bold text-lg block text-destructive">+91 98200-99999</span>
                      <span className="text-sm text-muted-foreground">24/7 for severe pain or trauma</span>
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
                      Thank you for choosing DentalFlow. Our reception team will contact you shortly to confirm your booking date and time.
                    </p>
                    <button 
                      onClick={() => setSubmittedContact(false)}
                      className="mt-6 px-6 py-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold mb-8">Book a Consultation</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-semibold text-foreground/80 block">Full Name *</label>
                          <input 
                            type="text" 
                            id="name"
                            required
                            value={contactForm.name}
                            onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full bg-background border border-border px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="e.g. Rahul Sharma"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-semibold text-foreground/80 block">Phone Number *</label>
                          <input 
                            type="tel" 
                            id="phone"
                            required
                            value={contactForm.phone}
                            onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                            className="w-full bg-background border border-border px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="e.g. +91 98200-34567"
                          />
                        </div>
                      </div>

                      {/* Email & Treatment */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-semibold text-foreground/80 block">Email Address</label>
                          <input 
                            type="email" 
                            id="email"
                            value={contactForm.email}
                            onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-background border border-border px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="e.g. rahul@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="treatment" className="text-sm font-semibold text-foreground/80 block">Treatment of Interest</label>
                          <select
                            id="treatment"
                            value={contactForm.treatment}
                            onChange={e => setContactForm({ ...contactForm, treatment: e.target.value })}
                            className="w-full bg-background border border-border px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                          >
                            <option value="">Select a treatment</option>
                            <option value="General Checkup">General Checkup</option>
                            <option value="Dental Implants">Dental Implants</option>
                            <option value="Smile Design">Smile Design</option>
                            <option value="Orthodontics (Braces/Aligners)">Orthodontics (Braces/Aligners)</option>
                            <option value="Teeth Whitening">Teeth Whitening</option>
                            <option value="Root Canal">Root Canal</option>
                            <option value="Crowns & Bridges">Crowns & Bridges</option>
                            <option value="Other">Other / Not Sure</option>
                          </select>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2 relative">
                          <label htmlFor="date" className="text-sm font-semibold text-foreground/80 block">Preferred Date</label>
                          <div className="relative">
                            <input 
                              type="date" 
                              id="date"
                              value={contactForm.preferredDate}
                              onChange={e => setContactForm({ ...contactForm, preferredDate: e.target.value })}
                              className="w-full bg-background border border-border pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>
                        <div className="space-y-2 relative">
                          <label htmlFor="time" className="text-sm font-semibold text-foreground/80 block">Preferred Time</label>
                          <div className="relative">
                            <input 
                              type="time" 
                              id="time"
                              value={contactForm.preferredTime}
                              onChange={e => setContactForm({ ...contactForm, preferredTime: e.target.value })}
                              className="w-full bg-background border border-border pl-11 pr-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <Clock4 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-semibold text-foreground/80 block">Message or Symptoms</label>
                        <textarea 
                          id="message"
                          rows={4}
                          value={contactForm.message}
                          onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full bg-background border border-border px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all"
                          placeholder="Please describe any symptoms, pain, or specific requirements..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/95 transition-all text-base shadow-lg shadow-primary/25 hover:shadow-primary/40"
                      >
                        Submit Request
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
        <div className="w-full h-[500px] bg-muted relative">
          <div className="absolute top-6 left-6 z-10 bg-background/90 backdrop-blur-sm p-4 border border-border rounded-2xl shadow-lg max-w-xs hidden sm:block">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0 mt-1">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">DentalFlow Clinic</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Golf Course Road, Sector 54<br/>
                  Gurugram 122011, India
                </p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary mt-2 inline-block hover:underline">Get Directions →</a>
              </div>
            </div>
          </div>
          {/* Placeholder for Google Map - using an iframe of Gurugram */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.918844321356!2d77.09886365!3d28.44857755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19641773a4b9%3A0x868b446101967265!2sSector%2054%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1721245000000!5m2!1sen!2sin" 
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

      {/* Sticky WhatsApp Button */}
      <a 
        href="https://wa.me/919820022334" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-[5.5rem] right-6 z-50 p-4 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-[#25D366]/40 transition-all duration-300 group flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-full mr-4 bg-background border border-border text-foreground px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
          Chat with us
        </span>
      </a>

      {/* Footer */}
      <footer className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 DentalFlow AI. Built with premium medical design. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
