import React, { useMemo, useState } from 'react';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const user = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('pm_user') || localStorage.getItem('pm_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) return;
    setStatus('');
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5001/api/content/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to send');
      }
      setStatus('Message sent!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus(err.message || 'Failed to send');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`main-content ${styles.contactPage}`}>
      <div className={styles.contactCard}>
        <h1>CONTACT US</h1>
        {!user && (
          <p style={{ color: '#c62828', marginBottom: '1rem' }}>
            Please register or sign in to send a message.
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              type="text"
            />
          </div>
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
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
            />
          </div>
          <div className={`${styles.formRow} ${styles.formRowTextarea}`}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={!user || submitting}>
              {submitting ? 'Sending...' : 'Send'}
            </button>
          </div>
          {status && (
            <p style={{ textAlign: 'center', marginTop: '0.6rem', color: status.includes('sent') ? '#2e7d32' : '#c62828' }}>{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
