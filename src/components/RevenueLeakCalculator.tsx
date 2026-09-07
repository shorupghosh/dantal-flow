import React, { useState } from 'react';
import { TrendingDown, Sparkles, ArrowRight, ShieldCheck, Zap, DollarSign } from 'lucide-react';

interface RevenueLeakCalculatorProps {
  onOpenSimulator: () => void;
}

export const RevenueLeakCalculator: React.FC<RevenueLeakCalculatorProps> = ({ onOpenSimulator }) => {
  const [missedInquiriesPerWeek, setMissedInquiriesPerWeek] = useState<number>(4);
  const [avgTreatmentTicket, setAvgTreatmentTicket] = useState<number>(35000); // INR (mix of Implants, RCT, Aligners)

  // Calculations
  const monthlyMissedInquiries = missedInquiriesPerWeek * 4.33;
  const monthlyRevenueLeak = Math.round(monthlyMissedInquiries * avgTreatmentTicket * 0.45); // 45% would have converted
  const annualRevenueLeak = monthlyRevenueLeak * 12;
  const potentialRecovered = Math.round(monthlyRevenueLeak * 0.85); // 85% recovered by 5-sec 24/7 WhatsApp AI

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10 text-left">
        
        {/* Header */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono font-bold">
            <TrendingDown className="w-3.5 h-3.5" />
            After-8 PM Clinic Revenue Leakage Audit
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            How Much Revenue Is Your Clinic Losing While Closed?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            In affluent areas like DLF Phase 4, Golf Course Road & South Delhi, over <strong>40% of working patients search for dental care between 8:30 PM and 11:30 PM</strong>. Without instant WhatsApp booking, they book the next clinic.
          </p>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/90 border border-slate-800/80 p-6 rounded-2xl">
          
          {/* Slider 1 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">Missed After-Hours Inquiries / Week</span>
              <span className="text-emerald-400 font-mono text-sm bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                {missedInquiriesPerWeek} inquiries
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={missedInquiriesPerWeek}
              onChange={(e) => setMissedInquiriesPerWeek(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-500">
              Calls after 8 PM, missed WhatsApp messages, or website bounces without instant reply.
            </p>
          </div>

          {/* Slider 2 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">Average High-Ticket Case Value</span>
              <span className="text-emerald-400 font-mono text-sm bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                ₹{avgTreatmentTicket.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={avgTreatmentTicket}
              onChange={(e) => setAvgTreatmentTicket(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-500">
              Blended average across Dental Implants (₹65k), Aligners (₹80k), and Root Canals (₹12k).
            </p>
          </div>

        </div>

        {/* Results Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-slate-900 border border-red-500/20 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block">
              Estimated Monthly Leakage
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-red-400">
              ₹{monthlyRevenueLeak.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-400 block">Going to competing clinics</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Annual Lost Revenue
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-200">
              ₹{annualRevenueLeak.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-400 block">Uncaptured chair revenue</span>
          </div>

          <div className="bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/40 p-5 rounded-2xl space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" /> WhatsApp Engine Recovery
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
              +₹{potentialRecovered.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-300/80 block">Captured 24/7 automatically</span>
          </div>

        </div>

        {/* Bottom Action CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            💡 <strong>Just 1 recovered implant patient</strong> pays for this system for an entire year.
          </div>
          <button
            onClick={onOpenSimulator}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Test 24/7 WhatsApp Engine Now
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
