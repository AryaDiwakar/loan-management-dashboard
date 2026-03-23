import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './Charts.css';

const data = [
  { name: 'Principal', value: 28500, color: '#6366f1' },
  { name: 'Interest', value: 14929, color: '#8b5cf6' },
];

function EMIBreakdownChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">₹{payload[0].value.toLocaleString('en-IN')}</p>
          <p className="tooltip-percent">{((payload[0].value / total) * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>EMI Breakdown</h3>
        <span className="chart-subtitle">This Month</span>
      </div>
      <div className="chart-content">
        <div className="donut-container">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
                animationBegin={0}
                animationDuration={1200}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="donut-center">
            <span className="donut-total">₹{(total / 1000).toFixed(1)}K</span>
            <span className="donut-label">Total EMI</span>
          </div>
        </div>
        <div className="chart-legend">
          {data.map((item) => (
            <div key={item.name} className="legend-item">
              <span className="legend-dot" style={{ background: item.color }} />
              <span className="legend-text">{item.name}</span>
              <span className="legend-value">₹{item.value.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EMIBreakdownChart;
