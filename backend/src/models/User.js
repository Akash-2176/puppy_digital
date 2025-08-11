const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  authId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true },
  phone: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);

// This schema defines the structure of the user data in the MongoDB database.