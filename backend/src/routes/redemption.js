const express = require('express');
const router = express.Router();
const { getAllRedemptions, redeemOffer } = require('../controllers/redemptionController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/redemptions',protect, getAllRedemptions);
router.post('/redemptions', protect, redeemOffer);

module.exports = router;