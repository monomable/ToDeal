// routes/protected.js
const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');

router.get('/profile', verifyJWT, (req, res) => {
  res.json({
    message: 'Welcome!',
    user: req.user, // JWT payload 그대로 확인 가능
  });
});

module.exports = router;
