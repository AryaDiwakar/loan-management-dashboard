import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from '../server/routes/auth.js';
import userRoutes from '../server/routes/user.js';
import loanRoutes from '../server/routes/loans.js';
import paymentRoutes from '../server/routes/payments.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later.' }
});

app.use('/api/', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
