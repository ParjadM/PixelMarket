import { mockBayPartnerProducts } from '../data/mockBayPartnerData.js';
import asyncHandler from 'express-async-handler';


const getBayPartnerProducts = asyncHandler(async (req, res) => {
  console.log('Serving mock Bay Partner data...');
  res.json(mockBayPartnerProducts);
});

export { getBayPartnerProducts };
