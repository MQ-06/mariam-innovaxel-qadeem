const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.post('/shorten', urlController.createShortUrl);
router.get('/shorten/:shortCode', urlController.getOriginalUrl);
router.put('/shorten/:shortCode', urlController.updateShortUrl);
router.delete('/shorten/:shortCode', urlController.deleteShortUrl);
router.get('/stats/:shortCode', urlController.getUrlStats);

module.exports = router;