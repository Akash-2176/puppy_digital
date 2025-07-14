const Wallet = require('../models/Wallet');
const Coupon = require('../models/Coupon');

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.status(200).json({ wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// This code defines a controller function to get the user's wallet information, including balance and transaction history.

exports.redeemCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id; // comes from JWT middleware

    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(404).json({ msg: 'Coupon not found' });
    if (coupon.isUsed) return res.status(400).json({ msg: 'Coupon already used' });

    // mark coupon
    coupon.isUsed = true;
    coupon.usedBy = userId;
    coupon.redeemedAt = new Date();
    await coupon.save();

    // update wallet
    const wallet = await Wallet.findOne({ userId });
    wallet.walletBalance += coupon.value;
    wallet.walletHistory.push({
      type: 'coupon',
      amount: coupon.value,
      at: new Date()
    });
    wallet.lastUpdated = new Date();
    await wallet.save();

    res.json({ wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
