import { Home, Car, Wallet, GraduationCap, Calendar, ChevronRight } from 'lucide-react';
import './LoanCard.css';

const typeIcons = {
  home: Home,
  car: Car,
  personal: Wallet,
  education: GraduationCap,
};

function LoanCard({ loan, onClick }) {
  const Icon = typeIcons[loan.type] || Wallet;
  const progress = (loan.paidMonths / loan.tenureMonths) * 100;
  const remaining = loan.tenureMonths - loan.paidMonths;
  const emiDueDate = new Date(loan.nextDueDate);
  const daysUntilDue = Math.ceil((emiDueDate - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="loan-card" onClick={onClick} style={{ '--loan-color': loan.color }}>
      <div className="loan-card-header">
        <div className="loan-type-icon" style={{ background: `${loan.color}15` }}>
          <Icon size={20} style={{ color: loan.color }} />
        </div>
        <div className="loan-info">
          <h3 className="loan-name">{loan.name}</h3>
          <span className="loan-lender">{loan.lender}</span>
        </div>
        <ChevronRight size={18} className="loan-arrow" />
      </div>

      <div className="loan-amount">
        <span className="loan-amount-label">Outstanding</span>
        <span className="loan-amount-value">₹{(loan.principal * (1 - progress / 100)).toLocaleString('en-IN')}</span>
      </div>

      <div className="loan-progress-section">
        <div className="loan-progress-header">
          <span>Progress</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="loan-progress-bar">
          <div 
            className="loan-progress-fill" 
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${loan.color}, ${loan.color}aa)` }}
          />
        </div>
      </div>

      <div className="loan-footer">
        <div className="loan-detail">
          <Calendar size={14} />
          <span>Next EMI: {daysUntilDue} days</span>
        </div>
        <div className="loan-detail emi">
          <span className="emi-amount">₹{loan.emiAmount.toLocaleString('en-IN')}</span>
          <span className="emi-label">/month</span>
        </div>
      </div>
    </div>
  );
}

export default LoanCard;
