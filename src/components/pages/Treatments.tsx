import React, { useState } from 'react';
import { ChevronDown, Clock, Activity, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

interface TreatmentsProps {
  setCurrentView: (view: string) => void;
  setSelectedTreatment?: (treatment: string) => void;
}

export const Treatments: React.FC<TreatmentsProps> = ({ 
  setCurrentView, 
  setSelectedTreatment
}) => {
  const { activeClinic } = useDatabase();

  const handleQuickBook = (treatment?: string) => {
    if (treatment && setSelectedTreatment) setSelectedTreatment(treatment);
    setCurrentView('booking');
  };

  const treatmentsData = [
    {
      id: "implants",
      name: "Dental Implants",
      shortDesc: "Permanent, natural-looking replacements for missing teeth.",
      image: "/images/dental_implants_1784018986060.png",
      benefits: ["Restores full chewing power", "Prevents jawbone loss", "Lasts a lifetime", "Looks completely natural"],
      process: "3D Scan & Planning → Surgical Placement → Healing (3-4 months) → Custom Crown Attachment",
      duration: "3-4 Visits over 3-6 months",
      recovery: "Mild discomfort for 2-3 days. Soft food diet for 1 week.",
      faq: { q: "Is the implant procedure painful?", a: "No, the procedure is performed under local anesthesia. Most patients report it being less uncomfortable than a simple extraction." }
    },
    {
      id: "smile-design",
      name: "Smile Design & Veneers",
      shortDesc: "A complete aesthetic transformation tailored to your facial proportions.",
      image: "/images/smile_design_1784019314304.png",
      benefits: ["Customized to your facial structure", "Corrects multiple flaws at once", "Boosts self-confidence", "Predictable digital results"],
      process: "Digital Photography → 3D Digital Mockup → Patient Approval → Preparation & Final Placement",
      duration: "2-3 Visits",
      recovery: "Immediate recovery. Minor sensitivity for a few days.",
      faq: { q: "Can I see the final result before starting?", a: "Yes! We use advanced Digital Smile Design (DSD) software to show you a 3D simulation of your new smile before any treatment begins." }
    },
    {
      id: "braces",
      name: "Orthodontic Solutions",
      shortDesc: "Traditional and ceramic orthodontic solutions for perfect alignment.",
      image: "/images/braces_1784019323966.png",
      benefits: ["Handles complex bite issues", "Durable and highly effective", "Options for clear ceramic brackets", "Permanent alignment correction"],
      process: "Consultation & X-Rays → Bonding of Brackets → Monthly Adjustments → Removal & Retainers",
      duration: "12-24 months (depending on complexity)",
      recovery: "Soreness for 2-4 days after initial placement and adjustments.",
      faq: { q: "Do braces restrict what I can eat?", a: "You will need to avoid very hard, sticky, or chewy foods that could damage the brackets or wires." }
    },
    {
      id: "aligners",
      name: "Clear Aligners",
      shortDesc: "Invisible, removable orthodontic treatment for a straight smile.",
      image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=1200",
      benefits: ["Virtually invisible", "Removable for eating and cleaning", "More comfortable than wires", "Fewer clinic visits required"],
      process: "3D Digital Impression → Custom Aligner Fabrication → Switch trays every 1-2 weeks → Final Retainer",
      duration: "6-18 months",
      recovery: "Slight pressure for 1-2 days when switching to a new tray.",
      faq: { q: "How many hours a day do I need to wear aligners?", a: "For optimal results, aligners should be worn 20-22 hours a day, removed only for eating, brushing, and flossing." }
    },
    {
      id: "root-canal",
      name: "Single-Sitting Root Canal",
      shortDesc: "Advanced endodontic therapy to save an infected or damaged tooth.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200",
      benefits: ["Relieves severe tooth pain", "Saves the natural tooth", "Prevents spread of infection", "Restores normal chewing"],
      process: "Anesthesia & Isolation → Infection Removal & Cleaning → Filling Root Canals → Crown Placement",
      duration: "1-2 Visits (approx. 60 mins each)",
      recovery: "Tenderness for a few days. Managed with over-the-counter pain relief.",
      faq: { q: "Does a root canal hurt?", a: "With modern anesthesia and techniques, a root canal is virtually painless and feels similar to getting a routine filling." }
    },
    {
      id: "crowns",
      name: "Dental Crowns & Ceramic Bridges",
      shortDesc: "Custom-crafted caps to protect, cover, and restore damaged teeth.",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200",
      benefits: ["Protects weak teeth", "Restores broken teeth", "Improves appearance and shape", "Durable porcelain materials"],
      process: "Tooth Preparation → Digital Impression → Temporary Crown → Final Placement",
      duration: "2 Visits",
      recovery: "Mild sensitivity for a few days after preparation.",
      faq: { q: "How long do dental crowns last?", a: "With good oral hygiene and regular check-ups, high-quality porcelain crowns can last 10-15 years or even a lifetime." }
    },
    {
      id: "bridges",
      name: "Restorative Dental Bridges",
      shortDesc: "A fixed restoration to bridge the gap created by one or more missing teeth.",
      image: "/images/bridges_1784019333793.png",
      benefits: ["Restores your smile", "Maintains face shape", "Prevents remaining teeth from drifting", "Restores speaking and chewing"],
      process: "Abutment Teeth Preparation → Impressions → Temporary Bridge → Custom Bridge Cementation",
      duration: "2-3 Visits",
      recovery: "A few days to adjust to the feel of the new bridge.",
      faq: { q: "Is a bridge better than an implant?", a: "Bridges are faster and don't require surgery, but implants are often preferred as they don't require altering adjacent healthy teeth." }
    },
    {
      id: "whitening",
      name: "Laser Teeth Whitening",
      shortDesc: "Professional laser whitening for a dramatically brighter smile.",
      image: "https://images.unsplash.com/photo-1534608176107-b67f671733b3?auto=format&fit=crop&q=80&w=1200",
      benefits: ["Instantly brighter smile", "Removes stubborn stains", "Safe and supervised", "Boosts confidence"],
      process: "Gum Protection → Whitening Gel Application → Laser Activation (repeated 3-4 times in one session)",
      duration: "1 Visit (60 Minutes)",
      recovery: "Zero downtime. Transient sensitivity may occur for 24-48 hours.",
      faq: { q: "Is professional whitening safe for enamel?", a: "Yes! When performed by a dental professional, whitening is entirely safe and does not damage your tooth enamel." }
    }
  ];

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-card/30 border-b border-border">
        <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-semibold mx-auto">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Specialized Procedures • {activeClinic.name}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight">
            High-Value Clinical <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent">Procedures</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Led by {activeClinic.doctorName} with 30+ years of clinical mastery in {activeClinic.location}.
          </p>
        </div>
      </section>

      {/* Treatments List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {treatmentsData.map((treatment, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={treatment.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-start`}>
                
                {/* Image Section */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/5] shadow-2xl">
                    <img 
                      src={treatment.image} 
                      alt={treatment.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                      <h2 className="text-3xl font-bold text-white mb-2">{treatment.name}</h2>
                      <p className="text-white/80 text-base">{treatment.shortDesc}</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-8 text-left">
                  {/* Benefits */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">Key Benefits</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {treatment.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process */}
                  <div className="bg-card/50 rounded-2xl p-6 border border-border">
                    <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Treatment Protocol
                    </h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{treatment.process}</p>
                  </div>

                  {/* Duration & Recovery */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Duration
                      </h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">{treatment.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Recovery
                      </h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">{treatment.recovery}</p>
                    </div>
                  </div>

                  {/* Financing for major treatments */}
                  {(treatment.id === 'implants' || treatment.id === 'smile-design' || treatment.id === 'braces' || treatment.id === 'aligners') && (
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Flexible Payment</span>
                        <p className="text-xs font-bold mt-0.5">0% Interest EMI Plans Available</p>
                        <p className="text-[11px] text-muted-foreground">Easy monthly payment via Bajaj Finserv and major credit cards.</p>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold px-2 py-1 rounded">0% EMI</span>
                    </div>
                  )}

                  {/* FAQ & CTA */}
                  <div className="pt-4 border-t border-border">
                    <div className="mb-5">
                      <h4 className="text-sm font-bold text-foreground mb-1">Q: {treatment.faq.q}</h4>
                      <p className="text-muted-foreground text-xs italic">A: {treatment.faq.a}</p>
                    </div>
                    <button
                      onClick={() => handleQuickBook(treatment.name)}
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all text-xs sm:text-sm cursor-pointer"
                    >
                      Book Consultation for {treatment.name}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-card border-t border-border relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Consult Directly with {activeClinic.doctorName}
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Schedule a comprehensive in-clinic examination at {activeClinic.name}, {activeClinic.location}.
          </p>
          <button
            onClick={() => handleQuickBook()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-bold text-sm rounded-2xl shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            Book Clinical Examination
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background text-center text-xs text-muted-foreground">
        <p>&copy; 2026 {activeClinic.name} ({activeClinic.location}). Powered by AutoBuild Buddy 24/7 AI Growth Engine.</p>
      </footer>
    </div>
  );
};

