import { mockProducts } from '../data/mockAmazonData.js';
import asyncHandler from 'express-async-handler';


const searchAmazonProducts = asyncHandler(async (req, res) => {
  console.log('Serving mock Amazon data...');
  
  res.json(mockProducts);
});

export { searchAmazonProducts };

