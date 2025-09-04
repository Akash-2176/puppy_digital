const Ad = require('../models/Ad');
const AWS = require('aws-sdk');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

exports.createAd = [
  upload.single('mediaUrl'),
  async (req, res) => {
    try {
      let mediaUrl = req.body.mediaUrl;

      // Check if mediaUrl is a file or a URL
      if (req.file) {
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `${Date.now()}-${req.file.originalname}`,
          Body: req.file.buffer,
          ContentType: req.file.mimetype
        };
        const data = await s3.upload(params).promise();
        mediaUrl = data.Location;
      } else if (typeof mediaUrl === 'string' && mediaUrl.startsWith('http')) {
        // Validate it's a URL (basic check for http/https)
        mediaUrl = mediaUrl.trim();
      } else if (!mediaUrl) {
        return res.status(400).json({ message: 'mediaUrl or file is required' });
      } else {
        return res.status(400).json({ message: 'mediaUrl must be a valid URL or file' });
      }

      const { type, title, description } = req.body;
      if (!type || !title || !description) {
        return res.status(400).json({ message: 'type, title, and description are required' });
      }

      const ad = new Ad({ 
        mediaUrl, 
        type, 
        title, 
        description,
        uploadedBy: req.user ? req.user.authId : null
      });
      await ad.save();
      res.status(201).json(ad);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];

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


exports.softDeleteAd = async (req, res) => {
  try {

    const { adId } = req.body;
    if (!adId) return res.status(400).json({ message: "adId is required" });

    const ad = await Ad.findById(adId);
    if (!ad) return res.status(404).json({ message: "Ad not found" });

    ad.isActive = false;
    await ad.save();

    res.json({ message: "Ad soft deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};