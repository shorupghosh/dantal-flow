import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, AlertTriangle, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const isGeminiConfigured = Boolean(geminiKey);

// System prompt for Gemini
const systemPrompt = `You are a helpful, professional, and friendly AI receptionist for "DentalFlow AI" clinic in Mumbai, India (Bandra).
Our clinic hours are 9:00 AM to 8:00 PM, Sunday to Saturday.
Our list of specialists includes:
- Dr. Sameer Sharma (Orthodontist, braces)
- Dr. Sarah Patel (Pedodontist, child dentist)
- Dr. Nitin Gupta (Oral & Implant Surgeon)
- Dr. Tanvi Desai (Endodontist, root canal)
- Dr. Amit Shah (Prosthodontist, crowns & bridges)
- Dr. Meera Reddy (Periodontist, gum treatments)
- Dr. Kiran Verma (Cosmetic Dentist, veneer/whitening)
- Dr. Riya Kapoor (General Dentist)

We offer the following treatments:
- Routine Clean & Check (INR 1,500)
- Teeth Whitening (INR 8,000)
- Tooth Extraction (INR 3,000)
- Root Canal Therapy (INR 12,000)
- Dental Crowns (INR 15,000)
- Dental Implants (INR 65,000)
- Orthodontic Braces (INR 80,000)
- Pediatric Dental Care (INR 2,000)

Your goals:
1. Provide quick, friendly information about clinic hours, specialists, and treatments.
2. Ask qualifying questions if they mention tooth pain (e.g. how long, pain level, sensitivity).
3. If they want to book, politely tell them they can close this chat and click the "Book Appointment" button at the top.
4. Keep answers relatively short, structured, and easy to read.
5. Use a warm, professional clinical tone.`;

export const AIReceptionist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot', text: string }>>([
    { sender: 'bot', text: "Hello! Welcome to DentalFlow AI. I am your 24/7 receptionist. How can I help you today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Mock responses for when API key is not configured
  const getMockResponse = (input: string): string => {
    const text = input.toLowerCase();
    
    if (text.includes('price') || text.includes('cost') || text.includes('how much') || text.includes('fee') || text.includes('tk') || text.includes('inr')) {
      return "Here are starting prices for some of our key procedures:\n\n• Clean & Check: INR 1,500\n• Teeth Whitening: INR 8,000\n• Root Canal Therapy: INR 12,000\n• Dental Crowns: INR 15,000\n• Dental Implants: INR 65,000\n• Orthodontic Braces: INR 80,000\n\nIs there a specific procedure you're interested in?";
    }
    
    if (text.includes('pain') || text.includes('hurt') || text.includes('ache') || text.includes('bleeding') || text.includes('emergency')) {
      return "I'm sorry to hear you are experiencing discomfort. Toothaches are often managed by Dr. Tanvi Desai (Endodontist / Root Canal Specialist) or Dr. Nitin Gupta (Oral Surgeon).\n\nTo help me understand:\n1. How long has the pain lasted?\n2. On a scale of 1-10, how severe is it?\n3. Is it sensitive to hot or cold food?";
    }

    if (text.includes('doctor') || text.includes('specialist') || text.includes('dentist') || text.includes('appointment')) {
      return "We have 8 specialists at our Bandra clinic, including Dr. Sameer Sharma (Orthodontist), Dr. Tanvi Desai (Root Canal Specialist), and Dr. Sarah Patel (Pediatric Dentistry).\n\nTo book an appointment, please close this chat and click the 'Book Appointment' button at the top of the page. Would you like details on any particular doctor?";
    }

    if (text.includes('location') || text.includes('where') || text.includes('address') || text.includes('bandra')) {
      return "DentalFlow AI is located at Linking Road, Bandra, Mumbai, India. We are near the main SV Road intersection. We have dedicated parking space available.";
    }

    if (text.includes('hour') || text.includes('time') || text.includes('open') || text.includes('close') || text.includes('schedule')) {
      return "Our clinic is open daily (Sunday to Saturday) from 9:00 AM to 8:00 PM. Appointments can be booked within these hours.";
    }

    return "Thank you for reaching out! I can help answer queries about our treatments, doctors, location, or clinic hours. If you wish to schedule a visit, click 'Book Appointment' at the top. Let me know how I can guide you!";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');
    setLoading(true);

    if (isGeminiConfigured) {
      try {
        const genAI = new GoogleGenerativeAI(geminiKey);
        // Using gemini-2.5-flash as default, fallback to gemini-1.5-flash
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-flash',
          systemInstruction: systemPrompt
        });

        const chat = model.startChat({
          history: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        });

        const result = await chat.sendMessage(userMsg);
        const responseText = result.response.text();
        
        setMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
      } catch (error) {
        console.error("Gemini API Error, falling back to mock reply:", error);
        setMessages(prev => [...prev, { sender: 'bot', text: getMockResponse(userMsg) }]);
      } finally {
        setLoading(false);
      }
    } else {
      // Simulate typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: getMockResponse(userMsg) }]);
        setLoading(false);
      }, 800);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* 1. Floating Chat Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all hover:bg-primary/95 flex items-center justify-center relative group"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
          </span>
          {/* Tooltip */}
          <div className="absolute right-14 bg-card border border-border text-foreground text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow shadow-black/10">
            Chat with 24/7 AI Receptionist
          </div>
        </button>
      )}

      {/* 2. Expanded Chat Box */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1 bg-white/20 rounded">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">AI Receptionist</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-white/80 font-medium">
                    {isGeminiConfigured ? 'Gemini Live' : 'Demo Mock Mode'}
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Warning banner if not configured */}
          {!isGeminiConfigured && (
            <div className="px-4 py-2 bg-yellow-500/10 border-b border-yellow-500/20 text-yellow-600 dark:text-yellow-500 flex items-center gap-1.5 text-[10px] text-left">
              <AlertTriangle className="h-3 w-3 shrink-0" />
              <span>VITE_GEMINI_API_KEY missing. Running local assistant engine.</span>
            </div>
          )}

          {/* Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-background/50">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs text-left leading-relaxed whitespace-pre-line ${
                    m.sender === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-br-none' 
                      : 'bg-card border border-border text-foreground rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5 shadow-sm">
                  <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
                  <span className="text-[10px] text-muted-foreground">Receptionist is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2 bg-card">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="Ask about prices, timings, pain..."
              className="flex-1 bg-background border border-border px-3 py-2 rounded-xl text-xs focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/95 disabled:opacity-50 transition-colors flex items-center justify-center"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
