const express = require('express');
const router = express.Router();
const { getAllRedemptions, redeemOffer } = require('../controllers/redemptionController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/redemptions', getAllRedemptions);
router.post('/redemptions', protect, redeemOffer); // Ensure protect is here

module.exports = router;