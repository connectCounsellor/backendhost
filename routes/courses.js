const express = require('express');
const router = express.Router();
// const {authenticateToken} = require('../middleware/authMiddleware');
const { writeCourse, readCourse, readcourseById, deleteCourse, updateCourse } = require('../controllers/courses_controller');


router.post('/api/courses/write',  writeCourse);

router.get('/api/courses/read', readCourse);

router.get('/api/courses/read/:id',  readcourseById);


router.delete('/api/courses/delete/:courseId', deleteCourse);

router.put('/api/courses/update/:courseId',updateCourse)

module.exports = router;
