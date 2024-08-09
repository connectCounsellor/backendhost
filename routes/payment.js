const express = require("express");

// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const { createOrder, verifyPayment, getkey } = require('../controllers/paymentController');
// Create payment order
router.post('/api/create', createOrder);

// Verify payment
router.post('/api/verify-payment', verifyPayment);

router.get('/api/getkey', getkey);
module.exports = router;