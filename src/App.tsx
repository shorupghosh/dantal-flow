import { useState, useEffect } from 'react';
import { DatabaseProvider, useDatabase } from './context/DatabaseContext';
import { Navbar } from './components/Navbar';
import { BookingWizard } from './components/BookingWizard';
import { PatientPortal } from './components/PatientPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { AIReceptionist } from './components/AIReceptionist';
import { LiveWhatsAppSimulator } from './components/WhatsAppEngine/LiveWhatsAppSimulator';
import { ClinicCustomizerModal } from './components/ClinicCustomizerModal';

import { Home } from './components/pages/Home';
import { Treatments } from './components/pages/Treatments';
import { About } from './components/pages/About';
import { SmileGallery } from './components/pages/SmileGallery';
import { Contact } from './components/pages/Contact';

import { Settings, User, Database, Sparkles, Stethoscope, X, MessageSquare } from 'lucide-react';

function DemoController({ 
  currentView, 
  setCurrentView,
  onOpenSimulator,
  onOpenCustomizer
}: { 
  currentView: string; 
  setCurrentView: (view: string) => void;
  onOpenSimulator: () => void;
  onOpenCustomizer: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, activeClinic } = useDatabase();

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* 1. Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 sm:p-3.5 bg-slate-950 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border-2 border-emerald-500/40 hover:bg-slate-900 group cursor-pointer"
          aria-label="Open Demo Controller"
        >
          <Settings className="h-5 w-5 text-emerald-400 animate-[spin_10s_linear_infinite]" />
          <div className="absolute left-14 bg-slate-950 border border-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none">
            ⚡ Demo Controller &amp; Clinic Switcher
          </div>
        </button>
      )}

      {/* 2. Expanded Controller Card */}
      {isOpen && (
        <div className="w-[calc(100vw-3rem)] sm:w-80 max-w-sm bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left">
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-emerald-400" />
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 leading-none">Demo Controller</h4>
                <p className="text-[10px] text-slate-400 mt-1">Switch views &amp; test 24/7 AI systems</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Active Clinic Bar */}
          <div className="px-4 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 text-xs flex justify-between items-center text-emerald-300">
            <div className="truncate pr-2">
              <span className="font-bold text-white block text-[11px] truncate">{activeClinic.name}</span>
              <span className="text-[9.5px] text-emerald-400/80 truncate block">{activeClinic.doctorName}</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenCustomizer();
              }}
              className="px-2 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded-lg transition-all shrink-0 cursor-pointer"
            >
              Change
            </button>
          </div>

          {/* 1-Click WhatsApp Simulator Launcher */}
          <div className="p-3 border-b border-slate-800 bg-slate-900/50">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenSimulator();
              }}
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/10 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              Test 24/7 WhatsApp Simulator
            </button>
          </div>

          {/* Roles Selector */}
          <div className="p-4 space-y-2.5">
            <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 block">Select View Experience</span>
            
            <button
              onClick={() => { setCurrentView('home'); setIsOpen(false); }}
              className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex justify-between items-center transition-all ${
                currentView === 'home' || currentView === 'booking' || currentView === 'treatments' || currentView === 'about' || currentView === 'gallery' || currentView === 'contact'
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-900/30 text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-400" />
                Patient View (Landing Site)
              </span>
              <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-normal">Live site</span>
            </button>

            <button
              onClick={() => { setCurrentView('doctor'); setIsOpen(false); }}
              className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex justify-between items-center transition-all ${
                currentView === 'doctor'
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-900/30 text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-emerald-400" />
                Doctor Schedule Board
              </span>
              <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-normal">Doctor POV</span>
            </button>

            <button
              onClick={() => { setCurrentView('admin'); setIsOpen(false); }}
              className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex justify-between items-center transition-all ${
                currentView === 'admin'
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-900/30 text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Admin CRM &amp; AI Desk
              </span>
              <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-normal">PIN 1234</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AppContent() {
  const { activeClinic, setActiveClinic } = useDatabase();
  const [currentView, setCurrentView] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(true);

  // Sync page title with active clinic
  useEffect(() => {
    document.title = `${activeClinic.name} | ${activeClinic.doctorName} (Gurugram)`;
  }, [activeClinic]);
  
  // Modals
  const [showWhatsAppSimulator, setShowWhatsAppSimulator] = useState(false);
  const [showClinicCustomizer, setShowClinicCustomizer] = useState(false);

  // Quick booking state
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');

  // Handle dark mode side-effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Top Demo Showcase Banner */}
      {showDemoBanner && (
        <div className="bg-slate-950 text-white text-[11px] sm:text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 relative z-50 border-b border-slate-800">
          <div className="flex items-center gap-2 text-center sm:text-left justify-center">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <p className="font-medium text-slate-200">
              💡 <span className="font-extrabold text-emerald-400 uppercase tracking-wide">AutoBuild Buddy Live Showcase:</span> Demonstrating the <span className="font-bold text-emerald-400">24/7 WhatsApp Patient Booking Engine</span> for {activeClinic.name}.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowClinicCustomizer(true)}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-2.5 py-1 rounded-lg transition-all text-[10px] sm:text-[11px] border border-slate-700 cursor-pointer"
            >
              Switch Clinic (Preset)
            </button>
            <button
              onClick={() => setShowWhatsAppSimulator(true)}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold px-3 py-1 rounded-lg transition-all text-[10px] sm:text-[11px] shadow-lg shadow-green-500/10 cursor-pointer"
            >
              Test WhatsApp Engine →
            </button>
            <button 
              onClick={() => setShowDemoBanner(false)}
              className="text-slate-400 hover:text-white transition-colors p-1 sm:p-0 cursor-pointer"
              aria-label="Close banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenSimulator={() => setShowWhatsAppSimulator(true)}
        onOpenCustomizer={() => setShowClinicCustomizer(true)}
      />

      <main className="pb-16">
        {currentView === 'home' && (
          <Home 
            setCurrentView={setCurrentView}
            setSelectedTreatment={setSelectedTreatment}
            setSelectedDoctorId={setSelectedDoctorId}
            onOpenSimulator={() => setShowWhatsAppSimulator(true)}
          />
        )}
        
        {currentView === 'treatments' && (
          <Treatments 
            setCurrentView={setCurrentView}
            setSelectedTreatment={setSelectedTreatment}
          />
        )}

        {currentView === 'about' && (
          <About 
            setCurrentView={setCurrentView}
            setSelectedDoctorId={setSelectedDoctorId}
          />
        )}

        {currentView === 'gallery' && (
          <SmileGallery 
            setCurrentView={setCurrentView}
            setSelectedTreatment={setSelectedTreatment}
          />
        )}

        {currentView === 'contact' && (
          <Contact />
        )}

        {currentView === 'booking' && (
          <BookingWizard 
            initialTreatment={selectedTreatment}
            initialDoctorId={selectedDoctorId}
            onSuccess={() => {
              setSelectedTreatment('');
              setSelectedDoctorId('');
              setCurrentView('home');
            }}
            onCancel={() => {
              setSelectedTreatment('');
              setSelectedDoctorId('');
              setCurrentView('home');
            }}
          />
        )}

        {currentView === 'patient' && (
          <PatientPortal />
        )}

        {(currentView === 'admin' || currentView === 'doctor') && (
          <AdminDashboard />
        )}
      </main>

      {/* Floating 24/7 WhatsApp AI Widget (Bottom-Right) */}
      <AIReceptionist onOpenSimulator={() => setShowWhatsAppSimulator(true)} />

      {/* Dual-Screen 24/7 WhatsApp Engine Simulator Modal */}
      <LiveWhatsAppSimulator 
        isOpen={showWhatsAppSimulator}
        onClose={() => setShowWhatsAppSimulator(false)}
        clinicName={activeClinic.name}
        doctorName={activeClinic.doctorName}
        clinicLocation={activeClinic.location}
      />

      {/* White-Label Clinic Customizer Modal */}
      <ClinicCustomizerModal 
        isOpen={showClinicCustomizer}
        onClose={() => setShowClinicCustomizer(false)}
        activeConfig={activeClinic}
        onSelectConfig={setActiveClinic}
      />

      {/* Floating Demo Control Panel (Bottom-Left) */}
      <DemoController 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onOpenSimulator={() => setShowWhatsAppSimulator(true)}
        onOpenCustomizer={() => setShowClinicCustomizer(true)}
      />
    </div>
  );
}

function App() {
  return (
    <DatabaseProvider>
      <AppContent />
    </DatabaseProvider>
  );
}

export default App;
