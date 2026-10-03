import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Shield, Brain, Award, Star, 
  Stethoscope, CheckCircle2, Medal, Sparkles, MapPin
} from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';

interface AboutProps {
  setCurrentView: (view: string) => void;
  setSelectedDoctorId?: (id: string) => void;
}

export const About: React.FC<AboutProps> = ({ 
  setCurrentView,
  setSelectedDoctorId 
}) => {
  const { doctors, activeClinic } = useDatabase();

  const handleQuickBook = (doctorId?: string) => {
    if (doctorId && setSelectedDoctorId) setSelectedDoctorId(doctorId);
    setCurrentView('booking');
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      {/* 1. Hero & Story Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/0 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-semibold mx-auto">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>
                {activeClinic.key === 'Dentoplay' 
                  ? 'Premier Pediatric & Family Dental Studio' 
                  : activeClinic.key === 'DelhiDental' 
                  ? '16+ Years Specialist Orthodontics & Implants' 
                  : activeClinic.key === 'HollywoodSmile' 
                  ? '21+ Years International Practice (Germany & Dubai)' 
                  : activeClinic.key === 'PainlessDental' 
                  ? '14+ Years of Clinical Excellence' 
                  : activeClinic.key === 'ManglaDental' 
                  ? '22+ Years of Clinical Mastery' 
                  : '30+ Years of Clinical Practice'} • {activeClinic.name}
              </span>
            </div>

            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Master Craftsmanship in <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300">
                {activeClinic.key === 'Dentoplay' 
                  ? 'Fear-Free Pediatric & Preventive Dentistry' 
                  : activeClinic.key === 'DelhiDental' 
                  ? 'Invisalign Mastery & Implantology' 
                  : activeClinic.key === 'HollywoodSmile' 
                  ? 'Porcelain Veneers & Smile Makeovers' 
                  : activeClinic.key === 'PainlessDental' 
                  ? 'Painless Surgery & Smile Aesthetics' 
                  : 'Cosmetic & Restorative Dentistry'}
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Founded by <strong className="text-foreground">{activeClinic.doctorName}</strong>, {activeClinic.name} has served patients across {activeClinic.location} with clinical excellence. We combine advanced restorative precision, cutting-edge equipment, and 24/7 intelligent patient triage.
            </motion.p>
            <motion.div variants={fadeIn} className="flex justify-center gap-4 pt-2">
              <button 
                onClick={() => handleQuickBook()}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                Schedule Consultation with {activeClinic.doctorName.split(' ')[1] || 'Doctor'}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Mission & Patient First Promise */}
      <section className="py-20 bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeIn} className="space-y-8 text-left">
              <div>
                <h2 className="text-3xl font-extrabold mb-4">Our Clinical Philosophy</h2>
                <p className="text-lg text-muted-foreground">
                  Preserving natural tooth structure and delivering aesthetic harmony without overtreatment. Every veneer, crown, and implant is planned with microscopic precision.
                </p>
              </div>
              
              <div className="space-y-6 bg-background p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Heart className="h-7 w-7 text-primary" />
                  The {activeClinic.name} Promise
                </h3>
                <ul className="space-y-4">
                  {[
                    "Gentle, anxiety-free treatments with personalized attention",
                    "In-house master ceramist precision for natural-looking crowns & veneers",
                    "Transparent treatment plans with zero hidden charges",
                    "24/7 WhatsApp triage for late-night dental emergencies & slot booking"
                  ].map((promise, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-foreground font-medium">{promise}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" alt="Clinical precision" className="rounded-2xl h-64 object-cover w-full shadow-lg" />
              <img src="https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?auto=format&fit=crop&q=80&w=600" alt="Doctor consultation" className="rounded-2xl h-64 object-cover w-full shadow-lg translate-y-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Technology & Equipment */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-4">Precision Diagnostics &amp; Sterilization</h2>
            <p className="text-muted-foreground text-lg">Hospital-grade sterilization protocols and high-definition imaging ensure exceptional safety and predictable outcomes.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: "24/7 AI WhatsApp Engine",
                desc: "Never miss a late-night patient query. Instant symptom triage and slot confirmations in 30 seconds."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "3D Digital Implant Planning",
                desc: "Precise guided implant placement ensuring maximum bone density preservation and longevity."
              },
              {
                icon: <Stethoscope className="h-8 w-8" />,
                title: "In-House Aesthetic Ceramic Lab",
                desc: "Custom shade matching and master hand-layered porcelain crowns for flawless smile makeovers."
              }
            ].map((tech, i) => (
              <motion.div key={i} variants={fadeIn} className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md group text-left">
                <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{tech.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Doctor Spotlight */}
      <section className="py-24 bg-card/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-4">Meet the Lead Surgeon</h2>
            <p className="text-muted-foreground text-lg">
              {activeClinic.key === 'PainlessDental'
                ? 'Multi-specialist clinical team covering Painless Oral Surgery, Pedodontics, and Prosthodontics in Sohna, Gurugram.'
                : activeClinic.key === 'ManglaDental' 
                ? 'Senior clinical leadership with over 22 years of prosthetic and surgical mastery in Sector 31, Gurugram.' 
                : 'Senior clinical leadership with over three decades of trusted dental care in Gurugram.'}
            </p>
          </motion.div>

          {/* Lead Doctor Highlight */}
          {doctors.length > 0 && (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "100px" }}
              variants={staggerContainer}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl mb-16 max-w-5xl mx-auto"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative min-h-[380px]">
                  <img 
                    src={doctors[0].imageUrl} 
                    alt={doctors[0].name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 left-4 bg-emerald-500 text-slate-950 px-4 py-1 rounded-full text-xs font-black shadow-md font-mono">
                    {activeClinic.key === 'PainlessDental' ? '14+ Years Practice' : activeClinic.key === 'ManglaDental' ? '22+ Years Legacy' : '30+ Years Practice'}
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center space-y-6 text-left">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{doctors[0].name}</h3>
                    <p className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">{doctors[0].specialization}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {activeClinic.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-500 font-semibold bg-yellow-500/10 w-fit px-3 py-1 rounded-full text-xs">
                    <Star className="h-4 w-4 fill-current" />
                    {activeClinic.key === 'PainlessDental' ? '4.8 (49+ Google Reviews • Sohna)' : activeClinic.key === 'ManglaDental' ? '5.0 (22+ Years Legacy in Sector 31)' : '5.0 (30+ Years Clinical Reputation)'}
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {doctors[0].bio}
                  </p>
                  <div className="p-4 bg-muted/40 rounded-2xl border border-border text-xs text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Consultation Fee:</span>
                      <strong className="text-foreground font-mono">₹{activeClinic.consultationFee}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Clinic Location:</span>
                      <strong className="text-foreground">{activeClinic.location}</strong>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <button 
                      onClick={() => handleQuickBook(doctors[0].id)}
                      className="px-7 py-3.5 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all cursor-pointer shadow-lg"
                    >
                      Book Consultation Slot
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Rest of the Team Grid */}
          {doctors.length > 1 && (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {doctors.slice(1).map((doc) => (
                <motion.div key={doc.id} variants={fadeIn} className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow group text-left">
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-16">
                      <h4 className="text-white font-bold text-lg">{doc.name}</h4>
                      <p className="text-emerald-400 text-xs font-semibold">{doc.specialization}</p>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">{doc.bio}</p>
                    <button
                      onClick={() => handleQuickBook(doc.id)}
                      className="w-full py-2.5 border border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors text-xs cursor-pointer"
                    >
                      Select Specialist
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* 5. Journey Timeline */}
      <section className="py-24 bg-card/20 border-b border-border overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-4">
              {activeClinic.key === 'ManglaDental' ? '22+ Years of Clinical Mastery' : '3 Decades of Excellence'}
            </h2>
            <p className="text-muted-foreground text-lg">A trusted legacy of restoring smiles across Gurugram.</p>
          </motion.div>

          <div className="relative border-l-2 border-primary/30 ml-4 md:ml-[50%] space-y-12 pb-8">
            {(activeClinic.key === 'ManglaDental' ? [
              { year: "2004", title: "Practice Established in Sector 31", desc: "Dr. Asheesh Mangla (MDS Prosthodontics) founded the clinic near HUDA Market with a commitment to specialized, pain-free restorative care." },
              { year: "2012", title: "3D Guided Implant Centre", desc: "Expanded into advanced computer-guided dental implants, bone grafting, and full-mouth rehabilitation." },
              { year: "2019", title: "Digital Zirconia & Aesthetic Lab", desc: "Upgraded to high-precision computerized CAD/CAM prosthetics and immediate fixed teeth solutions." },
              { year: "2026", title: "24/7 Clinical Triage Engine", desc: "Integrated intelligent WhatsApp triage to screen after-hours surgical inquiries with 100% doctor calendar protection." }
            ] : [
              { year: "1994", title: "Practice Established", desc: "Dr. Anjali Aggarwal established Sita Dental Clinic with a commitment to ethical, pain-free dentistry." },
              { year: "2005", title: "Galleria Market Expansion", desc: "Moved to Galleria Commercial Complex, DLF Phase IV, serving premier NCR residents." },
              { year: "2018", title: "Aesthetic & Implants Upgrade", desc: "Incorporated advanced 3D digital smile design and single-sitting endodontics." },
              { year: "2026", title: "24/7 Smart WhatsApp Booking", desc: "Automated after-hours patient inquiries with instant triage and slot booking." }
            ]).map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative pl-8 md:pl-0 text-left"
              >
                <div className="absolute left-[-9px] md:left-0 md:-ml-[9px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20 z-10" />
                
                <div className={`md:w-[calc(100%-2rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right md:-ml-full md:absolute md:top-0' : 'md:pl-12 md:ml-auto'} space-y-1`}>
                  <span className="text-primary font-mono font-bold text-lg">{item.year}</span>
                  <h4 className="text-xl font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className={`hidden md:block ${i % 2 === 0 ? 'h-24' : ''}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Certificates & Recognition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-4">Certified Clinical Standards</h2>
            <p className="text-muted-foreground text-lg">Stringent sterilization and clinical hygiene benchmarks.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: <Shield className="h-8 w-8" />, name: "Class B Autoclave", desc: "100% Hospital Sterilization" },
              { icon: <Medal className="h-8 w-8" />, name: "IDA Member", desc: "Indian Dental Association" },
              { icon: <Award className="h-8 w-8" />, name: activeClinic.key === 'ManglaDental' ? '22+ Years Trust' : '30+ Years Trust', desc: activeClinic.key === 'ManglaDental' ? 'Sector 31 Landmark' : 'DLF Phase 4 Landmark' },
              { icon: <Star className="h-8 w-8" />, name: "5.0★ Rating", desc: "Verified Patient Feedback" }
            ].map((cert, i) => (
              <motion.div key={i} variants={fadeIn} className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl hover:shadow-lg transition-shadow hover:border-primary/50 group">
                <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <h4 className="font-bold text-base mb-1">{cert.name}</h4>
                <p className="text-xs text-muted-foreground">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 border-t border-border bg-card/20 text-center text-xs text-muted-foreground">
        <p>&copy; 2026 {activeClinic.name} ({activeClinic.location}). Powered by AutoBuild Buddy 24/7 AI Growth Engine.</p>
      </footer>
    </div>
  );
};
