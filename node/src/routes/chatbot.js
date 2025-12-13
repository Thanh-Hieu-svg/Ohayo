require('dotenv').config();
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// Load data.json
const dataPath = path.join(__dirname, '../data/data.json');
const chatData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const stopWords = [
  "siêu", "thị", "xanh", "còn", "sản", "phẩm", "không", "bán", "có", "bạn", "ở", "đây", "và", "cho",
  "xin", "hỏi", "tôi", "anh", "chị", "em", "là", "một", "của", "với", "hay", "được", "khách", "mua",
  "hiện", "tại", "bây", "giờ", "nữa", "vẫn", "ko", "chưa", "trong", "cửa", "hàng"
];

const orderKeywords = [
  "đơn hàng", "mã đơn", "theo dõi đơn", "kiểm tra đơn", "tình trạng đơn", "giao hàng",
  "shipping", "tracking", "vận chuyển", "đơn của tôi", "delivery", "trạng thái đơn", "mã vận đơn"
];

function isOrderQuery(q) {
  return orderKeywords.some(k => q.includes(k));
}

function findAnswer(q) {
  // Check greetings
  if (/^(xin chào|chào|hello|hi|hey)/i.test(q)) {
    return chatData.greetings[Math.floor(Math.random() * chatData.greetings.length)];
  }

  // Check smalltalk
  for (const [key, responses] of Object.entries(chatData.smalltalk)) {
    if (q.includes(key)) {
      return Array.isArray(responses) ? responses[Math.floor(Math.random() * responses.length)] : responses;
    }
  }

  // Check user_profiles
  if (chatData.user_profiles) {
    for (const [key, value] of Object.entries(chatData.user_profiles)) {
      if (q.includes(key)) return value;
    }
  }

  // Check advanced_recipes
  if (chatData.advanced_recipes) {
    for (const [key, value] of Object.entries(chatData.advanced_recipes)) {
      if (q.includes(key)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          return Object.entries(value).map(([k, v]) => `${k}: ${v}`).join("\n");
        }
        return value;
      }
    }
  }

  // Check food_pairing
  if (chatData.food_pairing) {
    for (const [key, value] of Object.entries(chatData.food_pairing)) {
      if (q.includes(key)) return value;
    }
  }

  // Check promotion_campaigns
  if (chatData.promotion_campaigns) {
    for (const [key, value] of Object.entries(chatData.promotion_campaigns)) {
      if (q.includes(key)) return value;
    }
  }

  // Check eco_messages
  if (chatData.eco_messages) {
    for (const [key, value] of Object.entries(chatData.eco_messages)) {
      if (q.includes(key)) return value;
    }
  }

  // Check business_support
  if (chatData.business_support) {
    for (const [key, value] of Object.entries(chatData.business_support)) {
      if (q.includes(key)) return value;
    }
  }

  // Check testimonials
  if (chatData.testimonials) {
    for (const [key, value] of Object.entries(chatData.testimonials)) {
      if (q.includes(key)) return value;
    }
  }

  // Check company
  if (chatData.company) {
    for (const [key, value] of Object.entries(chatData.company)) {
      if (q.includes(key)) return value;
    }
  }

  // Check seasonal
  for (const [key, value] of Object.entries(chatData.seasonal)) {
    if (q.includes(key)) return value;
  }

  // Check health_tips
  for (const [key, value] of Object.entries(chatData.health_tips)) {
    if (q.includes(key)) return value;
  }

  // Check faq
  for (const [key, value] of Object.entries(chatData.faq)) {
    if (q.includes(key)) return value;
  }

  // Check nutrition
  for (const [key, value] of Object.entries(chatData.nutrition)) {
    if (q.includes(key)) return value;
  }

  // Check recipes
  for (const [key, value] of Object.entries(chatData.recipes)) {
    if (q.includes(key)) {
      return Array.isArray(value) ? value.join(", ") : value;
    }
  }

  // Check ai_suggestions
  for (const [key, value] of Object.entries(chatData.ai_suggestions)) {
    if (q.includes(key)) return value;
  }

  // Check knowledge
  for (const [key, value] of Object.entries(chatData.knowledge)) {
    if (q.includes(key)) return value;
  }

  // Check products
  for (const [key, value] of Object.entries(chatData.products)) {
    if (q.includes(key)) {
      return Array.isArray(value) ? value.join(", ") : value;
    }
  }

  // Check shopping
  if (chatData.shopping) {
    for (const [key, value] of Object.entries(chatData.shopping)) {
      if (q.includes(key)) return value;
    }
  }

  // Check shipping
  for (const [key, value] of Object.entries(chatData.shipping)) {
    if (q.includes(key)) return value;
  }

  // Check payment
  for (const [key, value] of Object.entries(chatData.payment)) {
    if (q.includes(key)) return value;
  }

  // Check support
  if (chatData.support) {
    for (const [key, value] of Object.entries(chatData.support)) {
      if (q.includes(key)) return value;
    }
  }

  // Check contact
  for (const [key, value] of Object.entries(chatData.contact)) {
    if (q.includes(key)) return value;
  }

  return null;
}

router.post('/', async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages phải là một mảng và không được rỗng." });
  }

  const origin = messages.join(" ");
  const q = origin.toLowerCase();

  // 1) Đơn hàng
  if (isOrderQuery(q)) {
    return res.json({
      text: "Bạn vui lòng liên hệ hotline 0123456789 hoặc kiểm tra mục Đơn hàng trên website để xem tình trạng."
    });
  }

  // 2) Tìm sản phẩm
  const keywords = q.split(/\s+/).filter(w => !stopWords.includes(w) && w.length > 1);
  try {
    if (keywords.length > 0) {
      const products = await Product.find({
        $or: keywords.map(k => ({ name: { $regex: k, $options: "i" } }))
      });
      if (products.length > 0) {
        return res.json({
          type: "products",
          text: "Siêu Thị Xanh có các sản phẩm phù hợp:",
          products
        });
      }
    }
  } catch {
    return res.status(500).json({ error: "Lỗi truy vấn sản phẩm" });
  }

  // 3) Tìm câu trả lời trong data.json
  const answer = findAnswer(q);
  if (answer) {
    return res.json({ text: answer });
  }

  // 4) Fallback
  return res.json({ text: chatData.fallback });
});

module.exports = router;
