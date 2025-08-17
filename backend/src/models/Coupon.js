const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  value: { // Changed from rate to value
    type: Number,
    required: true
  },
  redeemed: {
    type: Boolean,
    default: false
  },
  redeemedAt: {
    type: Date
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Coupon", CouponSchema);