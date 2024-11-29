const express = require('express');
const TokenModel = require('../models/TokenModel'); // Assuming TokenModel is set up in models/Token.js

const router = express.Router();

// Endpoint to store the device token
router.post('/store-fcmToken', async (req, res) => {
  try {
    const { token } = req.body;

    console.log(token);
    console.log("after strigifying token  ")
    console.log(JSON.stringify(token));
    if (!token) {
      return res.status(400).json({ message: 'Token is required.' });
    }

    // Check if the token already exists
    const existingToken = await TokenModel.findOne({ token });
    if (existingToken) {
      return res.status(200).json({ message: 'Token already exists.' });
    }

    // Save the token to the database
    const newToken = new TokenModel({ token });
    await newToken.save();

    res.status(201).json({ message: 'Token stored successfully.' });
  } catch (error) {
    console.error('Error storing token:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Export the router
module.exports = router;
