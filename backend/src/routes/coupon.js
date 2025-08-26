const express = require('express');
const router = express.Router();
const { createCoupon, redeemCoupon, getAliveCoupons, checkCouponValidity } = require('../controllers/couponController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/generate', protect, createCoupon);
router.post('/redeem', protect, redeemCoupon);
router.get('/alive', protect, getAliveCoupons);
router.post('/validity', protect, checkCouponValidity); // Changed to POST

module.exports = router;