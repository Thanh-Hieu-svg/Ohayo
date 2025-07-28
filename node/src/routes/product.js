const express = require('express');
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/product.controller');

const router = express.Router();

// uploads nằm ngoài src, cùng cấp index.js
const uploadPath = path.join(__dirname, '..', '..', 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
    cb(null, Date.now() + '-' + safeName);
  }
});
const upload = multer({ storage });

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', upload.array('images'), productController.createProduct);
router.patch('/:id', upload.array('images'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;