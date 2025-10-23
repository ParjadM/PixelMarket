import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import styles from './ProductInfoPage.module.css';

const ProductReviewPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product || {};
  const productId = product._id || product.id || id;
  const user = useMemo(() => {
    try {
      const raw = sessionStorage.getItem('pm_user') || localStorage.getItem('pm_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);
  const [review, setReview] = useState('');
  const [status, setStatus] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`buildApiUrl('')/api/products/${productId}/reviews`);
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } catch {
        setReviews([]);
      }
    };
    load();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await fetch(`buildApiUrl('')/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ comment: review, authorName: user.name || user.email }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Submit failed');
      }
      const created = await res.json();
      setReviews((r) => [created, ...r]);
      setStatus('Thanks for your review!');
      setReview('');
    } catch (e) {
      setStatus(e.message || 'Submit failed');
    }
  };

  return (
    <div className={`main-content ${styles.productInfoPage}`}>
      <h1 className={styles.piTitle}>{product.name || product.title || '{Product Name}'}</h1>
      <div className={styles.piBody}>
        <div className={styles.piDesc}>
          {reviews && reviews.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              {reviews.map((r, i) => (
                <div key={r._id || i} style={{ marginBottom: '.6rem', display: 'flex', gap: '.6rem', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{r.authorName || 'User'} <span style={{ fontWeight: 400, color: '#666' }}>• {new Date(r.createdAt).toLocaleDateString()}</span></div>
                    <div>{r.comment}</div>
                  </div>
                  {user?.role === 'admin' && (
                    <button
                      type="button"
                      className={`${styles.piBtn} ${styles.piBtnBack}`}
                      onClick={async () => {
                        try {
                          const res = await fetch(`buildApiUrl('')/api/products/${productId}/reviews/${r._id}`, {
                            method: 'DELETE',
                            credentials: 'include',
                          });
                          if (!res.ok) throw new Error('Delete failed');
                          setReviews(list => list.filter(x => (x._id || '') !== (r._id || '')));
                        } catch (e) {

                        }
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          {user ? (
            <form onSubmit={handleSubmit}>
              <p style={{ margin: '0 0 .5rem' }}>Write your review</p>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={6}
                style={{ width: '100%', padding: '.6rem', border: '1px solid #ccc' }}
                required
              />
              <div style={{ marginTop: '.6rem' }}>
                <button type="submit" className={`${styles.piBtn} ${styles.piBtnLink}`}>Submit Review</button>
              </div>
              {status && <p style={{ marginTop: '.6rem', color: '#2e7d32' }}>{status}</p>}
            </form>
          ) : (
            <p>
              Please <Link to="/register">register</Link> or sign in to write a review.
            </p>
          )}
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

      <div className={styles.piBack}>
        <button onClick={() => navigate(-1)} className={`${styles.piBtn} ${styles.piBtnBack}`}>Back</button>
      </div>
    </div>
  );
};

export default ProductReviewPage;


