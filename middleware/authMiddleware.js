// middleware/authenticate.js

const jwt = require('jsonwebtoken');
const userModel  = require('../models/userModel'); // Adjust path as per your project structure
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token missing' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    // const user = await userModel.findById(decoded.id);
    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken,
};
