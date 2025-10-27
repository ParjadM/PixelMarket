import React, { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './AddProductPage.module.css';

const AddProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const isEdit = Boolean(productId);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    link: '',
    description: '',
    isFeatured: false,
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const buildLocalDescription = () => {
    const randPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const nameTxt = formData.name || 'This product';
    const catTxt = String(formData.category || '').toLowerCase() || 'device';
    const adjectives = ['reliable', 'dependable', 'well‑balanced', 'versatile', 'refined', 'thoughtful'];
    const verbs = ['simplifies', 'streamlines', 'enhances', 'elevates', 'supports'];
    const benefits = ['everyday tasks', 'workflows', 'study sessions', 'creative projects', 'home routines'];
    const users = ['students', 'remote workers', 'families', 'creators', 'travelers'];
    const traits = ['quiet performance', 'responsive controls', 'solid build quality', 'energy efficiency', 'long‑term reliability'];

    const sentences = [];
    sentences.push(`${nameTxt} is a ${randPick(adjectives)} ${catTxt} that ${randPick(verbs)} ${randPick(benefits)} with minimal effort.`);
    sentences.push(`Setup is straightforward, and you can get comfortable quickly without technical hurdles or guesswork.`);
    sentences.push(`Design choices emphasize clarity and comfort so you spend less time adjusting settings and more time getting results.`);
    sentences.push(`It offers ${randPick(traits)} and day‑to‑day consistency you can trust.`);
    sentences.push(`Whether you are at home, at work, or on the go, it adapts naturally to your routine.`);
    sentences.push(`Many ${randPick(users)} will appreciate the practical details that keep things simple without getting in your way.`);
    sentences.push(`If you are upgrading from older gear, expect smoother operation and a more polished overall experience.`);
    sentences.push(`Maintenance is simple, and helpful guidance keeps ownership stress‑free over time.`);
    sentences.push(`It is a smart choice if you value dependable tools that do exactly what they promise.`);
    sentences.push(formData.link ? `Learn more or purchase using the provided link when you are ready.` : `Check availability with your preferred retailer to compare options and choose the best fit.`);

    for (let i = sentences.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sentences[i], sentences[j]] = [sentences[j], sentences[i]];
    }

    let out = '';
    while (out.split(/\s+/).filter(Boolean).length < 135) {
      out += (out ? ' ' : '') + sentences.join(' ');
    }
    return out.split(/\s+/).slice(0, 170).join(' ');
  };

  const handleGenerateDescription = async () => {
    try {
      setError('');
      setAiLoading(true);
      const res = await fetch(buildApiUrl('/api/ai/generate-description'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          link: formData.link,
          seed: Date.now() + Math.random(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to generate description');
      }
      const data = await res.json();
      const serverText = (data && data.description) ? String(data.description) : '';
      const words = serverText.trim().split(/\s+/).filter(Boolean).length;
      let finalText = serverText.trim();
      if (words < 130 || words > 180) {
        const extra = buildLocalDescription();
        const need = Math.max(0, 150 - words);
        finalText = (serverText + ' ' + extra.split(/\s+/).slice(0, need + 15).join(' ')).trim();
      }
      setFormData(prev => ({ ...prev, description: finalText }));
    } catch (err) {
      console.error('AI generation error:', err);

      const fallback = buildLocalDescription();
      setFormData(prev => ({ ...prev, description: fallback }));
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!isEdit) return;
    const fetchProduct = async () => {
      try {
        setError('');
        setPageLoading(true);
        const res = await fetch(buildApiUrl(`/api/products/${productId}`), {
          credentials: 'include',
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to load product');
        }
        const p = await res.json();
        setFormData({
          name: p.name || '',
          category: p.category || '',
          link: p.affiliateUrl || '',
          description: p.description || '',
          isFeatured: Boolean(p.isFeatured),
        });
        setImageUrl(p.imageUrl || '');
      } catch (e) {
        setError(e.message || 'Failed to load product');
      } finally {
        setPageLoading(false);
      }
    };
    fetchProduct();
  }, [isEdit, productId]);

  const handleUpload = async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('image', file);
      const res = await fetch(buildApiUrl('/api/upload'), {
        method: 'POST',
        body: form,
        credentials: 'include',
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Upload failed');
      }
      const data = await res.json();
      setImageUrl(data.url);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        affiliateUrl: formData.link,
        description: formData.description,
        price: 0,
        imageUrl: imageUrl || 'https://placehold.co/400x300/cccccc/666666?text=No+Image',
        isFeatured: Boolean(formData.isFeatured),
      };

      const response = await fetch(
        isEdit ? buildApiUrl(`/api/products/${productId}`) : buildApiUrl('/api/products'),
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create product');
      }


      navigate('/admin/products');
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <div className={`main-content ${styles.page}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>{isEdit ? 'EDIT PRODUCT' : 'PRODUCT NAME'}</h1>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formContent}>
            <div className={styles.leftSection}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>PRODUCT NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>PRODUCT CATEGORY</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={styles.input}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="TV">TV</option>
                  <option value="COMPUTER">COMPUTER</option>
                  <option value="SPEAKER">SPEAKER</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>PRODUCT LINK</label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="https://example.com"
                />
              </div>

              <div className={styles.descriptionSection}>
                <div className={styles.descriptionHeader}>
                  <label className={styles.label}>DESCRIPTION</label>
                  <button 
                    type="button"
                    onClick={handleGenerateDescription}
                    className={styles.generateBtn}
                  >
                    {aiLoading ? 'Generating...' : 'Generate'}
                  </button>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="LOREM IPSUM"
                  rows="6"
                />
              </div>
            </div>

            <div className={styles.rightSection}>
              <div className={styles.imageSection}>
                <div className={styles.imagePlaceholder}>
                  {imageUrl ? (
                    <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    'PRODUCT IMAGE'
                  )}
                </div>
                <label className={styles.uploadBtn}>
                  {uploading ? 'UPLOADING...' : 'UPLOAD'}
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
                </label>
                <label className={styles.featureToggle}>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  />
                  <span>Feature this product</span>
                </label>
              </div>
            </div>
          </div>

          {(error || pageLoading) && (
            <div className={styles.errorMessage}>
              {pageLoading ? 'Loading product...' : error}
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={handleCancel}
              className={styles.homeButton}
            >
              HOME
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className={styles.addButton}
            >
              {isEdit ? (loading ? 'SAVING...' : 'SAVE CHANGES') : (loading ? 'ADDING...' : 'ADD PRODUCT')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
