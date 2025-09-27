import { mockBayPartnerProducts } from '../data/mockBayPartnerData.js';
import asyncHandler from 'express-async-handler';

// @desc Get Bay Partner products (mock)
// @route GET /api/baypartner/products
// @access Public
const getBayPartnerProducts = asyncHandler(async (req, res) => {
  console.log('Serving mock Bay Partner data...');
  res.json(mockBayPartnerProducts);
});

export { getBayPartnerProducts };
