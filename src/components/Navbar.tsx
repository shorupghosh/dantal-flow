import React, { useState } from 'react';
import { Stethoscope, Menu, X, Sun, Moon, Database, ChevronDown } from 'lucide-react';
import { useDatabase } from '../context/DatabaseContext';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const { isLoading } = useDatabase();

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setPortalDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="p-2 bg-primary/10 rounded-lg text-primary mr-2">
              <Stethoscope className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DentalFlow AI
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentView === 'home' ? 'text-primary' : 'text-foreground/70'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('treatments')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentView === 'treatments' ? 'text-primary' : 'text-foreground/70'}`}
            >
              Treatments
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentView === 'about' ? 'text-primary' : 'text-foreground/70'}`}
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentView === 'gallery' ? 'text-primary' : 'text-foreground/70'}`}
            >
              Smile Gallery
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-sm font-medium transition-colors hover:text-primary ${currentView === 'contact' ? 'text-primary' : 'text-foreground/70'}`}
            >
              Contact & Book
            </button>

            {/* Dashboard / Login Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${(currentView === 'patient' || currentView === 'admin' || currentView === 'doctor') ? 'text-primary' : 'text-foreground/70'}`}
              >
                Dashboard
                <ChevronDown className={`h-4 w-4 transition-transform ${portalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {portalDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-xl py-2 z-50">
                  <button
                    onClick={() => handleNavClick('doctor')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                  >
                    Doctor Panel
                  </button>
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="block w-full text-left px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                  >
                    Admin Dashboard
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-muted rounded-full text-foreground/70 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-muted rounded-full text-foreground/70 transition-colors"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg text-foreground/70 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 pt-2 pb-4 space-y-2 max-h-[80vh] overflow-y-auto">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'home' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('treatments')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'treatments' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
          >
            Treatments
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'about' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'gallery' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
          >
            Smile Gallery
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'contact' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
          >
            Contact & Book
          </button>

          {/* Mobile Dashboard Links */}
          <div className="border-t border-border mt-2 pt-2">
            <p className="px-3 py-2 text-xs font-semibold text-foreground/50 uppercase tracking-wider">Dashboards</p>
            <button
              onClick={() => handleNavClick('doctor')}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'doctor' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
            >
              Doctor Panel
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${currentView === 'admin' ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
