import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

// Admin dashboard page
const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = (() => {
    try {
      const raw = sessionStorage.getItem('pm_user') || localStorage.getItem('pm_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  return (
    <div className={`main-content ${styles.adminPage}`}>
      <div className={styles.topArea}>
        
        <h2 className={styles.welcomeText}>Welcome, {user?.name || user?.email || 'User'}</h2>
        <div className={styles.leftActions}>
          <button type="button" className={`${styles.pillBtn} ${styles.pillGreen}`} onClick={() => navigate('/admin/products')}>Add Products</button>
          <button type="button" className={`${styles.pillBtn} ${styles.pillGreen}`} onClick={() => navigate('/admin/users')}>User Detail</button>
          <button type="button" className={`${styles.pillBtn} ${styles.pillGreen}`} onClick={() => navigate('/admin/about')}>About Me</button>
        </div>
      </div>

      <div className={styles.bottomActions}>
        <Link to="/" className={`${styles.bigBtn} ${styles.homeBtn}`}>HOME</Link>
        <button type="button" className={`${styles.bigBtn} ${styles.addUserBtn}`}>ADD USER</button>
      </div>
    </div>
  );
};

export default AdminDashboard;


