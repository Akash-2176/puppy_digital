const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  mediaUrl: { type: String, required: true },
  type: { type: String, enum: ['video', 'image'], required: true },
  title: { type: String },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', AdSchema);

// This schema defines the structure of the advertisement data in the MongoDB database.