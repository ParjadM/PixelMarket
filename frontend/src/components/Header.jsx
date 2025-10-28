import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import logoSrc from '../images/Logo.jpg';

// Navigation header component
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // User state management
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem('pm_user') || localStorage.getItem('pm_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Cross-tab user synchronization
  useEffect(() => {
    const syncUser = () => {
      try {
        const raw = sessionStorage.getItem('pm_user') || localStorage.getItem('pm_user');
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };
    syncUser();
    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('pm_user') || localStorage.getItem('pm_user');
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, [location]);

  // Authentication handlers
  const handleLogout = () => {
    try {
      sessionStorage.removeItem('pm_user');
      localStorage.removeItem('pm_token');
      localStorage.removeItem('pm_user');
    } finally {
      setUser(null);
      navigate('/');
    }
  };

  const clearStorage = () => {
    sessionStorage.clear();
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <img src={logoSrc} alt="PixelMarket logo" className={styles.logoImg} />
            <span className={styles.logoText}>PixelMarket</span>
          </Link>
        </div>
        <nav className={styles.mainNav}>
          <ul>
            <li>
              <NavLink to="/content">Content</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            {!user ? (
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
            ) : (
              <>
                {user.role === 'admin' && (
                  <li>
                    <NavLink to="/admin">Dashboard</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <button type="button" className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
