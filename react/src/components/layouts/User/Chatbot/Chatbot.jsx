import React, { useState, useRef, useEffect } from "react";
import IconAIChatbot from "../../../../assets/bee2.gif";
import IconUser from "../../../../assets/images/icon_user.png";
import { CHATBOT_URL } from "../../../../api/api";
import { Products } from "../Products/Products";
import axios from "axios";

export const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setMessages([
        {
          role: "bot",
          text: "Xin chào Anh/Chị! Em là trợ lý AI của GreenNest",
        },
      ]);
    }, 500);
    const timer2 = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Em rất sẵn lòng hỗ trợ Anh/Chị 😊",
        },
      ]);
    }, 1000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const getLastUserKeyword = () => {
    const reversed = [...messages].reverse();
    const lastUserMsg = reversed.find((m) => m.role === "user");
    if (!lastUserMsg) return "";
    return lastUserMsg.text || "";
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post(CHATBOT_URL, { messages: [input] });
      const data = res.data;

      if (data.type === "products" && Array.isArray(data.products)) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: data.text, products: data.products },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text:
              data.text ||
              "Hệ thống AI tạm thời không khả dụng. Bạn có thể hỏi về: sản phẩm, đơn hàng, công thức nấu với nguyên liệu cụ thể.",
          },
        ]);
      }
    } catch (e) {
      const status = e?.response?.status;
      const msg =
        e?.response?.data?.error || e?.response?.data?.text || e.message;

      const friendly =
        status === 403
          ? "API key AI bị khóa hoặc rò rỉ. Tạm thời trợ lý AI không hoạt động, bạn có thể tìm sản phẩm theo từ khóa."
          : "Hệ thống AI tạm thời không khả dụng. Vui lòng thử lại sau.";

      setMessages((prev) => [...prev, { role: "bot", text: msg || friendly }]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const filterName = getLastUserKeyword();

  return (
    <div className="fixed bottom-20 right-4 w-full max-w-[420px] bg-white rounded-2xl shadow-xl p-0 flex flex-col h-[600px] border border-green-400 z-50">
      <div className="text-center py-4 bg-gradient-to-r from-green-600 to-green-400 text-white text-xl font-bold rounded-t-2xl shadow-lg flex items-center justify-between px-4">
        <div className="flex items-center gap-2 ">GreenNest</div>
        <button
          onClick={onClose}
          className="text-white text-xl font-bold hover:text-green-100 transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 bg-gradient-to-b from-white to-green-50">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <img
              src={IconAIChatbot}
              alt="chat"
              className="w-24 h-24 mb-3 opacity-70"
            />
            <div className="text-lg">Bắt đầu trò chuyện với trợ lý!</div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            {msg.role === "bot" && (
              <img
                src={IconAIChatbot}
                alt="bot"
                className="w-10 h-10 rounded-full border border-green-300 shadow-md mr-2 text-lg"
              />
            )}
            <div
              className={`max-w-[75%] break-words px-4 py-2 rounded-xl shadow-sm ${
                msg.role === "user"
                  ? "bg-green-100 text-green-900 rounded-br-md"
                  : "bg-green-200 text-green-900 rounded-bl-md"
              }`}
              style={{ width: msg.products ? "100%" : undefined }}
            >
              <div>{msg.text}</div>

              {msg.products && Array.isArray(msg.products) && (
                <div className="mt-3 grid grid-cols-1 gap-4">
                  <Products
                    products={msg.products}
                    variant="chatbot"
                    containerClass="w-full"
                    filterName={filterName}
                  />
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <img
                src={IconUser}
                alt="me"
                className="w-10 h-10 rounded-full border border-green-200 shadow-md ml-2"
              />
            )}
          </div>
        ))}

        {loading && (
          <div className="flex justify-start mb-4">
            <img
              src={IconAIChatbot}
              alt="bot"
              className="w-10 h-10 rounded-full border border-green-300 shadow-md mr-2"
            />
            <div className="bg-green-200 text-green-900 px-4 py-2 rounded-xl shadow-sm max-w-[75%]">
              Đang trả lời...
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="px-4 py-2 bg-white rounded-b-2xl border-t border-green-200 flex gap-3 items-center">
        <input
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 rounded-lg border border-green-300 px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 placeholder-gray-500"
          placeholder="Nhập câu hỏi của bạn..."
          autoFocus
        />
        <button
          disabled={loading || !input.trim()}
          onClick={handleSend}
          className={`transition px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-tr from-green-600 to-green-400 shadow-md hover:brightness-110 active:scale-95 duration-150 ${
            loading || !input.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Gửi
        </button>
      </div>
    </div>
  );
};
