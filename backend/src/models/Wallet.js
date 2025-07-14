const mongoose = require('mongoose');

const WalletHistorySchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  source: { type: String, enum: ['coupon', 'manual', 'promo'], required: true },
  couponCode: { type: String },
  date: { type: Date, default: Date.now }
}, { _id: false });

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  walletBalance: { type: Number, default: 0 },
  walletHistory: [WalletHistorySchema],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wallet', WalletSchema);

// This schema defines the structure of the wallet data in the MongoDB database.