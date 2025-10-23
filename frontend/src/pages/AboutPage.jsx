import React, { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';
import styles from './AboutPage.module.css';

const AboutPage = () => {
  const [body, setBody] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('buildApiUrl('/')api/content/about', { credentials: 'include' });
        const data = await res.json();
        setBody(data.body || '');
      } catch {
        setBody('');
      }
    };
    load();
  }, []);

  return (
    <div className={`main-content ${styles.page}`}> 
      <div className={styles.wrapper}>
        <h1 className={styles.title}>ABOUT ME</h1>
        <div className={styles.card}>
          {body ? (
            body.split('\n').map((line, i) => (
              <p key={i} className={styles.line}>{line}</p>
            ))
          ) : (
            <>
              <p className={styles.line}>HI, THIS IS ABOUT THE PAGE</p>
              <p className={styles.line}>MY NAME IS PARJAD MINOOEI AND I'M THE DEVELOPER OF THIS WEBSITE</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


