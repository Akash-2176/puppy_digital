const express = require('express');
const router = express.Router();
const { createCoupon, redeemCoupon } = require('../controllers/couponController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/generate', protect, createCoupon);
router.post('/redeem', protect, redeemCoupon);

module.exports = router;