import React from 'react';

const styles = {
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#C8E6C9',
    borderRadius: '20px',
    padding: '4rem 2rem',
    margin: '2rem',
    color: '#333',
  },
  heroTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  heroButton: {
    backgroundColor: '#A5D6A7',
    color: '#333',
    padding: '0.8rem 2.5rem',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1rem',
    fontWeight: '600',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};


const HomePage = () => {
  return (
    <div style={styles.heroContainer}>
      <h1 style={styles.heroTitle}>DISCOVER THE PIXELMARKET</h1>
      <p style={styles.heroSubtitle}>BUILDING DIGITAL DREAMS, ONE PIXEL AT A TIME.</p>
      <a href="/content" style={styles.heroButton}>DISCOVER OUR CONTENT</a>
    </div>
  );
};

export default HomePage;