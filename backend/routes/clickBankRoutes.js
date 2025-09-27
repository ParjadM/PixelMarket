import express from 'express';
const router = express.Router();

import { getClickBankProducts } from '../controllers/clickBankController.js';

router.get('/products', getClickBankProducts);

export default router;