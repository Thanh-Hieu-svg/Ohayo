import React, { useState } from "react";
import axios from "axios";
import { AUTH_URL } from "../../api/api";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!email) {
      setMsg("Vui lòng nhập email.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${AUTH_URL}/forgot-password`, { email });
      setMsg("Vui lòng kiểm tra email để đặt lại mật khẩu.");
    } catch (err) {
      setMsg(
        err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Quên mật khẩu
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
          >
            {loading ? "Đang gửi..." : "Gửi liên kết khôi phục"}
          </button>
        </form>
        <p className="text-sm text-red-500 text-center mt-4">{msg}</p>
        <p className="text-sm text-gray-500 text-center mt-6">
          Đã nhớ mật khẩu?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Đăng nhập lại
          </a>
        </p>
      </div>
    </div>
  );
};
