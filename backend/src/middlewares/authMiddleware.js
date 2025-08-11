const jwt = require('jsonwebtoken');
const Auth = require('../models/Auth');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const auth = await Auth.findById(decoded.id);
    if (!auth) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = await User.findOne({ authId: auth._id });
    if (!user) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    req.user = {
      authId: auth._id,
      userId: user._id,
      username: user.username,
      phone: auth.phone,
      role: auth.role,
    };

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Token verification failed' });
  }
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admins only. Access denied.' });
  }
  next();
};

module.exports = {
  protect,
  adminOnly,
};