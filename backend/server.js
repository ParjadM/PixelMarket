import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Route modules
import contentRoutes from './routes/contentRoutes.js';
import amazonRoutes from './routes/amazonRoutes.js';
import clickBankRoutes from './routes/clickBankRoutes.js';
import bayPartnerRoutes from './routes/bayPartnerRoutes.js';
// 1. Import the new user routes
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

app.get('/', (req, res) => {
  res.send('Pixel Market API is running...');
});

// Mount routes
app.use('/api/content', contentRoutes);
app.use('/api/amazon', amazonRoutes);
app.use('/api/clickbank', clickBankRoutes);
app.use('/api/baypartner', bayPartnerRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

