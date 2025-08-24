// Update src/routes/admin.js
const express = require('express');
const router = express.Router();

const { protect, adminOnly } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/users', protect, adminOnly, adminController.getAllUsers);
router.get('/user/:phone', protect, adminOnly, adminController.getUserByPhone);
router.get('/redemptions', protect, adminOnly, adminController.getRedemptions);
router.post('/redemptions/approve', protect, adminOnly, adminController.approveRedemption);
router.delete('/ads/remove', protect, adminOnly, adminController.removeAd);

module.exports = router;