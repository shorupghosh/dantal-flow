export type MessageDirection = 'patient' | 'ai';
export type ConversationStatus = 'new' | 'active' | 'no-show' | 'resolved';
export type ReminderStatus = 'done' | 'queued' | 'cancelled';
export type ReminderType = 'confirmation' | '24hr' | '2hr' | 'no_show' | 'post_treatment';

export interface WaMessage {
  id: string;
  from: MessageDirection;
  text: string;
  time: string;
  read?: boolean;
}

export interface WaReminder {
  id: string;
  type: ReminderType;
  label: string;
  status: ReminderStatus;
  time: string;
}

export interface WaConversation {
  id: string;
  patient: {
    name: string;
    phone: string;
    avatar: string; // initials
    status: ConversationStatus;
    intent: string;
    aiScore: number;
  };
  messages: WaMessage[];
  lastMessage: string;
  unread: number;
  reminderQueue: WaReminder[];
  aiDraft: string;
}

export interface WaStats {
  totalToday: number;
  leadsCapture: number;
  noShows: number;
  remindersSent: number;
}
