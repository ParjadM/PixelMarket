import React from 'react';
import styles from './ProductManagement.module.css';

const ProductManagement = () => {
  return (
    <div className={`main-content ${styles.page}`}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <span>PRODUCT</span>
          <span>ACTION</span>
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.tableHeader}>
            <span>PRODUCT NAME</span>
            <span></span>
          </div>
          <div className={styles.tableBody}>
            <div className={styles.row}>
              <span>Example Product</span>
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
        <button className={`${styles.bigBtn} ${styles.addBtn}`}>ADD PRODUCT</button>
      </div>
    </div>
  );
};

export default ProductManagement;


