const Auth = require('../models/Auth');
const User = require('../models/User');
const Wallet = require('../models/Wallet');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  try {
    const { phone, password, username, role } = req.body;

    if (!phone || !password || !username)
      return res.status(400).json({ error: 'Phone, password, and username are required' });

    const userRole = ['admin', 'user'].includes(role) ? role : 'user';

    const exists = await Auth.findOne({ phone });
    if (exists)
      return res.status(400).json({ error: 'User already exists' });

    // Hash password and create auth
    const hashed = await bcrypt.hash(password, 10);
    const auth = await Auth.create({
      phone,
      passwordHash: hashed,
      role: userRole
    });

    // Create linked User
    const user = await User.create({
      authId: auth._id,
      username,
      phone
    });

    // Create wallet
    await Wallet.create({
      userId: user._id,
      walletBalance: 0,
      walletHistory: [],
      lastUpdated: new Date()
    });

    return res.status(201).json({
      message: 'User registered',
      token: generateToken(auth._id),
      user: {
        id: user._id,
        phone,
        username,
        role: userRole
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const auth = await Auth.findOne({ phone });
    if (!auth) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, auth.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const user = await User.findOne({ authId: auth._id });

    return res.status(200).json({
      message: 'Login successful',
      token: generateToken(auth._id),
      user: {
        id: user._id,
        phone: auth.phone,
        username: user.username,
        role: auth.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};