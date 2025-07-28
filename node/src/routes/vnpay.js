const express = require('express');
const router = express.Router();
const { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } = require('vnpay');
const Order = require('../models/Order');

function getExpireDate() {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 15);
  return date;
}

// Tạo QR VNPay
router.post('/create-qr', async (req, res) => {
  try {
    const { orderId, amount, orderDesc } = req.body;
    if (!orderId || !amount || !orderDesc) {
      return res.status(400).json({ error: 'Thiếu tham số' });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
    }
    const vnpay = new VNPay({
      tmnCode: process.env.VNP_TMNCODE,
      secureSecret: process.env.VNP_HASHSECRET,
      vnpayHost: process.env.VNP_URL,
      testMode: true,
      hashAlgorithm: 'SHA512',
      loggerFn: ignoreLogger,
    });

    const paymentUrl = await vnpay.buildPaymentUrl({
      vnp_Amount: amount,
      vnp_IpAddr: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderDesc,
      vnp_OrderType: ProductCode.Other,
      vnp_ReturnUrl: process.env.VNP_RETURNURL,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: dateFormat(new Date()),
      vnp_ExpireDate: dateFormat(getExpireDate()),
    });

    return res.status(201).json({ paymentUrl });
  } catch (err) {
    console.error("VNPay error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Callback return
router.get('/payment-return', async (req, res) => {
  try {
    const vnp_ResponseCode = req.query.vnp_ResponseCode;
    const vnp_TxnRef = req.query.vnp_TxnRef;
    if (vnp_ResponseCode === "00" && vnp_TxnRef) {
      await Order.findByIdAndUpdate(
        vnp_TxnRef,
        { status: 'paid', paidAt: new Date() }
      );
    }
    return res.redirect(
      `${process.env.VNP_RETURNURL}?${new URLSearchParams(req.query).toString()}`
    );
  } catch (err) {
    console.error("VNPay return error:", err);
    return res.redirect(
      `${process.env.VNP_RETURNURL}?error=1&msg=${encodeURIComponent(err.message)}`
    );
  }
});

module.exports = router;