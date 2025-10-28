// Authentication and authorization middleware
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// JWT token verification
export const protect = (req, res, next) => {
  try {
    const token = req.cookies?.jwt || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
    if (!token) return res.status(401).json({ message: 'Not authorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };
    next();
  } catch {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

// Admin role verification
export const adminOnly = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Not authorized' });
    const user = await User.findById(userId).select('role');
    if (user && user.role === 'admin') return next();
    return res.status(403).json({ message: 'Admin only' });
  } catch {
    return res.status(401).json({ message: 'Not authorized' });
  }
};


