const express = require('express');
const router = express.Router();

const protect = require('../middlewares/protect');
const adminOnly = require('../middlewares/adminOnly');

const adminController = require('../controllers/adminController');

router.get('/users', protect, adminOnly, adminController.getAllUsers);
router.get('/user/:phone', protect, adminOnly, adminController.getUserByPhone);
router.post('/redeem-user-wallet', protect, adminOnly, adminController.redeemUserWallet);
// router.post('/generate-coupons', protect, adminOnly, adminController.generateCouponCodes);

module.exports = router;
