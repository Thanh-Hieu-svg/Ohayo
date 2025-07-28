const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  cart: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
      images: [String],
    },
  ],
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
  },
  email: { type: String, required: true }, 
  paymentMethod: String,
  subtotal: Number,
  status: { type: String, default: "pending" },
  vnp_TxnRef: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);