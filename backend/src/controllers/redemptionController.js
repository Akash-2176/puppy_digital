const RedemptionLog = require("../models/RedemptionLog");
const Offer = require("../models/Offer");
const Wallet = require("../models/Wallet");

exports.redeemOffer = async (req, res) => {
  try {
    console.log('req.user:', req.user);
    const { offerId } = req.body;
    const offer = await Offer.findById(offerId);
    console.log('Found offer:', offer);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    console.log('Searching wallet for userId:', req.user.userId, 'type:', typeof req.user.userId);
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    console.log('Found wallet:', wallet);
    if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

    const cost = Number(offer.orbitCost) || 0; // Use orbitCost
    console.log('Wallet balance:', wallet.walletBalance, 'Offer cost:', cost);
    if (wallet.walletBalance < cost) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    wallet.walletBalance -= cost;
    await wallet.save();

    const redemption = new RedemptionLog({
      userId: req.user.userId,
      offerId: offer._id,
      status: 'pending',
      amount: cost // Ensure this line is present
    });
    await redemption.save();

    res.json({ message: 'Redemption request submitted', redemption });
  } catch (err) {
    console.error('Redemption error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllRedemptions = async (req, res) => {
  try {
    const redemptions = await RedemptionLog.find({ userId: req.user.userId }).populate("userId offerId");
    res.json(redemptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};