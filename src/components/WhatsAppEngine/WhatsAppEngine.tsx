import React, { useState } from 'react';
import { MessageSquare, MessageCircle, Bell, Settings } from 'lucide-react';
import { useDatabase } from '../../context/DatabaseContext';
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
  const { leads, appointments } = useDatabase();
  const [activeTab, setActiveTab] = useState<EngineTab>('inbox');
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);

  // Map real database leads into active WhatsApp conversations
  const conversations: WaConversation[] = leads.map(l => ({
    id: l.id,
    patient: {
      name: l.name,
      phone: l.phone || 'N/A',
      avatar: l.name ? l.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'P',
      status: l.status === 'New Lead' ? 'new' : l.status === 'Appointment' ? 'active' : 'resolved',
      intent: l.message || 'Consultation Inquiry',
      aiScore: l.aiScore || 7
    },
    messages: [
      { 
        id: `msg-${l.id}-1`, 
        from: 'patient', 
        text: l.message || 'Hello, I would like to inquire about an appointment at your dental clinic.', 
        time: l.createdAt ? new Date(l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now' 
      },
      { 
        id: `msg-${l.id}-2`, 
        from: 'ai', 
        text: l.aiNotes || `Hello ${l.name}! Thank you for contacting DentalFlow. How can we assist you with your dental care today?`, 
        time: l.createdAt ? new Date(l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now' 
      }
    ],
    lastMessage: l.message || 'Inquiry received',
    unread: l.status === 'New Lead' ? 1 : 0,
    reminderQueue: [
      { id: `rem-${l.id}`, type: 'confirmation', label: 'Consultation Confirmation', status: 'queued', time: 'Scheduled' }
    ],
    aiDraft: `Hi ${l.name}, we have openings for a dental consultation. Would you like to reserve a time slot?`
  }));

  const activeConvId = selectedConvId || (conversations.length > 0 ? conversations[0].id : null);
  const selectedConversation = conversations.find((c) => c.id === activeConvId) ?? null;

  const handleApprove = (_convId: string, _text: string) => {
    // Approved message trigger
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
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">WhatsApp Patient Engine</h3>
              <p className="text-[10px] text-muted-foreground">AI-powered inbox, reminders & lead messaging</p>
            </div>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-xl text-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-foreground">Engine Ready</span>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={<MessageSquare className="h-4 w-4" />} label="Active Leads" value={leads.length} color="text-emerald-500" />
        <StatCard icon={<Bell className="h-4 w-4" />} label="Appointments" value={appointments.length} color="text-blue-500" />
        <StatCard icon={<MessageCircle className="h-4 w-4" />} label="Unread Chats" value={leads.filter(l => l.status === 'New Lead').length} color="text-amber-500" />
        <StatCard icon={<Settings className="h-4 w-4" />} label="Auto AI Desk" value="Enabled" color="text-indigo-500" />
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-border pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[580px]">
          <div className="md:col-span-4 h-full overflow-hidden border border-border rounded-2xl bg-card">
            <WhatsAppInbox
              conversations={conversations}
              selectedId={activeConvId}
              onSelect={setSelectedConvId}
            />
          </div>
          <div className="md:col-span-8 h-full border border-border rounded-2xl bg-card overflow-hidden">
            <WhatsAppChat
              conversation={selectedConversation}
              onApprove={handleApprove}
            />
          </div>
        </div>
      )}

      {activeTab === 'reminders' && (
        <div className="bg-card border border-border rounded-2xl p-6 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">WhatsApp Appointment Reminders</p>
          <p className="text-xs mt-1">Automated 24h & 2h reminders for booked Supabase appointments.</p>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="bg-card border border-border rounded-2xl p-6 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">WhatsApp Communication Templates</p>
          <p className="text-xs mt-1">Pre-configured message templates for appointment confirmations & follow-ups.</p>
        </div>
      )}

      {activeTab === 'setup' && (
        <div className="bg-card border border-border rounded-2xl p-6 text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">WhatsApp Direct Connection Settings</p>
          <p className="text-xs mt-1">Configured for direct WhatsApp messaging and deep-link click actions.</p>
        </div>
      )}
    </div>
  );
};
