import React from "react";
import Sidebar from "../../components/layouts/User/Profile/Sidebar";
import { Outlet } from "react-router-dom";

export const Profile = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar />
        <div className="w-full md:w-3/4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
