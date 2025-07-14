const mongoose = require('mongoose');

const RedemptionLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }, // optional
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  redeemedAt: { type: Date, default: Date.now },
  notes: { type: String }
});

module.exports = mongoose.model('RedemptionLog', RedemptionLogSchema);

// This schema defines the structure of the redemption log data in the MongoDB database.