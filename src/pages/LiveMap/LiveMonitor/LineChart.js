import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data, yAxisLabel, color }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: yAxisLabel,
        data: data.map((item) => item.value),
        fill: false,
        borderColor: color,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "category",
        labels: data.map((item) => item.label),
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
