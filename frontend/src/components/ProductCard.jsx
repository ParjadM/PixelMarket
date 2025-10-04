import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const title = product.title || product.productName;
  const imageUrl = product.imageUrl;
  const link = product.detailPageURL || product.affiliateUrl || product.buyUrl;
  const navigate = useNavigate();

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
          onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;