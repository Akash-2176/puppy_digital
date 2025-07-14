const jwt = require('jsonwebtoken');
const Auth = require('../models/Auth');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
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
    console.error('JWT verification failed:', err);
    res.status(401).json({ error: 'Token verification failed' });
  }
};

module.exports = protect;
