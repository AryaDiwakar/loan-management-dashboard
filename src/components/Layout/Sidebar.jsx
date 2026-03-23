import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CreditCard, BarChart3, Settings, User, Wallet, LogOut, ChevronDown, ChevronUp } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: CreditCard, label: 'My Loans', path: '/my-loans' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

function Sidebar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  const activeItem = navItems.find(item => item.path === location.pathname)?.label || 'Dashboard';

  const handleNavClick = (item) => {
    navigate(item.path);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Wallet size={22} />
          </div>
          <span className="logo-text">LMETS</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${activeItem === item.label ? 'active' : ''}`}
            onClick={() => handleNavClick(item)}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div 
          className={`user-profile ${profileOpen ? 'open' : ''}`}
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <div className="user-avatar">
            <User size={18} />
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'User'}</span>
            <span className="user-email">{user?.email || 'user@email.com'}</span>
          </div>
          {profileOpen ? <ChevronUp size={16} className="profile-chevron" /> : <ChevronDown size={16} className="profile-chevron" />}
        </div>
        
        {profileOpen && (
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
