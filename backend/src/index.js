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
app.use(bodyParser.raw({ type: '*/*' }));
app.use((req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method) && Buffer.isBuffer(req.body)) {
    try {
      req.body = JSON.parse(req.body.toString());
      console.log('✅ Manually parsed body:', req.body);
    } catch (e) {
      console.error('❌ Failed to parse raw body');
    }
  }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 Routes
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.get("/", (req, res) => res.send("Coupon Backend is Live"));

module.exports.handler = serverless(app);
