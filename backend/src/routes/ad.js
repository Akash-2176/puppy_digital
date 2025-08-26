const express = require('express');
const router = express.Router();
const { createAd, getAllAds, getCarouselPoster, getAdForRedeem, softDeleteAd } = require('../controllers/adController');

router.post('/ad',  createAd);
router.get('/ad', getAllAds);
router.get('/carousel-poster', getCarouselPoster);
router.get('/ad-for-redeem', getAdForRedeem);
router.delete('/ad',  softDeleteAd);

module.exports = router;