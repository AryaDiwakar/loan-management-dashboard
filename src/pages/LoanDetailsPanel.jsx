import { useState, useMemo } from 'react';
import { X, Calendar, Percent, Banknote, Clock, TrendingDown, Lightbulb, Calculator } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './MyLoans.css';

function LoanDetailsPanel({ loan, onClose }) {
  const [prepaymentAmount, setPrepaymentAmount] = useState('');
  const [suggestionAmount, setSuggestionAmount] = useState(50000);

  const outstanding = useMemo(() => {
    const progress = loan.paidMonths / loan.tenureMonths;
    return loan.principal * (1 - progress);
  }, [loan]);

  const tenureLeft = loan.tenureMonths - loan.paidMonths;
  const monthlyRate = loan.interestRate / 12 / 100;

  const currentEMI = loan.emiAmount;
  
  const totalInterest = useMemo(() => {
    const remainingEMI = monthlyRate * Math.pow(1 + monthlyRate, tenureLeft) / (Math.pow(1 + monthlyRate, tenureLeft) - 1);
    return (remainingEMI * tenureLeft - outstanding);
  }, [outstanding, monthlyRate, tenureLeft]);

  const currentTotalPayment = outstanding + totalInterest;

  const prepaymentResults = useMemo(() => {
    if (!prepaymentAmount || prepaymentAmount <= 0) return null;
    
    const prepayment = parseFloat(prepaymentAmount);
    const newOutstanding = outstanding - prepayment;
    
    if (newOutstanding <= 0) {
      return { valid: false, message: 'Loan would be fully paid!' };
    }

    const newTenureMonths = Math.ceil(
      Math.log((currentEMI) / (newOutstanding * monthlyRate + currentEMI)) / Math.log(1 + monthlyRate)
    );

    if (newTenureMonths <= 0 || !isFinite(newTenureMonths)) {
      return { valid: false, message: 'Invalid calculation' };
    }

    const newTotalInterest = (currentEMI * newTenureMonths) - newOutstanding;
    const interestSaved = totalInterest - newTotalInterest;
    const monthsReduced = tenureLeft - newTenureMonths;

    return {
      valid: true,
      newOutstanding,
      newTenureMonths,
      newTotalInterest,
      interestSaved: Math.max(0, interestSaved),
      monthsReduced: Math.max(0, monthsReduced),
      percentSaved: ((interestSaved / totalInterest) * 100).toFixed(1)
    };
  }, [prepaymentAmount, outstanding, currentEMI, monthlyRate, tenureLeft, totalInterest]);

  const suggestions = useMemo(() => {
    const suggestionList = [];

    const prepay5Percent = outstanding * 0.05;
    const prepay10Percent = outstanding * 0.1;
    
    const monthlySaving5 = (prepay5Percent * monthlyRate * Math.pow(1 + monthlyRate, tenureLeft)) / 
                          (Math.pow(1 + monthlyRate, tenureLeft) - 1);
    const interestSaved5 = prepay5Percent * monthlyRate * tenureLeft * 0.3;
    
    const monthlySaving10 = (prepay10Percent * monthlyRate * Math.pow(1 + monthlyRate, tenureLeft)) / 
                           (Math.pow(1 + monthlyRate, tenureLeft) - 1);
    const interestSaved10 = prepay10Percent * monthlyRate * tenureLeft * 0.3;

    suggestionList.push({
      title: 'Reduce EMI by extending tenure',
      description: `Extend tenure by 12 months to reduce EMI by ₹${Math.round(monthlySaving5).toLocaleString('en-IN')}/month`,
      icon: Calendar,
      color: '#6366f1',
      savings: `Save ₹${Math.round(interestSaved5).toLocaleString('en-IN')} interest`
    });

    suggestionList.push({
      title: `Prepay ₹${(prepay5Percent / 1000).toFixed(0)}K to save interest`,
      description: `Making a one-time prepayment of ₹${Math.round(prepay5Percent).toLocaleString('en-IN')} can reduce your total interest`,
      icon: TrendingDown,
      color: '#10b981',
      savings: `Save ₹${Math.round(interestSaved5).toLocaleString('en-IN')} in interest`
    });

    suggestionList.push({
      title: `Prepay ₹${(prepay10Percent / 1000).toFixed(0)}K for bigger savings`,
      description: `Double your prepayment to significantly reduce loan tenure and interest`,
      icon: Banknote,
      color: '#f59e0b',
      savings: `Save ₹${Math.round(interestSaved10).toLocaleString('en-IN')} in interest`
    });

    return suggestionList;
  }, [outstanding, monthlyRate, tenureLeft]);

  const emiBreakdown = [
    { name: 'Principal', value: Math.round(outstanding * 0.65), color: '#6366f1' },
    { name: 'Interest', value: Math.round(outstanding * 0.35), color: '#8b5cf6' }
  ];

  const prepaymentChartData = prepaymentResults?.valid ? [
    { name: 'Current Interest', value: totalInterest, color: '#ef4444' },
    { name: 'New Interest', value: prepaymentResults.newTotalInterest, color: '#10b981' }
  ] : [];

  return (
    <>
      <div className="panel-overlay" onClick={onClose} />
      <div className="details-panel">
        <div className="panel-header">
          <div>
            <h2>{loan.name}</h2>
            <span className="panel-lender">{loan.lender}</span>
          </div>
          <button className="panel-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="panel-content">
          <div className="panel-section">
            <h3><PieChart size={16} /> EMI Breakdown</h3>
            <div className="chart-container">
              <div className="donut-chart">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={emiBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {emiBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `₹${parseInt(value).toLocaleString('en-IN')}`}
                      contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="donut-center">
                  <span className="donut-value">₹{Math.round(outstanding / 100000).toFixed(1)}L</span>
                  <span className="donut-label">Outstanding</span>
                </div>
              </div>
              <div className="chart-legend">
                {emiBreakdown.map((item) => (
                  <div key={item.name} className="legend-item">
                    <span className="legend-dot" style={{ background: item.color }} />
                    <span className="legend-text">{item.name}</span>
                    <span className="legend-value">₹{item.value.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel-section">
            <h3><Calculator size={16} /> Prepayment Simulator</h3>
            <div className="simulator">
              <div className="simulator-input">
                <label>Extra Payment Amount</label>
                <div className="input-group">
                  <span className="input-prefix">₹</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={prepaymentAmount}
                    onChange={(e) => setPrepaymentAmount(e.target.value)}
                  />
                </div>
              </div>

              {prepaymentResults && (
                <div className={`simulator-results ${prepaymentResults.valid ? 'valid' : ''}`}>
                  {prepaymentResults.valid ? (
                    <>
                      <div className="result-card highlight">
                        <TrendingDown size={20} />
                        <div>
                          <span className="result-label">Interest Saved</span>
                          <span className="result-value">₹{Math.round(prepaymentResults.interestSaved).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <div className="result-card">
                        <Clock size={20} />
                        <div>
                          <span className="result-label">Tenure Reduced</span>
                          <span className="result-value">{prepaymentResults.monthsReduced} months</span>
                        </div>
                      </div>
                      <div className="result-card">
                        <Banknote size={20} />
                        <div>
                          <span className="result-label">New Outstanding</span>
                          <span className="result-value">₹{Math.round(prepaymentResults.newOutstanding).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <div className="comparison-chart">
                        <ResponsiveContainer width="100%" height={120}>
                          <BarChart data={prepaymentChartData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                            <XAxis type="number" tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} stroke="rgba(255,255,255,0.3)" fontSize={10} />
                            <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={10} width={80} />
                            <Tooltip 
                              formatter={(value) => `₹${parseInt(value).toLocaleString('en-IN')}`}
                              contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                            />
                            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                              {prepaymentChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </>
                  ) : (
                    <p className="invalid-result">{prepaymentResults.message}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="panel-section">
            <h3><Lightbulb size={16} /> Smart Suggestions</h3>
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-card" style={{ '--suggestion-color': suggestion.color }}>
                  <div className="suggestion-icon" style={{ background: `${suggestion.color}15`, color: suggestion.color }}>
                    <suggestion.icon size={18} />
                  </div>
                  <div className="suggestion-content">
                    <h4>{suggestion.title}</h4>
                    <p>{suggestion.description}</p>
                    <span className="suggestion-savings">{suggestion.savings}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-section loan-summary">
            <h3>Loan Summary</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Original Amount</span>
                <span className="summary-value">₹{loan.principal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Interest Rate</span>
                <span className="summary-value">{loan.interestRate}% p.a.</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Tenure</span>
                <span className="summary-value">{loan.tenureMonths} months</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Months Paid</span>
                <span className="summary-value">{loan.paidMonths} months</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Monthly EMI</span>
                <span className="summary-value">₹{loan.emiAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Next Due Date</span>
                <span className="summary-value">{new Date(loan.nextDueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoanDetailsPanel;
