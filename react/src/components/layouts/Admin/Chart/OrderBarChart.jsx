import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { CHART_URL } from "../../../../api/api";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const getColorPalette = (num) => {
  const palette = [
    "#4dc9f6",
    "#f67019",
    "#f53794",
    "#537bc4",
    "#acc236",
    "#166a8f",
    "#00a950",
    "#58595b",
    "#8549ba",
    "#e6194b",
    "#3cb44b",
    "#ffe119",
    "#4363d8",
    "#f58231",
    "#911eb4",
    "#46f0f0",
    "#f032e6",
    "#bcf60c",
    "#fabebe",
    "#008080",
  ];
  return Array.from({ length: num }, (_, i) => palette[i % palette.length]);
};

export const OrderBarChart = () => {
  const [labels, setLabels] = useState([]);
  const [dataSold, setDataSold] = useState([]);
  const [dataRevenue, setDataRevenue] = useState([]);

  useEffect(() => {
    axios
      .get(CHART_URL)
      .then((res) => {
        const arr = Array.isArray(res.data) ? res.data : [];
        setLabels(arr.map((item) => item._id));
        setDataSold(arr.map((item) => item.totalSold));
        setDataRevenue(arr.map((item) => item.totalRevenue));
      })
      .catch(() => {
        setLabels([]);
        setDataSold([]);
        setDataRevenue([]);
      });
  }, []);

  const colors = getColorPalette(labels.length);

  const data = {
    labels,
    datasets: [
      {
        label: "Số lượng bán",
        data: dataSold,
        backgroundColor: colors,
      },
      {
        label: "Doanh thu (₫)",
        data: dataRevenue,
        backgroundColor: colors.map((c) => c + "CC"),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "",
        font: { size: 20 },
        align: "start",
        color: "#191919",
      },
    },

    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
      },
      y: {
        grid: { display: false, drawBorder: false },
        beginAtZero: true,
        ticks: { callback: (value) => value.toLocaleString() },
      },
    },
  };

  return (
    <div className="h-64 w-full">
      <Bar data={data} options={options} />
    </div>
  );
};
