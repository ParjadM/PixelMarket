import React, { useEffect, useState } from 'react';
import styles from './AdminAboutPage.module.css';

const AdminAboutPage = () => {
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5001/api/content/about', { credentials: 'include' });
        const data = await res.json();
        const defaultText = "HI, THIS IS ABOUT THE PAGE\nMY NAME IS PARJAD MINOOEI AND I'M THE DEVELOPER OF THIS WEBSITE";
        setBody(data.body && data.body.trim() ? data.body : defaultText);
      } catch (e) {
        setError('Failed to load');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      const res = await fetch('http://localhost:5001/api/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ body }),
      });
      if (!res.ok) throw new Error('Save failed');
    } catch (e) {
      setError(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`main-content ${styles.page}`}>
      <h2 className={styles.title}>ABOUT ME</h2>
      <div className={styles.frameWrap}>
        <div className={styles.inner}>
          <textarea
            className={styles.textarea}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write the About text here..."
          />
        </div>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div className={styles.buttons}>
        <button type="button" className={`${styles.btn} ${styles.save}`} onClick={handleSave} disabled={saving}>
          {saving ? 'SAVING...' : 'SAVE'}
        </button>
        <button type="button" className={`${styles.btn} ${styles.cancel}`} onClick={() => window.history.back()}>CANCEL</button>
      </div>
    </div>
  );
};

export default AdminAboutPage;


