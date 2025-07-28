import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faUser } from "@fortawesome/free-solid-svg-icons";
import { DATADASHBOARD_URL } from "../../../../api/api";

export const DashboardSummary = () => {
  const [summary, setSummary] = useState({
    totalCustomers: 0,
    topProduct: "",
    topProductSold: 0,
  });

  useEffect(() => {
    axios
      .get(DATADASHBOARD_URL)
      .then((res) => setSummary(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
          <FontAwesomeIcon icon={faUser} className="text-xl" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            Tổng khách hàng
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {typeof summary.totalCustomers === "number"
              ? summary.totalCustomers.toLocaleString("vi-VN") + " khách hàng"
              : "--"}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center">
        <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-3">
          <FontAwesomeIcon icon={faTrophy} className="text-xl" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-1">
            Sản phẩm bán chạy nhất
          </h3>
          <p className="text-lg text-gray-800">
            {summary.topProduct
              ? `${summary.topProduct} (${summary.topProductSold} lượt mua)`
              : "Không có dữ liệu"}
          </p>
        </div>
      </div>
    </div>
  );
};
