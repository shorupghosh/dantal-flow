import React from 'react';
import { MessageSquare, Clock, ShieldCheck, ArrowRight, Zap, CheckCircle2, Bot, BellRing, Smartphone } from 'lucide-react';

interface WhatsAppEngineSectionProps {
  onOpenSimulator: () => void;
  clinicName?: string;
  doctorName?: string;
}

export const WhatsAppEngineSection: React.FC<WhatsAppEngineSectionProps> = ({
  onOpenSimulator,
  clinicName = 'Sita Dental Clinic',
  doctorName = 'Dr. Anjali Aggarwal'
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-12">
      
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-mono font-bold">
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          Engineered for Indian Cosmetic & Implant Practices
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
          How the 24/7 WhatsApp Booking Engine Works
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          When a patient visits your clinic profile or clicks your WhatsApp link at <strong>10:30 PM</strong>, our intelligent assistant engages them immediately, triages their treatment, and locks their consultation chair slot in 30 seconds.
        </p>
      </div>

      {/* 3-Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left relative">
        
        {/* Step 1 */}
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4 hover:border-primary/50 transition-all shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center font-bold text-lg">
                01
              </div>
              <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-mono font-bold">
                ⚡ 5-Sec Response
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Instant Welcome & Triage</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Greets patients with a warm <em>"Namaskar"</em> in fluent English/Hinglish. Identifies treatment interest (Implants, Aligners, Veneers, or Acute Pain) and provides transparent fee guidance.
              </p>
            </div>
          </div>
          <div className="p-3 bg-muted/60 rounded-xl border border-border text-[11px] font-mono text-muted-foreground space-y-1">
            <div className="text-primary font-bold">💬 Patient (10:32 PM):</div>
            <div>"Severe pain in lower molar, need appointment tomorrow."</div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4 hover:border-primary/50 transition-all shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-lg">
                02
              </div>
              <span className="text-[10px] bg-teal-500/10 text-teal-600 dark:text-teal-400 px-2.5 py-1 rounded-full font-mono font-bold">
                📅 Slot Lock-in
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Specialist Availability</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Presents real available consultation slots based on {doctorName}'s weekly schedule. Eliminates 20 minutes of receptionist back-and-forth texting.
              </p>
            </div>
          </div>
          <div className="p-3 bg-muted/60 rounded-xl border border-border text-[11px] font-mono text-muted-foreground space-y-1">
            <div className="text-teal-600 dark:text-teal-400 font-bold">⚡ AI Assistant:</div>
            <div>"Emergency slot reserved for Friday @ 11:30 AM with {doctorName}."</div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4 hover:border-primary/50 transition-all shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                03
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full font-mono font-bold">
                🚨 Staff Alert Card
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Instant 2-Way Notification</h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Dispatches an official appointment confirmation card to the patient on WhatsApp, while immediately buzzing your front desk phone with a clean lead summary.
              </p>
            </div>
          </div>
          <div className="p-3 bg-muted/60 rounded-xl border border-border text-[11px] font-mono text-muted-foreground space-y-1">
            <div className="text-blue-600 dark:text-blue-400 font-bold">🔔 Staff WhatsApp Alert:</div>
            <div>"New Patient: Vikram Malhotra (+91 98183-xxxxx) | Dental Implant"</div>
          </div>
        </div>

      </div>

      {/* Interactive CTA Banner */}
      <div className="bg-gradient-to-r from-emerald-950/50 via-slate-900 to-teal-950/50 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Experience the 2-Way Simulator Live
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            See both screens in real time: watch how the patient books at 10:30 PM, and see the instant WhatsApp alert buzz on your clinic's phone.
          </p>
        </div>

        <button
          onClick={onOpenSimulator}
          className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold rounded-2xl text-sm transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-green-500/20 hover:scale-105 cursor-pointer shrink-0"
        >
          <Smartphone className="w-5 h-5 text-slate-950" />
          Test 24/7 WhatsApp Engine Now →
        </button>
      </div>

    </section>
  );
};
