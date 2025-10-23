import mongoose from 'mongoose';

// Product schema with like/dislike reactions
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['TV', 'COMPUTER', 'SPEAKER'],
    required: true,
  },
  affiliateUrl: {
    type: String,
    default: '#',
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  reviews: [{
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    authorName: { type: String },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
  reactions: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    value: { type: String, enum: ['like', 'dislike'], required: true },
    updatedAt: { type: Date, default: Date.now },
  }],
  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
