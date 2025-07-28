const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { createOrderCOD, createOrderVNPAY, getAllOrders, updateOrderStatus} = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth");


router.post("/cod", authMiddleware, createOrderCOD);
router.post("/vnpay", authMiddleware, createOrderVNPAY);

router.get("/", getAllOrders);
router.patch("/:id/status", authMiddleware, updateOrderStatus);

// thống kê sản phẩm bán trong tháng hiện tại
router.get('/stats/products-in-current-month', async (req, res) => {
    try {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  
      const stats = await Order.aggregate([
        { $match: { createdAt: { $gte: firstDay, $lte: lastDay } } },
        { $unwind: "$cart" },
        {
          $group: {
            _id: "$cart.name",
            totalSold: { $sum: "$cart.quantity" },
            totalRevenue: {
              $sum: { $multiply: ["$cart.quantity", "$cart.price"] },
            },
          },
        },
        { $sort: { totalSold: -1 } },
      ]);
      res.json(stats);
    } catch (err) {
      console.error("Error fetching chart data:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;