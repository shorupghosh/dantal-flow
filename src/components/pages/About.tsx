import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Shield, Brain, MessageSquare, Award, Play, Star, 
  Stethoscope, Clock, CheckCircle2, ChevronRight, Quote, Medal
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
  const { doctors } = useDatabase();

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
            className="text-center max-w-4xl mx-auto space-y-8"
          >
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Redefining the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Dental Experience</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our story began with a simple belief: going to the dentist shouldn't be a source of anxiety. We combined state-of-the-art medical technology with AI-driven hospitality to create a clinic where clinical excellence meets unparalleled comfort.
            </motion.p>
            <motion.div variants={fadeIn} className="flex justify-center gap-4 pt-4">
              <button 
                onClick={() => handleQuickBook()}
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Experience the Difference
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
            <motion.div variants={fadeIn} className="space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground">To deliver world-class dental care in a zero-stress environment, utilizing artificial intelligence to streamline processes so our doctors can focus 100% on you.</p>
              </div>
              
              <div className="space-y-6 bg-background p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Heart className="h-7 w-7 text-primary" />
                  The Patient First Promise
                </h3>
                <ul className="space-y-4">
                  {[
                    "Transparent pricing with no hidden fees",
                    "Pain-free treatments using the latest anesthetics",
                    "Zero waiting times thanks to AI scheduling",
                    "Comprehensive post-treatment care and follow-ups"
                  ].map((promise, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-secondary shrink-0" />
                      <span className="text-foreground font-medium">{promise}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600" alt="Happy patient" className="rounded-2xl h-64 object-cover w-full shadow-lg" />
              <img src="https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?auto=format&fit=crop&q=80&w=600" alt="Dentist consulting" className="rounded-2xl h-64 object-cover w-full shadow-lg translate-y-8" />
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
            <h2 className="text-3xl font-extrabold mb-4">Technology Meets Dentistry</h2>
            <p className="text-muted-foreground text-lg">We invest in the most advanced dental technology to ensure faster, safer, and more accurate treatments.</p>
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
                title: "AI-Powered Diagnostics",
                desc: "Our AI systems analyze X-rays with millimeter precision to detect issues invisible to the human eye."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "3D CBCT Scanning",
                desc: "Complete 3D mapping of your jaw structure for perfectly guided implant placements."
              },
              {
                icon: <Stethoscope className="h-8 w-8" />,
                title: "Laser Dentistry",
                desc: "Minimally invasive laser treatments that reduce healing time and eliminate the need for stitches."
              }
            ].map((tech, i) => (
              <motion.div key={i} variants={fadeIn} className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors shadow-sm hover:shadow-md group">
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

      {/* 4. Clinic Tour */}
      <section className="py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <motion.div variants={fadeIn} className="flex-1 w-full relative">
              <div className="relative aspect-video rounded-3xl overflow-hidden group shadow-2xl border border-border">
                <img 
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200" 
                  alt="Clinic Tour" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="h-20 w-20 bg-white/90 backdrop-blur rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-xl">
                    <Play className="h-8 w-8 fill-primary text-primary ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="lg:w-1/3 space-y-6">
              <h2 className="text-3xl font-extrabold">A Space Designed for Healing</h2>
              <p className="text-muted-foreground text-lg">Take a virtual tour of our state-of-the-art facility. From our calming reception lounges to our surgically sterile operating rooms, every inch is optimized for your comfort and safety.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="p-1.5 bg-primary/20 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Ergonomic dental chairs</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1.5 bg-primary/20 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Private consultation rooms</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="p-1.5 bg-primary/20 rounded-full">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Ambient relaxation suites</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. Doctor Introduction & Meet Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-4">Meet the Experts</h2>
            <p className="text-muted-foreground text-lg">Our doctors are globally trained specialists who combine immense clinical experience with a gentle, patient-first approach.</p>
          </motion.div>

          {/* Lead Doctor Highlight */}
          {doctors.length > 0 && (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "100px" }}
              variants={staggerContainer}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg mb-16"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative">
                  <img src={doctors[0].imageUrl} alt={doctors[0].name} className="w-full h-full object-cover min-h-[400px]" />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold shadow-md">
                    Chief Medical Director
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{doctors[0].name}</h3>
                    <p className="text-primary font-semibold uppercase tracking-wider">{doctors[0].specialization}</p>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-500 font-semibold bg-yellow-500/10 w-fit px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 fill-current" />
                    {doctors[0].rating} Patient Rating
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {doctors[0].bio}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => handleQuickBook(doctors[0].id)}
                      className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Rest of the Team Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {doctors.slice(1).map((doc) => (
              <motion.div key={doc.id} variants={fadeIn} className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden aspect-square">
                  <img src={doc.imageUrl} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-20">
                    <h4 className="text-white font-bold text-xl">{doc.name}</h4>
                    <p className="text-primary/90 font-medium">{doc.specialization}</p>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">{doc.bio}</p>
                  <button
                    onClick={() => handleQuickBook(doc.id)}
                    className="w-full py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Select Doctor
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Timeline */}
      <section className="py-24 bg-card/30 border-y border-border overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg">A legacy of smiles, built over years of dedication.</p>
          </motion.div>

          <div className="relative border-l-2 border-primary/30 ml-3 md:ml-[50%] space-y-12 pb-8">
            {[
              { year: "2018", title: "Foundation", desc: "Opened our first clinic with a vision to modernize dentistry." },
              { year: "2020", title: "Technology Integration", desc: "Introduced full 3D CBCT scanning and laser treatments." },
              { year: "2023", title: "AI Receptionist Launch", desc: "Revolutionized patient booking with our 24/7 AI-driven system." },
              { year: "2026", title: "Expansion & Excellence", desc: "Recognized as the region's top-rated specialized dental facility." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-9px] md:left-0 md:-ml-[9px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20 z-10" />
                
                <div className={`md:w-[calc(100%-2rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right md:-ml-full md:absolute md:top-0' : 'md:pl-12 md:ml-auto'} space-y-2`}>
                  <span className="text-primary font-bold text-xl">{item.year}</span>
                  <h4 className="text-2xl font-bold">{item.title}</h4>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
                {/* Add spacing for desktop alternating layout to prevent overlap */}
                <div className={`hidden md:block ${i % 2 === 0 ? 'h-32' : ''}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Certificates & Awards */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-extrabold mb-4">Certified Excellence</h2>
            <p className="text-muted-foreground text-lg">Internationally recognized for clinical quality and patient safety.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: <Shield className="h-8 w-8" />, name: "ISO 9001:2015", desc: "Quality Management" },
              { icon: <Medal className="h-8 w-8" />, name: "JCI Accredited", desc: "Global Patient Safety" },
              { icon: <Award className="h-8 w-8" />, name: "Best Dental Clinic", desc: "National Health Awards 2025" },
              { icon: <Star className="h-8 w-8" />, name: "5-Star Excellence", desc: "Patient Satisfaction" }
            ].map((cert, i) => (
              <motion.div key={i} variants={fadeIn} className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-2xl hover:shadow-lg transition-shadow hover:border-primary/50 group">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {cert.icon}
                </div>
                <h4 className="font-bold text-lg mb-1">{cert.name}</h4>
                <p className="text-sm text-muted-foreground">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
