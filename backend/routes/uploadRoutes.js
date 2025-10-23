import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// In serverless environments (Vercel), disk writes are ephemeral or disallowed.
// Fallback: if uploads dir cannot be created, short-circuit with a helpful message.
let uploadsDir = path.resolve('uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch {
  uploadsDir = null;
}

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    if (!uploadsDir) return cb(new Error('Uploads are not supported on this deployment'));
    cb(null, uploadsDir);
  },
  filename(_req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9_-]/gi, '_');
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}-${unique}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) return cb(null, true);
  cb(new Error('Only image files are allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const publicPath = `/uploads/${req.file.filename}`;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  const absoluteUrl = `${baseUrl}${publicPath}`;
  res.status(201).json({ url: absoluteUrl, path: publicPath, filename: req.file.filename });
});

export default router;
