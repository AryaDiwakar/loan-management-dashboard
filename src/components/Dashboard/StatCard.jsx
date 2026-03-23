import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import './StatCard.css';

function StatCard({ icon: Icon, label, value, trend, trendValue, color, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    
    const numericValue = typeof value === 'number' ? value : parseFloat(value.replace(/[^0-9.]/g, ''));
    const duration = 1500;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const formatValue = (val) => {
    if (typeof value === 'string' && value.includes('₹')) {
      return '₹' + val.toLocaleString('en-IN');
    }
    if (typeof value === 'string' && value.includes('%')) {
      return val.toFixed(0) + '%';
    }
    return val.toLocaleString('en-IN');
  };

  const isPositive = trend === 'up';

  return (
    <div 
      className={`stat-card ${isVisible ? 'visible' : ''}`}
      style={{ '--card-color': color }}
    >
      <div className="stat-card-glow" />
      <div className="stat-header">
        <div className="stat-icon" style={{ background: `linear-gradient(135deg, ${color}20, ${color}10)` }}>
          <Icon size={22} style={{ color }} />
        </div>
        {trend && (
          <div className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="stat-content">
        <span className="stat-value">{formatValue(displayValue)}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
}

export default StatCard;
