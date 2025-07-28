import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/layouts/Admin/Header";
import { Sidebar } from "../components/layouts/Admin/Sidebar";

export const LayoutAdmin = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="flex max-w-7xl mx-auto mt-8 px-4 lg:px-0">
        <Sidebar />
        <div className="flex-1 px-6 lg:pl-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
