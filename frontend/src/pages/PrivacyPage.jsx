import React from 'react';
import styles from './PrivacyPage.module.css';

// Privacy policy page
const PrivacyPage = () => {
  return (
    <div className={`main-content ${styles.page}`}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>PRIVACY POLICY</h1>
        <div className={styles.card}>
          <p>
            We respect your privacy and are committed to protecting your personal information. We only
            collect data necessary to provide and improve our services, and we never sell your data to
            third parties. Information such as your name, email, and any content you choose to share is
            used solely for account management, customer support, and product enhancement.
          </p>
          <p>
            By using this website, you consent to the collection and use of information in accordance with
            this policy. You may contact us at any time to request access, correction, or deletion of your
            data. We may update this policy as our services evolve, and we will post any changes here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;


