import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import styles from './ProductInfoPage.module.css';

const ProductInfoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passed = location.state && location.state.product;
  const [product, setProduct] = useState(passed || null);
  const [loading, setLoading] = useState(!passed);
  const [error, setError] = useState('');

  useEffect(() => {
    if (passed) return;
    const load = async () => {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        const found = data.find(p => String(p.id) === String(id));
        if (!found) setError('Product not found');
        setProduct(found || null);
      } catch {
        setError('Load failed');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, passed]);

  if (loading) return <div className="main-content"><p className={styles.statusMsg}>Loading...</p></div>;
  if (error) return <div className="main-content"><p className={styles.statusMsg}>{error}</p></div>;
  if (!product) return null;

  const links = [
    product.link,
    product.amazonLink,
    product.altLink1,
    product.altLink2,
    ...(product.links || [])
  ].filter(Boolean).slice(0, 3);

  return (
    <div className={`main-content ${styles.productInfoPage}`}>
      <h1 className={styles.piTitle}>{product.name || product.title || '{Product Name}'}</h1>
      <div className={styles.piBody}>
        <div className={styles.piDesc}>
          <p>{product.description || product.summary || 'No description available.'}</p>
        </div>
        <div className={styles.piImageWrap}>
          {product.image || product.imageUrl ? (
            <img
              src={product.image || product.imageUrl}
              alt={product.name || product.title}
              className={styles.piImage}
            />
          ) : (
            <div className={`${styles.piImage} ${styles.placeholder}`}>Product Image</div>
          )}
        </div>
      </div>
      <div className={styles.piLinks}>
        {links.map((l, i) => (
          <a
            key={i}
            href={l}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.piBtn} ${styles.piBtnLink}`}
          >
            {product.vendor || 'Amazon'} Link
          </a>
        ))}
      </div>
      <div className={styles.piBack}>
        <button onClick={() => navigate(-1)} className={`${styles.piBtn} ${styles.piBtnBack}`}>Back</button>
      </div>
    </div>
  );
};

export default ProductInfoPage;