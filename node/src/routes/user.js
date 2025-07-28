const express = require('express');
const router = express.Router();
const customerController = require('../controllers/user.controller');

// Lấy danh sách khách hàng
router.get('/', customerController.getAllCustomers);


// Lấy thông tin user theo id
router.get('/:id', customerController.getUserById);

// Cập nhật user
router.put('/:id', customerController.updateUser);

// Xóa user
router.delete('/:id', customerController.deleteUser);

module.exports = router;