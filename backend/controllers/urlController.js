const Url = require('../models/urlModel');
const { nanoid } = require('nanoid');

exports.createShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const shortCode = nanoid(6); 
    const newUrl = new Url({ url, shortCode });
    await newUrl.save();

    res.status(201).json({
      id: newUrl._id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    urlDoc.accessCount += 1;
    urlDoc.updatedAt = new Date();
    await urlDoc.save();

    res.status(200).json({
      id: urlDoc._id,
      url: urlDoc.url,
      shortCode: urlDoc.shortCode,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const urlDoc = await Url.findOneAndUpdate(
      { shortCode },
      { url, updatedAt: new Date() },
      { new: true }
    );

    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.status(200).json({
      id: urlDoc._id,
      url: urlDoc.url,
      shortCode: urlDoc.shortCode,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteShortUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOneAndDelete({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUrlStats = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    res.status(200).json({
      id: urlDoc._id,
      url: urlDoc.url,
      shortCode: urlDoc.shortCode,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt,
      accessCount: urlDoc.accessCount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};