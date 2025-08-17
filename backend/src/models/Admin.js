const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  adminName: { type: String, required: true },
  email: { type: String, unique: true },
  role: { type: String, enum: ['superadmin', 'moderator'], default: 'moderator' }
}, { timestamps: true });


module.exports = mongoose.model('Admin', AdminSchema);

// This schema defines the structure of the admin data in the MongoDB database.