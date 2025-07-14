const Blog = require('../models/Blog');
const cloudinary = require('../middleware/cloudinary'); // adjust path if needed
const fs = require('fs');

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    console.log("File upload request received");
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded.' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'blogs'
    });
// console.log(result,"resultresultresultresult");

    const newBlog = new Blog({
      image: result.secure_url,
      category: req.body.category,
      title: req.body.title,
      description: req.body.description,
      author: req.body.author
    });

    await newBlog.save();

    // Delete local file after successful upload
    fs.unlinkSync(req.file.path);

    res.status(201).json({ success: true, data: newBlog });
  } catch (err) {
    console.error('Error in createBlog:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blog = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Blog by Slug
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    // If a new image is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'blogs'
      });
      fs.unlinkSync(req.file.path);
      blog.image = result.secure_url;
    }

    blog.title = req.body.title || blog.title;
    blog.category = req.body.category || blog.category;
    blog.description = req.body.description || blog.description;
    blog.author = req.body.author || blog.author;

    await blog.save();
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Blogs (split into featured + others)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    const featured = blogs.find(blog => blog.isFeatured === true);
    const others = blogs.filter(blog => blog.isFeatured !== true);
    res.status(200).json({ success: true, featured, blogs: others });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Blogs (for Admin Panel - no filtering)
exports.getAllBlogsForAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get Single Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    console.error('Error in getBlogById:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
