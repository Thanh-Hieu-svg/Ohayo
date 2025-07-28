const User = require('../models/User');
const bcrypt = require("bcryptjs");

// Lấy danh sách khách hàng
exports.getAllCustomers = async (req, res) => {
    try {
      const customers = await User.find({ role: "user" })
        .select("username email createdAt ") 
        .sort({ createdAt: -1 });
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


// Cập nhật thông tin user (trừ password)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let { username, email, role, password } = req.body;

    const updateData = { username, email, role };

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản!" });
    }
    res.json({ message: "Cập nhật thành công!", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Lỗi cập nhật tài khoản!", error: error.message });
  }
};

// Xóa user theo id
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản!" });
    }
    res.json({ message: "Đã xóa tài khoản thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi xóa tài khoản!", error: error.message });
  }
};

// Lấy thông tin user theo id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); 
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};