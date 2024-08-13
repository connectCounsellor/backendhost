
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const sendMail = require('../Util/mailer');
const crypto = require('crypto');
// Register new user
const registerController = async function (req, res) {

    const { username, phone, email, password } = req.body;

    try {
        // Check if user already exists
        let useremail = await userModel.findOne({ email });
        let userphone = await userModel.findOne({ phone });
        if (useremail && userphone) {
            return res.status(400).json({ message: "User already exists" });
        }



        bcrypt.genSalt(10, async function (err, salt) {
            await bcrypt.hash(password, salt, async function (err, hash) {
                user = await userModel.create({
                    username,
                    phone,
                    email,
                    password: hash,
                });
            });
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

//for login 

const loginController = async (req, res) => {
    const { emailorphone, password } = req.body;

    try {
        console.log(process.env.JWT_SECRET);

        // Determine if emailorphone is an email or phone
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailorphone);
        const isPhone = /^\d{10}$/.test(emailorphone); // Adjust this regex based on your phone format

        let user;
        if (isEmail) {
            user = await userModel.findOne({ email: emailorphone });
        } else if (isPhone) {
            user = await userModel.findOne({ phone: emailorphone });
        } else {
            return res.status(400).json({ message: 'invalid credentials' });
        }

        //redundant code below 
        // if (!user) {
        //     return res.status(400).json({ message: 'User not found' });
        // }
      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
       
        res.status(200).json({ message: 'Login successful', token });

    
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};







  const getUserDetails = async (req, res) => {
    try {
        
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
        // console.log("current user :"+ JSON.stringify(user))
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  };

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'something went wrong' });
    }

    const otp = generateOTP();
    user.resetPasswordOTP = crypto.createHash('sha256').update(otp).digest('hex');
    user.resetPasswordExpires = Date.now() + 600000; // 10 minutes

    await user.save();

    const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please use the following OTP to reset your password:\n\n
      ${otp}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`;

    try {
      await sendMail(user.email, 'Password Reset OTP', message);
      res.status(200).json({ message: 'An email has been sent to ' + user.email + ' with further instructions.' });
    } catch (err) {
      res.status(500).json({ error: 'Error sending the email. Please try again later.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
};

  const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
  
    try {
      const user = await userModel.findOne({
        email,
        resetPasswordOTP: hashedOTP,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired OTP.' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
  
      user.password = hash;
      user.resetPasswordOTP = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
  };


module.exports = { registerController, loginController ,getUserDetails,forgotPassword, resetPassword};