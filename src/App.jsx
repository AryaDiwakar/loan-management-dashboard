import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Wallet, Calendar, CreditCard, TrendingUp, BarChart2, Award } from 'lucide-react';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import StatCard from './components/Dashboard/StatCard';
import LoanCard from './components/Dashboard/LoanCard';
import EMIBreakdownChart from './components/Charts/EMIBreakdownChart';
import PaymentHistoryChart from './components/Charts/PaymentHistoryChart';
import LoanProgressChart from './components/Charts/LoanProgressChart';
import Chatbot from './components/Chatbot/Chatbot';
import Login from './pages/Login';
import MyLoans from './pages/MyLoans';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { loans, notifications as initialNotifications } from './data/mockData';
import './styles/globals.css';
import './App.css';

function DashboardContent({ user, onLogout }) {
  const location = useLocation();
  const [notifications] = useState(initialNotifications);

  const totalOutstanding = loans.reduce((sum, loan) => {
    const progress = loan.paidMonths / loan.tenureMonths;
    return sum + (loan.principal * (1 - progress));
  }, 0);

  const monthlyEMI = loans.reduce((sum, loan) => sum + loan.emiAmount, 0);
  const ytdInterest = 150000;

  const handleMarkAsRead = (id) => {
    // Mark notification as read
  };

  const handleMarkAllAsRead = () => {
    // Mark all notifications as read
  };

  const renderPage = () => {
    const path = location.pathname;

    if (path === '/my-loans') {
      return <MyLoans loans={loans} />;
    }
    if (path === '/analytics') {
      return <Analytics />;
    }
    if (path === '/settings') {
      return <Settings />;
    }

    // Default dashboard
    return (
      <>
        <section className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome back, {user?.name?.split(' ')[0] || 'User'}</h1>
            <p>Here's your loan overview for March 2025</p>
          </div>
          <div className="welcome-decoration">
            <div className="decoration-circle c1" />
            <div className="decoration-circle c2" />
          </div>
        </section>

        <section className="stats-grid">
          <StatCard 
            icon={Wallet}
            label="Total Outstanding"
            value={totalOutstanding}
            trend="down"
            trendValue="-3.2%"
            color="#6366f1"
            delay={0}
          />
          <StatCard 
            icon={Calendar}
            label="Next EMI Due"
            value="₹43429"
            trend="up"
            trendValue="Apr 10"
            color="#8b5cf6"
            delay={100}
          />
         
          <StatCard 
            icon={BarChart2}
            label="Active Loans"
            value={loans.length}
            trend="up"
            trendValue="+1"
            color="#10b981"
            delay={300}
          />
          <StatCard 
            icon={TrendingUp}
            label="YTD Interest Paid"
            value={ytdInterest}
            color="#f59e0b"
            delay={400}
          />
          <StatCard 
            icon={Award}
            label="Credit Score"
            value={785}
            color="#ec4899"
            delay={500}
          />
        </section>

        <section className="charts-section">
          <div className="charts-row">
            <EMIBreakdownChart />
            <PaymentHistoryChart />
          </div>
          <div className="charts-row single">
            <LoanProgressChart />
          </div>
        </section>

        <section className="loans-section">
          <div className="section-header">
            <h2>Your Loans</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="loans-grid">
            {loans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))}
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="app-container">
      <Sidebar user={user} onLogout={onLogout} />
      
      <main className="main-content">
        <TopBar 
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAsRead={handleMarkAllAsRead}
        />

        <div className="dashboard-content">
          {renderPage()}
        </div>
      </main>

      <Chatbot />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
      } />

      <Route path="/dashboard" element={
        user ? <DashboardContent user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
      } />
      <Route path="/my-loans" element={
        user ? <DashboardContent user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
      } />
      <Route path="/analytics" element={
        user ? <DashboardContent user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
      } />
      <Route path="/settings" element={
        user ? <DashboardContent user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
      } />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
