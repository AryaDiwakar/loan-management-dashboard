import { Search, Bell, Menu } from 'lucide-react';
import { useState } from 'react';
import NotificationPanel from '../Notifications/NotificationPanel';
import './TopBar.css';

function TopBar({ notifications, onMarkAsRead, onMarkAllAsRead }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="topbar">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search loans, payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="topbar-actions">
          <button className="mobile-menu-btn">
            <Menu size={20} />
          </button>
          
          <div className="notification-wrapper">
            <button 
              className="notification-btn"
              onClick={() => setShowNotifications(true)}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={onMarkAsRead}
        onMarkAllAsRead={onMarkAllAsRead}
      />
    </>
  );
}

export default TopBar;
