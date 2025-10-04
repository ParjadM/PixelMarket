import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignInPage.module.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // auth submit placeholder
  };

  const goRegister = () => navigate('/register');

  return (
    <div className={`main-content ${styles.signinPage}`}>
      <div className={styles.signinCard}>
        <h1>LOGIN</h1>
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
          <div className={styles.formActions}>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Login</button>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={goRegister}>Register</button>
          </div>
          <p className={styles.policyNote}>Private Policy Form</p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
