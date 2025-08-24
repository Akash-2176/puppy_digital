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

exports.getCarouselPoster = async (req, res) => {
  try {
    const imageAds = await Ad.find({ type: 'image', isActive: true }).lean();
    const limit = Math.min(5, imageAds.length);
    const shuffled = imageAds.sort(() => 0.5 - Math.random());
    const randomImages = shuffled.slice(0, limit);
    res.json(randomImages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdForRedeem = async (req, res) => {
  try {
    const videoAds = await Ad.find({ type: 'video', isActive: true }).lean();
    if (videoAds.length === 0) return res.status(404).json({ message: 'No active video ads available' });
    const randomVideo = videoAds[Math.floor(Math.random() * videoAds.length)];
    res.json(randomVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};