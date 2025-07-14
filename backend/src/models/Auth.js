const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Auth', AuthSchema);

// This schema defines the structure of the authentication data in the MongoDB database.