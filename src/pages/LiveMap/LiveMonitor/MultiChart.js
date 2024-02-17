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
import { Theme, ThemeColor } from "../../../utils/constants";
import { Button } from "antd";

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
  const [analysis, setShowAnalysis] = useState(false)

  const [isEqu, setEqu] = useState(false);

  useEffect(() => {
    console.log(graphData, typeof graphData, "in multi chart");
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          font: {
            family: "Arial",
            size: 14,
            weight: "bold",
          },
          color: Theme.light_color,
          maxTicksLimit: 5, // Set maximum number of ticks to display
          maxRotation: 0, // Rotate the labels to fit horizontally
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
  labels: slicedData.map((item) => {
    const date = new Date(item.DateTime);
    // Format the date and time as desired
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return formattedDate;
  }),
  datasets: datasets,
};
const exportData = () => {
  const selectedData = [];
  
  // Iterate over all datasets
  graphData.forEach((dataset, index) => {
    const currentDataset = datasets[index];
    
    // Iterate over data points in the current dataset
    dataset.data.forEach((item, dataIndex) => {
      // Create a rowData object with Date & Time
      const rowData = {
        "Date & Time": item.DateTime,
      };

      // Add all selected parameters and their values
      graphData.forEach((dataset, index) => {
        rowData[dataset.label] = datasets[index].data[dataIndex];
      });

      selectedData.push(rowData);
    });
  });

  // Convert data to CSV string
  const csvContent = Object.keys(selectedData[0]).join(",") + "\n" // Headers
    + selectedData.map(obj => Object.values(obj).join(",")).join("\n"); // Rows

  // Create a Blob object
  const blob = new Blob([csvContent], { type: 'text/csv' });

  // Create a download link
  const link = document.createElement('a');
  link.setAttribute('href', window.URL.createObjectURL(blob));
  link.setAttribute('download', 'exported_data.csv');

  // Programmatically click the link to initiate download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <>
    <div style={{marginLeft:"10px", }}>

      <Button  onClick={()=>{setShowAnalysis(!analysis)}} style={{background:Theme.dark_color, color:"white"}}>{analysis? "Hide":"Get"} Analysis</Button>
    </div>{
      analysis 
      &&

      <Analytics
        style={{ borderBottom: "2px solid red" }}
        graphData={graphData}
        setGraphData={setGraphData}
        setEqu={setEqu}
      />
    }

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
        <button 
          onClick={exportData}
          style={{
            background: Theme.dark_color,
            color: "white",
            borderRadius: "6px",
            padding: "4px 8px",
            cursor: "pointer",
            marginLeft:"10px",
            margin:"auto"
          }}
        >
          Export Data
        </button>
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
