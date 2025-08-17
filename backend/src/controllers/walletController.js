const Wallet = require("../models/Wallet");

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    if (!wallet) return res.status(404).json({ msg: "Wallet not found" });
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addBalance = async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    wallet.walletBalance += amount;
    await wallet.save();
    res.json({ msg: "Balance added", wallet });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};