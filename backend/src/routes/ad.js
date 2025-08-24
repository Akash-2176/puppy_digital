const express = require('express');
const router = express.Router();
const { createAd, getAllAds } = require('../controllers/adController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/ad', protect, createAd);
router.get('/ad', getAllAds);
router.get('/carousel-poster', getCarouselPoster);
router.get('/ad-for-redeem', getAdForRedeem);     

module.exports = router;