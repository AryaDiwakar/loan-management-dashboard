export const loans = [
  {
    id: '1',
    name: 'Home Loan',
    type: 'home',
    principal: 5000000,
    interestRate: 8.5,
    tenureMonths: 240,
    startDate: '2022-01-15',
    emiAmount: 43429,
    paidMonths: 28,
    nextDueDate: '2025-04-10',
    lender: 'HDFC Bank',
    color: '#6366f1'
  },
  {
    id: '2',
    name: 'Car Loan',
    type: 'car',
    principal: 850000,
    interestRate: 9.2,
    tenureMonths: 60,
    startDate: '2023-06-01',
    emiAmount: 17745,
    paidMonths: 22,
    nextDueDate: '2025-04-05',
    lender: 'ICICI Bank',
    color: '#8b5cf6'
  },
  {
    id: '3',
    name: 'Personal Loan',
    type: 'personal',
    principal: 300000,
    interestRate: 12.5,
    tenureMonths: 36,
    startDate: '2024-02-20',
    emiAmount: 9970,
    paidMonths: 13,
    nextDueDate: '2025-04-15',
    lender: 'Axis Bank',
    color: '#06b6d4'
  }
];

export const paymentHistory = [
  { month: 'Apr 2024', principal: 28500, interest: 14929, total: 43429 },
  { month: 'May 2024', principal: 28750, interest: 14679, total: 43429 },
  { month: 'Jun 2024', principal: 28900, interest: 14529, total: 43429 },
  { month: 'Jul 2024', principal: 29100, interest: 14329, total: 43429 },
  { month: 'Aug 2024', principal: 29350, interest: 14079, total: 43429 },
  { month: 'Sep 2024', principal: 29550, interest: 13879, total: 43429 },
  { month: 'Oct 2024', principal: 29750, interest: 13679, total: 43429 },
  { month: 'Nov 2024', principal: 30000, interest: 13429, total: 43429 },
  { month: 'Dec 2024', principal: 30200, interest: 13229, total: 43429 },
  { month: 'Jan 2025', principal: 30450, interest: 12979, total: 43429 },
  { month: 'Feb 2025', principal: 30650, interest: 12779, total: 43429 },
  { month: 'Mar 2025', principal: 30850, interest: 12579, total: 43429 },
];

export const notifications = [
  {
    id: '1',
    type: 'payment',
    title: 'Home Loan EMI Due',
    description: 'Your EMI of ₹43,429 is due on April 10, 2025',
    timestamp: new Date('2025-03-23T10:00:00'),
    read: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Payment Successful',
    description: 'Your Car Loan EMI of ₹17,745 has been processed',
    timestamp: new Date('2025-03-15T09:30:00'),
    read: false,
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Personal Loan Payment',
    description: 'Reminder: EMI of ₹9,970 due on April 15',
    timestamp: new Date('2025-03-20T14:00:00'),
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Rate Change Alert',
    description: 'Home loan interest rate reduced from 8.7% to 8.5%',
    timestamp: new Date('2025-03-10T11:00:00'),
    read: true,
  },
  {
    id: '5',
    type: 'alert',
    title: 'Credit Score Updated',
    description: 'Your CIBIL score has improved to 785',
    timestamp: new Date('2025-03-05T16:30:00'),
    read: true,
  }
];

export const chatbotResponses = {
  greeting: "Hello! I'm your loan assistant. How can I help you today?",
  EMI_DUE: "Your next EMI payment is due on April 10, 2025. Home Loan EMI: ₹43,429. Would you like to set up an autopay reminder?",
  PAYMENT: "You can make payments through net banking, UPI, or NEFT. Your registered bank account ends in ****4521. Should I help you with a specific payment?",
  INTEREST: "Current interest rates:\n• Home Loan: 8.5% p.a.\n• Car Loan: 9.2% p.a.\n• Personal Loan: 12.5% p.a.\n\nWould you like to explore refinancing options?",
  DEFAULT: "I can help you with:\n• EMI schedules and due dates\n• Payment processing\n• Interest rate information\n• Loan statements\n\nWhat would you like to know more about?"
};

export const quickActions = [
  { id: 'emi', label: 'EMI Due', icon: 'Calendar' },
  { id: 'payment', label: 'Make Payment', icon: 'CreditCard' },
  { id: 'rates', label: 'Interest Rates', icon: 'TrendingUp' },
  { id: 'statement', label: 'Get Statement', icon: 'FileText' }
];
