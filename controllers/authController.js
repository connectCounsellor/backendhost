const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sendMail = require("../Util/mailer");
const crypto = require("crypto");
const {
  saveOTPToStorage,
  getStoredData,
  deleteStoredOTP,
} = require("../Util/Store");
// Register new user
const registerController = async (req, res) => {
  const { username, phone, email, password } = req.body;

  try {
    // Hash the OTP
    const otp = generateOTP();
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    // Store OTP temporarily
    saveOTPToStorage(email, hashedOTP, 600000); // Store for 10 minutes

    // Send OTP email
    const message = `You are receiving this because you registered on Connect Counsellor. \n\n
      Please use the following OTP to verify your account:\n\n
      ${otp}\n\n
      If you did not request this, please ignore this email.\n`;

    await sendMail(email, "Account verification OTP", message);
    res
      .status(200)
      .json({ message: "An email has been sent for verification." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

//for login

const loginController = async (req, res) => {
  const { emailorphone, password } = req.body;

  try {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailorphone);
    const isPhone = /^\d{10}$/.test(emailorphone);

    let user;
    if (isEmail) {
      user = await userModel.findOne({ email: emailorphone });
    } else if (isPhone) {
      user = await userModel.findOne({ phone: emailorphone });
    } else {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
    // console.log("current user :"+ JSON.stringify(user))
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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
      return res.status(400).json({ error: "something went wrong" });
    }

    const otp = generateOTP();
    user.resetPasswordOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 600000; // 10 minutes

    await user.save();

    const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please use the following OTP to reset your password:\n\n
      ${otp}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`;

    try {
      await sendMail(user.email, "Password Reset OTP", message);
      res
        .status(200)
        .json({
          message:
            "An email has been sent to " +
            user.email +
            " with further instructions.",
        });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Error sending the email. Please try again later." });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  try {
    const user = await userModel.findOne({
      email,
      resetPasswordOTP: hashedOTP,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;
  const storedData = getStoredData(email);
  const existingUser=await userModel.findOne({email});
  if(existingUser){
    return res.status(400).json({ message: "User already exists" });
  }
 else if (!storedData) {
      return res.status(400).json({ message: "OTP has expired or not found." });
  }

  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

  // Check if the OTP matches
  if (hashedOTP === storedData.otp && Date.now() < storedData.expiresAt) {
      // Save user data to the database
      const { username, phone, password } = req.body; // Assuming you pass these from the frontend
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

      deleteStoredOTP(email); // Delete OTP after successful verification
      return res.status(200).json({ message: "User registered successfully." });
  } else {
      return res.status(400).json({ message: "Invalid or expired OTP." });
  }
};


module.exports = {
  registerController,
  loginController,
  getUserDetails,
  forgotPassword,
  resetPassword,
  verifyOtpController,
};
