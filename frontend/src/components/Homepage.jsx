import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { buildApiUrl } from '../utils/api';
import styles from './Homepage.module.css';
import axios from 'axios';



// Product card component for homepage display
const ProductCard = ({ product }) => {
  const title = product.title || product.productName;
  const imageUrl = product.imageUrl;
  const link = product.detailPageURL || product.affiliateUrl || product.buyUrl;
  const navigate = useNavigate();
  const id = product.asin || product.id || product.sku;

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={styles.productImage} />
        ) : (
          <div className={styles.placeholderImage}>No Image</div>
        )}
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle}>{title}</h3>
      </div>
      <button
        type="button"
        className={styles.productLinkButton}
        onClick={() => navigate(`/product/${id}`, { state: { product: { ...product, id } } })}
      >
        View Product
      </button>
    </div>
  );
};

// Homepage component with featured products
const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(buildApiUrl('/api/products/featured/list'));
        setFeaturedProducts(response.data || []);
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
    <div className={styles.pageWrap}>
      <div className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>DISCOVER THE PIXELMARKET</h1>
        <p className={styles.heroSubtitle}>BUILDING DIGITAL DREAMS, ONE PIXEL AT A TIME.</p>
        <Link to="/content" className={styles.heroButton}>DISCOVER OUR CONTENT</Link>
      </div>

      <section className={styles.featuredSection}>
        <h2 className={styles.featuredTitle}>FEATURE PRODUCTS</h2>
        {loading ? (
          <p className={styles.loadingText}>Loading...</p>
        ) : error ? (
          <p className={styles.errorText}>{error}</p>
        ) : (
          <div className={styles.featuredProductsGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.asin} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Homepage;

