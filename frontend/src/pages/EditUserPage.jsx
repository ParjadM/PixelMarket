import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../utils/api';
import styles from './EditUserPage.module.css';
import { buildApiUrl } from '../utils/api';

const EditUserPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`buildApiUrl('/')api/users/${userId}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const user = await response.json();
      setFormData({
        email: user.email || '',
        password: '', // Don't pre-fill password
        role: user.role || 'user'
      });
    } catch (err) {
      console.error('Error fetching user:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const updateData = {
        email: formData.email,
        role: formData.role
      };


      if (formData.password.trim()) {
        updateData.password = formData.password;
      }

      const response = await fetch(`buildApiUrl('/')api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update user');
      }


      navigate('/admin/users');
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.message);
    }
  };

  const handleCancel = () => {
    navigate('/admin/users');
  };

  if (loading) {
    return (
      <div className={`main-content ${styles.page}`}>
        <div className={styles.container}>
          <h1 className={styles.title}>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={`main-content ${styles.page}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>USER ACCOUNT</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>PASSWORD (leave blank to keep current)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter new password"
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>ROLE</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={styles.input}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              SAVE
            </button>
            <button type="button" onClick={handleCancel} className={styles.cancelButton}>
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;
