import { useState, useEffect } from 'react';
import { DatabaseProvider, useDatabase } from './context/DatabaseContext';
import { Navbar } from './components/Navbar';
import { BookingWizard } from './components/BookingWizard';
import { PatientPortal } from './components/PatientPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { AIReceptionist } from './components/AIReceptionist';

import { Home } from './components/pages/Home';
import { Treatments } from './components/pages/Treatments';
import { About } from './components/pages/About';
import { SmileGallery } from './components/pages/SmileGallery';
import { Contact } from './components/pages/Contact';

import { Settings, User, Database, Sparkles, Stethoscope, X } from 'lucide-react';

function DemoController({ currentView, setCurrentView }: { currentView: string; setCurrentView: (view: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLocalMock } = useDatabase();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* 1. Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-slate-900 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center border border-slate-800 hover:bg-slate-800 group"
          aria-label="Open Demo Controller"
        >
          <Settings className="h-6 w-6 text-emerald-400 animate-[spin_8s_linear_infinite]" />
          <div className="absolute left-14 bg-slate-900 border border-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
            Demo Controller Panel
          </div>
        </button>
      )}

      {/* 2. Expanded Controller Card */}
      {isOpen && (
        <div className="w-[calc(100vw-3rem)] sm:w-80 max-w-sm bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-left">
          {/* Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-emerald-400" />
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 leading-none">Demo Controller</h4>
                <p className="text-[10px] text-slate-400 mt-1">Switch view roles to test backend systems</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Database Status Indicator */}
          <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800 text-[10px] flex justify-between items-center text-slate-300">
            <span>System Database:</span>
            <span className={`font-bold flex items-center gap-1 ${isLocalMock ? 'text-amber-400' : 'text-emerald-400'}`}>
              <Database className="h-3 w-3" />
              {isLocalMock ? 'Local Mock (Fallback)' : 'Live Supabase'}
            </span>
          </div>

          {/* Roles Selector */}
          <div className="p-4 space-y-3">
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
              <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-normal">Customer facing</span>
            </button>

            <button
              onClick={() => { setCurrentView('patient'); setIsOpen(false); }}
              className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex justify-between items-center transition-all ${
                currentView === 'patient'
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                  : 'border-slate-800 bg-slate-900/30 text-slate-300 hover:bg-slate-900/60'
              }`}
            >
              <span className="flex items-center gap-2">
                <User className="h-4 w-4 text-emerald-400" />
                Patient Portal
              </span>
              <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-normal">Mock profiles</span>
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
                Doctor Panel
              </span>
              <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-normal">Schedule board</span>
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
                Admin CRM & AI Desk
              </span>
              <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-normal">Leads / Reviews</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [showDemoBanner, setShowDemoBanner] = useState(true);

  // States to pass treatment/doctor from quick-book actions
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
      {showDemoBanner && (
        <div className="bg-slate-900 text-white text-[11px] sm:text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 relative z-50 border-b border-slate-850">
          <div className="flex items-center gap-2 text-center sm:text-left justify-center">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="font-medium text-slate-200">
              💡 <span className="font-extrabold text-emerald-400 uppercase tracking-wide">SmartDocSystem Showcase:</span> This is a live demonstration clinic site of our <span className="font-bold text-emerald-400">AI Growth System</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/919820022334?text=Hi!%20I'm%20a%20dentist%20and%20I'd%20love%20to%20get%20more%20details%20on%20installing%20the%20AI%20Growth%20System%20for%2520my%20clinic."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-3 py-1 rounded-lg transition-all text-[10px] sm:text-[11px] shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
            >
              Get AI System for My Clinic →
            </a>
            <button 
              onClick={() => setShowDemoBanner(false)}
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close demo banner"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <Navbar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="pb-16">
        {currentView === 'home' && (
          <Home 
            setCurrentView={setCurrentView}
            setSelectedTreatment={setSelectedTreatment}
            setSelectedDoctorId={setSelectedDoctorId}
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

      {/* Floating 24/7 AI receptionist overlay */}
      <AIReceptionist />

      {/* Floating Demo Control Panel (Bottom-Left) */}
      <DemoController currentView={currentView} setCurrentView={setCurrentView} />
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
