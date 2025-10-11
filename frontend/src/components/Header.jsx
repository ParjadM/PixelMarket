import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(() => {
    try {
      const raw = sessionStorage.getItem('pm_user') || localStorage.getItem('pm_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

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
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <Link to="/">PixelMarket</Link>
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
