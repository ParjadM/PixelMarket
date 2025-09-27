import express from 'express';
const router = express.Router();

import { getContent } from '../controllers/contentController.js';

// @desc   Fetch all of our own content (e.g., from Clickbank, etc.)
// @route  GET /api/content
// @access Public
router.get('/', getContent);

export default router;

