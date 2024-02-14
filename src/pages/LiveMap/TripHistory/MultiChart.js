import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
import { Range } from "react-range";
import { Theme, ThemeColor } from "../../../utils/constants";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MultiChart = ({ item }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(item[0].data.length - 1);
  const [hiddenDatasets, setHiddenDatasets] = useState(
    Array(item.length).fill(false)
  );

  useEffect(() => {
    console.log(item, "in multi chart");
  }, [item]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        onClick: (e, legendItem) => {
          const index = legendItem.datasetIndex;
          const newHiddenDatasets = Array(item.length).fill(true);
          newHiddenDatasets[index] = !hiddenDatasets[index];
          setHiddenDatasets(newHiddenDatasets);
        },
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

  const slicedData = item[0].data.slice(startIndex, endIndex + 1);

  const datasets = item.map((dataset, index) => ({
    label: dataset.label,
    data: dataset.data.map((item) => item.value),
    borderColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`,
    backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    }, 0.5)`,
    hidden: hiddenDatasets[index], // Hide or show dataset based on state
  }));
  const data = {
    labels: slicedData.map((item) => item.Date),
    datasets: datasets,
  };

  const handleRangeChange = (values) => {
    const sortedValues = values.sort((a, b) => a - b);
    setStartIndex(sortedValues[0]);
    setEndIndex(sortedValues[1]);
  };

  return (
    <>
      <div
        style={{
          width: "650px",
          border: `2px solid ${Theme.light_color}`,
          borderRadius:"8px",
          background: "whiteSmoke",
          opacity: "0.8",
          padding: "20px",
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
          {item[0].data.length > 0 && (
            <Range
              step={1}
              min={0}
              max={item[0].data.length - 1}
              values={[startIndex, endIndex]}
              onChange={(values) => handleRangeChange(values)}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: "36px",
                    display: "flex",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
                      maxWidth: "100%", // Set maximum width to 100%
                      borderRadius: "4px",
                      background: `linear-gradient(to right, #ccc ${
                        (startIndex / (item[0].data.length - 1)) * 100
                      }%, #548BF4 ${
                        (startIndex / (item[0].data.length - 1)) * 100
                      }%, #548BF4 ${
                        (endIndex / (item[0].data.length - 1)) * 100
                      }%, #ccc ${
                        (endIndex / (item[0].data.length - 1)) * 100
                      }%)`,
                      alignSelf: "center",
                      position: "absolute",
                    }}
                  >
                    {children}
                  </div>
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "16px",
                    width: "16px",
                    borderRadius: "4px",
                    backgroundColor: "#FFF",
                    boxShadow: "0px 2px 6px #AAA",
                  }}
                />
              )}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MultiChart;
