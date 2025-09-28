import express from 'express';
const router = express.Router();

import { getContent } from '../controllers/contentController.js';


router.get('/', getContent);

export default router;

