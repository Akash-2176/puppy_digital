const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  storeImgUrl: { type: String, required: true },
  storeName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNo: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Store', StoreSchema);