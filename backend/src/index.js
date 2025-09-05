const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());

// ✅ Keep JSON + urlencoded for normal API routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Add a "safety net" for when body comes as raw buffer but should be JSON
app.use((req, res, next) => {
  if (
    req.is('application/json') &&          // only for JSON requests
    Buffer.isBuffer(req.body)              // body is still a Buffer
  ) {
    try {
      req.body = JSON.parse(req.body.toString());
    } catch (err) {
      console.error('❌ JSON parse failed:', err.message);
      req.body = {};
    }
  }
  next();
});

// 🔥 Routes
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/ad', require('./routes/ad'));
app.use('/offers', require('./routes/offer'));
app.use('/coupon', require('./routes/coupon'));
app.use('/redemption', require('./routes/redemption'));
app.use('/store', require('./routes/store'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

app.get("/", (req, res) => res.send("Coupon Backend is Live 🚀"));

module.exports.handler = serverless(app, {
  binary: ['*/*']
});
