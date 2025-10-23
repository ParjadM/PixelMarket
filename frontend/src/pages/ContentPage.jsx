import React, { useState, useEffect, useMemo } from 'react';
import { buildApiUrl } from '../utils/api';
import { Link } from 'react-router-dom';
import { buildApiUrl } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { buildApiUrl } from '../utils/api';
import { buildApiUrl } from '../utils/api';
import { buildApiUrl } from '../utils/api';
import styles from './ContentPage.module.css';
import { buildApiUrl } from '../utils/api';

// Product catalog page with category filtering and pagination
const ContentPage = () => {
  const [tvProducts, setTvProducts] = useState([]);
  const [computerProducts, setComputerProducts] = useState([]);
  const [speakerProducts, setSpeakerProducts] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');
  
  // Pagination state for each category
  const [tvPage, setTvPage] = useState(1);
  const [compPage, setCompPage] = useState(1);
  const [spkPage, setSpkPage] = useState(1);
  const itemsPerPage = 3;

  // Fetch products by category on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const [tvRes, computerRes, speakerRes] = await Promise.all([
          fetch(buildApiUrl('/api/products/category/TV')),
          fetch(buildApiUrl('/api/products/category/Computer')),
          fetch(buildApiUrl('/api/products/category/Speaker'))
        ]);

        const tvData = await tvRes.json();
        const computerData = await computerRes.json();
        const speakerData = await speakerRes.json();

        setTvProducts(tvData);
        setComputerProducts(computerData);
        setSpeakerProducts(speakerData);
        
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please ensure the backend server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter products based on search query
  const filtered = useMemo(() => {
    const all = [...tvProducts, ...computerProducts, ...speakerProducts];
    if (!q.trim()) return [];
    const term = q.trim().toLowerCase();
    return all.filter(p => (
      String(p.name || p.title || '').toLowerCase().includes(term) ||
      String(p.description || p.summary || '').toLowerCase().includes(term)
    ));
  }, [q, tvProducts, computerProducts, speakerProducts]);

  if (loading) return <div className={styles.loadingMessage}>Loading Products...</div>;
  if (error) return <div className={styles.errorMessage}>{error}</div>;

  // Pagination helper functions
  const getPaginatedItems = (items, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = (items) => Math.ceil(items.length / itemsPerPage);

  // Pagination controls component
  const PaginationControls = ({ currentPage, totalPages, onPageChange, category }) => {
    if (totalPages <= 1) return null;
    
    return (
      <div className={styles.pagination}>
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageBtn}
        >
          Previous
        </button>
        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageBtn}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className={styles.contentPage}>
      <div className={styles.headerBar}>
        <h1 className={styles.pageTitle}>Discover Our Content</h1>
        <div className={styles.searchBarAbsolute}>
          <input
            className={styles.searchInput}
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {q.trim() && (
        <section className={styles.productCategory}>
          <h2 className={styles.categoryTitle}>Search Results ({filtered.length})</h2>
          <div className={styles.productsGrid}>
            {filtered.slice(0, 9).map((product) => (
              <ProductCard key={(product._id || product.id)} product={{ ...product, id: product._id || product.id }} />
            ))}
          </div>
        </section>
      )}

      <section className={styles.productCategory}>
        <h2 className={styles.categoryTitle}>TV</h2>
        <div className={styles.productsGrid}>
          {getPaginatedItems(tvProducts, tvPage).map((product) => (
            <ProductCard key={product._id} product={{ ...product, id: product._id }} />
          ))}
        </div>
        <PaginationControls 
          currentPage={tvPage}
          totalPages={getTotalPages(tvProducts)}
          onPageChange={setTvPage}
          category="TV"
        />
      </section>

      <section className={styles.productCategory}>
        <h2 className={styles.categoryTitle}>Computer</h2>
        <div className={styles.productsGrid}>
          {getPaginatedItems(computerProducts, compPage).map((product) => (
            <ProductCard key={product._id} product={{ ...product, id: product._id }} />
          ))}
        </div>
        <PaginationControls 
          currentPage={compPage}
          totalPages={getTotalPages(computerProducts)}
          onPageChange={setCompPage}
          category="Computer"
        />
      </section>

      <section className={styles.productCategory}>
        <h2 className={styles.categoryTitle}>Speaker</h2>
        <div className={styles.productsGrid}>
          {getPaginatedItems(speakerProducts, spkPage).map((product) => (
            <ProductCard key={product._id} product={{ ...product, id: product._id }} />
          ))}
        </div>
        <PaginationControls 
          currentPage={spkPage}
          totalPages={getTotalPages(speakerProducts)}
          onPageChange={setSpkPage}
          category="Speaker"
        />
      </section>
    </div>
  );
};

export default ContentPage;
