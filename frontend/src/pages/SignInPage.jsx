import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignInPage.module.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Login failed');
      }
      const data = await res.json();
      sessionStorage.setItem('pm_user', JSON.stringify({ _id: data._id, name: data.name, email: data.email, role: data.role }));
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const goRegister = () => navigate('/register');

  return (
    <div className={`main-content ${styles.signinPage}`}>
      <div className={styles.signinCard}>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={form.email}
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
          {error && <p className={styles.policyNote}>{error}</p>}
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
