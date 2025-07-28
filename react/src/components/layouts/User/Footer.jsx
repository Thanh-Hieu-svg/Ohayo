import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-4 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Nội dung 4 cột */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Văn phòng */}
          <div>
            <h3 className="text-xl font-semibold text-lime-400 mb-4">
              Thông tin
            </h3>
            <p className="flex items-start gap-2 mb-2">
              <i className="fas fa-map-marker-alt text-lime-400 mt-1"></i>
              331, QL1A, An Phú Đông, Q12
            </p>
            <p className="flex items-center gap-2 mb-2">
              <i className="fas fa-phone-alt text-lime-400"></i>
              (+84) 123 456 789
            </p>
            <p className="flex items-center gap-2 mb-4">
              <i className="fas fa-envelope text-lime-400"></i>
              2200003450@gmail.com
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-lime-400 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-lime-300"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="bg-lime-400 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-lime-300"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="bg-lime-400 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-lime-300"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="#"
                className="bg-lime-400 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full hover:bg-lime-300"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-xl font-semibold text-lime-400 mb-4">
              Liên Kết Nhanh
            </h3>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer group transition-all duration-300 ease-in-out hover:scale-105">
                <Link to="/about-us">
                  <i className="fas fa-angle-right mr-2 text-lime-400 group-hover:text-white transition-colors duration-300"></i>
                  Giới thiệu
                </Link>
              </li>
              <li className="hover:text-white cursor-pointer group transition-all duration-300 ease-in-out hover:scale-105">
                <Link to="/contact">
                  <i className="fas fa-angle-right mr-2 text-lime-400 group-hover:text-white transition-colors duration-300"></i>
                  Liên hệ
                </Link>
              </li>
              <li className="hover:text-white cursor-pointer group transition-all duration-300 ease-in-out hover:scale-105">
                <i className="fas fa-angle-right mr-2 text-lime-400 group-hover:text-white transition-colors duration-300"></i>
                Dịch vụ
              </li>
              <li className="hover:text-white cursor-pointer group transition-all duration-300 ease-in-out hover:scale-105">
                <i className="fas fa-angle-right mr-2 text-lime-400 group-hover:text-white transition-colors duration-300"></i>
                Điều khoản
              </li>
              <li className="hover:text-white cursor-pointer group transition-all duration-300 ease-in-out hover:scale-105">
                <i className="fas fa-angle-right mr-2 text-lime-400 group-hover:text-white transition-colors duration-300"></i>
                Hỗ trợ
              </li>
            </ul>
          </div>

          {/* Giờ làm việc */}
          <div>
            <h3 className="text-xl font-semibold text-lime-400 mb-4">
              Giờ Làm Việc
            </h3>
            <p>Thứ 2 - Thứ 6</p>
            <p className="font-bold mb-2">09:00 - 20:00</p>
            <p>Thứ 7</p>
            <p className="font-bold mb-2">09:00 - 12:00</p>
            <p>Chủ Nhật</p>
            <p className="font-bold text-white">Nghỉ</p>
          </div>

          {/* Nhận bản tin */}
          <div>
            <h3 className="text-xl font-semibold text-lime-400 mb-4">
              Nhận Bản Tin
            </h3>
            <p className="mb-4">
              Đăng ký để nhận tin tức, khuyến mãi và cập nhật mới nhất từ chúng
              tôi.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email của bạn"
                className="px-4 py-2 w-full rounded-l-md  text-white"
              />
              <button className="bg-lime-400 hover:bg-lime-300 text-white font-semibold px-4 py-2 rounded-r-md">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Bản quyền và thiết kế */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center">
          <p>
            © {new Date().getFullYear()}
            <span className="text-lime-400 font-medium"> Ohayo </span>, mọi
            quyền được bảo lưu.
          </p>
          <p className="mt-2 sm:mt-0">
            Thiết kế bởi
            <span className="text-lime-400 font-medium"> 5D's</span>, phân phối
            bởi <span className="text-lime-400 font-medium">Ohayo</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
