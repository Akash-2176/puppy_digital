const express = require('express');
const router = express.Router();
const { createStore, editStore, listStores, deleteStore } = require('../controllers/storeController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/store', protect, createStore);
router.put('/store', protect, editStore);
router.get('/store', protect, listStores);
router.delete('/store', protect, deleteStore); 

module.exports = router;