import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import contentRoutes from './routes/contentRoutes.js';
import amazonRoutes from './routes/amazonRoutes.js';
import clickBankRoutes from './routes/clickBankRoutes.js';
import bayPartnerRoutes from './routes/bayPartnerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import User from './models/userModel.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
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

app.get('/', (req, res) => {
  res.send('Pixel Market API is running...');
});

app.use('/api/content', contentRoutes);
app.use('/api/amazon', amazonRoutes);
app.use('/api/clickbank', clickBankRoutes);
app.use('/api/baypartner', bayPartnerRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    const adminEmail = 'admin@example.com';
    const exists = await User.findOne({ email: adminEmail });
    if (!exists) {
      await User.create({ name: 'Admin', email: adminEmail, password: '1234', role: 'admin' });
      console.log('Seeded default admin user.');
    }
  } catch (e) {
    console.error('Admin seed failed:', e.message);
  }
});

