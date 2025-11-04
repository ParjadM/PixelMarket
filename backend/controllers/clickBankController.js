import { mockClickBankProducts } from '../data/mockClickBankData.js';
import asyncHandler from 'express-async-handler';

const getClickBankProducts = asyncHandler(async (req, res) => {
  
  console.log('Serving mock ClickBank data...');
  res.json(mockClickBankProducts);
});

export { getClickBankProducts };

