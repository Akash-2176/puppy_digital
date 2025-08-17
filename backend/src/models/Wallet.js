const mongoose = require('mongoose');

const WalletHistorySchema = new mongoose.Schema({
  transactionId: { type: String, required: true }, // Remove unique constraint
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  walletBalance: { type: Number, default: 0 },
  walletHistory: [WalletHistorySchema],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wallet', WalletSchema);