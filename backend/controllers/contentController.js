import asyncHandler from 'express-async-handler';


const getContent = asyncHandler(async (req, res) => {
  res.json({ message: 'Content API endpoint is working.' });
});

export { getContent };
