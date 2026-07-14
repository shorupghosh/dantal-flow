import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, CheckCircle2, Smartphone, Mail, MessageCircle, CalendarDays, Server } from 'lucide-react';
import { chatbotFlow } from './botFlowConfig';
import type { BotStep } from './botFlowConfig';
import { supabase } from '../lib/supabase'; // Adjust path if needed

// --- Subcomponents ---

const ChatMessage = ({ msg, isBot }: { msg: string, isBot: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
  >
    <div className={`flex items-end gap-2 max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      {isBot ? (
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mb-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
      ) : (
        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mb-1">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={`px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line shadow-sm ${
          isBot 
            ? 'bg-card border border-border text-foreground rounded-bl-none' 
            : 'bg-primary text-primary-foreground rounded-br-none'
        }`}
      >
        {msg}
      </div>
    </div>
  </motion.div>
);

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex w-full justify-start mb-4"
  >
    <div className="flex items-end gap-2">
      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0 mb-1">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="px-4 py-3 rounded-2xl bg-card border border-border rounded-bl-none flex gap-1">
        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </motion.div>
);

// --- Main Component ---

export const LeadBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string, isBot: boolean }>>([]);
  const [currentStepId, setCurrentStepId] = useState<string>('greeting');
  const [leadData, setLeadData] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentStep = chatbotFlow[currentStepId];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      triggerBotMessage('greeting');
    }
  }, [isOpen]);

  const triggerBotMessage = (stepId: string) => {
    setIsTyping(true);
    const step = chatbotFlow[stepId];
    
    // Simulate thinking delay based on message length for realism
    const delay = Math.max(800, step.message.length * 20); 
    
    setTimeout(() => {
      setMessages(prev => [...prev, { text: step.message, isBot: true }]);
      setCurrentStepId(stepId);
      setIsTyping(false);

      if (stepId === 'booked') {
        saveLead();
      }
    }, delay);
  };

  const saveLead = async () => {
    console.log("Saving lead to database...", leadData);
    
    // Format the data to match the leads table schema
    const notes = Object.entries(leadData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');

    try {
      if (!supabase) {
        console.warn("Supabase is not configured. Lead data:", leadData);
        return;
      }
      const { error } = await supabase.from('leads').insert([{
        name: 'Chatbot Lead', // Name not collected in flow, placeholder needed
        phone: leadData.phone || '',
        source: 'AI Chatbot',
        status: 'New Lead',
        ai_notes: notes,
        ai_score: 8 // High score since they completed the qualifier
      }]);

      if (error) {
        console.error("Error saving lead:", error);
      } else {
        console.log("Lead saved successfully!");
      }
    } catch (err) {
      console.error("Exception saving lead:", err);
    }
  };

  const handleUserResponse = (text: string, value: string = text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text, isBot: false }]);
    
    // Save data
    setLeadData(prev => ({ ...prev, [currentStepId]: value }));

    // Determine next step
    let nextStepId = '';
    if (typeof currentStep.next === 'function') {
      nextStepId = currentStep.next(value);
    } else {
      nextStepId = currentStep.next;
    }

    if (nextStepId === 'greeting') {
      // Restart flow
      setLeadData({});
      setTimeout(() => triggerBotMessage(nextStepId), 500);
    } else {
      triggerBotMessage(nextStepId);
    }

    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleUserResponse(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:bg-primary/90 flex items-center justify-center relative group"
          >
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[340px] sm:w-[380px] h-[550px] bg-background/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-primary text-primary-foreground flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight">Clinic Assistant</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[11px] text-white/90">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-transparent to-black/5">
              {messages.map((m, idx) => (
                <ChatMessage key={idx} msg={m.text} isBot={m.isBot} />
              ))}
              
              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {!isTyping && currentStepId !== 'booked' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-card border-t border-border"
              >
                {currentStep.type === 'options' ? (
                  <div className="flex flex-wrap gap-2">
                    {currentStep.options?.map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleUserResponse(opt)}
                        style={{ color: '#1e3a8a' }}
                        className="px-4 py-2 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 text-sm rounded-full transition-colors font-medium whitespace-nowrap"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type={currentStep.type === 'phone' ? 'tel' : currentStep.type === 'number' ? 'number' : 'text'}
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      placeholder={
                        currentStep.type === 'phone' ? 'e.g. +91 9876543210' :
                        currentStep.type === 'number' ? 'Enter a number...' : 'Type your answer...'
                      }
                      className="flex-1 bg-background border border-border px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors flex items-center justify-center"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {currentStepId === 'booked' && !isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-card border-t border-border flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-secondary to-blue-500 opacity-50"></div>
                
                <div className="flex flex-col items-center gap-1 text-center mb-2">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <p className="text-sm font-bold text-foreground">Appointment Received</p>
                  <p className="text-[11px] text-muted-foreground">Automations processing...</p>
                </div>

                <div className="space-y-3 pl-3">
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                    className="flex items-start gap-2"
                  >
                    <Smartphone className="h-3.5 w-3.5 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase block leading-none">SMS Sent</span>
                      <span className="text-[10px] text-muted-foreground">via Twilio API</span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
                    className="flex items-start gap-2"
                  >
                    <Mail className="h-3.5 w-3.5 text-orange-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-orange-700 dark:text-orange-400 uppercase block leading-none">Email Sent</span>
                      <span className="text-[10px] text-muted-foreground">via SendGrid</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.9 }}
                    className="flex items-start gap-2"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-green-700 dark:text-green-400 uppercase block leading-none">WhatsApp Confirmed</span>
                      <span className="text-[10px] text-muted-foreground">Rich media dispatched</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.6 }}
                    className="flex items-start gap-2"
                  >
                    <CalendarDays className="h-3.5 w-3.5 text-blue-500 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase block leading-none">Calendly Synced</span>
                      <span className="text-[10px] text-muted-foreground">Calendar updated</span>
                    </div>
                  </motion.div>
                </div>

                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}
                  onClick={() => {
                    setMessages([]);
                    setCurrentStepId('greeting');
                    triggerBotMessage('greeting');
                  }}
                  className="mt-2 w-full py-2 bg-primary text-primary-foreground text-xs font-semibold rounded-xl hover:bg-primary/95 transition-colors"
                >
                  Start New Chat
                </motion.button>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
