import React from 'react';
import './ProductCard.css';

// ProductCard: renders an image, title, and outbound product link
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

export default ProductCard;