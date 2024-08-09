const express = require('express');
const router = express.Router();
// const UserProfile = require('../models/userProfileModel');

const {authenticateToken} = require('../middleware/authMiddleware');

const {writeProfile,readProfile} = require('../controllers/userProfile_controller');



router.post('/api/user/profile/write/:id', authenticateToken,writeProfile);
router.get('/api/user/profile/read/:id',authenticateToken,readProfile);

// Route for updating profile and creating new user if not exists
// router.post('/api/user/profile/write/:id', async (req, res) => {
//   const { id } = req.params;
//   const { firstName, lastName, email, hobby, language, profilePic } = req.body;

//   try {
//     let user = await UserProfile.findById(id);

//     if (user) {
//       // Update the existing user profile
//       user.firstName = firstName;
//       user.lastName = lastName;
//       user.email = email;
//       user.hobby = hobby;
//       user.language = language;
//       user.profilePic = profilePic;
//       await user.save();
//     } else {
//       // Create a new user profile
//       user = new UserProfile({
//         _id: id,
//         firstName,
//         lastName,
//         email,
//         hobby,
//         language,
//         profilePic,
//       });
//       await user.save();
//     }

//     res.status(200).json(user)
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating profile', error });
//   }
// });

// // Route to fetch user profile by ID
// router.get('/api/user/profile/read/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await UserProfile.findById(id);
//     if (user) {
//       res.status(200).json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user profile', error });
//   }
// });

module.exports = router;
