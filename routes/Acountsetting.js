// changePassword.js
const express = require('express');

const router = express.Router();


const {authenticateToken} = require('../middleware/authMiddleware');

const {changePassword} = require('../controllers/AccountSetting_controller');

router.post('/api/user/change-password',authenticateToken,changePassword);


module.exports = router;
