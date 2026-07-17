import React from 'react';
import { MessageCircle, Circle, CheckCheck } from 'lucide-react';
import type { WaConversation } from './types';

interface WhatsAppInboxProps {
  conversations: WaConversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const statusDot: Record<string, string> = {
  new: 'bg-blue-500',
  active: 'bg-emerald-500',
  'no-show': 'bg-red-500',
  resolved: 'bg-muted-foreground/40',
};

const scoreColor = (score: number) => {
  if (score >= 9) return 'text-red-600 bg-red-500/10';
  if (score >= 7) return 'text-amber-600 bg-amber-500/10';
  return 'text-primary bg-primary/10';
};

export const WhatsAppInbox: React.FC<WhatsAppInboxProps> = ({
  conversations,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Inbox Header */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Inbox</h3>
          <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
            {conversations.filter((c) => c.unread > 0).length} unread
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5">
          {conversations.length} active conversations
        </p>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {conversations.map((conv) => {
          const lastMsg = conv.messages[conv.messages.length - 1];
          const isSelected = selectedId === conv.id;

          return (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`w-full px-4 py-3 text-left transition-all hover:bg-muted/40 flex gap-3 items-start relative ${
                isSelected ? 'bg-primary/5 border-l-2 border-primary' : 'border-l-2 border-transparent'
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-xs">
                  {conv.patient.avatar}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${statusDot[conv.patient.status]}`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-xs text-foreground truncate">{conv.patient.name}</span>
                  <span className="text-[9px] text-muted-foreground shrink-0 ml-2">{conv.lastMessage}</span>
                </div>

                <div className="flex items-center gap-1 mt-0.5">
                  {lastMsg.from === 'ai' && (
                    <CheckCheck className="h-3 w-3 text-blue-400 shrink-0" />
                  )}
                  <p className="text-[10px] text-muted-foreground truncate leading-tight">
                    {lastMsg.from === 'ai' ? 'AI: ' : ''}{lastMsg.text}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[9px] font-semibold text-muted-foreground/80 bg-muted px-1.5 py-0.5 rounded">
                    {conv.patient.intent}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${scoreColor(conv.patient.aiScore)}`}>
                      {conv.patient.aiScore}/10
                    </span>
                    {conv.unread > 0 && (
                      <span className="w-4 h-4 bg-[#25D366] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
