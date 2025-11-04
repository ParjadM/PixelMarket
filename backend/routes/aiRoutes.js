import express from 'express';
const router = express.Router();
import { generateProductDescription } from '../controllers/aiController.js';

router.post('/generate-description', generateProductDescription);


export default router;
