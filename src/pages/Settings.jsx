import { useState } from 'react';
import { User, Mail, Phone, Wallet, Bell, Palette, Shield, Save, Eye, EyeOff } from 'lucide-react';
import './Settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    name: 'Aryan Sharma',
    email: 'aryan.sharma@email.com',
    phone: '+91 9876543210',
    monthlyIncome: 150000,
    savingsGoal: 500000,
    emiReminders: true,
    riskAlerts: true,
    darkMode: true,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [saveMessage, setSaveMessage] = useState('');

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePasswordChange = (key, value) => {
    setPasswordForm(prev => ({ ...prev, [key]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = (section) => {
    setSaveMessage(`${section} saved successfully!`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN').format(value);
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account and preferences</p>
      </div>

      {saveMessage && (
        <div className="save-toast">
          <span>{saveMessage}</span>
        </div>
      )}

      <div className="settings-grid">
        {/* Profile Section */}
        <section className="settings-card">
          <div className="card-header">
            <div className="header-icon">
              <User size={20} />
            </div>
            <div>
              <h2>Profile</h2>
              <p>Your personal information</p>
            </div>
          </div>
          <div className="card-content">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>
            <button className="save-btn" onClick={() => handleSave('Profile')}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </section>

        {/* Financial Info Section */}
        <section className="settings-card">
          <div className="card-header">
            <div className="header-icon">
              <Wallet size={20} />
            </div>
            <div>
              <h2>Financial Info</h2>
              <p>Your income and savings goals</p>
            </div>
          </div>
          <div className="card-content">
            <div className="form-group">
              <label>Monthly Income</label>
              <div className="currency-input">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  value={settings.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Savings Goal</label>
              <div className="currency-input">
                <span className="currency-symbol">₹</span>
                <input
                  type="number"
                  value={settings.savingsGoal}
                  onChange={(e) => handleInputChange('savingsGoal', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="info-box">
              <p>EMI to Income Ratio: <strong>{settings.monthlyIncome > 0 ? ((71144 / settings.monthlyIncome) * 100).toFixed(0) : 0}%</strong></p>
              <p>Current Monthly EMI: <strong>₹{formatCurrency(71144)}</strong></p>
            </div>
            <button className="save-btn" onClick={() => handleSave('Financial Info')}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="settings-card">
          <div className="card-header">
            <div className="header-icon">
              <Bell size={20} />
            </div>
            <div>
              <h2>Notifications</h2>
              <p>Manage your notification preferences</p>
            </div>
          </div>
          <div className="card-content">
            <div className="toggle-item">
              <div className="toggle-info">
                <h4>EMI Reminders</h4>
                <p>Get reminded before your EMI due dates</p>
              </div>
              <button
                className={`toggle-switch ${settings.emiReminders ? 'active' : ''}`}
                onClick={() => handleToggle('emiReminders')}
              >
                <span className="toggle-slider" />
              </button>
            </div>
            <div className="toggle-item">
              <div className="toggle-info">
                <h4>Risk Alerts</h4>
                <p>Get alerts about potential payment issues</p>
              </div>
              <button
                className={`toggle-switch ${settings.riskAlerts ? 'active' : ''}`}
                onClick={() => handleToggle('riskAlerts')}
              >
                <span className="toggle-slider" />
              </button>
            </div>
            <div className="toggle-item disabled">
              <div className="toggle-info">
                <h4>Marketing Communications</h4>
                <p>News about new features and offers</p>
              </div>
              <button className="toggle-switch">
                <span className="toggle-slider" />
              </button>
            </div>
            <button className="save-btn" onClick={() => handleSave('Notifications')}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="settings-card">
          <div className="card-header">
            <div className="header-icon">
              <Palette size={20} />
            </div>
            <div>
              <h2>Preferences</h2>
              <p>Customize your experience</p>
            </div>
          </div>
          <div className="card-content">
            <div className="toggle-item">
              <div className="toggle-info">
                <h4>Dark Mode</h4>
                <p>Use dark theme for the interface</p>
              </div>
              <button
                className={`toggle-switch ${settings.darkMode ? 'active' : ''}`}
                onClick={() => handleToggle('darkMode')}
              >
                <span className="toggle-slider" />
              </button>
            </div>
            <div className="theme-preview">
              <div className={`theme-option ${settings.darkMode ? 'active' : ''}`} onClick={() => handleInputChange('darkMode', true)}>
                <div className="theme-dark">
                  <div className="theme-sidebar" />
                  <div className="theme-content">
                    <div className="theme-card" />
                    <div className="theme-card" />
                  </div>
                </div>
                <span>Dark</span>
              </div>
              <div className={`theme-option ${!settings.darkMode ? 'active' : ''}`} onClick={() => handleInputChange('darkMode', false)}>
                <div className="theme-light">
                  <div className="theme-sidebar" />
                  <div className="theme-content">
                    <div className="theme-card light" />
                    <div className="theme-card light" />
                  </div>
                </div>
                <span>Light</span>
              </div>
            </div>
            <button className="save-btn" onClick={() => handleSave('Preferences')}>
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </section>

        {/* Security Section */}
        <section className="settings-card security-card">
          <div className="card-header">
            <div className="header-icon">
              <Shield size={20} />
            </div>
            <div>
              <h2>Security</h2>
              <p>Manage your account security</p>
            </div>
          </div>
          <div className="card-content">
            <div className="form-group">
              <label>Current Password</label>
              <div className="password-input">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <div className="password-input">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="password-input">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button className="save-btn primary" onClick={() => handleSave('Password')}>
              <Shield size={16} />
              Update Password
            </button>

            <div className="divider" />

            <button className="logout-btn" onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}>
              Logout from all devices
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;
