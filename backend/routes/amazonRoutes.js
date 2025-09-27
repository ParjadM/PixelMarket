import express from 'express';
const router = express.Router();

import { searchAmazonProducts } from '../controllers/amazonController.js';

// @desc   Search for products on Amazon (using mock data for now)
// @route  GET /api/amazon/search
// @access Public
router.get('/search', searchAmazonProducts);

export default router;