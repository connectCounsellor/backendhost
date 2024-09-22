const express = require('express');
const router = express.Router();
// const UserProfile = require('../models/userProfileModel');
const {getEnrolledCourses,getEnrolledWebinars} = require('../controllers/userProfile_controller');
const {authenticateToken} = require('../middleware/authMiddleware');

const {writeProfile,readProfile} = require('../controllers/userProfile_controller');



router.post('/api/user/profile/write', authenticateToken,writeProfile);
router.get('/api/user/profile/read',authenticateToken,readProfile);
router.get('/api/enrolled/courses',authenticateToken,getEnrolledCourses);
router.get('/api/enrolled/webinars',authenticateToken,getEnrolledWebinars);

module.exports = router;
