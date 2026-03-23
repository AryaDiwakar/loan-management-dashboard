import { X, Bell, CreditCard, AlertCircle, CheckCircle, Info, Check } from 'lucide-react';
import './NotificationPanel.css';

const typeIcons = {
  payment: CreditCard,
  success: CheckCircle,
  reminder: Bell,
  alert: AlertCircle,
  info: Info,
};

const typeColors = {
  payment: '#6366f1',
  success: '#10b981',
  reminder: '#f59e0b',
  alert: '#ef4444',
  info: '#06b6d4',
};

function NotificationPanel({ isOpen, onClose, notifications, onMarkAsRead, onMarkAllAsRead }) {
  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  return (
    <>
      <div className={`notification-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      <div className={`notification-panel ${isOpen ? 'open' : ''}`}>
        <div className="panel-header">
          <div className="panel-title">
            <Bell size={20} />
            <h2>Notifications</h2>
          </div>
          <div className="panel-actions">
            <button className="mark-all-btn" onClick={onMarkAllAsRead}>
              <Check size={16} />
              Mark all read
            </button>
            <button className="close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="notification-list">
          {notifications.map((notification, index) => {
            const Icon = typeIcons[notification.type] || Bell;
            const color = typeColors[notification.type] || '#6366f1';
            
            return (
              <div 
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                style={{ '--notif-color': color, animationDelay: `${index * 50}ms` }}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className="notification-icon" style={{ background: `${color}15` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <span className="notification-title">{notification.title}</span>
                    {!notification.read && <span className="unread-dot" />}
                  </div>
                  <p className="notification-description">{notification.description}</p>
                  <span className="notification-time">{formatTime(notification.timestamp)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default NotificationPanel;
