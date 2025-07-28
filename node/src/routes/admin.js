const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

router.get('/dashboard', auth, isAdmin, (req, res) => {
  res.json({ message: 'Chào mừng Admin!' });
});

module.exports = router;