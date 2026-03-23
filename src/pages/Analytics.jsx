import { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Info, DollarSign, Percent, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, BarChart, Bar } from 'recharts';
import './Analytics.css';

const paymentHistory = [
  { month: 'Apr', emi: 43429, principal: 28500, interest: 14929 },
  { month: 'May', emi: 43429, principal: 28750, interest: 14679 },
  { month: 'Jun', emi: 43429, principal: 28900, interest: 14529 },
  { month: 'Jul', emi: 43429, principal: 29100, interest: 14329 },
  { month: 'Aug', emi: 43429, principal: 29350, interest: 14079 },
  { month: 'Sep', emi: 43429, principal: 29550, interest: 13879 },
  { month: 'Oct', emi: 43429, principal: 29750, interest: 13679 },
  { month: 'Nov', emi: 43429, principal: 30000, interest: 13429 },
  { month: 'Dec', emi: 43429, principal: 30200, interest: 13229 },
  { month: 'Jan', emi: 43429, principal: 30450, interest: 12979 },
  { month: 'Feb', emi: 43429, principal: 30650, interest: 12779 },
  { month: 'Mar', emi: 43429, principal: 30850, interest: 12579 },
];

const loanDistribution = [
  { name: 'Home Loan', value: 5000000, color: '#6366f1' },
  { name: 'Car Loan', value: 850000, color: '#8b5cf6' },
  { name: 'Personal Loan', value: 300000, color: '#06b6d4' },
];

const monthlyTrend = [
  { month: 'Apr', principal: 28500, interest: 14929 },
  { month: 'May', principal: 28750, interest: 14679 },
  { month: 'Jun', principal: 28900, interest: 14529 },
  { month: 'Jul', principal: 29100, interest: 14329 },
  { month: 'Aug', principal: 29350, interest: 14079 },
  { month: 'Sep', principal: 29550, interest: 13879 },
  { month: 'Oct', principal: 29750, interest: 13679 },
  { month: 'Nov', principal: 30000, interest: 13429 },
  { month: 'Dec', principal: 30200, interest: 13229 },
  { month: 'Jan', principal: 30450, interest: 12979 },
  { month: 'Feb', principal: 30650, interest: 12779 },
  { month: 'Mar', principal: 30850, interest: 12579 },
];

const insights = [
  {
    type: 'warning',
    icon: Percent,
    title: 'EMI to Income Ratio',
    description: 'You are paying 35% of your income in EMIs',
    detail: 'Recommended: Keep EMI below 40% of monthly income',
  },
  {
    type: 'alert',
    icon: AlertCircle,
    title: 'Interest Burden',
    description: 'Interest burden is high, consider prepayment',
    detail: 'Prepay ₹2,50,000 to save ₹45,000 in interest',
  },
  {
    type: 'success',
    icon: CheckCircle,
    title: 'Credit Score Progress',
    description: 'Your credit score improved by 15 points this month',
    detail: 'Current score: 785 (Good range)',
  },
  {
    type: 'info',
    icon: Info,
    title: 'Loan Mix Analysis',
    description: 'Home loan dominates at 85% of total debt',
    detail: 'Consider consolidating or refinancing for better rates',
  },
];

function Analytics() {
  const [activeChart, setActiveChart] = useState('area');

  const totalDebt = loanDistribution.reduce((sum, item) => sum + item.value, 0);
  const financialHealthScore = 785;
  const maxScore = 900;
  const scorePercentage = (financialHealthScore / maxScore) * 100;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="analytics-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((item, index) => (
            <p key={index} style={{ color: item.color }}>
              {item.name}: ₹{item.value?.toLocaleString('en-IN')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Financial Analytics</h1>
          <p>Insights and trends from your loan portfolio</p>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Financial Health Score */}
        <div className="analytics-card score-card">
          <div className="card-header">
            <Activity size={20} />
            <h3>Financial Health Score</h3>
          </div>
          <div className="score-container">
            <div className="score-gauge">
              <svg viewBox="0 0 200 120" className="gauge-svg">
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${scorePercentage * 2.51} 251`}
                />
              </svg>
              <div className="score-value">
                <span className="score-number">{financialHealthScore}</span>
                <span className="score-max">/ {maxScore}</span>
              </div>
            </div>
            <div className="score-labels">
              <div className="score-label">
                <span className="dot poor" />
                <span>Poor (300-549)</span>
              </div>
              <div className="score-label">
                <span className="dot fair" />
                <span>Fair (550-649)</span>
              </div>
              <div className="score-label">
                <span className="dot good" />
                <span>Good (650-749)</span>
              </div>
              <div className="score-label">
                <span className="dot excellent" />
                <span>Excellent (750+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Distribution */}
        <div className="analytics-card distribution-card">
          <div className="card-header">
            <PieChartIcon size={20} />
            <h3>Loan Distribution</h3>
          </div>
          <div className="distribution-content">
            <div className="distribution-chart">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={loanDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {loanDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                    contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="distribution-center">
                <span className="distribution-total">₹{(totalDebt / 100000).toFixed(1)}L</span>
                <span className="distribution-label">Total Debt</span>
              </div>
            </div>
            <div className="distribution-legend">
              {loanDistribution.map((item) => (
                <div key={item.name} className="distribution-item">
                  <span className="distribution-dot" style={{ background: item.color }} />
                  <span className="distribution-name">{item.name}</span>
                  <span className="distribution-percent">
                    {((item.value / totalDebt) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="analytics-card insights-card">
          <div className="card-header">
            <TrendingUp size={20} />
            <h3>Smart Insights</h3>
          </div>
          <div className="insights-list">
            {insights.map((insight, index) => (
              <div key={index} className={`insight-item ${insight.type}`}>
                <div className="insight-icon">
                  <insight.icon size={18} />
                </div>
                <div className="insight-content">
                  <h4>{insight.title}</h4>
                  <p>{insight.description}</p>
                  <span className="insight-detail">{insight.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EMI Paid Chart */}
        <div className="analytics-card chart-card wide">
          <div className="card-header">
            <DollarSign size={20} />
            <h3>EMI Paid Over Time</h3>
            <div className="chart-tabs">
              <button 
                className={activeChart === 'area' ? 'active' : ''}
                onClick={() => setActiveChart('area')}
              >
                Area
              </button>
              <button 
                className={activeChart === 'line' ? 'active' : ''}
                onClick={() => setActiveChart('line')}
              >
                Line
              </button>
              <button 
                className={activeChart === 'bar' ? 'active' : ''}
                onClick={() => setActiveChart('bar')}
              >
                Bar
              </button>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={280}>
              {activeChart === 'area' ? (
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="emiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="principal" name="Principal" stroke="#6366f1" strokeWidth={2} fill="url(#emiGradient)" />
                </AreaChart>
              ) : activeChart === 'line' ? (
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="principal" name="Principal" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="interest" name="Interest" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', strokeWidth: 2 }} />
                </LineChart>
              ) : (
                <BarChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="principal" name="Principal" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interest" name="Interest" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Principal vs Interest Chart */}
        <div className="analytics-card chart-card">
          <div className="card-header">
            <Percent size={20} />
            <h3>Principal vs Interest</h3>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="principalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="interestGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="principal" name="Principal" stroke="#6366f1" strokeWidth={2} fill="url(#principalGrad)" />
                <Area type="monotone" dataKey="interest" name="Interest" stroke="#f59e0b" strokeWidth={2} fill="url(#interestGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend horizontal">
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#6366f1' }} />
              <span>Principal</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#f59e0b' }} />
              <span>Interest</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="analytics-card stats-card">
          <div className="card-header">
            <TrendingDown size={20} />
            <h3>Key Metrics</h3>
          </div>
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="stat-label">Total Interest Paid (YTD)</span>
              <span className="stat-value">₹1,65,000</span>
              <span className="stat-trend down">-5% vs last year</span>
            </div>
            <div className="quick-stat">
              <span className="stat-label">Avg Interest Rate</span>
              <span className="stat-value">9.4%</span>
              <span className="stat-trend down">-0.3% reduction</span>
            </div>
            <div className="quick-stat">
              <span className="stat-label">Total EMIs Paid</span>
              <span className="stat-value">28</span>
              <span className="stat-trend up">On track</span>
            </div>
            <div className="quick-stat">
              <span className="stat-label">Potential Savings</span>
              <span className="stat-value">₹45,000</span>
              <span className="stat-trend">If prepaid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
