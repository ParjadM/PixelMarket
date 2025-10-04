import React, { useState } from 'react';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // submit logic placeholder
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={`main-content ${styles.registerPage}`}>
      <div className={styles.registerCard}>
        <h1>REGISTER</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              type="text"
            />
          </div>
          <div className={styles.formRow}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              type="password"
            />
          </div>
            <div className={styles.formRow}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              type="password"
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Register</button>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={handleBack}>Back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
