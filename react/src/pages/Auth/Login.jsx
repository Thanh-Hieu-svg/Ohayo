import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ico_facebook from "../../assets/images/Social/Facebook-ico.webp";
import ico_google from "../../assets/images/Social/Google-ico.webp";
import ico_github from "../../assets/images/Social/github-ico.webp";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const location = useLocation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  // kiểm tra đăng nhập từ giỏ hàng
  useEffect(() => {
    if (location.state?.showToast === "cart") {
      toast.error("Bạn cần đăng nhập để vào giỏ hàng", {
        toastId: "cart-required",
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-[1000px] bg-white rounded-[32px] shadow-xl overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-12 flex flex-col justify-center bg-white"
        >
          <h1 className="text-[32px] font-bold text-[#24253D] mb-8 text-center">
            Đăng nhập
          </h1>

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

          <div className="flex items-center justify-between text-gray-500 mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 w-4 h-4" />
              <span className="text-sm">Ghi nhớ đăng nhập</span>
            </label>
            <Link to="/forgot-password" className="text-sm hover:underline">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-full font-medium transition-all duration-300"
          >
            Đăng nhập
          </button>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-base mb-4">
              Hoặc đăng nhập bằng tài khoản mạng xã hội
            </p>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-50 transition"
              >
                <img
                  src={ico_facebook}
                  alt="Facebook"
                  className="w-10 h-10 rounded-full"
                />
              </button>
              <button
                type="button"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-50 transition"
              >
                <img
                  src={ico_google}
                  alt="Google"
                  className="w-10 h-10 rounded-full"
                />
              </button>
              <button
                type="button"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-50 transition"
              >
                <img
                  src={ico_github}
                  alt="GitHub"
                  className="w-10 h-10 rounded-full"
                />
              </button>
            </div>
          </div>
        </form>

        <div className="w-1/2 bg-green-500 flex flex-col items-center justify-center px-12 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Bạn mới đến?</h2>
          <p className="text-lg text-white mb-8">
            Tham gia ngay cùng chúng tôi để nhận những ưu đãi và trải nghiệm
            dịch vụ tuyệt vời nhất.
          </p>
          <Link
            to="/register"
            className="px-8 py-3 border-2 border-white rounded-full text-white text-lg font-medium hover:bg-white hover:text-[#6B728E] transition"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};
