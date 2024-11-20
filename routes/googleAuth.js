// routes/auth.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const usermodel = require('../models/userModel');
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

router.post('/sign-in-google-app',async (req, res) => {
  const {given_name,family_name,email_verified,email} =req.body;
  try{
    if(!email_verified) {
      return res.status(400).json({ message: 'Email is not verified' });
    }
    const user =usermodel.findOne({ email: email});
    if(user){
      const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '30d' } );
    return  es.status(200).json({ message: "Login successful", token });
    }
  
    const new_user = await usermodel.create({
      email: email,
      firstName: given_name,
      lastName: family_name,
  
    })
  
    
   const token = jwt.sign({ id: new_user._id },process.env.JWT_SECRET, { expiresIn: '30d' } );
      res.status(200).json({ message: "Login successful", token });
  
  }
  catch(err){
    res.status(500).json({ message: err.message});

  }

  
})






module.exports = router;
