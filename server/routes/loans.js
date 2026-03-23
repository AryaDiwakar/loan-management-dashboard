import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

const userLoans = new Map();

router.get('/', authenticateToken, (req, res) => {
  const loans = userLoans.get(req.user.id) || [
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
  
  userLoans.set(req.user.id, loans);
  res.json({ loans });
});

router.get('/:id', authenticateToken, (req, res) => {
  const loans = userLoans.get(req.user.id) || [];
  const loan = loans.find(l => l.id === req.params.id);
  
  if (!loan) {
    return res.status(404).json({ message: 'Loan not found' });
  }
  
  res.json({ loan });
});

router.post('/', authenticateToken, (req, res) => {
  const { name, type, principal, interestRate, tenureMonths, lender } = req.body;
  
  const monthlyRate = interestRate / 12 / 100;
  const emi = Math.round(principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / (Math.pow(1 + monthlyRate, tenureMonths) - 1));
  
  const newLoan = {
    id: Date.now().toString(),
    name,
    type,
    principal,
    interestRate,
    tenureMonths,
    emiAmount: emi,
    paidMonths: 0,
    startDate: new Date().toISOString(),
    nextDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    lender,
    color: type === 'home' ? '#6366f1' : type === 'car' ? '#8b5cf6' : '#06b6d4'
  };
  
  const loans = userLoans.get(req.user.id) || [];
  loans.push(newLoan);
  userLoans.set(req.user.id, loans);
  
  res.status(201).json({ message: 'Loan added successfully', loan: newLoan });
});

router.delete('/:id', authenticateToken, (req, res) => {
  const loans = userLoans.get(req.user.id) || [];
  const index = loans.findIndex(l => l.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Loan not found' });
  }
  
  loans.splice(index, 1);
  userLoans.set(req.user.id, loans);
  
  res.json({ message: 'Loan deleted successfully' });
});

export default router;
