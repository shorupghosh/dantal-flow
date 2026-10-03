import React, { useState } from 'react';
import { X, Check, Building2, User, MapPin, Phone, Sparkles } from 'lucide-react';

export interface ClinicConfig {
  key: string;
  name: string;
  doctorName: string;
  doctorTitle: string;
  location: string;
  phone: string;
  consultationFee: number;
}

export const CLINIC_PRESETS: Record<string, ClinicConfig> = {
  Dentoplay: {
    key: 'Dentoplay',
    name: 'Dentoplay Pediatric & Family Dental Studio',
    doctorName: 'Dr. Ritesh Kundu',
    doctorTitle: 'MDS Pedodontics • Pediatric & Interceptive Orthodontics Specialist',
    location: 'Action Area 1 (DE 93), New Town, Kolkata',
    phone: '+91 81009 41854',
    consultationFee: 800
  },
  DelhiDental: {
    key: 'DelhiDental',
    name: 'Delhi Dental Clinic & Orthodontic Centre',
    doctorName: 'Dr. Nitu Gautam',
    doctorTitle: 'BDS (Nair Mumbai), MDS (Orthodontics), Fellow WFO (16+ Yrs Exp)',
    location: 'R-241, Greater Kailash 1 (GK-1), South Delhi',
    phone: '+91 80797 97978',
    consultationFee: 1200
  },
  HollywoodSmile: {
    key: 'HollywoodSmile',
    name: 'Hollywood Smile Dental & Aesthetic Studio',
    doctorName: 'Dr. Prashant',
    doctorTitle: 'MDS Endodontics & Aesthetic Smile Architect (21+ Yrs Exp)',
    location: 'SCO 139–140, Sector 9C, Chandigarh',
    phone: '+91 82888 38222',
    consultationFee: 1500
  },
  PainlessDental: {
    key: 'PainlessDental',
    name: 'Painless Dental Care and Aesthetics',
    doctorName: 'Dr. Gaurav & Specialist Team',
    doctorTitle: 'Oral Surgery • Pedodontics • Prosthodontics',
    location: 'Chungi 1, Next to Eldeco Society, Sohna, Gurugram',
    phone: '+91 74978 59616',
    consultationFee: 500
  },
  SitaDental: {
    key: 'SitaDental',
    name: 'Sita Dental Clinic',
    doctorName: 'Dr. Anjali Aggarwal',
    doctorTitle: 'BDS, Senior Dental Surgeon (30+ Yrs Exp)',
    location: 'Galleria Market, DLF Phase IV, Gurugram',
    phone: '+91 98183 45055',
    consultationFee: 1000
  },
  ManglaDental: {
    key: 'ManglaDental',
    name: "Dr. Mangla's Multispeciality Dental & Implant Clinic",
    doctorName: 'Dr. Asheesh Mangla',
    doctorTitle: 'MDS Prosthodontics & Implantology (22+ Yrs Legacy)',
    location: 'HUDA Market, Sector 31, Gurugram',
    phone: '+91 95401 77077',
    consultationFee: 1000
  },
  DentalFlow: {
    key: 'DentalFlow',
    name: 'DentalFlow AI Flagship',
    doctorName: 'Dr. Sameer Sharma',
    doctorTitle: 'MDS Orthodontics & Implantology',
    location: 'Golf Course Road, Sector 54, Gurugram',
    phone: '+91 98200 22334',
    consultationFee: 1500
  },
  SmileCraft: {
    key: 'SmileCraft',
    name: 'SmileCraft Dental Studio',
    doctorName: 'Dr. Rahul Sharma',
    doctorTitle: 'MDS Prosthodontics & Cosmetic Dentistry',
    location: 'Indiranagar 100ft Road, Bengaluru',
    phone: '+91 98450 11223',
    consultationFee: 1200
  }
};

interface ClinicCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeConfig: ClinicConfig;
  onSelectConfig: (config: ClinicConfig) => void;
}

export const ClinicCustomizerModal: React.FC<ClinicCustomizerModalProps> = ({
  isOpen,
  onClose,
  activeConfig,
  onSelectConfig
}) => {
  const [customName, setCustomName] = useState(activeConfig.name);
  const [customDoctor, setCustomDoctor] = useState(activeConfig.doctorName);
  const [customLocation, setCustomLocation] = useState(activeConfig.location);

  if (!isOpen) return null;

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectConfig({
      key: 'custom',
      name: customName.trim() || 'My Dental Clinic',
      doctorName: customDoctor.trim() || 'Lead Specialist',
      doctorTitle: 'BDS, MDS Dental Specialist',
      location: customLocation.trim() || 'NCR Branch',
      phone: '+91 98000 00000',
      consultationFee: 1000
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 text-left">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">White-Label Clinic Switcher</h3>
              <p className="text-xs text-slate-400">Personalize this entire demo for your prospect's clinic</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Cards */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Select 1-Click Clinic Preset:
          </span>
          <div className="grid grid-cols-1 gap-2.5">
            {Object.values(CLINIC_PRESETS).map((preset) => (
              <button
                key={preset.key}
                onClick={() => {
                  onSelectConfig(preset);
                  onClose();
                }}
                className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  activeConfig.key === preset.key
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-white shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{preset.name}</span>
                    {preset.key === 'Dentoplay' && (
                      <span className="text-[9px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                        Dr. Kundu (New Town Pitch)
                      </span>
                    )}
                    {preset.key === 'DelhiDental' && (
                      <span className="text-[9px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">
                        Dr. Nitu (GK-1 Invisalign)
                      </span>
                    )}
                    {preset.key === 'HollywoodSmile' && (
                      <span className="text-[9px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full font-bold">
                        Dr. Prashant (Sector 9 NRI)
                      </span>
                    )}
                    {preset.key === 'PainlessDental' && (
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        Dr. Gaurav (Sohna Pitch)
                      </span>
                    )}
                    {preset.key === 'SitaDental' && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                        Dr. Anjali Pitch Target
                      </span>
                    )}
                    {preset.key === 'ManglaDental' && (
                      <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-bold">
                        Dr. Mangla MDS Target
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-400 font-medium">{preset.doctorName} • {preset.doctorTitle}</p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" /> {preset.location}
                  </p>
                </div>
                {activeConfig.key === preset.key && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Form */}
        <form onSubmit={handleApplyCustom} className="pt-3 border-t border-slate-800 space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Or Type Custom Clinic Details:
          </span>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Clinic Name</label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Apex Dental Clinic"
                className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-1">Doctor Name</label>
              <input
                type="text"
                value={customDoctor}
                onChange={(e) => setCustomDoctor(e.target.value)}
                placeholder="e.g. Dr. Rajesh Khanna"
                className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Clinic Location</label>
            <input
              type="text"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="e.g. South Extension Part 2, New Delhi"
              className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-all cursor-pointer"
          >
            Apply Custom Branding
          </button>
        </form>

      </div>
    </div>
  );
};
