import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

// Reusable product card component
const ProductCard = ({ product }) => {
  // Extract product data with fallbacks
  const title = product.name || product.title || product.productName;
  const imageUrl = product.imageUrl;
  const link = product.detailPageURL || product.affiliateUrl || product.buyUrl;
  const navigate = useNavigate();
  const id = product._id || product.id || product.asin || product.sku;

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
      <div className={styles.pcActions}>
        <button
          className={styles.pcBtn}
          onClick={() => navigate(`/product/${id}`, { state: { product: { ...product, id } } })}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
