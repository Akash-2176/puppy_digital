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


exports.softDeleteOffer = async (req, res) => {
  try {
    console.log('Received body:', req.body); // Debug log
    const { offerId } = req.body;
    if (!offerId) return res.status(400).json({ message: "offerId is required" });

    const offer = await Offer.findById(offerId);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    offer.isActive = false;
    await offer.save();

    res.json({ message: "Offer soft deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};