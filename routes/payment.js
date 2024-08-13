const express = require("express");


const router = express.Router();
const { createOrder, verifyPayment, getkey } = require('../controllers/paymentController');
const { authenticateToken } = require("../middleware/authMiddleware");
// Create payment order
router.post('/api/create', authenticateToken,createOrder);

// Verify payment
router.post('/api/verify-payment', verifyPayment);

router.get('/api/getkey', getkey);
module.exports = router;