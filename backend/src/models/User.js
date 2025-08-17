const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true },
  phone: { type: String, required: true, unique: true }, // Primary identifier for registration
  username: { type: String, required: true }, // Make name required as per your request
  email: { type: String }, // Make email optional
  walletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);

// This schema defines the structure of the user data in the MongoDB database.