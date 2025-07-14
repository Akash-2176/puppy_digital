const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  adminName: { type: String },
  email: { type: String }
  // We removed redemptionList since it's in a separate collection
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);

// This schema defines the structure of the admin data in the MongoDB database.