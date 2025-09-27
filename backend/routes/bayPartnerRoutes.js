import express from 'express';
const router = express.Router();

import { getBayPartnerProducts } from '../controllers/bayPartnerController.js';

router.get('/products', getBayPartnerProducts);

export default router;