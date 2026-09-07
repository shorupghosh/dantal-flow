import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface WhatsAppPhoneFrameProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
  deviceColor?: 'dark' | 'emerald';
  isAlertPhone?: boolean;
}

export const WhatsAppPhoneFrame: React.FC<WhatsAppPhoneFrameProps> = ({
  title = 'WhatsApp',
  subtitle = 'online',
  badge,
  children,
  headerRight,
  headerLeft,
  deviceColor = 'emerald',
  isAlertPhone = false
}) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative mx-auto w-full max-w-[380px] h-[680px] bg-slate-950 rounded-[44px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col select-none overflow-hidden">
      {/* Top Dynamic Island / Speaker Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-40 flex items-center justify-end pr-2.5">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
      </div>

      {/* Screen Container */}
      <div className="w-full h-full rounded-[36px] bg-[#0b141a] text-slate-100 flex flex-col overflow-hidden relative border border-slate-900 shadow-inner">
        {/* iOS/Android Status Bar */}
        <div className="h-9 px-6 pt-2 flex justify-between items-center text-[11px] font-semibold text-slate-300 z-30 bg-[#075E54] dark:bg-[#1f2c34] select-none">
          <span>{currentTime}</span>
          <div className="flex items-center gap-1.5 opacity-90">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* WhatsApp App Header */}
        <div className={`px-3 py-2.5 flex items-center justify-between z-30 shadow-md ${
          isAlertPhone 
            ? 'bg-[#128C7E] dark:bg-[#1f2c34] border-b border-teal-700/30' 
            : 'bg-[#075E54] dark:bg-[#1f2c34] border-b border-emerald-800/30'
        }`}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            {headerLeft}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate leading-tight">
                  {title}
                </h4>
                {badge && (
                  <span className="text-[9px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-medium shrink-0">
                    {badge}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-emerald-200/80 dark:text-slate-400 truncate mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/90">
            {headerRight}
          </div>
        </div>

        {/* Main Content Area (WhatsApp wallpaper pattern background) */}
        <div 
          className="flex-1 overflow-hidden relative flex flex-col bg-[#0b141a]"
          style={{
            backgroundImage: `radial-gradient(rgba(37, 211, 102, 0.03) 1px, transparent 0)`,
            backgroundSize: '16px 16px'
          }}
        >
          {children}
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="h-4 bg-[#0b141a] flex items-center justify-center pb-1">
          <div className="w-28 h-1 bg-slate-600 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
};
