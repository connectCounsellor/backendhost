// changePassword.js
const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
const router = express.Router();


const {authenticateToken} = require('../middleware/authMiddleware');

const {changePassword} = require('../controllers/AccountSetting_controller');

router.post('/api/user/change-password',authenticateToken,changePassword);

// router.post('/api/user/change-password', async (req, res) => {
//   const { currentPassword, newPassword, confirmNewPassword } = req.body;

//   const token = req.headers.authorization.split(' ')[1];
//     // console.log(token)
//   try {
//     // Verify token and decode user ID
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(decoded)
//     // Fetch user from database
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if current password matches stored password
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Current password is incorrect' });
//     }

//     // Check if new passwords match
//     if (newPassword !== confirmNewPassword) {
//       return res.status(400).json({ message: 'New passwords do not match' });
//     }

//     // Hash new password and update user record
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(newPassword, salt);

//     user.password = hashPassword;
//     await user.save();
//     res.status(200).json({ message: 'Password changed successfully' });
//   } catch (error) {
//     console.error('Error changing password:', error);
//     res.status(500).json({ message: 'Server error' });
//   }

// });

module.exports = router;
