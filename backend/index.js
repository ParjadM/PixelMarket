const express = require('express');

const app = express();

// Basic middleware
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Pixel Market API is running...' });
});

// Mock data endpoints
app.get('/api/products/featured/list', (req, res) => {
  res.json([
    {
      _id: '1',
      name: 'Sample TV',
      imageUrl: 'https://via.placeholder.com/300x200',
      price: 299.99,
      category: 'TV'
    },
    {
      _id: '2', 
      name: 'Sample Computer',
      imageUrl: 'https://via.placeholder.com/300x200',
      price: 599.99,
      category: 'COMPUTER'
    }
  ]);
});

app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  res.json([
    {
      _id: `${category.toLowerCase()}-1`,
      name: `Sample ${category}`,
      imageUrl: 'https://via.placeholder.com/300x200',
      price: 199.99,
      category: category.toUpperCase()
    }
  ]);
});

// Catch all route
app.get('*', (req, res) => {
  res.json({ message: 'API endpoint not found', path: req.path });
});

module.exports = app;
