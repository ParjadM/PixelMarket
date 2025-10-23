import express from 'express';
const router = express.Router();
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  getFeaturedProducts,
  getProductReviews,
  addProductReview,
  deleteProductReview,
  createProduct,
  updateProduct,
  deleteProduct,
  deactivateProduct,
  getProductUserReaction,
  setProductReaction
} from '../controllers/productController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';


router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/featured/list', getFeaturedProducts);
router.get('/:id', getProductById);
router.get('/:id/reviews', getProductReviews);
router.post('/:id/reviews', protect, addProductReview);
router.delete('/:id/reviews/:reviewId', protect, adminOnly, deleteProductReview);
router.get('/:id/reaction', protect, getProductUserReaction);
router.put('/:id/reaction', protect, setProductReaction);


router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/deactivate', deactivateProduct);

export default router;
