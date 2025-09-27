import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './ContentPage.css';

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

  if (loading) return <div className="loading-message">Loading Products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="content-page">
      <h1 className="page-title">Discover Our Content</h1>

      <section className="product-category">
        <h2 className="category-title">Amazon</h2>
        <div className="products-grid">
          {amazonProducts.slice(0, 3).map(product => (
            <ProductCard key={product.asin} product={product} />
          ))}
        </div>
      </section>

      <section className="product-category">
        <h2 className="category-title">ClickBank</h2>
        <div className="products-grid">
          {clickBankProducts.slice(0, 3).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="product-category">
        <h2 className="category-title">Bay Partner Network</h2>
        <div className="products-grid">
          {bayPartnerProducts.slice(0, 3).map(product => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContentPage;