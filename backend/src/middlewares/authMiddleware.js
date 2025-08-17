const jwt = require('jsonwebtoken');
const Auth = require('../models/Auth');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  console.log('Authorization header:', req.headers.authorization); // Log header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    console.log('No token found');
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    console.log('Verifying token:', token); // Log token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Log decoded payload

    const auth = await Auth.findById(decoded.id);
    if (!auth) {
      console.log('Auth not found for id:', decoded.id);
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findOne({ authId: auth._id });
    if (!user) {
      console.log('User not found for authId:', auth._id);
      return res.status(404).json({ error: 'User profile not found' });
    }

    req.user = {
      authId: auth._id,
      userId: user._id,
      username: user.username,
      phone: auth.phone,
      role: auth.role,
    };
    console.log('Set req.user:', req.user); // Log successful user assignment

    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    res.status(401).json({ error: 'Token verification failed' });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admins only. Access denied.' });
  }
  next();
};

module.exports = { protect, adminOnly };