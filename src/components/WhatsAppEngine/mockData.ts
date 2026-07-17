import type { WaConversation, WaStats } from './types';

export const mockStats: WaStats = {
  totalToday: 18,
  leadsCapture: 6,
  noShows: 1,
  remindersSent: 24,
};

export const mockConversations: WaConversation[] = [
  {
    id: 'WA-001',
    patient: {
      name: 'Priya Sharma',
      phone: '+91 98200 12345',
      avatar: 'PS',
      status: 'active',
      intent: 'Teeth Whitening',
      aiScore: 8,
    },
    lastMessage: '2 mins ago',
    unread: 2,
    aiDraft:
      'Perfect! I have reserved 10:00 AM this Saturday for your Teeth Whitening session with Dr. Kiran Verma. The cost is ₹8,000 and takes about 90 minutes. See you then! 😊',
    reminderQueue: [
      { id: 'r1', type: 'confirmation', label: 'Booking Confirmation Sent', status: 'done', time: 'Today, 10:35 AM' },
      { id: 'r2', type: '24hr', label: '24-Hour Reminder', status: 'queued', time: 'Tomorrow, 10:00 AM' },
      { id: 'r3', type: '2hr', label: '2-Hour Alert', status: 'queued', time: 'Saturday, 8:00 AM' },
    ],
    messages: [
      { id: 'm1', from: 'patient', text: 'Hi, I want to book a teeth whitening appointment. How much does it cost?', time: '10:30 AM', read: true },
      { id: 'm2', from: 'ai', text: 'Hi Priya! 😊 Our Teeth Whitening treatment is ₹8,000 and is performed by Dr. Kiran Verma, our Cosmetic Dentist. The session takes about 90 minutes. Do you have a preferred day this week?', time: '10:30 AM', read: true },
      { id: 'm3', from: 'patient', text: 'Saturday morning works for me!', time: '10:33 AM', read: true },
      { id: 'm4', from: 'ai', text: 'Great choice! We have 10:00 AM and 11:30 AM available this Saturday. Which works better for you?', time: '10:33 AM', read: true },
      { id: 'm5', from: 'patient', text: '10 AM please', time: '10:34 AM', read: false },
    ],
  },
  {
    id: 'WA-002',
    patient: {
      name: 'Rajan Mehta',
      phone: '+91 99876 54321',
      avatar: 'RM',
      status: 'new',
      intent: 'Dental Implants',
      aiScore: 9,
    },
    lastMessage: '1 hr ago',
    unread: 1,
    aiDraft:
      'Hi Rajan! Dental implants start at ₹65,000 per tooth with EMI options available (0% for 6 months). Dr. Nitin Gupta is our Oral & Implant Surgeon. Shall I book a free 15-minute consultation for you this week?',
    reminderQueue: [
      { id: 'r4', type: 'confirmation', label: 'Booking Confirmation Sent', status: 'done', time: 'Today, 9:16 AM' },
      { id: 'r5', type: '24hr', label: '24-Hour Reminder', status: 'queued', time: 'Tomorrow, 9:00 AM' },
    ],
    messages: [
      { id: 'm6', from: 'patient', text: 'Hello, I lost a molar tooth last month. I need a dental implant. What is the cost and process?', time: '9:15 AM', read: true },
      { id: 'm7', from: 'ai', text: 'Hello Rajan! I\'m sorry to hear that. Dental implants are a great permanent solution. At DentalFlow AI, implants start from ₹65,000 per tooth and we offer 0% EMI for 6 months. Our specialist Dr. Nitin Gupta performs all implant procedures. Would you like to know more about the process?', time: '9:15 AM', read: true },
      { id: 'm8', from: 'patient', text: 'Yes, tell me more. Also how long does it take?', time: '9:20 AM', read: false },
    ],
  },
  {
    id: 'WA-003',
    patient: {
      name: 'Anita Kumar',
      phone: '+91 91234 56789',
      avatar: 'AK',
      status: 'no-show',
      intent: 'Emergency Pain',
      aiScore: 10,
    },
    lastMessage: '3 hrs ago',
    unread: 0,
    aiDraft:
      'Hi Anita, we noticed you couldn\'t make it to your 3:30 PM appointment today. We hope everything is okay! Would you like to reschedule for tomorrow? We can fit you in at any time.',
    reminderQueue: [
      { id: 'r6', type: 'confirmation', label: 'Booking Confirmation Sent', status: 'done', time: 'Yesterday, 4:01 PM' },
      { id: 'r7', type: '24hr', label: '24-Hour Reminder', status: 'done', time: 'Today, 3:30 PM' },
      { id: 'r8', type: 'no_show', label: 'No-Show Follow-up', status: 'queued', time: 'Today, 5:00 PM' },
    ],
    messages: [
      { id: 'm9', from: 'patient', text: 'Hi I have very bad toothache since 2 days. Is it possible to come today?', time: 'Yesterday 4:00 PM', read: true },
      { id: 'm10', from: 'ai', text: 'Hi Anita! I\'m so sorry to hear you\'re in pain 😟 Yes, we have emergency slots today. Dr. Tanvi Desai (Root Canal Specialist) is available at 3:30 PM and 5:00 PM. Which works for you?', time: 'Yesterday 4:01 PM', read: true },
      { id: 'm11', from: 'patient', text: '3:30 PM is good', time: 'Yesterday 4:05 PM', read: true },
      { id: 'm12', from: 'ai', text: 'Booked! 3:30 PM with Dr. Tanvi Desai today. Our address is 12 Golf Course Road, Sector 54, Gurugram. Please avoid eating 1 hour before. See you soon! 🦷', time: 'Yesterday 4:05 PM', read: true },
    ],
  },
  {
    id: 'WA-004',
    patient: {
      name: 'Vikram Nair',
      phone: '+91 97700 33221',
      avatar: 'VN',
      status: 'active',
      intent: 'Braces',
      aiScore: 9,
    },
    lastMessage: '5 hrs ago',
    unread: 0,
    aiDraft:
      'Hi Vikram! Dr. Sameer Sharma has slots this Thursday at 11 AM and Friday at 3 PM for an orthodontic consultation. The consultation is free and will help us determine the best treatment plan for you. Which day works?',
    reminderQueue: [
      { id: 'r9', type: 'confirmation', label: 'Booking Confirmation Sent', status: 'done', time: 'Today, 11:30 AM' },
      { id: 'r10', type: '24hr', label: '24-Hour Reminder', status: 'queued', time: 'Wednesday, 10:00 AM' },
      { id: 'r11', type: 'post_treatment', label: 'Post-Treatment Follow-up', status: 'queued', time: 'Friday, 10:00 AM' },
    ],
    messages: [
      { id: 'm13', from: 'patient', text: 'Hi! My teenage son needs braces. He is 15 years old. Can you help?', time: '11:00 AM', read: true },
      { id: 'm14', from: 'ai', text: 'Hi Vikram! Absolutely, 15 is a great age for orthodontic treatment. Dr. Sameer Sharma, our Orthodontist, specializes in braces for teens. We offer metal braces from ₹80,000 and ceramic braces from ₹95,000, with 0% EMI. Shall I book a free consultation?', time: '11:01 AM', read: true },
      { id: 'm15', from: 'patient', text: 'Yes please. What days are available this week?', time: '11:15 AM', read: true },
    ],
  },
  {
    id: 'WA-005',
    patient: {
      name: 'Meena Joshi',
      phone: '+91 93456 78901',
      avatar: 'MJ',
      status: 'resolved',
      intent: 'Root Canal',
      aiScore: 7,
    },
    lastMessage: 'Yesterday',
    unread: 0,
    aiDraft:
      'Hi Meena, we hope your root canal treatment went smoothly! How are you feeling today? If you experience any sensitivity or discomfort, please don\'t hesitate to call us at +91 98200 00000. 🌟',
    reminderQueue: [
      { id: 'r12', type: 'confirmation', label: 'Booking Confirmation Sent', status: 'done', time: '2 days ago' },
      { id: 'r13', type: '24hr', label: '24-Hour Reminder', status: 'done', time: 'Yesterday, 10:00 AM' },
      { id: 'r14', type: 'post_treatment', label: 'Post-Treatment Follow-up', status: 'done', time: 'Today, 9:00 AM' },
    ],
    messages: [
      { id: 'm16', from: 'patient', text: 'Hello, I had my root canal yesterday with Dr. Tanvi. It went really well! Thank you so much.', time: 'Yesterday, 2:00 PM', read: true },
      { id: 'm17', from: 'ai', text: 'We\'re so glad to hear that, Meena! Dr. Tanvi will be happy to know 😊 Please take the prescribed antibiotics and avoid very hard food for 2-3 days. If you need a crown later, just message us here!', time: 'Yesterday, 2:01 PM', read: true },
    ],
  },
];

export const mockReminderLog = [
  { id: 'log-1', patient: 'Priya Sharma', phone: '+91 98200 12345', type: 'Booking Confirmation', status: 'Success', time: '10:35 AM', node: 'Node #1' },
  { id: 'log-2', patient: 'Rajan Mehta', phone: '+91 99876 54321', type: 'Booking Confirmation', status: 'Success', time: '9:16 AM', node: 'Node #1' },
  { id: 'log-3', patient: 'Anita Kumar', phone: '+91 91234 56789', type: '24-Hour Reminder', status: 'Success', time: '3:30 PM', node: 'Node #2' },
  { id: 'log-4', patient: 'Vikram Nair', phone: '+91 97700 33221', type: 'Booking Confirmation', status: 'Success', time: '11:30 AM', node: 'Node #1' },
  { id: 'log-5', patient: 'Meena Joshi', phone: '+91 93456 78901', type: 'Post-Treatment Follow-up', status: 'Success', time: '9:00 AM', node: 'Node #4' },
  { id: 'log-6', patient: 'Anita Kumar', phone: '+91 91234 56789', type: 'No-Show Follow-up', status: 'Queued', time: 'In 1 hr', node: 'Node #3' },
  { id: 'log-7', patient: 'Priya Sharma', phone: '+91 98200 12345', type: '24-Hour Reminder', status: 'Queued', time: 'Tomorrow 10 AM', node: 'Node #2' },
  { id: 'log-8', patient: 'Vikram Nair', phone: '+91 97700 33221', type: '24-Hour Reminder', status: 'Queued', time: 'Wednesday 10 AM', node: 'Node #2' },
];
