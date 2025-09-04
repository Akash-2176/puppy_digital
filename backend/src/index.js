const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
// ⛔️ REMOVE bodyParser.raw({ type: '*/*' })
// ⛔️ REMOVE the manual Buffer → JSON.parse hack
// ✅ Keep normal JSON + urlencoded for API payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
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
  binary: ['*/*']   // tell serverless-http to handle binary
});
