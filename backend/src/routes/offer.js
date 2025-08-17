const express = require('express');
const router = express.Router();
const { createOffer, getAllOffers } = require('../controllers/offerController');

router.post('/offers', createOffer);
router.get('/offers', getAllOffers);
// Remove router.post('/offers/redeem', redeemOffer) if moving to redemption.js

module.exports = router;