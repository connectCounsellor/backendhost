const blogModel = require('../models/blog');

// Route to create a new blog entry
const writeBlog = async (req, res) => {
    try {
        const blog = await blogModel.create({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author,
            image: req.body.image,
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Route to get all blog entries
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Route to get a single blog entry by ID
const getBlogById = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogModel.findOne({ _id: id });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Route to delete a blog entry by ID
const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogModel.deleteOne({ _id: id });
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { writeBlog, getAllBlogs, getBlogById, deleteBlog };
