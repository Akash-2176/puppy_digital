const Offer = require("../models/Offer");
const Coupon = require("../models/Coupon");
const Ad = require("../models/Ad");
const RedemptionLog = require("../models/RedemptionLog");
const User = require("../models/User");

exports.createOffer = async (req, res) => {
  try {
    const { title, description, cost } = req.body;
    const offer = await Offer.create({ title, description, cost });
    res.json({ message: "Offer created", offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPendingRedemptions = async (req, res) => {
  try {
    const redemptions = await RedemptionLog.find({ status: 'pending' })
      .populate('userId')
      .populate('offerId');
    res.json(redemptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveRedemption = async (req, res) => {
  try {
    const { redemptionId } = req.body;
    const redemption = await RedemptionLog.findById(redemptionId);
    if (!redemption) return res.status(404).json({ message: 'Redemption not found' });

    redemption.status = 'approved';
    await redemption.save();

    res.json({ message: 'Redemption approved', redemption });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('walletId');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    const user = await User.findOne({ phone }).populate('walletId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};