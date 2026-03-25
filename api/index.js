const users = [];
const loans = [];
const payments = [];
let userId = 1;
let loanId = 1;
let paymentId = 1;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url } = req;

  if (url === '/api/health') {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  if (url === '/api/auth/signup' && req.method === 'POST') {
    const { name, email, password } = req.body || {};
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const user = { id: userId++, name, email, password };
    users.push(user);
    return res.status(200).json({ message: 'Signup successful', user: { id: user.id, name: user.name, email: user.email } });
  }

  if (url === '/api/auth/login' && req.method === 'POST') {
    const { email, password } = req.body || {};
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  }

  if (url === '/api/loans' && req.method === 'GET') {
    return res.status(200).json(loans);
  }

  if (url === '/api/loans' && req.method === 'POST') {
    const loan = { id: loanId++, ...req.body };
    loans.push(loan);
    return res.status(200).json(loan);
  }

  if (url === '/api/payments' && req.method === 'GET') {
    return res.status(200).json(payments);
  }

  if (url === '/api/payments' && req.method === 'POST') {
    const payment = { id: paymentId++, ...req.body };
    payments.push(payment);
    return res.status(200).json(payment);
  }

  return res.status(404).json({ message: 'Not found' });
}
