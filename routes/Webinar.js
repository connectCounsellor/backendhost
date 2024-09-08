const express = require('express');
const { getWebinars ,postWebinar, getWebinarById, deleteWebinarById, updateWebinarById} = require('../controllers/WebinarController');
const {authenticateToken} = require('../middleware/authMiddleware');
const {confirmPayment,checkEnrollmentStatus} = require('../controllers/Web_enrollmentController');
const router = express.Router();

router.get('/api/getwebinar',getWebinars);
router.post('/api/postwebinar',authenticateToken,postWebinar);
router.get('/api/getwebinars/:id',authenticateToken,getWebinarById)
router.post('/api/confirmpayment', authenticateToken, confirmPayment);
router.post('/api/checkEnrollmentStatus', authenticateToken, checkEnrollmentStatus);
router.delete('/api/webinar/delete/:webinar_id',authenticateToken,deleteWebinarById)
router.put('/api/webinars/update/:id',authenticateToken,updateWebinarById)
//for enrollment and payment checks
module.exports = router;