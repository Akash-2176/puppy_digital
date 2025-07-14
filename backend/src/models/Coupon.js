const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  tier: { type: String, enum: ['H', 'M', 'L'], required: true },
  batch: { type: String, required: true },
  serial: { type: String, required: true },
  checksum: { type: String, required: true },
  value: { type: Number, required: true },
  isUsed: { type: Boolean, default: false },
  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  redeemedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', CouponSchema);


// This schema defines the structure of the coupon data in the MongoDB database.