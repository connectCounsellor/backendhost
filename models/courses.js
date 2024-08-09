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
        default: 1200,
    }
    
});

const Course = mongoose.model('Course', coursesSchema);
module.exports = Course;