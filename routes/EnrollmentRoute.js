const express = require('express');
const router = express.Router();
const { createEnrollment, getEnrolledUsersByCourseId ,getAllUsers} = require('../controllers/EnrollmentController');  // Import the controller

// POST route to create a new enrollment
router.post('/api/course-enrollment', createEnrollment);

// GET route to fetch all enrolled users by course ID
// below routes are created for fetching data on admin panel 
router.get('/api/course/:courseId/enrolled', getEnrolledUsersByCourseId);
router.get('/api/course-enrollment', getEnrolledUsersByCourseId);
// router.get('/api/getallenrolledusers',getAllUsers)
// Export the router
module.exports = router;
