import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import styles from './UserDetails.module.css';

// Admin user management page
const UserDetails = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);
  

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(buildApiUrl('/api/users'), {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, userEmail) => {
    if (!window.confirm(`Are you sure you want to delete user: ${userEmail}?`)) {
      return;
    }

    try {
      const response = await fetch(buildApiUrl(`/api/users/${userId}`), {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }


      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user: ' + err.message);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin/users/edit/${userId}`);
  };

  if (loading) {
    return (
      <div className={`main-content ${styles.page}`}>
        <div className={styles.card}>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`main-content ${styles.page}`}>
        <div className={styles.card}>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`main-content ${styles.page}`}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <span>USERS</span>
          <span>ACTION</span>
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.tableHeader}>
            <span>USERNAME</span>
            <span></span>
          </div>
          <div className={styles.tableBody}>
            {users.length === 0 ? (
              <div className={styles.row}>
                <span>No users found</span>
              </div>
            ) : (
              users.map((user) => (
                <div key={user._id} className={styles.row}>
                  <div className={styles.userInfo}>
                    <span className={styles.userEmail}>{user.email}</span>
                    <span className={styles.userRole}>Role: {user.role}</span>
                  </div>
                  <div className={styles.rowActions}>
                    <button 
                      className={`${styles.pillBtn} ${styles.edit}`}
                      onClick={() => handleEdit(user._id)}
                    >
                      EDIT
                    </button>
                    <button 
                      className={`${styles.pillBtn} ${styles.delete}`}
                      onClick={() => handleDelete(user._id, user.email)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottomActions}>
        <button 
          onClick={() => navigate('/')} 
          className={`${styles.bigBtn} ${styles.homeBtn}`}
        >
          HOME
        </button>
        <button className={`${styles.bigBtn} ${styles.addUserBtn}`}>ADD USER</button>
      </div>
    </div>
  );
};

export default UserDetails;


