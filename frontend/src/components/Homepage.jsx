import React, { useState, useEffect } from 'react';
import './Homepage.css';
import axios from 'axios';



const ProductCard = ({ product }) => {
  const title = product.title || product.productName;
  const imageUrl = product.imageUrl;
  const link = product.detailPageURL || product.affiliateUrl || product.buyUrl;

  return (
    <div className="product-card">
      <div className="product-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="product-image" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer" className="product-link-button">
        View Product
      </a>
    </div>
  );
};


const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5001/api/amazon/search');
        
        setFeaturedProducts(response.data.slice(0, 3));
        
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError("Could not load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <>
      <div className="hero-container">
        <h1 className="hero-title">DISCOVER THE PIXELMARKET</h1>
        <p className="hero-subtitle">BUILDING DIGITAL DREAMS, ONE PIXEL AT A TIME.</p>
        <a href="/content" className="hero-button">DISCOVER OUR CONTENT</a>
      </div>

      <section className="featured-section">
        <h2 className="featured-title">FEATURE PRODUCTS</h2>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <div className="featured-products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.asin} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Homepage;

