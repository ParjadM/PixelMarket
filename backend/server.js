// Express server configuration
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Route imports
import contentRoutes from './routes/contentRoutes.js';
import amazonRoutes from './routes/amazonRoutes.js';
import clickBankRoutes from './routes/clickBankRoutes.js';
import bayPartnerRoutes from './routes/bayPartnerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import User from './models/userModel.js';

dotenv.config();

const app = express();

// Database connection (serverless-safe)
await connectDB();

// Default admin account creation
try {
  const adminEmail = 'admin@example.com';
  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    await User.create({ name: 'Admin', email: adminEmail, password: '1234', role: 'admin' });
    console.log('Default admin user created.');
  }
} catch (e) {
  console.log('Admin seed skipped:', e.message);
}

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://pixelmarket.vercel.app',
  'https://pixelmarket-git-main.vercel.app',
  'https://pixel-market-green.vercel.app',
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV !== 'production') return callback(null, true);
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Pixel Market API is running...');
});

// Product endpoints
app.get('/api/products/featured/list', async (req, res) => {
  try {
    const { default: Product } = await import('./models/productModel.js');
    const items = await Product.find({ isActive: true }).sort({ createdAt: -1 }).limit(6);
    return res.json(items || []);
  } catch (e) {
    return res.json([]);
  }
});

app.get('/api/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { default: Product } = await import('./models/productModel.js');
    const items = await Product.find({ isActive: true, category: category.toUpperCase() }).sort({ createdAt: -1 });
    return res.json(items || []);
  } catch (e) {
    return res.json([]);
  }
});

// API route registration
app.use('/api/content', contentRoutes);
app.use('/api/amazon', amazonRoutes);
app.use('/api/clickbank', clickBankRoutes);
app.use('/api/baypartner', bayPartnerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/upload', uploadRoutes);


const __dirname = path.resolve();
// On Vercel, write access is not available; serve uploads only if directory exists
try {
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
} catch {
  // ignore in serverless
}


const PORT = process.env.PORT || 5001;

const isVercel = Boolean(process.env.VERCEL);

if (!isVercel) {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      const adminEmail = 'admin@example.com';
      const adminExists = await User.findOne({ email: adminEmail });
      if (!adminExists) {
        await User.create({ name: 'Admin', email: adminEmail, password: '1234', role: 'admin' });
        console.log('Seeded default admin user.');
      }

      const userEmail = 'user@example.com';
      const userExists = await User.findOne({ email: userEmail });
      if (!userExists) {
        await User.create({ name: 'Regular User', email: userEmail, password: '1234', role: 'user' });
        console.log('Seeded default regular user.');
      }
    } catch (e) {
      console.error('User seed failed:', e.message);
    }
  });
}

export default app;

