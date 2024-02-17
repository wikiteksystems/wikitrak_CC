import React, { useEffect, useState } from "react";
import { notification } from "../../../utils";
import { Line } from "react-chartjs-2";
import Analytics from "./Analytics.js";
import RangeFilter from "./RangeFilter";

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "rc-slider/assets/index.css";
import { ThemeColor } from "../../../utils/constants";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MultiChart = ({ graphData, setGraphData }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(100);
  const [hiddenDatasets, setHiddenDatasets] = useState(
    Array(graphData.length).fill(false)
  );

  const [isEqu, setEqu] = useState(false);

  useEffect(() => {
    console.log(graphData, typeof graphData, "in multi chart");
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        // onClick: (e, legendItem) => {
        //   const index = legendItem.datasetIndex;
        //   const newHiddenDatasets = Array(graphData.length).fill(true);
        //   newHiddenDatasets[index] = !hiddenDatasets[index];
        //   setHiddenDatasets(newHiddenDatasets);
        // },
      },
    },
    scales: {
      x: {
        type: "category", // Use 'category' scale for X-axis
        ticks: {
          font: {
            family: "Arial", // Change the font family
            size: 14, // Change the font size
            weight: "bold", // Change the font weight
          },
          color: ThemeColor.light_color, // Change the font color
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const slicedData = graphData[0].data.slice(startIndex, endIndex + 1);
  const getColor = () => {
    // Generate random intensity values for red, green, and blue components
    const red = Math.floor(Math.random() * 128); // 0-127
    const green = Math.floor(Math.random() * 128); // 0-127
    const blue = Math.floor(Math.random() * 128); // 0-127

    // Convert the RGB components to a hexadecimal color code
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    return color;
  };
  const datasets = graphData.map((dataset, index) => {
    let backGroundClr = dataset.randomColor;
    let borderClr = getColor();

    // let borderColor, backgroundColor;
    console.log(graphData, typeof graphData, "in multi chart");
    return {
      label: dataset.label,
      data: dataset.data.map((item) => item.value),
      borderColor: borderClr,
      backgroundColor: dataset.data.map((item) =>
        item.color ? item.color : backGroundClr
      ),
      pointRadius: isEqu ? 5 : 2,
      hidden: hiddenDatasets[index],
      cursor: "pointer",
    };
  });

  const data = {
    labels: slicedData.map((item) => item.Date_Time),
    datasets: datasets,
  };

  return (
    <>
      <Analytics
        style={{ borderBottom: "2px solid red" }}
        graphData={graphData}
        setGraphData={setGraphData}
        setEqu={setEqu}
      />

      <div
        style={{
          width: "75%",
          marginLeft: "5%",
          border: "1px solid #e3e1da",
          padding: "20px",
          justifyContent: "center",
          borderRadius: "5px",
          margin: "auto",
        }}
      >
        <Line options={options} data={data} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <RangeFilter
            graphData={graphData}
            setEndIndex={setEndIndex}
            setStartIndex={setStartIndex}
            endIndex={endIndex}
            startIndex={startIndex}
          />
        </div>
      </div>
    </>
  );
};

export default MultiChart;
