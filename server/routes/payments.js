import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const payments = [
    { id: '1', loanId: '1', amount: 43429, date: '2025-03-10', status: 'paid', principal: 28500, interest: 14929 },
    { id: '2', loanId: '2', amount: 17745, date: '2025-03-05', status: 'paid', principal: 14250, interest: 3495 },
    { id: '3', loanId: '3', amount: 9970, date: '2025-03-15', status: 'paid', principal: 6850, interest: 3120 },
    { id: '4', loanId: '1', amount: 43429, date: '2025-04-10', status: 'pending', principal: 28700, interest: 14729 },
  ];
  res.json({ payments });
});

router.post('/', authenticateToken, (req, res) => {
  const { loanId, amount } = req.body;
  
  const payment = {
    id: Date.now().toString(),
    loanId,
    amount,
    date: new Date().toISOString(),
    status: 'paid',
    principal: Math.round(amount * 0.65),
    interest: Math.round(amount * 0.35)
  };
  
  res.status(201).json({ message: 'Payment successful', payment });
});

export default router;
