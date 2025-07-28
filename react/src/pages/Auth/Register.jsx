import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ico_facebook from "../../assets/images/Social/Facebook-ico.webp";
import ico_google from "../../assets/images/Social/Google-ico.webp";
import ico_github from "../../assets/images/Social/github-ico.webp";
import { AUTH_URL } from "../../api/api";

export const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      const response = await fetch(`${AUTH_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.message === "Email đã tồn tại.") {
          toast.error("Email đã tồn tại!");
        } else {
          toast.error(data.message || "Đăng ký thất bại!");
        }
      } else {
        toast.success("Đăng ký thành công   ");
        navigate("/login");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-[1000px] bg-white rounded-[32px] shadow-xl overflow-hidden">
        <div className="w-1/2 bg-green-500 flex flex-col items-center justify-center px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Chào mừng bạn !
          </h2>
          <p className="text-base md:text-lg text-white mb-8">
            Bạn đã có tài khoản? Hãy đăng nhập để tiếp tục mua sắm cùng chúng
            tôi.
          </p>
          <Link
            to="/login"
            className="px-8 py-3 border-2 border-white rounded-full text-white text-lg font-medium hover:bg-white hover:text-[#27ae60] transition"
          >
            Đăng nhập
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-12 flex flex-col justify-center bg-white"
        >
          <h1 className="text-[32px] font-bold text-[#24253D] mb-8 text-center">
            Đăng ký tài khoản
          </h1>

          <input
            type="text"
            name="username"
            placeholder="Họ và tên"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-3 mb-4 bg-gray-50 border border-gray-100 rounded-lg text-gray-900 text-base focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 mb-4 bg-gray-50 border border-gray-100 rounded-lg text-gray-900 text-base focus:outline-none"
          />

          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-100 rounded-lg text-gray-900 text-base focus:outline-none"
            />
            <span
              className="absolute top-3 right-4 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </span>
          </div>

          <div className="relative w-full mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-100 rounded-lg text-gray-900 text-base focus:outline-none"
            />
            <span
              className="absolute top-3 right-4 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i
                className={`fa-solid ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-full font-medium transition-all duration-300"
          >
            Đăng ký
          </button>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-base mb-4">
              Hoặc đăng ký bằng tài khoản mạng xã hội
            </p>
            <div className="flex justify-center gap-4">
              <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-50 transition">
                <img
                  src={ico_facebook}
                  alt="Facebook"
                  className="w-10 h-10 rounded-full"
                />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-50 transition">
                <img
                  src={ico_google}
                  alt="Google"
                  className="w-10 h-10 rounded-full"
                />
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-50 transition">
                <img
                  src={ico_github}
                  alt="GitHub"
                  className="w-10 h-10 rounded-full"
                />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
