// controllers/categoryController.js
const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    // console.log("sjbdjhbsjdbsdfdfsdfdsffsdfds456789");
    
    const { name } = req.body;
    // console.log(name,"ajsbdjbsjdbjsbdh");
    
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
