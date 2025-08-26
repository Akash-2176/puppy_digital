const express = require('express');
const router = express.Router();
const { createOffer, getAllOffers, softDeleteOffer } = require('../controllers/offerController');
const {protect} = require('../middlewares/authMiddleware');


router.post('/offers',protect, createOffer);
router.get('/offers',getAllOffers);
router.delete('/offers', protect, softDeleteOffer);
// Remove router.post('/offers/redeem', redeemOffer) if moving to redemption.js

module.exports = router;