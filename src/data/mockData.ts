export interface Organization {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  verified: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface ChatHistory {
  id: string;
  organizationId: string;
  organizationName: string;
  organizationLogo?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount?: number;
  messages: Message[];
}

export const organizations: Organization[] = [
  {
    id: '1',
    name: 'City Medical Center',
    category: 'hospital',
    description: 'Leading healthcare provider offering comprehensive medical services, emergency care, and specialized treatments.',
    verified: true,
  },
  {
    id: '2',
    name: 'Metropolitan Bank',
    category: 'bank',
    description: 'Full-service banking institution providing personal banking, loans, mortgages, and wealth management.',
    verified: true,
  },
  {
    id: '3',
    name: 'Grand Plaza Hotel',
    category: 'hotel',
    description: 'Luxury accommodation with premium amenities, conference facilities, and exceptional hospitality services.',
    verified: true,
  },
  {
    id: '4',
    name: 'SafeGuard Insurance',
    category: 'insurance',
    description: 'Comprehensive insurance solutions including auto, home, life, and business coverage.',
    verified: true,
  },
  {
    id: '5',
    name: 'Department of Motor Vehicles',
    category: 'government',
    description: 'Official government agency for vehicle registration, driver licensing, and motor vehicle services.',
    verified: true,
  },
  {
    id: '6',
    name: 'Discover Tourism Bureau',
    category: 'tourism',
    description: 'Your gateway to exploring local attractions, planning trips, and discovering hidden gems.',
    verified: true,
  },
  {
    id: '7',
    name: 'TechStart Solutions',
    category: 'small business',
    description: 'Innovative technology startup specializing in digital transformation and business automation.',
    verified: true,
  },
  {
    id: '8',
    name: 'GreenLeaf Consulting',
    category: 'small business',
    description: 'Environmental consulting firm helping businesses implement sustainable practices.',
    verified: true,
  },
];

export const chatHistories: ChatHistory[] = [
  {
    id: 'chat-1',
    organizationId: '1',
    organizationName: 'City Medical Center',
    lastMessage: 'Your appointment is confirmed for tomorrow at 2:00 PM. Please arrive 15 minutes early.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    unreadCount: 0,
    messages: [
      {
        id: 'msg-1',
        content: 'Hello, I would like to schedule an appointment with Dr. Smith.',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        status: 'read',
      },
      {
        id: 'msg-2',
        content: 'Hi! I\'d be happy to help you schedule an appointment with Dr. Smith. What type of appointment are you looking for?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
      },
      {
        id: 'msg-3',
        content: 'I need a general consultation for a regular checkup.',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 50), // 50 minutes ago
        status: 'read',
      },
      {
        id: 'msg-4',
        content: 'Perfect! I have availability tomorrow at 2:00 PM or Thursday at 10:30 AM. Which works better for you?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      },
      {
        id: 'msg-5',
        content: 'Tomorrow at 2:00 PM works great for me.',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 40), // 40 minutes ago
        status: 'read',
      },
      {
        id: 'msg-6',
        content: 'Your appointment is confirmed for tomorrow at 2:00 PM. Please arrive 15 minutes early.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
    ],
  },
  {
    id: 'chat-2',
    organizationId: '2',
    organizationName: 'Metropolitan Bank',
    lastMessage: 'Thank you for contacting us. Is there anything else I can help you with today?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    unreadCount: 1,
    messages: [
      {
        id: 'msg-7',
        content: 'Hi, I\'m interested in opening a savings account. What are your current interest rates?',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        status: 'read',
      },
      {
        id: 'msg-8',
        content: 'Hello! Thank you for your interest in our savings accounts. Our current rate for standard savings is 2.5% APY, and our high-yield savings offers 4.2% APY with a minimum balance of $1,000.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5), // 2.5 hours ago
      },
      {
        id: 'msg-9',
        content: 'That sounds great! What documents do I need to open the high-yield account?',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.2), // 2.2 hours ago
        status: 'read',
      },
      {
        id: 'msg-10',
        content: 'You\'ll need a valid government-issued ID, proof of address (utility bill or lease), and your Social Security number. The initial deposit can be made online or in-branch.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.1), // 2.1 hours ago
      },
      {
        id: 'msg-11',
        content: 'Perfect, I have all those documents. Can I start the application online?',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.05), // 2.05 hours ago
        status: 'read',
      },
      {
        id: 'msg-12',
        content: 'Absolutely! I can send you a secure link to begin the application process. It typically takes 5-10 minutes to complete.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
    ],
  },
  {
    id: 'chat-3',
    organizationId: '3',
    organizationName: 'Grand Plaza Hotel',
    lastMessage: 'Your reservation has been updated. You now have a deluxe suite for 3 nights.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    unreadCount: 0,
    messages: [
      {
        id: 'msg-13',
        content: 'Hello, I have a reservation for next weekend but would like to upgrade my room if possible.',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // 25 hours ago
        status: 'read',
      },
      {
        id: 'msg-14',
        content: 'Good evening! I\'d be delighted to help you with your room upgrade. May I have your reservation confirmation number?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.5), // 24.5 hours ago
      },
      {
        id: 'msg-15',
        content: 'Yes, it\'s GPH-2024-0156.',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.3), // 24.3 hours ago
        status: 'read',
      },
      {
        id: 'msg-16',
        content: 'Thank you! I see your reservation for a standard king room. We have deluxe suites available with city views. The upgrade would be $75 per night. Would you like to proceed?',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.1), // 24.1 hours ago
      },
      {
        id: 'msg-17',
        content: 'That sounds perfect! Yes, please upgrade me to the deluxe suite.',
        sender: 'user',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24.05), // 24.05 hours ago
        status: 'read',
      },
      {
        id: 'msg-18',
        content: 'Your reservation has been updated. You now have a deluxe suite for 3 nights.',
        sender: 'agent',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
      },
    ],
  },
];

export const getOrganizationById = (id: string): Organization | undefined => {
  return organizations.find(org => org.id === id);
};

export const getChatHistoryById = (id: string): ChatHistory | undefined => {
  return chatHistories.find(chat => chat.id === id);
};

export const getChatsByOrganizationId = (organizationId: string): ChatHistory[] => {
  return chatHistories.filter(chat => chat.organizationId === organizationId);
};