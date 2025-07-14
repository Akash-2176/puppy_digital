const crypto = require('crypto');
const Coupon = require('../models/Coupon');

const SECRET_SALT = process.env.COUPON_SECRET;
if (!SECRET_SALT) throw new Error('Missing COUPON_SECRET in environment');


const tierConfig = {
  L: { name: 'low', min: 1, max: 10 },
  M: { name: 'mid', min: 11, max: 20 },
  H: { name: 'high', min: 21, max: 30 },
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateChecksum(base) {
  return crypto.createHmac('sha256', SECRET_SALT).update(base).digest('hex').substring(0, 4).toUpperCase();
}

async function getNextBatch(tier) {
  const latest = await Coupon.findOne({ tier: tierConfig[tier].name })
    .sort({ createdAt: -1 })
    .limit(1);
  const lastBatchNum = latest?.batch?.match(/\d+$/)?.[0] || 0;
  return `${tier}${parseInt(lastBatchNum) + 1}`;
}

async function generateCoupons(tierKey, count) {
  const tier = tierConfig[tierKey];
  if (!tier) throw new Error('Invalid tier');

  const batch = await getNextBatch(tierKey);
  const coupons = [];

  let serial = 1;
  while (coupons.length < count) {
    const serialStr = serial.toString().padStart(4, '0');
    const base = `${tierKey}-${batch}-${serialStr}`;
    const checksum = generateChecksum(base);
    const code = `${base}-${checksum}`;
    const value = getRandom(tier.min, tier.max);

    const exists = await Coupon.exists({ code });
    if (!exists) {
      coupons.push({ code, tier: tier.name, batch, serial, value });
    }
    serial++;
  }

  await Coupon.insertMany(coupons);
  return coupons;
}

module.exports = generateCoupons;

// This module provides functionality to generate unique coupon codes based on specified tiers and a secret salt.