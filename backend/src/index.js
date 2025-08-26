const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

// 🔧 Middleware Fixes
app.use(cors());
app.use(bodyParser.raw({ type: '*/*' })); // Capture all bodies as buffers
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && Buffer.isBuffer(req.body)) {
    try {
      req.body = JSON.parse(req.body.toString());
      console.log('✅ Manually parsed body:', req.body); // Log success
    } catch (e) {
      console.error('❌ Failed to parse raw body:', e.message); // Log error details
      req.body = {}; // Fallback to empty object if parsing fails
    }
  }
  next();
});
app.use(express.json()); // Keep as fallback, but it should rarely trigger
app.use(express.urlencoded({ extended: true })); // Handle URL-encoded bodies

// 🔥 Routes
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/ad', require('./routes/ad'));
app.use('/offers', require('./routes/offer'));
app.use('/coupon', require('./routes/coupon'));
app.use('/redemption', require('./routes/redemption'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

app.get("/", (req, res) => res.send("Coupon Backend is Live 🚀"));

module.exports.handler = serverless(app);