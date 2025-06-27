const mongoose = require('mongoose');

const ShortUrlSchema = new mongoose.Schema({
  url: String,
  shortcode: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiryAt: Date,
  clicks: [{ timestamp: Date, referrer: String, geo: String }]
});

module.exports = mongoose.model('ShortUrl', ShortUrlSchema);
