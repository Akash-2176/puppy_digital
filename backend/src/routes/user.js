const express = require('express');
const router = express.Router();
const { getWallet } = require('../controllers/userController');
const {protect} = require('../middlewares/authMiddleware');
const { redeemCoupon } = require('../controllers/userController');

router.get('/wallet', protect, getWallet);
router.post('/redeem', protect, redeemCoupon);

module.exports = router;

// This code defines a route to get the user's wallet information, protected by authentication middleware.
