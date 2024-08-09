const mongoose = require ('mongoose');
const User = require('../models/userModel')

const userProfileSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
    },
    firstName :{
        type:String,
        
    },
    lastName:{
        type : String,
    },
    email : {
        type : String,
    },
    hobby : {
        type : String,
    },
    language:{
        type : String,
    },
    profilePic : {
        type :String,
    },
})

const UserProfile = new mongoose.model('Userprofile',userProfileSchema);

module.exports = UserProfile;