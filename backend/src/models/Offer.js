const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    orbitCost: { type: Number, required: true },
    imageUrl: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Offer', OfferSchema);

// This schema defines the structure of the offer data in the MongoDB database.S