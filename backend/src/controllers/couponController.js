const Coupon = require('../models/Coupon');
const Wallet = require('../models/Wallet');
const generateCoupons = require('../utils/couponGenerator'); // Adjust path

exports.createCoupon = async (req, res) => {
  try {
    const { tierKey, count } = req.body;
    if (!tierKey || !count) {
      return res.status(400).json({ error: 'tierKey and count are required' });
    }
    const coupons = await generateCoupons(tierKey, parseInt(count));
    res.status(201).json({ message: 'Coupons generated', coupons });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.redeemCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code, redeemed: false });
    if (!coupon) return res.status(400).json({ message: 'Invalid or already redeemed coupon' });

    const wallet = await Wallet.findOne({ userId: req.user.userId });
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    wallet.walletBalance += coupon.value; // Use value to match schema
    await wallet.save();

    coupon.redeemed = true;
    coupon.redeemedAt = new Date();
    coupon.userId = req.user.userId;
    await coupon.save();

    res.json({ message: 'Coupon redeemed successfully', balance: wallet.walletBalance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAliveCoupons = async (req, res) => {
  try {
    const aliveCoupons = await Coupon.find({ redeemed: false }).lean();
    res.json(aliveCoupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.checkCouponValidity = async (req, res) => {
  try {
    const { code } = req.body; // Kept as req.body for POST
    if (!code) return res.status(400).json({ message: "code is required" });

    const coupon = await Coupon.findOne({ code }).lean();
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    if (coupon.redeemed) return res.json({ valid: false, message: "Coupon already redeemed" });

    res.json({ valid: true, message: "Coupon is valid", coupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};