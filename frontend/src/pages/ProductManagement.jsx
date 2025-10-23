import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductManagement.module.css';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('buildApiUrl('')/api/products', {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete product: ${productName}?`)) {
      return;
    }

    try {
      const response = await fetch(`buildApiUrl('')/api/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }


      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product: ' + err.message);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  if (loading) {
    return (
      <div className={`main-content ${styles.page}`}>
        <div className={styles.card}>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`main-content ${styles.page}`}>
        <div className={styles.card}>
          <p style={{ color: 'red' }}>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`main-content ${styles.page}`}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <span>PRODUCTS</span>
          <span>ACTION</span>
        </div>
        <div className={styles.tableWrap}>
          <div className={styles.tableHeader}>
            <span>PRODUCT NAME</span>
            <span></span>
          </div>
          <div className={styles.tableBody}>
            {products.length === 0 ? (
              <div className={styles.row}>
                <span>No products found</span>
              </div>
            ) : (
              products.map((product) => (
                <div key={product._id} className={styles.row}>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productCategory}>Category: {product.category}</span>
                    <span className={styles.productReactions}>Likes: {product.likesCount || 0} · Dislikes: {product.dislikesCount || 0}</span>
                  </div>
                  <div className={styles.rowActions}>
                    <button 
                      className={`${styles.pillBtn} ${styles.edit}`}
                      onClick={() => handleEdit(product._id)}
                    >
                      EDIT
                    </button>
                    <button 
                      className={`${styles.pillBtn} ${styles.delete}`}
                      onClick={() => handleDelete(product._id, product.name)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottomActions}>
        <button 
          onClick={() => navigate('/')} 
          className={`${styles.bigBtn} ${styles.homeBtn}`}
        >
          HOME
        </button>
        <button 
          onClick={() => navigate('/admin/products/add')}
          className={`${styles.bigBtn} ${styles.addBtn}`}
        >
          ADD PRODUCT
        </button>
      </div>
    </div>
  );
};

export default ProductManagement;


