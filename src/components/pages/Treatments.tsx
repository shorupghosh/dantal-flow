import React, { useState } from 'react';
import { ChevronDown, Clock, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

interface TreatmentsProps {
  setCurrentView: (view: string) => void;
  setSelectedTreatment?: (treatment: string) => void;
}

export const Treatments: React.FC<TreatmentsProps> = ({ 
  setCurrentView, 
  setSelectedTreatment
}) => {
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
      name: "Smile Design",
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
      name: "Braces",
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
      name: "Root Canal",
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
      name: "Dental Crowns",
      shortDesc: "Custom-crafted caps to protect, cover, and restore damaged teeth.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
      benefits: ["Protects weak teeth", "Restores broken teeth", "Improves appearance and shape", "Durable porcelain materials"],
      process: "Tooth Preparation → Digital Impression → Temporary Crown → Final Placement",
      duration: "2 Visits",
      recovery: "Mild sensitivity for a few days after preparation.",
      faq: { q: "How long do dental crowns last?", a: "With good oral hygiene and regular check-ups, high-quality porcelain crowns can last 10-15 years or even a lifetime." }
    },
    {
      id: "bridges",
      name: "Dental Bridges",
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
      name: "Teeth Whitening",
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Our Services
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight mb-6">
            Complete Dental <span className="text-primary">Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From routine care to advanced full-mouth reconstructions, our expert team utilizes 
            state-of-the-art technology to deliver exceptional, pain-free results.
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
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="text-3xl font-bold text-white mb-2">{treatment.name}</h2>
                      <p className="text-white/80 text-lg">{treatment.shortDesc}</p>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col space-y-8">
                  {/* Benefits */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">Key Benefits</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {treatment.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process */}
                  <div className="bg-card/50 rounded-2xl p-6 border border-border">
                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Treatment Process
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{treatment.process}</p>
                  </div>

                  {/* Duration & Recovery */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Duration
                      </h4>
                      <p className="text-muted-foreground text-sm">{treatment.duration}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Recovery
                      </h4>
                      <p className="text-muted-foreground text-sm">{treatment.recovery}</p>
                    </div>
                  </div>

                  {/* FAQ & CTA */}
                  <div className="pt-6 border-t border-border">
                    <div className="mb-6">
                      <h4 className="text-base font-bold text-foreground mb-2">Q: {treatment.faq.q}</h4>
                      <p className="text-muted-foreground text-sm italic">A: {treatment.faq.a}</p>
                    </div>
                    <button
                      onClick={() => handleQuickBook(treatment.name)}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                    >
                      Book {treatment.name}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-card border-t border-border relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">
            Not sure which treatment is right for you?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Schedule a comprehensive consultation. Our experts will evaluate your oral health 
            and design a personalized treatment plan just for you.
          </p>
          <button
            onClick={() => handleQuickBook()}
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-foreground text-background font-bold text-lg rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get Expert Opinion
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 DentalFlow AI. Built with premium medical design. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

