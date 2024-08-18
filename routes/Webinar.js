const express = require('express');
const { getWebinars ,postWebinar} = require('../controllers/WebinarController');
const router = express.Router();

router.get('/api/getwebinar',getWebinars);
router.post('/api/postwebinar',postWebinar);

module.exports = router;