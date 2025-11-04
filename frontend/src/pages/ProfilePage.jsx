import React, { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import styles from './EditUserPage.module.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('pm_user') || localStorage.getItem('pm_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    
    if (!user) {
      navigate('/signin');
      return;
    }
    const fetchMe = async () => {
      try {
        setLoading(true);
        const res = await fetch(buildApiUrl(`/api/users/${user._id}`), { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setFormData({ email: data.email || '', password: '' });
      } catch (e) {
        setError(e.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setError('');
    setStatus('');
    setSaving(true);
    try {
      const payload = { email: formData.email };
      if (formData.password.trim()) payload.password = formData.password;
      const res = await fetch(buildApiUrl(`/api/users/${user._id}`), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to update profile');
      }
      const updated = await res.json();
      sessionStorage.setItem('pm_user', JSON.stringify({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role }));
      setStatus('Profile updated');
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (e) {
      setError(e.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;
  if (loading) return <div className={`main-content ${styles.page}`}><div className={styles.container}><h1 className={styles.title}>Loading...</h1></div></div>;

  return (
    <div className={`main-content ${styles.page}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>MY PROFILE</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>EMAIL</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} required />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>NEW PASSWORD (leave blank to keep current)</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} placeholder="Enter new password" />
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
          {status && <div className={styles.errorMessage} style={{ color: '#2e7d32', background: '#e8f5e9', borderLeftColor: '#2e7d32' }}>{status}</div>}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton || styles.addButton} disabled={saving}>
              {saving ? 'SAVING...' : 'SAVE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;


