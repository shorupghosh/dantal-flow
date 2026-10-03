import React, { useState } from 'react';
import { Star, MessageSquare, ArrowRight, Shield, Clock, Award, Activity, CheckCircle2, ChevronRight, MessageCircle, Smartphone, Sparkles, Zap } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
import { WhatsAppEngineSection } from '../WhatsAppEngineSection';
import { RevenueLeakCalculator } from '../RevenueLeakCalculator';

interface HomeProps {
  setCurrentView: (view: string) => void;
  setSelectedTreatment?: (treatment: string) => void;
  setSelectedDoctorId?: (id: string) => void;
  onOpenSimulator?: () => void;
}

export const Home: React.FC<HomeProps> = ({ 
  setCurrentView, 
  setSelectedTreatment,
  setSelectedDoctorId,
  onOpenSimulator
}) => {
  const { reviews, activeClinic, doctors } = useDatabase();
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleQuickBook = (treatment?: string, doctorId?: string) => {
    if (treatment && setSelectedTreatment) setSelectedTreatment(treatment);
    if (doctorId && setSelectedDoctorId) setSelectedDoctorId(doctorId);
    setCurrentView('booking');
  };

  const serviceCards = activeClinic.key === 'PainlessDental' ? [
    {
      title: "Painless Wisdom Tooth Surgery",
      desc: "Surgical impactions & third molar extractions with computerized gentle anesthesia.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Emergency Pain Triage",
      price: "From ₹4,500"
    },
    {
      title: "Painless Dental Implants",
      desc: "Permanent single-tooth & full arch guided implants with natural bite strength.",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Dental Implants",
      price: "From ₹25,000"
    },
    {
      title: "Pediatric & Gentle Kids Dentistry",
      desc: "Fear-free treatments for children and teens led by our Consultant Pedodontist.",
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Routine Clean & Check (₹1,500)",
      price: "From ₹1,500"
    },
    {
      title: "Single-Sitting Painless RCT",
      desc: "Rotary microscopic root canal therapy saving infected natural teeth with zero pain.",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Root Canal Therapy",
      price: "From ₹4,000"
    }
  ] : [
    {
      title: "Dental Implants",
      desc: "Single-tooth & full arch 3D guided implants with lifetime warranty.",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Dental Implants",
      price: "From ₹65,000"
    },
    {
      title: "Smile Makeover & Veneers",
      desc: "Complete aesthetic transformation of your smile using digital smile design.",
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Dental Crowns",
      price: "From ₹15,000 / tooth"
    },
    {
      title: "Clear Aligners & Braces",
      desc: "Invisible aligners with 3D digital simulation & 0% Bajaj Finserv EMI.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Orthodontic Braces",
      price: "From ₹80,000"
    },
    {
      title: "Root Canal Therapy",
      desc: "Single-sitting rotary endodontics with zero pain microsurgical tech.",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Root Canal Therapy",
      price: "From ₹12,000"
    }
  ];

  const whyChooseUs = [
    { icon: <Award className="h-6 w-6" />, title: activeClinic.doctorTitle, desc: `Led by ${activeClinic.doctorName} with personalized patient care.` },
    { icon: <Shield className="h-6 w-6" />, title: "Pain Free Dentistry", desc: "Advanced anesthesia and microsurgical techniques." },
    { icon: <Activity className="h-6 w-6" />, title: "3D Digital Precision", desc: "State-of-the-art diagnostic and CBCT surgical planning tools." },
    { icon: <CheckCircle2 className="h-6 w-6" />, title: "Bajaj Finserv 0% EMI", desc: "No-cost monthly payment plans starting from ₹3,500/month." },
    { icon: <Clock className="h-6 w-6" />, title: "24/7 WhatsApp Booking", desc: "Book consultation slots in 30 seconds, even after 8 PM." },
    { icon: <Star className="h-6 w-6" />, title: "5.0 Rated Patient Trust", desc: "Hundreds of verified Google reviews across NCR." }
  ];

  const mockPatientPhotos = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  ];

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28 lg:pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/clinic_hero_bg.png" 
            alt="Premium clinic interior" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/85 md:bg-background/70 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6 text-left">
              
              {/* Locality & Doctor Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>{activeClinic.name} • {activeClinic.location}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-foreground">
                Premier Cosmetic &amp; Implant Dentistry by <br/>
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent">
                  {activeClinic.doctorName}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl font-medium leading-relaxed">
                Personalized restorative smile transformations, 3D CBCT guided implants, and pain-free treatments. Verified 5.0 Google rating in {activeClinic.location.split(',')[0]}.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <button
                  onClick={() => handleQuickBook()}
                  className="px-7 py-4 bg-primary text-primary-foreground font-bold rounded-2xl shadow-xl hover:bg-primary/95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  Book Consultation Slot
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => onOpenSimulator?.()}
                  className="px-7 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold rounded-2xl shadow-xl shadow-green-500/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105"
                >
                  <MessageSquare className="h-5 w-5 text-slate-950 fill-slate-950" />
                  Test 24/7 WhatsApp Engine
                </button>
              </div>

              <div className="pt-2 flex items-center gap-6 text-xs text-muted-foreground font-mono">
                <span className="flex items-center gap-1 text-emerald-400 font-bold">
                  ✓ Instant Clinical Triage
                </span>
                <span className="flex items-center gap-1 text-teal-400 font-bold">
                  {activeClinic.key === 'PainlessDental' ? '✓ 100% Zero-Pain Protocol' : activeClinic.key === 'ManglaDental' ? '✓ 100% Doctor Calendar Control' : '✓ 100% Front Desk Control'}
                </span>
                <span className="hidden sm:flex items-center gap-1 text-blue-400 font-bold">
                  {activeClinic.key === 'PainlessDental' ? '✓ Eldeco / Sohna Specialist' : activeClinic.key === 'ManglaDental' ? '✓ Zero Auto-Booking' : '✓ 100% DPDPA Secure'}
                </span>
              </div>
            </div>

            {/* Quick Doctor Mini Card (Right) */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-card/90 backdrop-blur-md border border-border rounded-3xl p-6 shadow-2xl space-y-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md">
                    <img 
                      src={doctors[0]?.imageUrl || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"} 
                      alt={activeClinic.doctorName}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground">{activeClinic.doctorName}</h4>
                    <p className="text-xs text-primary font-semibold">{activeClinic.doctorTitle.split('(')[0]}</p>
                    <div className="flex items-center text-yellow-500 text-xs font-bold mt-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 mr-1" />
                      {activeClinic.key === 'PainlessDental' ? '4.8 (49+ Google Reviews)' : activeClinic.key === 'ManglaDental' ? '5.0 (500+ Patients • 22+ Yrs)' : '5.0 (300+ Patients)'}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-muted/60 rounded-xl border border-border text-xs text-muted-foreground space-y-1">
                  <div className="flex justify-between">
                    <span>Consultation:</span>
                    <strong className="text-foreground font-mono">₹{activeClinic.consultationFee}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Timings:</span>
                    <strong className="text-foreground font-mono">{activeClinic.key === 'PainlessDental' ? 'Mon–Sat: 10 AM – 8 PM' : activeClinic.key === 'ManglaDental' ? 'Mon–Sat: Closes 8:30 PM' : 'Mon–Sat: Closes 8 PM'}</strong>
                  </div>
                  <div className="flex justify-between text-emerald-500 font-bold pt-1 border-t border-border">
                    <span>After-Hours Inquiries:</span>
                    <span>24/7 WhatsApp AI Active</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenSimulator?.()}
                  className="w-full py-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-[#25D366]/30 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  Simulate WhatsApp Booking
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="py-7 border-y border-border bg-card/60 shadow-sm z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x-0 md:divide-x divide-border">
            <div className="flex flex-col items-center justify-center text-center space-y-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-primary">5000+</span>
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Treated Patients</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-primary">30+ Yrs</span>
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Clinical Practice</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-0.5">
              <div className="flex items-center gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-primary">5.0</span>
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mb-0.5" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Google Rating</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-500">24/7</span>
              <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">WhatsApp Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "HOW THE 24/7 WHATSAPP ENGINE WORKS" CORE SHOWCASE SECTION */}
      <WhatsAppEngineSection 
        onOpenSimulator={() => onOpenSimulator?.()} 
        clinicName={activeClinic.name}
        doctorName={activeClinic.doctorName}
      />

      {/* 3. High-Ticket Clinical Services Showcase */}
      <section className="py-16 bg-muted/20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div className="max-w-2xl text-left space-y-3">
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                High-Value Clinical Treatments
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Specialized restorative, implant, and aesthetic treatments delivered by {activeClinic.doctorName}.
              </p>
            </div>
            <button 
              onClick={() => setCurrentView('treatments')}
              className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors text-sm"
            >
              View All Procedures <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((srv, idx) => (
              <div key={idx} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img 
                      src={srv.image} 
                      alt={srv.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-sm text-emerald-400 text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg border border-slate-800">
                      {srv.price}
                    </div>
                  </div>
                  <div className="p-5 text-left space-y-2">
                    <h3 className="text-base font-bold text-foreground leading-snug">{srv.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{srv.desc}</p>
                  </div>
                </div>
                <div className="p-5 pt-0 text-left">
                  <button 
                    onClick={() => {
                      setCurrentView('treatments');
                      if (setSelectedTreatment) setSelectedTreatment(srv.treatmentRef);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform cursor-pointer"
                  >
                    Explore Clinical Details <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AFTER-8 PM REVENUE LEAKAGE CALCULATOR */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevenueLeakCalculator onOpenSimulator={() => onOpenSimulator?.()} />
      </section>

      {/* 5. Before & After Transformation Slider */}
      <section className="py-16 bg-card/30 border-y border-border text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-10 space-y-3">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Verified Smile Transformations
            </h2>
            <p className="text-muted-foreground text-sm">
              Slide horizontally to witness cosmetic smile rehabilitation results at {activeClinic.name}.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border group select-none">
              <img 
                src="/images/teeth_after_aligners.png" 
                alt="After" 
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 font-mono">
                After
              </div>
              
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img 
                  src="/images/teeth_before_aligners.png" 
                  alt="Before" 
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ width: '100%', maxWidth: '100%' }}
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 font-mono">
                  Before
                </div>
              </div>

              {/* Slider Control */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-white text-slate-950 rounded-full shadow-2xl flex items-center justify-center font-bold">
                  ⟷
                </div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPosition} 
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              />
            </div>
          </div>

          <button
            onClick={() => setCurrentView('gallery')}
            className="px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors inline-flex items-center gap-2 text-xs"
          >
            View Smile Portfolio <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 6. Patient Reviews Grid */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Patient Experiences at {activeClinic.name}
            </h2>
            <p className="text-muted-foreground text-sm">
              Real feedback from verified patients across {activeClinic.key === 'PainlessDental' ? 'Eldeco Accolade, Sohna Rural, and South Gurugram.' : activeClinic.key === 'ManglaDental' ? 'Sector 31, HUDA Market, South City 1, and Gurugram.' : 'DLF Phase 4, Golf Course Road, and NCR.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((rev, idx) => (
              <div key={rev.id} className="bg-card border border-border rounded-2xl p-6 text-left flex flex-col justify-between shadow-sm relative mt-6">
                <div className="absolute -top-6 left-6">
                  <img 
                    src={mockPatientPhotos[idx % mockPatientPhotos.length]} 
                    alt={rev.patientName} 
                    className="w-12 h-12 rounded-full border-2 border-background object-cover shadow-md"
                  />
                </div>
                
                <div className="pt-6 space-y-3">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-xs italic text-foreground/90 leading-relaxed">"{rev.comment}"</p>
                </div>
                
                <div className="mt-5 pt-3 border-t border-border flex justify-between items-center text-xs">
                  <span className="font-bold text-foreground">{rev.patientName}</span>
                  <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-mono font-bold">
                    ✓ Verified Patient
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Conversion Section */}
      <section className="py-20 relative overflow-hidden bg-primary text-primary-foreground text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to Schedule with {activeClinic.doctorName}?
          </h2>
          <p className="text-base sm:text-lg font-medium text-primary-foreground/90 max-w-xl mx-auto">
            Experience gentle, master-crafted clinical dentistry in {activeClinic.location}.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleQuickBook()}
              className="px-8 py-4 bg-background text-foreground font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Book In-Clinic Consultation <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onOpenSimulator?.()}
              className="px-8 py-4 bg-[#25D366] text-slate-950 font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <MessageSquare className="h-4 w-4" />
              Chat via 24/7 WhatsApp Engine
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card/40 text-center text-xs text-muted-foreground">
        <p>&copy; 2026 {activeClinic.name} ({activeClinic.location}). Powered by AutoBuild Buddy 24/7 AI Growth Engine.</p>
      </footer>

    </div>
  );
};
