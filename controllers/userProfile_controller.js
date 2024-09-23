// const UserProfile = require('../models/userProfileModel');
const userModel = require('../models/userModel');
const Enrollment = require('../models/Enrollment');
const Webinar = require('../models/Webinar');
const writeProfile = async (req, res) => {
  const id = req.user._id.toString();
  const { firstName, lastName, hobby, language,  DOB, Address, Gender} = req.body;

  try {
    let user = await userModel.findOneAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        hobby,
        language,
        DOB,
        Address,
        Gender,
      },
      { new: true } // This option returns the updated document
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};


const readProfile = async(req,res)=>{
  const  id  = req.user._id.toString();
  try {
    const user = await userModel.findById(id).select('-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
}

const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    // Assuming user is authenticated and userId is in req.user
    const courses = await Enrollment.find({ userId }).populate({
      path: 'courseId',  // This references the Course model
      select: 'image',   // Only fetch the 'image' field
    });
    res.status(200).json(courses);
    
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Error fetching enrolled courses', error: error.message });
  }
};

const getEnrolledWebinars=async(req, res )=>{
  try{
    const userId=req.user._id;
    
    const webinars=await Webinar.find({paidUsers:{ $in: [userId] }});
    res.status(200).json({webinars});
    
  }
  catch(err){
    res.status(500).json({ message:err});
  }
}
module.exports = {writeProfile,readProfile,getEnrolledCourses,getEnrolledWebinars};