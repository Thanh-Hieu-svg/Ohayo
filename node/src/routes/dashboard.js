const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User'); 
const Category = require('../models/Category');

router.get('/summary', async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments();

    const stats = await Order.aggregate([
      { $unwind: "$cart" },
      {
        $group: {
          _id: "$cart.name",
          totalSold: { $sum: "$cart.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 }
    ]);
    const topProduct = stats.length > 0 ? stats[0]._id : null;
    const topProductSold = stats.length > 0 ? stats[0].totalSold : 0;

    res.json({
      totalCustomers,
      topProduct,
      topProductSold
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get('/category-percent', async (req, res) => {
    try {
      // Lấy tổng stock của từng category
      const stats = await Product.aggregate([
        {
          $group: {
            _id: "$category",
            stock: { $sum: "$stock" }
          }
        },
        {
          $lookup: {
            from: "categories", // tên collection
            localField: "_id",
            foreignField: "_id",
            as: "categoryInfo"
          }
        },
        { $unwind: "$categoryInfo" },
        {
          $project: {
            _id: 0,
            category: "$categoryInfo.name", // dùng tên danh mục
            stock: 1
          }
        }
      ]);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  });



module.exports = router;