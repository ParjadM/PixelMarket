import React, { useState } from 'react';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.username || !form.password) {
      setError('All fields are required');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('http://localhost:5001/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: form.username, email: form.username, password: form.password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Registration failed');
      }
      await res.json();
      setSuccess('Registration successful. You can now sign in.');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
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
            <label htmlFor="username">Email</label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              type="email"
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
          {error && <p className={styles.btnSecondary}>{error}</p>}
          {success && <p className={styles.btnPrimary}>{success}</p>}
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
