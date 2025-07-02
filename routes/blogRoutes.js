const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog
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

module.exports = router;
