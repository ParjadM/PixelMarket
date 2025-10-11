import React from 'react';
import styles from './UserDetails.module.css';

const UserDetails = () => {
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
            <div className={styles.row}>
              <span>user@example.com</span>
              <div className={styles.rowActions}>
                <button className={`${styles.pillBtn} ${styles.edit}`}>EDIT</button>
                <button className={`${styles.pillBtn} ${styles.delete}`}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomActions}>
        <a href="/" className={`${styles.bigBtn} ${styles.homeBtn}`}>HOME</a>
        <button className={`${styles.bigBtn} ${styles.addUserBtn}`}>ADD USER</button>
      </div>
    </div>
  );
};

export default UserDetails;


