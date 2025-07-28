const Order = require("../models/Order");


exports.createOrderCOD = async (req, res) => {
  try {
    const {
      cart,
      shippingAddress,
      paymentMethod,
      subtotal,
      vnp_TxnRef,
    } = req.body;

    const email = req.user?.email;
    if (!email) {
      return res.status(401).json({ message: "Chưa xác thực hoặc thiếu email." });
    }

    if (!cart || !cart.length || !shippingAddress || !paymentMethod || subtotal == null) {
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng." });
    }

    const newOrder = new Order({
      cart,
      shippingAddress,
      email,
      paymentMethod,
      subtotal,
      status: "cho_xac_nhan", 
      vnp_TxnRef,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Tạo đơn hàng COD thành công!",
      order: newOrder,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};

exports.createOrderVNPAY = async (req, res) => {
  try {
    const {
      cart,
      shippingAddress,
      paymentMethod,
      subtotal,
      email,
      orderDesc,
      amount,
    } = req.body;

    if (!email) return res.status(401).json({ message: "Thiếu email" });
    if (!cart || !cart.length || !shippingAddress || !paymentMethod || subtotal == null)
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng." });

    const newOrder = new Order({
      cart,
      shippingAddress,
      email,
      paymentMethod,
      subtotal,
      status: "cho_xac_nhan", 
      orderDesc,
      amount,
    });

    await newOrder.save();

    res.status(201).json({ message: "Tạo đơn hàng VNPAY thành công!", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    res.json({ message: "Cập nhật trạng thái thành công", order });
  } catch (err) {
    res.status(500).json({ message: "Lỗi máy chủ!" });
  }
};