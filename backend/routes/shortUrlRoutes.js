const express = require('express');
const ShortUrl = require('../models/ShortUrl');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/shorturls', async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  const code = shortcode || uuidv4().slice(0, 6);
  const expiry = new Date(Date.now() + validity * 60000);

  const exists = await ShortUrl.findOne({ shortcode: code });
  if (exists) return res.status(400).json({ error: "Shortcode already used" });

  const short = await ShortUrl.create({ url, shortcode: code, expiryAt: expiry });
  res.status(201).json({
    shortLink: `http://localhost:5000/shorturls/${code}`,
    expiry: expiry.toISOString()
  });
});

router.get('/shorturls/:code', async (req, res) => {
  const { code } = req.params;
  const data = await ShortUrl.findOne({ shortcode: code });

  if (!data) return res.status(404).json({ error: "Short URL not found" });
  if (Date.now() > new Date(data.expiryAt)) return res.status(410).json({ error: "URL expired" });

  data.clicks.push({ timestamp: new Date(), referrer: req.headers.referer || 'unknown', geo: 'N/A' });
  await data.save();

  res.redirect(data.url);
});

router.get('/shorturls/stats/:code', async (req, res) => {
  const { code } = req.params;
  const data = await ShortUrl.findOne({ shortcode: code });

  if (!data) return res.status(404).json({ error: "Short URL not found" });

  res.json({
    totalClicks: data.clicks.length,
    originalUrl: data.url,
    createdAt: data.createdAt,
    expiryAt: data.expiryAt,
    clicks: data.clicks
  });
});

module.exports = router;
