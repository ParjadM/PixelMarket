import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Pixel Market. All Right Reserved
      </div>
    </footer>
  );
};

export default Footer;
