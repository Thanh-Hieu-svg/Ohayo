const Product = require('../models/Product');
const Category = require('../models/Category');

exports.createProduct = async (req, res) => {
  try {
    const { name, sku, category, price, stock, status, description } = req.body;
    // Lưu ảnh là đường dẫn đầy đủ
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Danh mục không tồn tại' });
    }

    const skuExists = await Product.findOne({ sku });
    if (skuExists) {
      return res.status(400).json({ message: 'SKU đã tồn tại' });
    }

    const product = new Product({
      name,
      sku,
      category,
      price,
      stock,
      status,
      description,
      images,
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi thêm sản phẩm' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter).populate('category');
    products.forEach(prod => {
      prod.images = prod.images.map(img => img.startsWith('/uploads/') ? img : `/uploads/${img}`);
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi lấy danh sách sản phẩm' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    product.images = product.images.map(img => img.startsWith('/uploads/') ? img : `/uploads/${img}`);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi lấy sản phẩm' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, sku, category, price, stock, status, description } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: 'Danh mục không tồn tại' });
      }
      product.category = category;
    }

    if (sku && sku !== product.sku) {
      const skuExists = await Product.findOne({ sku, _id: { $ne: req.params.id } });
      if (skuExists) {
        return res.status(400).json({ message: 'SKU đã tồn tại' });
      }
      product.sku = sku;
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (status) product.status = status;
    if (description !== undefined) product.description = description;

    // Xử lý ảnh giữ lại và thêm mới, đường dẫn chuẩn /uploads/...
    let newImages = [];
    if (req.body.oldImages) {
      if (Array.isArray(req.body.oldImages)) {
        newImages = newImages.concat(req.body.oldImages.map(img => img.startsWith('/uploads/') ? img : `/uploads/${img}`));
      } else if (typeof req.body.oldImages === 'string') {
        newImages.push(req.body.oldImages.startsWith('/uploads/') ? req.body.oldImages : `/uploads/${req.body.oldImages}`);
      }
    }
    if (req.files && req.files.length > 0) {
      newImages = newImages.concat(req.files.map(file => `/uploads/${file.filename}`));
    }
    product.images = newImages;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi cập nhật sản phẩm' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }
    res.json({ message: 'Xóa sản phẩm thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm' });
  }
};