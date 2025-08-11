const User = require('../models/User');
const Wallet = require('../models/Wallet');
const RedemptionLog = require('../models/RedemptionLog');
// const { parse } = require('json2csv');
// const path = require('path');
// const fs = require('fs');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const walletMap = {};
    const wallets = await Wallet.find();
    wallets.forEach(w => {
      walletMap[w.userId.toString()] = w.walletBalance;
    });

    const userList = users.map(user => ({
      id: user._id,
      name: user.username || 'N/A',
      phone: user.phone,
      role: user.role || 'user',
      balance: walletMap[user._id.toString()] || 0
    }));

    return res.status(200).json(userList);

  } catch (err) {
    console.error('Error fetching users:', err);
    return res.status(500).json({ error: 'Failed to fetch user list' });
  }
};

exports.getUserByPhone = async (req, res) => {
  try {
    const phone = String(req.params.phone).trim();

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const wallet = await Wallet.findOne({ userId: user._id });

    return res.status(200).json({
      id: user._id,
      name: user.username || 'N/A',
      phone: user.phone,
      balance: wallet?.walletBalance || 0
    });

  } catch (err) {
    console.error('Search error:', err);
    return res.status(500).json({ error: 'Search failed' });
  }
};

exports.redeemUserWallet = async (req, res) => {
  try {
    const { userId, amount, reason } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({ error: '`userId` and `amount` are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    if (wallet.walletBalance < amount) {
      return res.status(400).json({ error: 'Insufficient wallet balance' });
    }

    // 💸 Deduct balance
    wallet.walletBalance -= amount;

    // 🧾 Add to walletHistory
    wallet.walletHistory.push({
      amount,
      source: 'manual',   // since admin is redeeming manually
      date: new Date()
    });

    wallet.lastUpdated = new Date();

    await wallet.save();

    // 🪪 Log redemption
    await RedemptionLog.create({
      userId,
      amount,
      redeemedAt: new Date(),
      reason: reason || 'Manual redemption'
    });

    return res.status(200).json({
      message: 'Wallet updated and redemption logged',
      remainingBalance: wallet.walletBalance
    });

  } catch (err) {
    console.error('💥 Manual redeem error:', err);
    return res.status(500).json({ error: 'Redemption failed due to server error' });
  }
};

// exports.generateCouponCodes = async (req, res) => {
//   try {
//     const { tier, count } = req.body;

//     if (!['H', 'M', 'L'].includes(tier)) return res.status(400).json({ error: 'Invalid tier' });
//     if (!count || count < 1) return res.status(400).json({ error: 'Invalid count' });

//     const coupons = await generateCoupons(tier, count);

//     const csv = parse(coupons.map(c => ({
//       Code: c.code,
//       Tier: c.tier,
//       Batch: c.batch,
//       Serial: c.serial,
//       Value: c.value
//     })));

//     const filePath = path.join(__dirname, '..', 'tmp', `coupons-${Date.now()}.csv`);
//     fs.writeFileSync(filePath, csv);

//     return res.download(filePath, () => {
//       fs.unlinkSync(filePath);
//     });

//   } catch (err) {
//     console.error('Coupon gen error:', err);
//     return res.status(500).json({ error: 'Generation failed' });
//   }
// };