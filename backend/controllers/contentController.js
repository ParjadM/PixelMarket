import asyncHandler from 'express-async-handler';

// @desc Get all content (placeholder)
// @route GET /api/content
// @access Public
const getContent = asyncHandler(async (req, res) => {
  res.json({ message: 'Content API endpoint is working.' });
});

export { getContent };
