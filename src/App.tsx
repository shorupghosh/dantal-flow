import { useState, useEffect } from 'react';
import { DatabaseProvider } from './context/DatabaseContext';
import { Navbar } from './components/Navbar';
import { BookingWizard } from './components/BookingWizard';
import { PatientPortal } from './components/PatientPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { LeadBot } from './components/LeadBot';

import { Home } from './components/pages/Home';
import { Treatments } from './components/pages/Treatments';
import { About } from './components/pages/About';
import { SmileGallery } from './components/pages/SmileGallery';
import { Contact } from './components/pages/Contact';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

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
      <LeadBot />
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
