const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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

    firstName :{
        type:String,
        default: "",
        
    },
    lastName:{
        type : String,
        default: "",
    },
      hobby : {
        type : String,
        default: "",
    },
    language:{
        type : String,
    },
    Gender:{
        type : String,
      enum: ["Male", "Female", "Other"],
       
        default: "Other",
    },
    DOB:{
        type : Date,
        default: "",
    },

Address:{
    type:String,
}

});

const User = mongoose.model("User", userSchema);
module.exports = User;
