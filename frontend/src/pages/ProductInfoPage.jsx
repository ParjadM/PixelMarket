import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import styles from './ProductInfoPage.module.css';

// Product detail page with like/dislike functionality
const ProductInfoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passed = location.state && location.state.product;
  const [product, setProduct] = useState(passed || null);
  const [loading, setLoading] = useState(!passed);
  const [error, setError] = useState('');
  
  // Get user from storage
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('pm_user') || sessionStorage.getItem('pm_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  
  // Reaction state
  const [userReaction, setUserReaction] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  useEffect(() => {
    if (passed) {
      setProduct(passed);
      setLikesCount(passed.likesCount || 0);
      setDislikesCount(passed.dislikesCount || 0);
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/products/${id}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Load failed');
        const p = await res.json();
        setProduct(p || null);
        setLikesCount(p?.likesCount || 0);
        setDislikesCount(p?.dislikesCount || 0);
      } catch {
        setError('Load failed');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, passed]);

  useEffect(() => {
    const fetchUserReaction = async () => {
      if (!user || !id) return;
      try {
        const token = localStorage.getItem('pm_token');
        const res = await fetch(`http://localhost:5001/api/products/${id}/reaction`, {
          credentials: 'include',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) return;
        const data = await res.json();
        setUserReaction(data?.reaction || null);
      } catch {}
    };
    fetchUserReaction();
  }, [user, id]);

  if (loading) return <div className="main-content"><p className={styles.statusMsg}>Loading...</p></div>;
  if (error) return <div className="main-content"><p className={styles.statusMsg}>{error}</p></div>;
  if (!product) return null;

  const links = [product.affiliateUrl, product.link, product.amazonLink, product.buyUrl]
    .filter(Boolean)
    .slice(0, 1);

  const handleLike = async () => {
    if (!user) return;
    const next = userReaction === 'like' ? 'none' : 'like';
    try {
      const token = localStorage.getItem('pm_token');
      const res = await fetch(`http://localhost:5001/api/products/${product._id || id}/reaction`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: 'include',
        body: JSON.stringify({ reaction: next }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setUserReaction(data.reaction || null);
      setLikesCount(data.likesCount || 0);
      setDislikesCount(data.dislikesCount || 0);
    } catch {}
  };

  const handleDislike = async () => {
    if (!user) return;
    const next = userReaction === 'dislike' ? 'none' : 'dislike';
    try {
      const token = localStorage.getItem('pm_token');
      const res = await fetch(`http://localhost:5001/api/products/${product._id || id}/reaction`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        credentials: 'include',
        body: JSON.stringify({ reaction: next }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setUserReaction(data.reaction || null);
      setLikesCount(data.likesCount || 0);
      setDislikesCount(data.dislikesCount || 0);
    } catch {}
  };

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
          <div className={styles.reactionButtons}>
            <button
              className={`${styles.reactionBtn} ${styles.likeBtn} ${userReaction === 'like' ? styles.active : ''}`}
              onClick={handleLike}
              disabled={!user}
              aria-disabled={!user}
              title={user ? 'Like this product' : 'Please sign in'}
            >
              👍 Like ({likesCount})
            </button>
            <button
              className={`${styles.reactionBtn} ${styles.dislikeBtn} ${userReaction === 'dislike' ? styles.active : ''}`}
              onClick={handleDislike}
              disabled={!user}
              aria-disabled={!user}
              title={user ? 'Dislike this product' : 'Please sign in'}
            >
              👎 Dislike ({dislikesCount})
            </button>
          </div>
        </div>
      </div>
      <div className={styles.piLinks}>
        {user ? (
          links.length ? (
            <>
              <a
                href={links[0]}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.piBtn} ${styles.piBtnLink}`}
              >
                {product.vendor || 'Amazon'} Link
              </a>
              <Link
                to={`/product/${product._id || product.id || id}/reviews`}
                className={`${styles.piBtn} ${styles.piBtnLink}`}
                state={{ product }}
              >
                Review
              </Link>
            </>
          ) : null
        ) : (
          <Link to="/register" className={`${styles.piBtn} ${styles.piBtnBack}`}>
            Please register to use this button
          </Link>
        )}
      </div>
      <div className={styles.piBack}>
        <button onClick={() => navigate(-1)} className={`${styles.piBtn} ${styles.piBtnBack}`}>Back</button>
      </div>
    </div>
  );
};

export default ProductInfoPage;
