import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Product from '../models/productModel.js';

// Get all active products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(products);
});

// Get products by category
export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ 
    category: category.toUpperCase(), 
    isActive: true 
  }).sort({ createdAt: -1 });
  res.json(products);
});

// Get single product by ID
export const getProductById = asyncHandler(async (req, res) => {
  // Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

export const getProductReviews = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findById(req.params.id).select('reviews');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product.reviews || []);
});

export const addProductReview = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  const { comment, authorName } = req.body || {};
  if (!comment || !comment.trim()) {
    res.status(400);
    throw new Error('Comment required');
  }
  const userId = req.user?.id;
  product.reviews.unshift({
    authorId: userId || undefined,
    authorName: authorName || 'User',
    comment: comment.trim(),
    createdAt: new Date(),
  });
  await product.save();
  res.status(201).json(product.reviews[0]);
});

export const deleteProductReview = asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  product.reviews = (product.reviews || []).filter(r => String(r._id) !== String(reviewId));
  await product.save();
  res.json({ message: 'Review deleted' });
});


// Get featured products
export const getFeaturedProducts = asyncHandler(async (_req, res) => {
  const products = await Product.find({ isActive: true, isFeatured: true }).sort({ createdAt: -1 });
  res.json(products);
});

// Get user's reaction to a product
export const getProductUserReaction = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findById(req.params.id).select('reactions');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  const userId = String(req.user?.id || '');
  const existing = (product.reactions || []).find(r => String(r.userId) === userId);
  res.json({ reaction: existing ? existing.value : null });
});

// Set user reaction (like/dislike) for a product
export const setProductReaction = asyncHandler(async (req, res) => {
  const { reaction } = req.body || {};
  if (!['like', 'dislike', 'none', null].includes(reaction)) {
    res.status(400);
    throw new Error('Invalid reaction');
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const userId = String(req.user?.id || '');
  const idx = (product.reactions || []).findIndex(r => String(r.userId) === userId);

  if (reaction === 'none' || reaction === null) {
    if (idx !== -1) {
      const prev = product.reactions[idx].value;
      product.reactions.splice(idx, 1);
      if (prev === 'like') product.likesCount = Math.max(0, (product.likesCount || 0) - 1);
      if (prev === 'dislike') product.dislikesCount = Math.max(0, (product.dislikesCount || 0) - 1);
    }
  } else {
    if (idx === -1) {
      product.reactions.push({ userId, value: reaction, updatedAt: new Date() });
      if (reaction === 'like') product.likesCount = (product.likesCount || 0) + 1;
      if (reaction === 'dislike') product.dislikesCount = (product.dislikesCount || 0) + 1;
    } else {
      const prev = product.reactions[idx].value;
      if (prev !== reaction) {
        product.reactions[idx].value = reaction;
        product.reactions[idx].updatedAt = new Date();
        if (prev === 'like') product.likesCount = Math.max(0, (product.likesCount || 0) - 1);
        if (prev === 'dislike') product.dislikesCount = Math.max(0, (product.dislikesCount || 0) - 1);
        if (reaction === 'like') product.likesCount = (product.likesCount || 0) + 1;
        if (reaction === 'dislike') product.dislikesCount = (product.dislikesCount || 0) + 1;
      }
    }
  }

  await product.save();
  return res.json({ likesCount: product.likesCount || 0, dislikesCount: product.dislikesCount || 0, reaction: reaction === 'none' ? null : (product.reactions.find(r => String(r.userId) === userId)?.value || null) });
});


export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, imageUrl, category, affiliateUrl, sku, isFeatured } = req.body;

  const product = await Product.create({
    name,
    description,
    price,
    imageUrl,
    category: category.toUpperCase(),
    affiliateUrl: affiliateUrl || '#',
    sku,
    isFeatured: Boolean(isFeatured),
  });

  res.status(201).json(product);
});


export const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { name, description, price, imageUrl, category, affiliateUrl, sku, isActive, isFeatured } = req.body;


  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price !== undefined ? price : product.price;
  product.imageUrl = imageUrl || product.imageUrl;
  product.category = category ? category.toUpperCase() : product.category;
  product.affiliateUrl = affiliateUrl || product.affiliateUrl;
  product.sku = sku || product.sku;
  product.isActive = isActive !== undefined ? isActive : product.isActive;
  product.isFeatured = isFeatured !== undefined ? Boolean(isFeatured) : product.isFeatured;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});


export const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await Product.deleteOne({ _id: req.params.id });
  res.json({ message: 'Product deleted successfully' });
});


export const deactivateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.isActive = false;
  await product.save();
  res.json({ message: 'Product deactivated successfully' });
});
