import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Bot, CheckCheck, Clock, AlertCircle, Check,
  ChevronRight, MessageCircle, Sparkles, Edit3, X
} from 'lucide-react';
import type { WaConversation, WaMessage } from './types';

interface WhatsAppChatProps {
  conversation: WaConversation | null;
  onApprove: (conversationId: string, text: string) => void;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-600',
  active: 'bg-emerald-500/10 text-emerald-600',
  'no-show': 'bg-red-500/10 text-red-600',
  resolved: 'bg-muted text-muted-foreground',
};

const statusLabels: Record<string, string> = {
  new: 'New Lead',
  active: 'Active',
  'no-show': 'No-Show',
  resolved: 'Resolved',
};

const intentColors: Record<string, string> = {
  'Teeth Whitening': 'text-yellow-600 bg-yellow-500/10',
  'Dental Implants': 'text-purple-600 bg-purple-500/10',
  'Emergency Pain': 'text-red-600 bg-red-500/10',
  'Braces': 'text-blue-600 bg-blue-500/10',
  'Root Canal': 'text-orange-600 bg-orange-500/10',
};

const reminderTypeLabels: Record<string, string> = {
  confirmation: 'Booking Confirmed',
  '24hr': '24-Hour Reminder',
  '2hr': '2-Hour Alert',
  no_show: 'No-Show Follow-up',
  post_treatment: 'Post-Treatment Review',
};

const MessageBubble: React.FC<{ message: WaMessage }> = ({ message }) => {
  const isAI = message.from === 'ai';
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} group`}>
      {isAI && (
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center mr-2 mt-auto mb-1 shrink-0">
          <Bot className="h-3.5 w-3.5 text-emerald-600" />
        </div>
      )}
      <div className={`max-w-[78%] space-y-1`}>
        <div
          className={`px-3.5 py-2.5 text-xs leading-relaxed rounded-2xl ${
            isAI
              ? 'bg-card border border-border text-foreground rounded-tl-none shadow-sm'
              : 'bg-[#25D366] text-white rounded-tr-none'
          }`}
        >
          {message.text}
        </div>
        <div className={`flex items-center gap-1 text-[9px] text-muted-foreground ${isAI ? 'justify-start pl-1' : 'justify-end pr-1'}`}>
          {isAI && <span className="text-emerald-600 font-semibold">AI</span>}
          <span>{message.time}</span>
          {!isAI && <CheckCheck className="h-3 w-3 text-blue-400" />}
        </div>
      </div>
    </div>
  );
};

export const WhatsAppChat: React.FC<WhatsAppChatProps> = ({ conversation, onApprove }) => {
  const [draftText, setDraftText] = useState(conversation?.aiDraft || '');
  const [editingDraft, setEditingDraft] = useState(false);
  const [sent, setSent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation) {
      setDraftText(conversation.aiDraft);
      setSent(false);
      setEditingDraft(false);
    }
  }, [conversation?.id, conversation?.aiDraft]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
        <MessageCircle className="h-10 w-10 text-muted-foreground/40 mb-2" />
        <p className="font-semibold text-foreground text-sm">No Active Conversation Selected</p>
        <p className="text-xs text-muted-foreground mt-1">Select a patient lead from the inbox to manage WhatsApp communications.</p>
      </div>
    );
  }

  const handleApprove = () => {
    setSent(true);
    onApprove(conversation.id, draftText);
  };

  const scoreColor =
    conversation.patient.aiScore >= 9
      ? 'text-red-600 bg-red-500/10'
      : conversation.patient.aiScore >= 7
      ? 'text-amber-600 bg-amber-500/10'
      : 'text-primary bg-primary/10';

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-border bg-card flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
            {conversation.patient.avatar}
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground leading-none">{conversation.patient.name}</h4>
            <span className="text-[10px] text-muted-foreground">{conversation.patient.phone}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${intentColors[conversation.patient.intent] || 'bg-muted text-muted-foreground'}`}>
            {conversation.patient.intent}
          </span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${scoreColor}`}>
            Score: {conversation.patient.aiScore}/10
          </span>
          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusColors[conversation.patient.status]}`}>
            {statusLabels[conversation.patient.status]}
          </span>
        </div>
      </div>

      {/* WhatsApp-style background messages area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.015) 10px, rgba(0,0,0,0.015) 20px)' }}
      >
        {/* Date separator */}
        <div className="flex items-center justify-center my-2">
          <span className="bg-muted/80 backdrop-blur-sm text-muted-foreground text-[9px] font-semibold px-3 py-1 rounded-full border border-border">
            Today
          </span>
        </div>

        {conversation.messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator if patient has unread */}
        {conversation.unread > 0 && !sent && (
          <div className="flex justify-end">
            <div className="bg-[#25D366]/20 border border-[#25D366]/30 text-[10px] text-emerald-700 px-3 py-1.5 rounded-full font-semibold animate-pulse">
              Patient is waiting for your reply...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Reminder Queue Strip */}
      <div className="px-4 py-2.5 border-t border-border bg-background/50 shrink-0">
        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Automation Queue</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {conversation.reminderQueue.map((r) => (
            <div
              key={r.id}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-semibold shrink-0 border ${
                r.status === 'done'
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700'
                  : r.status === 'queued'
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-700'
                  : 'bg-muted border-border text-muted-foreground'
              }`}
            >
              {r.status === 'done' ? (
                <Check className="h-2.5 w-2.5" />
              ) : r.status === 'queued' ? (
                <Clock className="h-2.5 w-2.5" />
              ) : (
                <X className="h-2.5 w-2.5" />
              )}
              <span>{reminderTypeLabels[r.type]}</span>
              <span className="opacity-70">· {r.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Draft Reply Box */}
      <div className="px-4 py-3 border-t border-border bg-card shrink-0 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-wide">AI Draft Reply</span>
          </div>
          <button
            onClick={() => setEditingDraft(!editingDraft)}
            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Edit3 className="h-3 w-3" />
            {editingDraft ? 'Lock' : 'Edit'}
          </button>
        </div>

        {sent ? (
          <div className="flex items-center justify-center gap-2 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <CheckCheck className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700">Message sent to {conversation.patient.name} ✓</span>
          </div>
        ) : (
          <>
            {editingDraft ? (
              <textarea
                value={draftText}
                onChange={(e) => setDraftText(e.target.value)}
                rows={3}
                className="w-full bg-background border border-primary/40 px-3 py-2 rounded-xl text-xs text-foreground focus:outline-none focus:border-primary resize-none leading-relaxed"
              />
            ) : (
              <div className="bg-background border border-border px-3 py-2 rounded-xl text-xs text-foreground leading-relaxed line-clamp-3">
                {draftText}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => setEditingDraft(true)}
                className="flex-1 py-2 border border-border text-foreground text-xs font-semibold rounded-xl hover:bg-muted transition-colors flex items-center justify-center gap-1.5"
              >
                <Edit3 className="h-3.5 w-3.5" />
                Edit Draft
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 py-2 bg-[#25D366] hover:bg-[#1eb859] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                Approve & Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
