const User = require("../models/User");
const Wallet = require("../models/Wallet");
const Auth = require("../models/Auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { name, phone, password, role = 'user' } = req.body || {}; // Default to 'user', allow 'admin'

    if (!name || !phone || !password) {
      throw new Error('Missing required fields: name, phone, or password');
    }

    console.log('Parsed values:', { name, phone, password, role });
    const existingAuth = await Auth.findOne({ phone });
    if (existingAuth) return res.status(400).json({ message: "User with this phone already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password and auth data:', { phone, hashedPassword, role });
    const auth = await Auth.create({ phone, passwordHash: hashedPassword, role });

    console.log('Created auth:', auth);
    const user = await User.create({ authId: auth._id, phone, username: name });

    console.log('Created user:', user);
    const wallet = await Wallet.create({ userId: user._id, walletBalance: 0, walletHistory: [] });
    user.walletId = wallet._id;
    await user.save();

    console.log('Created wallet and updated user:', { user, wallet });
    console.log('Sending response...');
    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const auth = await Auth.findOne({ phone });
    if (!auth) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, auth.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: auth._id, role: auth.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('walletId');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};