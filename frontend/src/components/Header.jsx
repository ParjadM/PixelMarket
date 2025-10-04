import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          <Link to="/">PixelMarket</Link>
        </div>
        <nav className={styles.mainNav}>
          <ul>
            <li>
              <NavLink to="/content">Content</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/signin">Sign In</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
