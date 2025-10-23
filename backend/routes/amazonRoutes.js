import express from 'express';
const router = express.Router();

import { searchAmazonProducts } from '../controllers/amazonController.js';
router.get('/search', searchAmazonProducts);

export default router;
