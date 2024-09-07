const express = require('express');
const router = express.Router();
// const UserProfile = require('../models/userProfileModel');

const {authenticateToken} = require('../middleware/authMiddleware');

const {writeProfile,readProfile} = require('../controllers/userProfile_controller');



router.post('/api/user/profile/write', authenticateToken,writeProfile);
router.get('/api/user/profile/read',authenticateToken,readProfile);


module.exports = router;
