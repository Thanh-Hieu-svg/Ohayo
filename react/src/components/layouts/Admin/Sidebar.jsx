import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faBoxesStacked,
  faBoxOpen,
  faBlog,
  faUser,
  faFileInvoice,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, label }) => (
  <div className="flex items-center gap-3 px-4 py-2.5 text-gray-700 rounded-lg cursor-pointer transition-colors duration-200 hover:bg-gray-100">
    <FontAwesomeIcon icon={icon} className="text-base text-gray-600 w-5" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export const Sidebar = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const firstChar = user?.username
    ? user.username.trim().charAt(0).toUpperCase()
    : "";

  return (
    <div className="w-64 bg-white shadow-md p-6 rounded-xl h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="flex flex-col items-center gap-2 mb-8">
        <div className="text-2xl w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full uppercase">
          {firstChar}
        </div>
        <div className="text-lg font-semibold text-gray-800">
          Xin chào 👋! {user?.username || "Admin"}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Trang Chính
        </p>
        <Link to="/admin">
          <SidebarItem icon={faGaugeHigh} label="Tổng quan" />
        </Link>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Quản Lý
        </p>
        <div className="space-y-1">
          <Link to="/admin/categorymanegement">
            <SidebarItem icon={faBoxesStacked} label="Quản lý danh mục" />
          </Link>
          <Link to="/admin/productmanagement">
            <SidebarItem icon={faBoxOpen} label="Quản lý sản phẩm" />
          </Link>
          <Link to="/admin/blogmanegement">
            <SidebarItem icon={faBlog} label="Quản lý blog" />
          </Link>
          <Link to="/admin/customermanagement">
            <SidebarItem icon={faUser} label="Quản lý khách hàng" />
          </Link>
          <Link to="/admin/ordermanagement">
            <SidebarItem icon={faFileInvoice} label="Quản lý đơn hàng" />
          </Link>
          <Link to="/admin/contactmanagement">
            <SidebarItem icon={faEnvelope} label="Quản lý liên hệ" />
          </Link>
        </div>
      </div>
    </div>
  );
};
