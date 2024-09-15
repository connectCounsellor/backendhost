const mongoose = require('mongoose');

const coursesSchema =mongoose.Schema({
    name: String,
    image :String,
    shortdescription: String,
    description: String,
    content:[String],
    category:   String,
    price:{
        type: Number,
        default: 0,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    youtubeLink:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required: true,
    }
    
});

const Course = mongoose.model('Course', coursesSchema);
module.exports = Course;