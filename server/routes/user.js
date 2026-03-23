import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: 'User',
    phone: '+91 9876543210',
    creditScore: 785,
    memberSince: '2024-01-15'
  });
});

router.put('/profile', authenticateToken, (req, res) => {
  const { name, phone } = req.body;
  res.json({
    message: 'Profile updated successfully',
    user: { id: req.user.id, email: req.user.email, name, phone }
  });
});

router.put('/password', authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  res.json({ message: 'Password updated successfully' });
});

export default router;
