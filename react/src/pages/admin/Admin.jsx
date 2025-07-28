import React from "react";
import { OrderBarChart } from "../../components/layouts/Admin/Chart/OrderBarChart";
import { DashboardSummary } from "../../components/layouts/Admin/Chart/DashboardSummary";
import { PieChartCategory } from "../../components/layouts/Admin/Chart/PieChartCategory";

export const Admin = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Doanh thu & Chi phí
          </h2>
          <OrderBarChart />
        </div>
        <DashboardSummary />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm">
          <PieChartCategory />
        </div>
      </div>
    </div>
  );
};
