// routes/auth.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Handle Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    try {
      const user = req.user;
      // Generate JWT token
   const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '30d' } );
      // Redirect to frontend with the token
      res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
    } catch (error) {
      console.error('Error during Google login callback:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

module.exports = router;
