import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import styles from './ContentPage.module.css';

const ContentPage = () => {
  const [amazonProducts, setAmazonProducts] = useState([]);
  const [clickBankProducts, setClickBankProducts] = useState([]);
  const [bayPartnerProducts, setBayPartnerProducts] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const [amazonRes, clickBankRes, bayPartnerRes] = await Promise.all([
          axios.get('http://localhost:5001/api/amazon/search'),
          axios.get('http://localhost:5001/api/clickbank/products'),
          axios.get('http://localhost:5001/api/baypartner/products')
        ]);

        setAmazonProducts(amazonRes.data);
        setClickBankProducts(clickBankRes.data);
        setBayPartnerProducts(bayPartnerRes.data);
        
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) return <div className={styles.loadingMessage}>Loading Products...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;

  return (
    <div className={styles.contentPage}>
      <h1 className={styles.pageTitle}>Discover Our Content</h1>

      <section className={styles.productCategory}>
        <h2 className={styles.categoryTitle}>Amazon</h2>
        <div className={styles.productsGrid}>
          {amazonProducts.slice(0, 3).map((product, i) => (
            <ProductCard key={product.asin} product={{ ...product, id: product.asin }} />
          ))}
        </div>
      </section>

      <section className={styles.productCategory}>
        <h2 className={styles.categoryTitle}>ClickBank</h2>
        <div className={styles.productsGrid}>
          {clickBankProducts.slice(0, 3).map((product, i) => (
            <ProductCard key={product.id} product={{ ...product, id: product.id }} />
          ))}
        </div>
      </section>

      <section className={styles.productCategory}>
        <h2 className={styles.categoryTitle}>Bay Partner Network</h2>
        <div className={styles.productsGrid}>
          {bayPartnerProducts.slice(0, 3).map((product, i) => (
            <ProductCard key={product.sku} product={{ ...product, id: product.sku }} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContentPage;