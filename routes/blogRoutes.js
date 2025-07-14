const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  getAllBlogsForAdmin,
  getBlogById
} = require('../controllers/blogController');

// Create
router.post('/create', upload.single('image'), createBlog);

// Read all
router.get('/all', getAllBlogs);

// Read single by slug
router.get('/:slug', getBlogBySlug);

// Update by ID
router.put('/:id', upload.single('image'), updateBlog);

// Delete by ID
router.delete('/:id', deleteBlog);

// For admin panel
router.get('/admin/all', getAllBlogsForAdmin); 

// Get single blog by ID
router.get('/getBlogById/:id', getBlogById) ;

module.exports = router;
