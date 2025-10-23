import jwt from 'jsonwebtoken';

// Generate JWT token and set HTTP-only cookie
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d', 
  });

  // Set secure cookie for authentication
  if (res) {
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });
  }
  return token;
};

export default generateToken;
