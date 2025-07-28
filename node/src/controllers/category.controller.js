const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: "Tên danh mục đã tồn tại" });
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi tạo danh mục" });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy danh mục" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy danh mục" });
  }
};


exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Không tìm thấy danh mục" });
    if (name && name !== category.name) {
      const exists = await Category.findOne({ name, _id: { $ne: req.params.id } });
      if (exists) return res.status(400).json({ message: "Tên danh mục đã tồn tại" });
      category.name = name;
    }
    if (description !== undefined) category.description = description;
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi cập nhật danh mục" });
  }
};


exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Không tìm thấy danh mục" });
    res.json({ message: "Xóa danh mục thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi xóa danh mục" });
  }
};