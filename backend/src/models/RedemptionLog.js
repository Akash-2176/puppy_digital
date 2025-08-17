const mongoose = require('mongoose');

const RedemptionLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
  amount: { type: Number, required: true }, // Confirm this is required
  status: { type: String, enum: ['pending', 'approved', 'rejected'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RedemptionLog', RedemptionLogSchema);