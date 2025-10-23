import asyncHandler from 'express-async-handler';
import About from '../models/aboutModel.js';

const getContent = asyncHandler(async (_req, res) => {
  res.json({ message: 'Content API endpoint is working.' });
});

export const getAbout = asyncHandler(async (_req, res) => {
  const doc = await About.findOne().sort({ updatedAt: -1 });
  res.json({ body: doc?.body || '' });
});

export const updateAbout = asyncHandler(async (req, res) => {
  const { body } = req.body || {};
  let doc = await About.findOne();
  if (!doc) {
    doc = await About.create({ body: body || '' });
  } else {
    doc.body = body || '';
    await doc.save();
  }
  res.json({ body: doc.body });
});

export { getContent };
