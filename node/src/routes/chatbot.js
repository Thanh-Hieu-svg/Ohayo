require('dotenv').config();
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function callGemini(question) {
    try {
      const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(question);
      const text = result.response.text();
      return { text };
    } catch (e) {
      console.error("Gemini error:", e);
      return { text: "Xin lỗi, trợ lý AI đang bận. Bạn vui lòng thử lại sau!" };
    }
  }

const stopWords = [
  "shop", "còn", "sản", "phẩm", "không", "bán", "có", "bạn", "ở", "đây", "và", "cho",
  "xin", "hỏi", "tôi", "bạn", "anh", "chị", "em", "là", "một", "của", "với", "hay", "được", "khách", "mua",
  "hiện", "tại", "bây", "giờ", "nữa", "vẫn", "ko", "chưa", "trong", "cửa", "hàng"
];

const productKeywords = [
  /còn.*trà/i, /loại.*trà/i, /trà.*gì/i, /trà.*nào/i, /có.*trà/i, /bán.*trà/i, /menu.*trà/i,
  /các.*loại.*trà/i, /trà.*trong.*cửa hàng/i, /trà.*hiện tại/i,
  /còn.*cà phê/i, /còn.*cafe/i, /có.*cà phê/i, /có.*cafe/i, /cà phê.*gì/i, /cafe.*gì/i,
  /loại.*cà phê/i, /loại.*cafe/i, /bán.*cà phê/i, /bán.*cafe/i, /menu.*cà phê/i, /menu.*cafe/i,
  /các.*loại.*cà phê/i, /các.*loại.*cafe/i, /cà phê.*trong.*cửa hàng/i, /cafe.*trong.*cửa hàng/i,
  /cà phê.*hiện tại/i, /cafe.*hiện tại/i,
];

const knowledgeKeywords = [
  /cách pha.*trà/i, /cách pha.*cà phê/i, /cách pha.*cafe/i,
  /công thức.*trà/i, /công thức.*cà phê/i, /công thức.*cafe/i,
  /pha trà/i, /pha cà phê/i, /pha cafe/i,
  /hướng dẫn.*pha/i, /cách làm.*trà/i, /cách làm.*cà phê/i, /cách làm.*cafe/i,
  /trà là gì/i, /cà phê là gì/i, /cafe là gì/i,
  /trà.*được làm từ/i, /cà phê.*được làm từ/i, /cafe.*được làm từ/i,
  /nguồn gốc.*trà/i, /nguồn gốc.*cà phê/i, /nguồn gốc.*cafe/i,
  /lịch sử.*trà/i, /lịch sử.*cà phê/i, /lịch sử.*cafe/i,
  /trà.*có tác dụng gì/i, /cà phê.*có tác dụng gì/i, /cafe.*có tác dụng gì/i,
  /trà.*tác hại/i, /cà phê.*tác hại/i, /cafe.*tác hại/i,
  /tác dụng.*trà/i, /tác dụng.*cà phê/i, /tác dụng.*cafe/i,
  /trà.*tốt cho sức khỏe/i, /cà phê.*tốt cho sức khỏe/i, /cafe.*tốt cho sức khỏe/i,
  /trà.*bao nhiêu loại/i, /cà phê.*bao nhiêu loại/i, /cafe.*bao nhiêu loại/i,
  /sự khác biệt.*trà/i, /sự khác biệt.*cà phê/i, /sự khác biệt.*cafe/i,
];

const orderKeywords = [
  "đơn hàng", "mã đơn", "theo dõi đơn", "kiểm tra đơn", "tình trạng đơn", "giao hàng", 
  "shipping", "tracking", "vận chuyển", "đã nhận được chưa", "chưa nhận được", "đơn của tôi", "đơn em", "delivery", "trạng thái đơn", "mã vận đơn"
];

function isProductCategoryQuery(query) {
  return productKeywords.some(re => re.test(query));
}
function isKnowledgeQuery(query) {
  return knowledgeKeywords.some(re => re.test(query));
}

router.post('/', async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages phải là một mảng và không được rỗng." });
  }

  const userQuery = messages.join(" ").toLowerCase();
  const originUserQuery = messages.join(" ");

  // 1. Kiểm tra liên quan đơn hàng
  const isOrderRelated = orderKeywords.some(keyword => userQuery.includes(keyword));
  if (isOrderRelated) {
    return res.json({
      text: "Dạ, Anh/Chị vui lòng liên hệ hotline 0123456789 để được hỗ trợ kiểm tra đơn hàng trà/cafe của mình nhé ạ!"
    });
  }

  // 2. Kiến thức về trà/cafe (công thức, định nghĩa, nguồn gốc, cách pha,...)
  if (isKnowledgeQuery(userQuery)) {
    const geminiRes = await callGemini(originUserQuery);
    return res.json(geminiRes);
  }

  // 3. Nếu hỏi về loại trà/cafe, trả về tất cả sản phẩm thuộc nhóm đó
  if (isProductCategoryQuery(userQuery)) {
    let filter = {};
    if (/trà/i.test(userQuery) && !/cà\s?phê|cafe/i.test(userQuery)) {
      filter = { name: /trà/i };
    } else if (/cà\s?phê|cafe/i.test(userQuery) && !/trà/i.test(userQuery)) {
      filter = { name: /cà\s?phê|cafe/i };
    } else {
      filter = {};
    }

    try {
      const products = await Product.find(filter);
      if (products.length > 0) {
        return res.json({
          type: "products",
          text: "Dạ, shop có các sản phẩm trà và cafe như sau:",
          products
        });
      } else {
        return res.json({
          text: "Hiện shop chưa có sản phẩm phù hợp với yêu cầu này."
        });
      }
    } catch (err) {
      return res.status(500).json({ error: "Lỗi truy vấn sản phẩm" });
    }
  }

  // 4. Tìm sản phẩm theo từ khóa còn lại (lọc stopwords)
  const keywords = userQuery
    .split(/\s+/)
    .filter(word =>
      !stopWords.includes(word) &&
      word.length > 1 &&
      !["trà", "cafe", "cà", "phê"].includes(word)
    );

  let products = [];
  try {
    if (keywords.length > 0) {
      products = await Product.find({
        $or: keywords.map(k => ({
          name: { $regex: k, $options: "i" }
        }))
      });
    }
    if (products.length > 0) {
      return res.json({
        type: "products",
        text: "Dạ, shop có các sản phẩm như sau:",
        products
      });
    }
  } catch (err) {
    return res.status(500).json({ error: "Lỗi truy vấn sản phẩm" });
  }

  // 5. Nếu không tìm thấy
  return res.json({
    text: `Dạ, em chưa tìm thấy thông tin về "${originUserQuery}". Shop chuyên các loại trà và cafe thơm ngon, nguyên chất. Anh/Chị muốn tham khảo loại trà hoặc cafe nào ạ?`
  });
});

module.exports = router;