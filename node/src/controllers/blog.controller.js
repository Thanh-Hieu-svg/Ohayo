const Blog = require('../models/Blog');

// Lấy danh sách blog
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy chi tiết blog
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Không tìm thấy bài viết" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm bài blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, thumbnailUrl } = req.body;
    const blog = new Blog({ title, content, author, thumbnailUrl });
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Sửa bài blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, author, thumbnailUrl } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, author, thumbnailUrl, updatedAt: Date.now() },
      { new: true }
    );
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xóa bài blog
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};