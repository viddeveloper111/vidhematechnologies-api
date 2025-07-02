// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories } = require('../controllers/categoryController');

router.post('/create', createCategory);
router.get('/all', getAllCategories);

module.exports = router;
