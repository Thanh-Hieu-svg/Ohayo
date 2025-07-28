import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }
  const name = user?.name || user?.username || "Khách";
  const firstChar = name.charAt(0).toUpperCase();

  const tabs = [
    { path: "/profile/info", label: "Thông tin cá nhân" },
    { path: "/profile/orders", label: "Đơn hàng" },
  ];

  const isActive = (path) => {
    if (pathname === "/profile" && path === "/profile/info") return true;
    return pathname === path;
  };

  return (
    <div className="w-full md:w-1/4">
      <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
        <div className="flex flex-col items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#88b44e] text-white flex items-center justify-center text-2xl font-bold mb-2">
            {firstChar}
          </div>
          <div>
            Xin chào 👋! <span className="font-semibold">{name}</span>
          </div>
        </div>
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`block px-4 py-2 rounded-md font-medium ${
              isActive(tab.path)
                ? "bg-[#88b44e] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
