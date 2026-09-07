import React, { useState } from 'react';
import { Stethoscope, Menu, X, Sun, Moon, ChevronDown, MessageSquare, Building2 } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onOpenSimulator?: () => void;
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  setCurrentView, 
  darkMode, 
  setDarkMode,
  onOpenSimulator,
  onOpenCustomizer
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const { activeClinic } = useDatabase();

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setPortalDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Dynamic Clinic Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500 border border-emerald-500/20">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg text-foreground leading-none block">
                {activeClinic.name}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono block mt-0.5">
                {activeClinic.location.split(',')[0]} • 24/7 AI Engine
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-5">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-xs font-semibold transition-colors hover:text-primary ${currentView === 'home' ? 'text-primary font-bold' : 'text-foreground/75'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('treatments')}
              className={`text-xs font-semibold transition-colors hover:text-primary ${currentView === 'treatments' ? 'text-primary font-bold' : 'text-foreground/75'}`}
            >
              Treatments
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-xs font-semibold transition-colors hover:text-primary ${currentView === 'about' ? 'text-primary font-bold' : 'text-foreground/75'}`}
            >
              Doctor Profile
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`text-xs font-semibold transition-colors hover:text-primary ${currentView === 'gallery' ? 'text-primary font-bold' : 'text-foreground/75'}`}
            >
              Smile Gallery
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-xs font-semibold transition-colors hover:text-primary ${currentView === 'contact' ? 'text-primary font-bold' : 'text-foreground/75'}`}
            >
              Contact & Book
            </button>

            {/* White-Label Switcher Button */}
            {onOpenCustomizer && (
              <button
                onClick={onOpenCustomizer}
                className="px-2.5 py-1 bg-muted hover:bg-muted/80 text-foreground text-[11px] font-bold rounded-lg border border-border flex items-center gap-1 transition-all"
                title="Personalize Clinic Branding"
              >
                <Building2 className="w-3 h-3 text-primary" />
                <span>Switch Clinic</span>
              </button>
            )}

            {/* 24/7 WhatsApp Engine CTA */}
            {onOpenSimulator && (
              <button
                onClick={onOpenSimulator}
                className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-green-500/10 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                <span>Test WhatsApp</span>
              </button>
            )}

            {/* Dashboard Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className={`flex items-center gap-1 text-xs font-semibold transition-colors hover:text-primary ${(currentView === 'patient' || currentView === 'admin' || currentView === 'doctor') ? 'text-primary' : 'text-foreground/75'}`}
              >
                Portals
                <ChevronDown className={`h-3 w-3 transition-transform ${portalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {portalDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                  <button
                    onClick={() => handleNavClick('doctor')}
                    className="block w-full text-left px-4 py-2 text-xs text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                  >
                    Doctor Schedule Board
                  </button>
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="block w-full text-left px-4 py-2 text-xs text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                  >
                    Admin CRM & Desk
                  </button>
                  <button
                    onClick={() => handleNavClick('patient')}
                    className="block w-full text-left px-4 py-2 text-xs text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                  >
                    Patient Portal
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 hover:bg-muted rounded-full text-foreground/70 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>

          {/* Mobile menu buttons */}
          <div className="md:hidden flex items-center gap-2">
            {onOpenSimulator && (
              <button
                onClick={onOpenSimulator}
                className="p-2 bg-[#25D366] text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg text-foreground/70 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-4 space-y-1.5 max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${currentView === 'home' ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/75 hover:bg-muted'}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('treatments')}
            className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${currentView === 'treatments' ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/75 hover:bg-muted'}`}
          >
            Treatments
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${currentView === 'about' ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/75 hover:bg-muted'}`}
          >
            Doctor Profile
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${currentView === 'gallery' ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/75 hover:bg-muted'}`}
          >
            Smile Gallery
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${currentView === 'contact' ? 'bg-primary/10 text-primary font-bold' : 'text-foreground/75 hover:bg-muted'}`}
          >
            Contact & Book
          </button>

          {onOpenCustomizer && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCustomizer();
              }}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-primary hover:bg-muted"
            >
              ⚙️ Switch Clinic Branding
            </button>
          )}

          <div className="border-t border-border mt-2 pt-2 space-y-1">
            <p className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Staff Dashboards</p>
            <button
              onClick={() => handleNavClick('doctor')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${currentView === 'doctor' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
            >
              Doctor Schedule Board
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${currentView === 'admin' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
            >
              Admin CRM & Desk
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
