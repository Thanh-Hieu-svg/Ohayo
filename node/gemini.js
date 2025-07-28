require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // Đổi sang tên model mới nhất! Nếu lỗi thử "gemini-1.5-flash"
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent("Trà được làm từ gì?");
    const text = result.response.text();
    console.log(text);
  } catch (e) {
    console.error("Gemini error:", e);
  }
}

testGemini();