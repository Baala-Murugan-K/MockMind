import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import MockMindLogo from '../Logo/index.jsx';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); setMenuOpen(false); };
  const isActive = (path) => location.pathname === path;
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const navLinks = [
    ['/', 'Dashboard', '🏠'],
    ['/setup', 'New Interview', '🎙️'],
    ['/history', 'History', '📋'],
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-glow" />

      <Link to="/" className="navbar-brand">
        <MockMindLogo size={30} showText={true} />
      </Link>

      {/* Desktop links */}
      <div className="navbar-links">
        {navLinks.map(([path, label]) => (
          <Link key={path} to={path} className={`nav-link ${isActive(path) ? 'active' : ''}`}>
            {label}
            {isActive(path) && <span className="nav-active-dot" />}
          </Link>
        ))}
      </div>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggle} title="Toggle theme">
          <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>

        <div className="nav-profile" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="avatar-sm">{initials}</div>
          <span className="nav-username">{user?.name?.split(' ')[0]}</span>
          <span className="nav-chevron">▾</span>

          {menuOpen && (
            <>
              <div className="nav-dropdown-backdrop" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }} />
              <div className="nav-dropdown" onClick={e => e.stopPropagation()}>
                <div className="dropdown-header">
                  <div className="avatar-md">{initials}</div>
                  <div>
                    <div className="dropdown-name">{user?.name}</div>
                    <div className="dropdown-email">{user?.email}</div>
                  </div>
                </div>
                <div className="dropdown-divider" />

                {/* Nav links — visible only on mobile, hidden on desktop via CSS */}
                <div className="dropdown-mobile-nav">
                  {navLinks.map(([path, label, icon]) => (
                    <button
                      key={path}
                      className={`dropdown-item ${isActive(path) ? 'active' : ''}`}
                      onClick={() => handleNavClick(path)}
                    >
                      <span>{icon}</span> {label}
                      {isActive(path) && <span className="dropdown-active-dot" />}
                    </button>
                  ))}
                  <div className="dropdown-divider" />
                </div>

                <button className="dropdown-item" onClick={() => handleNavClick('/profile')}>👤 My Profile</button>
                <div className="dropdown-divider" />
                <button className="dropdown-item danger" onClick={handleLogout}>🚪 Sign Out</button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
