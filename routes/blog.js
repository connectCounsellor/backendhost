const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middleware/authMiddleware');


const {writeBlog,getAllBlogs,getBlogById,deleteBlog} = require('../controllers/blog_controller')

// Route to create a new blog entry
router.post('/api/blog/write', authenticateToken, writeBlog);

// Sample route to verify the setup
router.get('/api/blog/read', getAllBlogs);
router.get('/api/blog/read/:id', getBlogById);
router.delete('/api/blog/delete/:id', deleteBlog);








module.exports = router;
