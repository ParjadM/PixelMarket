import { mockClickBankProducts } from '../data/mockClickBankData.js';
import asyncHandler from 'express-async-handler';

// @desc Get ClickBank products (mock)
// @route GET /api/clickbank/products
// @access Public
const getClickBankProducts = asyncHandler(async (req, res) => {
  console.log('Serving mock ClickBank data...');
  res.json(mockClickBankProducts);
});

export { getClickBankProducts };

