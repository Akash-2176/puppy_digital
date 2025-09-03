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

exports.createStore = [
  upload.single('storeImgUrl'), // 'storeImgUrl' is the field name for the file
  async (req, res) => {
    try {
      let storeImgUrl = req.body.storeImgUrl;
      if (req.file) {
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: `${Date.now()}-${req.file.originalname}`,
          Body: req.file.buffer,
          ContentType: req.file.mimetype
          // Removed ACL: 'public-read' to avoid bucket ACL issues
        };
        const data = await s3.upload(params).promise();
        storeImgUrl = data.Location;
      } else if (!storeImgUrl) {
        return res.status(400).json({ message: 'storeImgUrl or file is required' });
      }

      const { storeName, address, phoneNo } = req.body;
      if (!storeName || !address || !phoneNo) {
        return res.status(400).json({ message: 'All fields (storeName, address, phoneNo) are required' });
      }

      const store = new Store({ storeImgUrl, storeName, address, phoneNo, isActive: true });
      await store.save();
      res.status(201).json({ message: 'Store created', store });
    } catch (err) {
      console.error('Error in createStore:', err.message);
      res.status(500).json({ error: err.message });
    }
  }
];

exports.editStore = async (req, res) => {
  try {
    const { storeId, storeImgUrl, storeName, address, phoneNo } = req.body;
    if (!storeId) return res.status(400).json({ message: 'storeId is required' });

    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    if (storeImgUrl) store.storeImgUrl = storeImgUrl;
    if (storeName) store.storeName = storeName;
    if (address) store.address = address;
    if (phoneNo) store.phoneNo = phoneNo;

    await store.save();
    res.json({ message: 'Store updated', store });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.listStores = async (req, res) => {
  try {
    console.log('Listing stores for user:', req.user.role);
    const stores = req.user.role === 'admin'
      ? await Store.find().lean()
      : await Store.find({ isActive: true }).lean();
    res.json(stores);
  } catch (err) {
    console.error('Error in listStores:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const { storeId } = req.body;
    if (!storeId) return res.status(400).json({ message: 'storeId is required' });

    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ message: 'Store not found' });

    store.isActive = false;
    await store.save();

    res.json({ message: 'Store deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};