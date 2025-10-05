import React, { useState } from 'react';
import styles from './ContactPage.module.css';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={`main-content ${styles.contactPage}`}>
      <div className={styles.contactCard}>
        <h1>CONTACT US</h1>
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
            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;