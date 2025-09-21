import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        PixelMarket
      </Link>
      <nav className="header-nav">
        <Link to="/content">Content</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/signin">Sign In</Link>
      </nav>
    </header>
  );
}

export default Header;
