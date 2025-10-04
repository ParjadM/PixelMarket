import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerLinks}>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <div className={styles.footerCopyright}>
        &copy; {new Date().getFullYear()} Pixel Market. All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;
