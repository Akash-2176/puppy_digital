// Update src/routes/admin.js
const express = require('express');
const router = express.Router();

const { protect, adminOnly } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/users', protect, adminOnly, adminController.getAllUsers);
router.get('/user/:phone', protect, adminOnly, adminController.getUserByPhone);
router.get('/redemptions', protect, adminOnly, adminController.getPendingRedemptions);
router.post('/redemptions/:id/approve', protect, adminOnly, adminController.approveRedemption);

module.exports = router;