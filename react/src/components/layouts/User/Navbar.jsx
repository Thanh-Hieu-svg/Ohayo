import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ isMobile = false }) => {
  return (
    <nav
      className={`flex ${
        isMobile ? "flex-col py-4 px-6" : "flex-row justify-between gap-8"
      }`}
    >
      <li
        className={`${
          isMobile ? "py-2 text-lg" : "py-4 text-lg"
        } text-gray-700 font-medium hover:text-green-500 transition-colors duration-200`}
      >
        <Link to="/">Trang chủ</Link>
      </li>
      <li
        className={`${
          isMobile ? "py-2 text-lg" : "py-4 text-lg"
        } text-gray-700 font-medium hover:text-green-500 transition-colors duration-200`}
      >
        <Link to="/shop">Sản phẩm</Link>
      </li>
      <li
        className={`${
          isMobile ? "py-2 text-lg" : "py-4 text-lg"
        } text-gray-700 font-medium hover:text-green-500 transition-colors duration-200`}
      >
        <Link to="/about">Giới thiệu</Link>
      </li>
      <li
        className={`${
          isMobile ? "py-2 text-lg" : "py-4 text-lg"
        } text-gray-700 font-medium hover:text-green-500 transition-colors duration-200`}
      >
        <Link to="/blog">Tin tức</Link>
      </li>
      <li
        className={`${
          isMobile ? "py-2 text-lg" : "py-4 text-lg"
        } text-gray-700 font-medium hover:text-green-500 transition-colors duration-200`}
      >
        <Link to="/contact">Liên hệ</Link>
      </li>
    </nav>
  );
};
