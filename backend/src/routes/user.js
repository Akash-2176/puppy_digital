const express = require('express');
const router = express.Router();
const { getWallet, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get wallet details
router.get('/wallet', authMiddleware.protect, getWallet);

// Get user profile
router.get('/profile', authMiddleware.protect, getProfile);

module.exports = router;

// This code defines a route to get the user's wallet information, protected by authentication middleware.