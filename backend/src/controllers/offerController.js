const Offer = require("../models/Offer");
const AWS = require('aws-sdk');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });


exports.createOffer = [
  upload.single('imageUrl'),
  async (req, res) => {
    try {
      let imageUrl = req.body.imageUrl;
      if (req.file) {
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `${Date.now()}-${req.file.originalname}`,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
          // ACL: 'public-read'
        };
        const data = await s3.upload(params).promise();
        imageUrl = data.Location;
      } else if (!imageUrl) {
        return res.status(400).json({ message: 'imageUrl or file is required' });
      }

      const { title, description, orbitCost } = req.body;
      if (!title || !description || !orbitCost) {
        return res.status(400).json({ message: 'title, description, and orbitCost are required' });
      }

      const offer = await Offer.create({ title, description, orbitCost, imageUrl, isActive: true });
      res.json({ message: "Offer created", offer });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
];

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