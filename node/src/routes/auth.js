const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const router = express.Router();
require('dotenv').config();

// Đăng ký
router.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword) 
    return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin.' });
  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Mật khẩu nhập lại không khớp.' });

  const existingEmail = await User.findOne({ email });
  if (existingEmail)
    return res.status(400).json({ message: 'Email đã tồn tại.' });

  const user = new User({ username, email, password, role: 'user' });

  try {
    await user.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: 'Đã xảy ra lỗi máy chủ.' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'SECRET_KEY',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Đăng nhập thành công!',
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Đã xảy ra lỗi máy chủ.' });
  }
});

// Quên mật khẩu
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email không tồn tại!" });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; 
    await user.save();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,     
        pass: process.env.EMAIL_PASS,     
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    await transporter.sendMail({
      from: `"GreenNest" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Đặt lại mật khẩu GreenNest",
      html: `<h2 style="font-size: 20px; font-weight: bold;">Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào link bên dưới để đặt lại:</h2>
             <a style="display: inline-block; padding: 12px 24px; margin: 20px 0; background-color: #10b981; color: #fff; text-decoration: none; border-radius: 8px; font-size: 16px; font-weight: bold;" href="${resetLink}">Nhấp vào đây</a>
             <h2 style="font-size: 16px; font-weight: normal;">Link này sẽ hết hạn sau 1 giờ.</h2>`
    });

    res.json({ message: "Đã gửi email đặt lại mật khẩu!" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Đã xảy ra lỗi khi gửi email!" });
  }
});

// Đặt lại mật khẩu
router.post('/reset-password/:token', async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) 
    return res.status(400).json({ message: "Mật khẩu không khớp!" });

  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) 
    return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });

  user.password = password; // Sẽ tự hash qua middleware
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Đổi mật khẩu thành công!" });
});

module.exports = router;