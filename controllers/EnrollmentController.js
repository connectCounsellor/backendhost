const mongoose = require('mongoose');

const Enrollment = require('../models/Enrollment');  // Import the Enrollment model
const User = require('../models/userModel');  // Import the User model (make sure you have a User model)

// Create a new enrollment
const createEnrollment = async (req, res) => {
    try {
      // Log the incoming request body
      console.log('Received enrollment data:', req.body);
  
      // Destructure the incoming data
      const { userId, courseId, courseName, payment, enrollmentDate, receiptId } = req.body;
  
      // Validate incoming data
      if (!userId || !courseId || !courseName || !payment || !enrollmentDate || !receiptId) {
        console.error('Validation error: Missing required fields');
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create a new enrollment record
      const newEnrollment = await Enrollment.create({
        userId,
        courseId,
        courseName,
        payment,
        enrollmentDate,
        receiptId,
      });
  
      // Log the created enrollment
      console.log('New enrollment created:', newEnrollment);
  
      // Send a 201 status and the new enrollment record
      res.status(201).json(newEnrollment);
    } catch (error) {
      // Log the error details
      console.error('Error creating enrollment:', error);
  
      // Send a 500 status in case of error
      res.status(500).json({ message: 'Error creating enrollment', error: error.message });
    }
  };
  

// Fetch all users enrolled in a specific course by course ID
const getEnrolledUsersByCourseId = async (req, res) => {
  // const { courseId } = req.params;
  const { courseId } = req.body;

  try {
      if (!mongoose.isValidObjectId(courseId)) {
    return res.status(400).json({ message: 'Invalid Course ID format.' }); // Bad Request if courseId is not a valid ObjectId
  }
    // Find enrollments by courseId and populate user details
    const enrollments = await Enrollment.find({ courseId })
      .populate('userId', 'username email')  // Specify fields to return from the User model
      .exec();

    // Check if any enrollments were found
    if (enrollments.length === 0) {
      return res.status(404).json({ message: 'No enrollments found for this course.' });
    }

    res.status(200).json(enrollments);  // Send the enrollments with populated user details
  } catch (error) {
    console.error('Error fetching enrolled users:', error);
    res.status(500).json({ message: 'Error fetching enrolled users' });  // Send a 500 status in case of error
  }
};



const getAllEnrolledUsers= async (req,res) => {
    try {
        
        const users= await Enrollment.find().populate('userId', 'firstName email')


        res.status(200).json(users);
        console.log(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
  
  createEnrollment,
  getEnrolledUsersByCourseId,
  getAllEnrolledUsers  // Export the new function
};
