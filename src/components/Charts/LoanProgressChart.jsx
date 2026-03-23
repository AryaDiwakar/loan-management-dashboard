import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { loans } from '../../data/mockData';
import './Charts.css';

const chartData = loans.map(loan => ({
  name: loan.name.split(' ')[0],
  fullName: loan.name,
  progress: (loan.paidMonths / loan.tenureMonths) * 100,
  remaining: loan.tenureMonths - loan.paidMonths,
  color: loan.color,
}));

function LoanProgressChart() {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.fullName}</p>
          <div className="tooltip-row">
            <span className="tooltip-name">Progress:</span>
            <span className="tooltip-value">{data.progress.toFixed(1)}%</span>
          </div>
          <div className="tooltip-row">
            <span className="tooltip-name">Remaining:</span>
            <span className="tooltip-value">{data.remaining} months</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-card full-width">
      <div className="chart-header">
        <h3>Loan Progress</h3>
        <span className="chart-subtitle">Months Remaining</span>
      </div>
      <div className="chart-content">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
            <XAxis 
              type="number" 
              domain={[0, 240]} 
              stroke="rgba(255,255,255,0.3)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="rgba(255,255,255,0.3)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={70}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Bar dataKey="remaining" radius={[0, 6, 6, 0]} animationDuration={1500}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LoanProgressChart;
