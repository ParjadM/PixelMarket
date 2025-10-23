import express from 'express';
const router = express.Router();

import { getContent, getAbout, updateAbout } from '../controllers/contentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { sendContactEmail } from '../utils/mailer.js';


router.get('/', getContent);
router.get('/about', getAbout);
router.put('/about', updateAbout);
router.post('/contact', protect, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ message: 'Missing required fields' });
    await sendContactEmail({
      to: 'minooeip@gmail.com',
      fromEmail: email,
      fromName: name,
      phone,
      message,
    });
    return res.json({ message: 'Message received' });
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Email send failed' });
  }
});

export default router;

