import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AUTH_URL } from "../../api/api";
import { toast } from "react-toastify";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!password || !confirm) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    if (password !== confirm) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${AUTH_URL}/reset-password/${token}`, {
        password,
        confirmPassword: confirm,
      });
      toast.success("Đặt lại mật khẩu thành công!");
      setTimeout(() => navigate("/login"), 1000);
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
          Đặt lại mật khẩu
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Nhập mật khẩu mới cho tài khoản của bạn.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Mật khẩu mới"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-3 mb-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition"
          >
            {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </button>
        </form>
        <p className="text-sm text-red-500 text-center mt-4">{msg}</p>
        <p className="text-sm text-gray-500 text-center mt-6">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
};
