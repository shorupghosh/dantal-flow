export type StepType = 'options' | 'text' | 'number' | 'email' | 'phone' | 'date';

export interface BotStep {
  id: string;
  message: string;
  type: StepType;
  options?: string[];
  next: string | ((answer: string) => string);
}

export const chatbotFlow: Record<string, BotStep> = {
  greeting: {
    id: 'greeting',
    message: "Hello 👋\nHow can I help?",
    type: 'options',
    options: ["I need implants", "Whitening", "General Checkup", "Other"],
    next: (answer: string) => {
      if (answer === "I need implants") return "clarification_implants";
      return "age"; // Default flow for others for this demo
    }
  },
  clarification_implants: {
    id: 'clarification_implants',
    message: "Single or multiple teeth?",
    type: 'options',
    options: ["Single tooth", "Multiple teeth", "Full mouth"],
    next: "age"
  },
  age: {
    id: 'age',
    message: "What's your age?",
    type: 'number',
    next: "pain"
  },
  pain: {
    id: 'pain',
    message: "Any pain?",
    type: 'options',
    options: ["Yes, severe", "Yes, mild", "No pain"],
    next: "city"
  },
  city: {
    id: 'city',
    message: "Which city?",
    type: 'text',
    next: "phone"
  },
  phone: {
    id: 'phone',
    message: "Phone Number?",
    type: 'phone',
    next: "appointment"
  },
  appointment: {
    id: 'appointment',
    message: "Preferred appointment time?",
    type: 'options',
    options: ["Morning", "Afternoon", "Evening"],
    next: "booked"
  },
  booked: {
    id: 'booked',
    message: "Booked.\nOur team will contact you shortly to confirm.",
    type: 'options', // Just a placeholder, no further input expected
    options: ["Start Over"],
    next: "greeting" // In case they want to start over
  }
};
