const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordOTP: String,
    resetPasswordExpires: Date,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
