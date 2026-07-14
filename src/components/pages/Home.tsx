import React, { useState } from 'react';
import { Star, MessageSquare, ArrowRight, Shield, Clock, Award, Activity, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

interface HomeProps {
  setCurrentView: (view: string) => void;
  setSelectedTreatment?: (treatment: string) => void;
  setSelectedDoctorId?: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ 
  setCurrentView, 
  setSelectedTreatment,
  setSelectedDoctorId 
}) => {
  const { reviews } = useDatabase();
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleQuickBook = (treatment?: string, doctorId?: string) => {
    if (treatment && setSelectedTreatment) setSelectedTreatment(treatment);
    if (doctorId && setSelectedDoctorId) setSelectedDoctorId(doctorId);
    setCurrentView('booking');
  };

  const serviceCards = [
    {
      title: "Dental Implants",
      desc: "Permanent, natural-looking replacement for missing teeth.",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Dental Implants"
    },
    {
      title: "Smile Makeover",
      desc: "Complete transformation of your smile using digital design.",
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Dental Crowns"
    },
    {
      title: "Teeth Whitening",
      desc: "Professional laser whitening for a radiant, bright smile.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Teeth Whitening"
    },
    {
      title: "Veneers",
      desc: "Custom porcelain shells to correct chips and gaps instantly.",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600",
      treatmentRef: "Dental Crowns"
    }
  ];

  const whyChooseUs = [
    { icon: <Activity className="h-6 w-6" />, title: "Modern Equipment", desc: "State-of-the-art diagnostic and surgical tools." },
    { icon: <Shield className="h-6 w-6" />, title: "Pain Free Dentistry", desc: "Advanced anesthesia and microsurgical techniques." },
    { icon: <Award className="h-6 w-6" />, title: "Experienced Doctors", desc: "Specialists with over 15 years of clinical excellence." },
    { icon: <CheckCircle2 className="h-6 w-6" />, title: "Flexible EMI", desc: "0% interest financing for major treatments." },
    { icon: <Clock className="h-6 w-6" />, title: "Same Day Consultation", desc: "Book instantly using our AI receptionist 24/7." },
    { icon: <Star className="h-6 w-6" />, title: "Digital Smile Design", desc: "Visualize your final results before starting." }
  ];

  const mockPatientPhotos = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
  ];

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 lg:pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/clinic_hero_bg.png" 
            alt="Premium clinic interior" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/80 md:bg-background/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="space-y-6 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-foreground">
                Get Your Perfect Smile with <br/>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Expert Cosmetic & Implant Dentistry
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl font-medium">
                Personalized treatments, modern technology, and beautiful results. Book your consultation today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => handleQuickBook()}
                  className="px-8 py-4 bg-[#22c55e] text-white font-semibold rounded-xl shadow-lg shadow-green-500/20 hover:bg-[#16a34a] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  Book Consultation
                </button>
                <a
                  href="https://wa.me/919820022334"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-white border border-gray-200 text-gray-800 font-semibold rounded-xl shadow-sm hover:bg-gray-50 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-5 w-5 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-y border-border bg-card shadow-sm z-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x-0 md:divide-x divide-border">
            <div className="flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-3xl font-extrabold text-primary">5000+</span>
              <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Happy Patients</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-3xl font-extrabold text-primary">15+</span>
              <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Years Experience</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-3xl font-extrabold text-primary">4.9</span>
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 mb-1" />
              </div>
              <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Google Rating</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-1">
              <span className="text-3xl font-extrabold text-primary">100%</span>
              <span className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Digital Dentistry</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services Preview */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl text-left space-y-4">
              <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
                Premium Dental Services
              </h2>
              <p className="text-muted-foreground">
                We specialize in comprehensive smile restorations and cosmetic enhancements.
              </p>
            </div>
            <button 
              onClick={() => setCurrentView('treatments')}
              className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Services <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCards.map((srv, idx) => (
              <div key={idx} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <img 
                    src={srv.image} 
                    alt={srv.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-left space-y-3">
                  <h3 className="text-xl font-bold text-foreground">{srv.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{srv.desc}</p>
                  <button 
                    onClick={() => {
                      setCurrentView('treatments');
                      if (setSelectedTreatment) setSelectedTreatment(srv.treatmentRef);
                    }}
                    className="mt-4 flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform"
                  >
                    Learn More <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <button 
              onClick={() => setCurrentView('treatments')}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View All Services <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us */}
      <section className="py-20 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Why Choose DentalFlow
            </h2>
            <p className="text-muted-foreground">
              Experience the highest standard of dental care with our patient-first approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {whyChooseUs.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="p-3 bg-primary/10 text-primary rounded-xl h-fit shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Before & After Preview Slider */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12 space-y-4">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Real Transformations
            </h2>
            <p className="text-muted-foreground">
              Witness the power of expert cosmetic dentistry. Slide to see the difference.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border group select-none">
              {/* After Image (Background) */}
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200" 
                alt="After" 
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                After
              </div>
              
              {/* Before Image (Foreground, clipped) */}
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=1200" 
                  alt="Before" 
                  className="absolute inset-0 w-[100vw] max-w-[48rem] h-full object-cover"
                  style={{ width: '100%', maxWidth: '100%' }}
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                  Before
                </div>
              </div>

              {/* Slider Control */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white text-primary rounded-full shadow-lg flex items-center justify-center">
                  <span className="text-xl font-bold tracking-tighter">⟷</span>
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
            className="px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors inline-flex items-center gap-2"
          >
            View More Results <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* 5. Testimonials (Patient Cards) */}
      <section className="py-20 bg-card/20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
              Patient Success Stories
            </h2>
            <p className="text-muted-foreground">
              Don't just take our word for it. Hear what our patients have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.slice(0, 3).map((rev, idx) => (
              <div key={rev.id} className="bg-background border border-border rounded-2xl p-6 text-left flex flex-col justify-between shadow-sm relative mt-8">
                {/* Patient Photo Floating */}
                <div className="absolute -top-8 left-6">
                  <img 
                    src={mockPatientPhotos[idx % mockPatientPhotos.length]} 
                    alt={rev.patientName} 
                    className="w-16 h-16 rounded-full border-4 border-background object-cover shadow-sm"
                  />
                </div>
                
                <div className="pt-8">
                  <div className="flex items-center gap-1 text-yellow-500 mb-4">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm italic text-foreground/80 leading-relaxed">"{rev.comment}"</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border flex flex-col space-y-1">
                  <h5 className="font-bold text-base text-foreground">{rev.patientName}</h5>
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Treated For:</span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      {idx === 0 ? "Implants" : idx === 1 ? "Invisalign" : "Whitening"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI Chatbot Section */}
      <section className="py-20 bg-background overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6 text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
                <MessageCircle className="h-4 w-4" />
                Available 24/7
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Smart AI Receptionist
              </h2>
              <p className="text-muted-foreground text-lg">
                Get instant answers to your pricing and treatment questions, and book your consultation in seconds.
              </p>
              
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => handleQuickBook()}
                  className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/95 transition-all shadow-lg"
                >
                  Book Automatically
                </button>
                <a
                  href="https://wa.me/919820022334"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="h-5 w-5 text-[#25D366]" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Chatbot Mockup */}
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl -z-10 transform translate-y-10"></div>
              <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 max-w-md mx-auto space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="p-2 bg-primary/10 text-primary rounded-full">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">DentalFlow AI Assistant</h4>
                    <span className="text-xs text-green-500 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                      How much does an implant cost?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-muted border border-border text-foreground text-sm px-4 py-3 rounded-2xl rounded-tl-sm max-w-[90%] shadow-sm leading-relaxed">
                      Implant treatment starts from <strong>₹35,000</strong> depending on your specific case. <br/><br/>
                      Would you like to schedule a free consultation to get an exact estimate?
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex gap-2">
                  <button onClick={() => handleQuickBook()} className="flex-1 py-2 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-colors">
                    Yes, book now
                  </button>
                  <button className="flex-1 py-2 border border-border text-foreground/80 text-xs font-bold rounded-lg hover:bg-muted transition-colors">
                    Ask more details
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Final CTA Section */}
      <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground text-center">
        {/* Background decorative patterns */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] rounded-full bg-white blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready for Your New Smile?
          </h2>
          <p className="text-lg md:text-xl font-medium text-primary-foreground/80 max-w-2xl mx-auto">
            Take the first step towards a confident, radiant smile. Book your consultation with our expert team today.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleQuickBook()}
              className="px-8 py-4 bg-background text-foreground font-bold rounded-xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              Book Consultation Now <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 DentalFlow AI. Built with premium medical design. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
