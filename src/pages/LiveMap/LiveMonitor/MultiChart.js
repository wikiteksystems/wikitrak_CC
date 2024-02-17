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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
  const [analysis, setShowAnalysis] = useState(false);

  const [isEqu, setEqu] = useState(false);
  const [paramsValues, setParamsValues] = useState([]);

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
    const paramsArr = [];

    // Add selected data (graphData)
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

    // Add params data (paramsValues)
    paramsValues.forEach((param) => {
      const paramData = {
        Params: param.name,
        Min: param.min,
        Max: param.max,
        Avg: param.avg,
      };
      paramsArr.push(paramData);
    });

    // Convert data to CSV string
    // const selectedDataCsv = selectedData.map(obj => Object.values(obj).join(",")).join("\n");
    // const paramsArrCsv = paramsArr.map(obj => Object.values(obj).join(",")).join("\n");

    // const csvContent = Object.keys(selectedData[0]).join(",") + "\n" + selectedDataCsv + "\n\n" +
    //                    Object.keys(paramsArr[0]).join(",") + "\n" + paramsArrCsv;

    const selectedDataCsv =
      Object.keys(selectedData[0]).join(",") +
      "\n" +
      selectedData.map((obj) => Object.values(obj).join(",")).join("\n");

    const paramsArrCsv =
      Object.keys(paramsArr[0]).join(",") +
      "\n" +
      paramsArr.map((obj) => Object.values(obj).join(",")).join("\n");

    // Concatenate CSV content
    const csvContent = paramsArrCsv + "\n\n" + selectedDataCsv;

    // Create a Blob object
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a download link
    const link = document.createElement("a");
    link.setAttribute("href", window.URL.createObjectURL(blob));
    link.setAttribute("download", "exported_data.csv");

    // Programmatically click the link to initiate download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateStats = (paramData) => {
    console.log(paramData, "paramData...");

    // Check if paramData.data is empty or contains non-numeric values
    const values = paramData.data
      .map((item) => parseFloat(item.value))
      .filter((value) => !isNaN(value));

    // Check if values array is empty
    if (values.length === 0) {
      console.log("Error: No valid numeric values found");
      return { min: NaN, max: NaN, avg: NaN, name: paramData.label };
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((acc, val) => acc + val, 0) / values.length;

    // Return an object with rounded values
    return {
      min: min.toFixed(2),
      max: max.toFixed(2),
      avg: avg.toFixed(2),
      name: paramData.label,
    };
  };

  useEffect(() => {
    let arr = [];
    if (graphData.length > 0) {
      graphData.map((element) => {
        const result = calculateStats(element);
        console.log(result?.speed, "result..");
        arr.push(result);
      });
    }
    if (arr.length > 0) {
      console.log(arr, "arr...");
      setParamsValues(arr);
    }
  }, [graphData]);

  useEffect(() => {
    console.log(paramsValues, "paramsValues");
  }, [paramsValues]);
  return (
    <>
      {analysis && (
        <Analytics
          style={{ borderBottom: "2px solid red" }}
          graphData={graphData}
          setGraphData={setGraphData}
          setEqu={setEqu}
        />
      )}

      <div
        style={{
          width: analysis ? "70%" : "90%",
          marginLeft: "5%",
          border: "1px solid #e3e1da",
          padding: "20px",
          justifyContent: "center",
          borderRadius: "5px",
          margin: "auto",
        }}
      >
        <div>
          <Button
            onClick={() => {
              setShowAnalysis(!analysis);
            }}
            style={{ background: Theme.dark_color, color: "white" }}
          >
            {analysis ? "Hide" : "Get"} Analysis
          </Button>

          <button
            onClick={exportData}
            style={{
              background: Theme.dark_color,
              color: "white",
              borderRadius: "6px",
              padding: "4px 8px",
              cursor: "pointer",
              marginLeft: "15px",
              margin: "auto",
            }}
          >
            Export Data
          </button>
        </div>
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
      {/* This is table of min, max and avg of each selected params */}
      {/* <div style={{width:"75%", margin:'auto'}}>
    {paramsValues.length > 0 && (
  <TableContainer style={{border:`2px solid ${Theme.light_color}`, borderRadius:"5px"}}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Parameters</TableCell>
          <TableCell>Min</TableCell>
          <TableCell>Max</TableCell>
          <TableCell>Avg</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {paramsValues.map((item, index) => (
          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {item?.name}
            </TableCell>
            <TableCell>{item.min}</TableCell>
            <TableCell>{item.max}</TableCell>
            <TableCell>{item.avg}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)} 
</div> */}
    </>
  );
};

export default MultiChart;
