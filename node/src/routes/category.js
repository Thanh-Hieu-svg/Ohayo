const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Product = require('../models/Product');

// Lấy tất cả danh mục
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error('Lỗi khi lấy danh mục:', err);
    res.status(500).json({ error: 'Lỗi lấy danh mục' });
  }
});

// Thêm danh mục mới
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Tên không được trống' });
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error('Lỗi khi thêm danh mục:', err);
    res.status(500).json({ error: 'Lỗi thêm danh mục', details: err.message });
  }
});

// Sửa danh mục
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!category) return res.status(404).json({ error: 'Không tìm thấy danh mục' });
    res.json(category);
  } catch (err) {
    console.error('Lỗi khi sửa danh mục:', err);
    res.status(500).json({ error: 'Lỗi sửa danh mục' });
  }
});

// Xóa danh mục
router.delete('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ error: 'ID danh mục không hợp lệ.' });
    }
    const productCount = await Product.countDocuments({ category: categoryId });
    if (productCount > 0) {
      return res.status(400).json({
        error: `Không thể xóa! Có ${productCount} sản phẩm đang thuộc danh mục này.`
      });
    }
    await Category.findByIdAndDelete(categoryId);
    res.json({ message: 'Xóa danh mục thành công.' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi xóa danh mục.' });
  }
});

module.exports = router;