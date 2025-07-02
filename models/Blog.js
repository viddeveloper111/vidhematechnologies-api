const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

blogSchema.pre('save', function (next) {
  if (!this.isModified('title')) return next();
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
  this.slug = slugify(`${this.title}-${timestamp}`, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
