const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  }
});




const Blog = new mongoose.model("Blog", blogSchema);

module.exports = Blog ;
