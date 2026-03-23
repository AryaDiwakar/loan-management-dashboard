import { useState } from 'react';
import { LayoutGrid, List, Plus, Home, Car, Wallet, GraduationCap, TrendingDown, Calendar, Percent, Banknote, ArrowRight } from 'lucide-react';
import LoanDetailsPanel from './LoanDetailsPanel';
import './MyLoans.css';

const typeIcons = {
  home: Home,
  car: Car,
  personal: Wallet,
  education: GraduationCap,
};

const typeColors = {
  home: '#6366f1',
  car: '#8b5cf6',
  personal: '#06b6d4',
  education: '#10b981',
};

function MyLoans({ loans: initialLoans }) {
  const [viewMode, setViewMode] = useState('cards');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loans] = useState(initialLoans || [
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
  ]);

  const getOutstanding = (loan) => {
    const progress = loan.paidMonths / loan.tenureMonths;
    return loan.principal * (1 - progress);
  };

  const getTenureLeft = (loan) => {
    return loan.tenureMonths - loan.paidMonths;
  };

  return (
    <div className="my-loans-page">
      <div className="page-header">
        <div className="header-content">
          <h1>My Loans</h1>
          <p>Manage and track all your active loans</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <List size={18} />
            </button>
          </div>
          <button className="add-loan-btn">
            <Plus size={18} />
            <span>Add Loan</span>
          </button>
        </div>
      </div>

      <div className={`loans-container ${viewMode}`}>
        {viewMode === 'cards' ? (
          <div className="loans-cards">
            {loans.map((loan, index) => {
              const Icon = typeIcons[loan.type] || Wallet;
              const color = loan.color || typeColors[loan.type];
              const outstanding = getOutstanding(loan);
              const tenureLeft = getTenureLeft(loan);
              
              return (
                <div 
                  key={loan.id}
                  className="loan-card"
                  style={{ '--loan-color': color, animationDelay: `${index * 100}ms` }}
                >
                  <div className="loan-card-header">
                    <div className="loan-type-badge" style={{ background: `${color}15` }}>
                      <Icon size={20} style={{ color }} />
                    </div>
                    <div className="loan-title">
                      <h3>{loan.name}</h3>
                      <span className="loan-lender">{loan.lender}</span>
                    </div>
                  </div>

                  <div className="loan-stats">
                    <div className="stat-item">
                      <span className="stat-label">Outstanding</span>
                      <span className="stat-value">₹{Math.round(outstanding).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">EMI</span>
                      <span className="stat-value">₹{loan.emiAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Tenure Left</span>
                      <span className="stat-value">{tenureLeft} mo</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Interest</span>
                      <span className="stat-value">{loan.interestRate}%</span>
                    </div>
                  </div>

                  <div className="loan-progress">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span>{((loan.paidMonths / loan.tenureMonths) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${(loan.paidMonths / loan.tenureMonths) * 100}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
                      />
                    </div>
                  </div>

                  <button 
                    className="view-details-btn"
                    onClick={() => setSelectedLoan(loan)}
                  >
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loans-table-container">
            <table className="loans-table">
              <thead>
                <tr>
                  <th>Loan</th>
                  <th>Lender</th>
                  <th>Outstanding</th>
                  <th>EMI</th>
                  <th>Tenure Left</th>
                  <th>Interest</th>
                  <th>Progress</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => {
                  const Icon = typeIcons[loan.type] || Wallet;
                  const color = loan.color || typeColors[loan.type];
                  
                  return (
                    <tr key={loan.id}>
                      <td>
                        <div className="loan-name-cell">
                          <div className="loan-type-icon" style={{ background: `${color}15`, color }}>
                            <Icon size={18} />
                          </div>
                          <span>{loan.name}</span>
                        </div>
                      </td>
                      <td>{loan.lender}</td>
                      <td className="amount">₹{Math.round(getOutstanding(loan)).toLocaleString('en-IN')}</td>
                      <td className="amount">₹{loan.emiAmount.toLocaleString('en-IN')}</td>
                      <td>{getTenureLeft(loan)} months</td>
                      <td>{loan.interestRate}%</td>
                      <td>
                        <div className="table-progress">
                          <div className="table-progress-bar">
                            <div 
                              className="table-progress-fill"
                              style={{ width: `${(loan.paidMonths / loan.tenureMonths) * 100}%`, background: color }}
                            />
                          </div>
                          <span>{((loan.paidMonths / loan.tenureMonths) * 100).toFixed(0)}%</span>
                        </div>
                      </td>
                      <td>
                        <button 
                          className="table-view-btn"
                          onClick={() => setSelectedLoan(loan)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedLoan && (
        <LoanDetailsPanel 
          loan={selectedLoan} 
          onClose={() => setSelectedLoan(null)} 
        />
      )}
    </div>
  );
}

export default MyLoans;
