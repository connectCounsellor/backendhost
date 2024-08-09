const express = require("express");

// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {registerController,loginController,checkLoginStatus, getUserDetails,forgotPassword,resetPassword} = require("../controllers/authController");



router.post('/api/register', registerController);
router.post('/api/login', loginController);
router.get('/api/check-login-status', checkLoginStatus);
router.get('/api/userdetails', getUserDetails);
router.post('/api/forgot-password',forgotPassword)
router.post('/api/reset-password', resetPassword);

module.exports = router;








