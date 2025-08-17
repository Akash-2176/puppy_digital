const Offer = require("../models/Offer");
const Wallet = require("../models/Wallet");
const Redemption = require("../models/RedemptionLog");

exports.createOffer = async (req, res) => {
  try {
    const { title, description, orbitCost, imageUrl } = req.body;
    const offer = await Offer.create({ title, description, orbitCost, imageUrl, isActive: true});
    res.json({ message: "Offer created", offer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.redeemOffer = async (req, res) => {
  try {
    const { offerId } = req.body;

    const offer = await Offer.findById(offerId);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet || wallet.walletBalance < offer.cost) {
      return res.status(400).json({ message: "Insufficient orbits" });
    }

    wallet.walletBalance -= offer.cost;
    await wallet.save();

    const redemption = await Redemption.create({
      userId: req.user.id,
      offerId: offer._id,
      status: "pending",
    });

    res.json({ message: "Offer redeemed, waiting for admin approval", redemption });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};