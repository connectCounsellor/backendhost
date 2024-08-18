// const UserProfile = require('../models/userProfileModel');
const userModel = require('../models/userModel');


const writeProfile = async (req, res) => {
  const id = req.user._id.toString();
  const { firstName, lastName, hobby, language,  DOB, Address, Gender} = req.body;
console.log('Writing', id, firstName, lastName,hobby, language, DOB, Address, Gender);
  try {
    const user = await userModel.findOneAndUpdate(
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

module.exports = {writeProfile,readProfile};