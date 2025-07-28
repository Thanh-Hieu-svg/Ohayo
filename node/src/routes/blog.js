const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');

// Lấy danh sách
router.get('/', blogController.getAllBlogs);
// Lấy chi tiết
router.get('/:id', blogController.getBlogById);
// Thêm mới
router.post('/', blogController.createBlog);
// Sửa
router.put('/:id', blogController.updateBlog);
// Xóa
router.delete('/:id', blogController.deleteBlog);

module.exports = router;