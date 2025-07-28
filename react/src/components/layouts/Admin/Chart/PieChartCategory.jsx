import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DATACATEGORY_URL } from "../../../../api/api";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#B266FF",
  "#FE6F61",
];

export const PieChartCategory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(DATACATEGORY_URL)
      .then((res) => setData(Array.isArray(res.data) ? res.data : []))
      .catch(() => setData([]));
  }, []);

  const total = data.reduce((sum, item) => sum + item.stock, 0);

  const chartData = data
    .filter((item) => item.stock > 0)
    .map((item) => ({
      ...item,
      percent: total ? ((item.stock / total) * 100).toFixed(1) : 0,
    }));

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Tỉ lệ sản phẩm theo danh mục
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="stock"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            isAnimationActive={false}
          >
            {chartData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            formatter={(value, name, props) => {
              const { percent, category } = props.payload;
              return [`${value} sản phẩm (${percent}%)`, category];
            }}
          />

          <Legend
            formatter={(value) => (
              <span style={{ color: "#555", fontSize: "14px" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
