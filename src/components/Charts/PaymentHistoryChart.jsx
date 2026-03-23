import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { paymentHistory } from '../../data/mockData';
import './Charts.css';

function PaymentHistoryChart() {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((item, index) => (
            <div key={index} className="tooltip-row">
              <span className="tooltip-dot" style={{ background: item.color }} />
              <span className="tooltip-name">{item.name}:</span>
              <span className="tooltip-value">₹{item.value.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Payment History</h3>
        <span className="chart-subtitle">Last 12 Months</span>
      </div>
      <div className="chart-content chart-area">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={paymentHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="month" 
              stroke="rgba(255,255,255,0.3)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="interest"
              name="Interest"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInterest)"
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="principal"
              name="Principal"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrincipal)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="chart-legend horizontal">
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#6366f1' }} />
            <span className="legend-text">Principal</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot" style={{ background: '#8b5cf6' }} />
            <span className="legend-text">Interest</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentHistoryChart;
