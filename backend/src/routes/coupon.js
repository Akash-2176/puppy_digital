const express = require('express');
const router = express.Router();
const { createCoupon, redeemCoupon, getAliveCoupons, checkCouponValidity } = require('../controllers/couponController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/generate', protect, createCoupon);
router.post('/redeem', protect, redeemCoupon);
router.get('/alive', protect, adminOnly, getAliveCoupons);
router.post('/validity', protect, checkCouponValidity);

module.exports = router;