const Ad = require('../models/Ad');

exports.createAd = async (req, res) => {
  try {
    const { mediaUrl, type, title, description } = req.body;
    const ad = new Ad({ 
      mediaUrl, 
      type, 
      title, 
      description,
      uploadedBy: req.user ? req.user.authId : null // Use authId if available
    });
    await ad.save();
    res.status(201).json(ad);
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