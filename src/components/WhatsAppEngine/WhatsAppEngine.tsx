import React, { useState } from 'react';
import { MessageSquare, Wifi, MessageCircle, Users, Bell, TrendingUp, Settings, ChevronRight, Info } from 'lucide-react';
import { mockConversations, mockStats, mockReminderLog } from './mockData';
import { WhatsAppInbox } from './WhatsAppInbox';
import { WhatsAppChat } from './WhatsAppChat';
import type { WaConversation } from './types';

type EngineTab = 'inbox' | 'reminders' | 'templates' | 'setup';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; sub?: string; color?: string }> = ({
  icon, label, value, sub, color = 'text-primary'
}) => (
  <div className="bg-card border border-border rounded-xl p-3 space-y-1.5 flex flex-col">
    <div className={`${color} w-fit`}>{icon}</div>
    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
    <p className="text-xl font-black text-foreground leading-none">{value}</p>
    {sub && <p className="text-[9px] text-muted-foreground">{sub}</p>}
  </div>
);

export const WhatsAppEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EngineTab>('inbox');
  const [conversations, setConversations] = useState<WaConversation[]>(mockConversations);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(mockConversations[0].id);

  const selectedConversation = conversations.find((c) => c.id === selectedConvId) ?? null;

  const handleApprove = (convId: string, _text: string) => {
    // In demo mode: mark unread as 0, simulate send
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unread: 0 } : c))
    );
  };

  const tabs: { id: EngineTab; label: string; icon: React.ReactNode }[] = [
    { id: 'inbox', label: 'Patient Inbox', icon: <MessageSquare className="h-3.5 w-3.5" /> },
    { id: 'reminders', label: 'Reminder Log', icon: <Bell className="h-3.5 w-3.5" /> },
    { id: 'templates', label: 'Templates', icon: <MessageCircle className="h-3.5 w-3.5" /> },
    { id: 'setup', label: 'Setup', icon: <Settings className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Header + Status Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-[#25D366]/10 rounded-lg">
              {/* WhatsApp icon SVG */}
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">WhatsApp Patient Engine</h3>
              <p className="text-[10px] text-muted-foreground">AI-powered inbox, reminders & lead capture</p>
            </div>
          </div>
        </div>

        {/* Connection Status Badge */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
          </span>
          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
            WhatsApp Business Connected
          </span>
          <span className="text-[9px] text-muted-foreground font-mono">+91 98200 00000</span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          icon={<MessageSquare className="h-4 w-4" />}
          label="Messages Today"
          value={mockStats.totalToday}
          sub="↑ 12% from yesterday"
          color="text-[#25D366]"
        />
        <StatCard
          icon={<Users className="h-4 w-4" />}
          label="Leads Captured"
          value={mockStats.leadsCapture}
          sub="via WhatsApp today"
          color="text-primary"
        />
        <StatCard
          icon={<Bell className="h-4 w-4" />}
          label="Reminders Sent"
          value={mockStats.remindersSent}
          sub="auto-dispatched"
          color="text-secondary"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="No-Shows Reduced"
          value="73%"
          sub="vs. manual follow-up"
          color="text-amber-600"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === tab.id
                ? 'border-[#25D366] text-[#25D366]'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ─── TAB: INBOX ─── */}
      {activeTab === 'inbox' && (
        <div className="border border-border rounded-2xl overflow-hidden shadow-sm" style={{ height: '580px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] h-full">
            {/* Left: Inbox List */}
            <div className="border-r border-border overflow-hidden flex flex-col bg-card">
              <WhatsAppInbox
                conversations={conversations}
                selectedId={selectedConvId}
                onSelect={setSelectedConvId}
              />
            </div>

            {/* Right: Chat View */}
            <div className="overflow-hidden flex flex-col bg-background">
              {selectedConversation ? (
                <WhatsAppChat
                  conversation={selectedConversation}
                  onApprove={handleApprove}
                />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
                  <MessageSquare className="h-10 w-10 opacity-30" />
                  <p className="text-sm font-semibold">Select a conversation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB: REMINDER LOG ─── */}
      {activeTab === 'reminders' && (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm">Automation Reminder Log</h4>
              <p className="text-[10px] text-muted-foreground mt-0.5">All WhatsApp automations dispatched today</p>
            </div>
            <span className="text-[10px] bg-[#25D366]/10 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-[#25D366]/20">
              {mockReminderLog.length} events
            </span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-muted border-b border-border text-muted-foreground text-left font-bold">
                <th className="p-3">Patient</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Automation Type</th>
                <th className="p-3">Node</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockReminderLog.map((log) => (
                <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-semibold">{log.patient}</td>
                  <td className="p-3 text-muted-foreground font-mono text-[10px]">{log.phone}</td>
                  <td className="p-3 font-semibold">{log.type}</td>
                  <td className="p-3 text-[10px] font-mono text-primary">{log.node}</td>
                  <td className="p-3 text-muted-foreground font-mono text-[10px]">{log.time}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                        log.status === 'Success'
                          ? 'bg-emerald-500/10 text-emerald-700'
                          : 'bg-blue-500/10 text-blue-700'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─── TAB: TEMPLATES ─── */}
      {activeTab === 'templates' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-700 text-xs">
            <Info className="h-4 w-4 shrink-0" />
            <span>Templates must be pre-approved by Meta before sending. All templates below are approved and active.</span>
          </div>

          {[
            {
              name: 'Booking Confirmation',
              node: 'Node #1',
              trigger: 'Patient books appointment',
              body: 'Hi {{name}}! ✅ Your {{treatment}} appointment is confirmed for {{date}} at {{time}} with {{doctor}} at DentalFlow AI. Our address: Golf Course Road, Sector 54, Gurugram. See you soon! 🦷',
              status: 'Active',
            },
            {
              name: '24-Hour Reminder',
              node: 'Node #2',
              trigger: '24 hours before appointment',
              body: 'Hi {{name}}, just a gentle reminder! 🔔 Your appointment is tomorrow at {{time}} with {{doctor}}. If you need to reschedule, reply "RESCHEDULE" and we\'ll sort it out.',
              status: 'Active',
            },
            {
              name: '2-Hour Alert',
              node: 'Node #3',
              trigger: '2 hours before appointment',
              body: 'You\'re all set {{name}}! 🙌 Your appointment with {{doctor}} is in 2 hours at {{time}}. Clinic parking is available. See you at DentalFlow AI!',
              status: 'Active',
            },
            {
              name: 'No-Show Follow-up',
              node: 'Node #3',
              trigger: '1 hour after missed appointment',
              body: 'Hi {{name}}, we noticed you couldn\'t make it today. We hope everything is okay! Would you like to reschedule? Reply "YES" and we\'ll find you a new slot. 🙂',
              status: 'Active',
            },
            {
              name: 'Post-Treatment Review',
              node: 'Node #4',
              trigger: 'Morning after treatment',
              body: 'Hi {{name}}, how are you feeling after your {{treatment}} yesterday? 😊 We\'d love to hear your feedback! Leave us a Google review here: {{review_link}}. Your feedback helps other patients!',
              status: 'Active',
            },
          ].map((t) => (
            <div key={t.name} className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-foreground">{t.name}</h4>
                    <span className="text-[9px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">{t.node}</span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">✓ {t.status}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Trigger: {t.trigger}</p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-3 text-xs text-foreground leading-relaxed font-mono">
                {t.body}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── TAB: SETUP ─── */}
      {activeTab === 'setup' && (
        <div className="space-y-4">
          {/* Connection Card */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h4 className="font-bold text-sm text-foreground">WhatsApp Business Connection</h4>

            <div className="space-y-3">
              {[
                { step: '1', label: 'Meta Business Verification', status: 'done', desc: 'Business account verified by Meta' },
                { step: '2', label: 'Phone Number Registered', status: 'done', desc: '+91 98200 00000 linked to this clinic' },
                { step: '3', label: 'Webhook Configured', status: 'done', desc: 'Messages routed to AI engine' },
                { step: '4', label: 'Templates Approved', status: 'done', desc: '5 templates approved by Meta' },
                { step: '5', label: 'Automation Rules Live', status: 'done', desc: 'pg_cron jobs running' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <span className="text-emerald-600 text-[10px] font-bold">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-xs text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                  <span className="text-[9px] bg-emerald-500/10 text-emerald-700 font-bold px-2 py-0.5 rounded-full">Live</span>
                </div>
              ))}
            </div>
          </div>

          {/* Automation Toggles */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h4 className="font-bold text-sm text-foreground">Automation Rules</h4>
            <div className="space-y-3">
              {[
                { label: 'Booking Confirmation', desc: 'Send immediately when patient books', enabled: true },
                { label: '24-Hour Reminder', desc: 'Auto-send 24 hours before appointment', enabled: true },
                { label: '2-Hour Alert', desc: 'Auto-send 2 hours before appointment', enabled: true },
                { label: 'No-Show Follow-up', desc: 'Auto-send 1 hour after missed appointment', enabled: true },
                { label: 'Post-Treatment Review Request', desc: 'Auto-send morning after treatment', enabled: true },
                { label: 'Monthly Recall (Scaling)', desc: 'Remind past patients every 6 months', enabled: false },
              ].map((rule) => (
                <div key={rule.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-semibold text-xs text-foreground">{rule.label}</p>
                    <p className="text-[10px] text-muted-foreground">{rule.desc}</p>
                  </div>
                  {/* Toggle (visual only) */}
                  <div
                    className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                      rule.enabled ? 'bg-[#25D366]' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        rule.enabled ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Notice */}
          <div className="flex items-start gap-2.5 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-700">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Demo Mode Active</p>
              <p className="mt-0.5 text-amber-700/80">This is a live demonstration of the WhatsApp Patient Engine. In your live clinic deployment, real patient messages will appear here and reminders will be sent automatically.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
