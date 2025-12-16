require("dotenv").config({ override: true });

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ================= GEMINI SDK =================
const { GoogleGenAI } = require("@google/genai");

const GEMINI_API_KEY = (process.env.GEMINI_API_KEY || "").trim();
console.log("🔑 GEMINI KEY:", !!GEMINI_API_KEY);

const ai = GEMINI_API_KEY ? new GoogleGenAI({ apiKey: GEMINI_API_KEY }) : null;

// ================= GEMINI CALL =================
async function callGemini(question) {
  if (!ai) {
    return {
      text: "Xin lỗi, hệ thống AI tạm thời không khả dụng. Vui lòng thử lại sau."
    };
  }

  try {
    const result = await ai.models.generateContent({
      model: "models/gemini-2.5-flash",
      systemInstruction: {
        parts: [{
          text: `
Bạn là trợ lý AI của "Siêu Thị Xanh" – chuyên rau củ, trái cây sạch.

Quy tắc:
- Chỉ trả lời về: thực phẩm, sức khỏe, nấu ăn, bảo quản, siêu thị
- Trả lời ngắn gọn, lịch sự, KHÔNG bịa giá/sản phẩm
- Nếu không liên quan → từ chối lịch sự

Thông tin:
- Hotline: 0123456789
- Địa chỉ: 123 Nguyễn Tất Thành, Q.12, TP.HCM
- Giao: Nội thành 2-4h, tỉnh 1-3 ngày
- Ship: 15k nội thành, free >200k
- Thanh toán: COD, VNPAY, Momo
`,
        }],
      },
      contents: [{ role: "user", parts: [{ text: question }] }],
    });

    return { text: result.text };
  } catch (error) {
    console.error("❌ Gemini error:", error?.message || error);
    return {
      text: "Xin lỗi, hệ thống đang bận. Vui lòng liên hệ hotline 0123456789 để được hỗ trợ."
    };
  }
}

// ================= STOP WORDS =================
const stopWords = [
  "siêu", "thị", "xanh", "còn", "sản", "phẩm", "không", "bán", "có", "bạn",
  "ở", "đây", "và", "cho", "xin", "hỏi", "tôi", "anh", "chị", "em", "là",
  "một", "của", "với", "hay", "được", "khách", "mua", "hiện", "tại", "bây",
  "giờ", "nữa", "vẫn", "ko", "chưa", "trong", "cửa", "hàng"
];

// ================= TỪ KHÓA GỌI GEMINI =================
const geminiKeywords = ["bảo quản", "cách bảo quản", "giữ tươi", "bảo quản như thế nào"];

// ================= TỪ KHÓA KHÔNG LIÊN QUAN (CHẶN) =================
const blockedKeywords = [
  // Thời tiết
  "thời tiết", "mưa", "nắng", "nhiệt độ", "độ ẩm", "bão", "lũ",
  
  // Tin tức
  "tin tức", "thời sự", "chính trị", "bầu cử", "tổng thống", "chính phủ", "quốc hội",
  
  // Thể thao
  "bóng đá", "world cup", "thể thao", "tuyển", "giải đấu", "cầu thủ",
  
  // Giải trí
  "phim", "ca sĩ", "diễn viên", "nhạc", "chiếu rạp", "netflix", "youtube",
  
  // Học tập
  "toán", "vật lý", "hóa học", "lịch sử", "địa lý", "văn học", "tiếng anh", "học",
  
  // Công nghệ (không liên quan thực phẩm)
  "iphone", "samsung", "laptop", "điện thoại", "máy tính", "game", "facebook", "tiktok",
  
  // Tài chính
  "bitcoin", "crypto", "chứng khoán", "cổ phiếu", "forex", "đầu tư",
  
  // Du lịch
  "du lịch", "vé máy bay", "khách sạn", "visa", "hộ chiếu",
  
  // Y tế (không liên quan thực phẩm)
  "bệnh viện", "bác sĩ", "khám bệnh", "thuốc", "vaccine", "covid",
  
  // Khác
  "xe", "ô tô", "xe máy", "bất động sản", "nhà đất", "thời trang", "làm đẹp",
  "tình yêu", "hôn nhân", "gia đình", "pháp luật", "luật"
];

// ================= ROUTE =================
router.post("/", async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: "messages phải là một mảng và không được rỗng."
    });
  }

  const originUserQuery = messages.join(" ");
  const userQuery = originUserQuery.toLowerCase();

  // 🚫 CHẶN CÂU HỎI KHÔNG LIÊN QUAN
  const hasBlockedKeyword = blockedKeywords.some(keyword => userQuery.includes(keyword));
  
  if (hasBlockedKeyword) {
    return res.json({
      text: "Xin lỗi, tôi chỉ có thể hỗ trợ bạn về rau củ, trái cây, thực phẩm sạch và các sản phẩm tại Siêu Thị Xanh. Bạn có thể hỏi về: sản phẩm, giá cả, giao hàng, công thức món ăn, dinh dưỡng, bảo quản."
    });
  }

  // 1️⃣ KIỂM TRA TỪ KHÓA BẮT BUỘC GỌI GEMINI (VÍ DỤ: BẢO QUẢN)
  const hasGeminiKeyword = geminiKeywords.some(keyword => userQuery.includes(keyword));
  
  if (hasGeminiKeyword) {
    const geminiRes = await callGemini(originUserQuery);
    return res.json(geminiRes);
  }

  // 2️⃣ TÌM SẢN PHẨM THEO TÊN
  const keywords = userQuery
    .split(/\s+/)
    .filter((w) => !stopWords.includes(w) && w.length > 1);

  if (keywords.length > 0) {
    try {
      const products = await Product.find({
        name: { 
          $regex: keywords.join("|"), 
          $options: "i" 
        }
      });

      if (products.length > 0) {
        return res.json({
          type: "products",
          text: "Siêu Thị Xanh có các sản phẩm phù hợp:",
          products
        });
      }
    } catch (error) {
      console.error("❌ Product search error:", error);
    }
  }

  // 3️⃣ GỌI GEMINI CHO CÁC CÂU HỎI KHÁC (ĐÃ QUA CHẶN)
  const geminiRes = await callGemini(originUserQuery);
  return res.json(geminiRes);
});

module.exports = router;