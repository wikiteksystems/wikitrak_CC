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
import { ThemeColor } from "../../../utils/constants";
import {
  Layout,
  Avatar,
  Menu,
  Input,
  Button,
  Popconfirm,
  ColorPicker,
} from "antd";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

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
  const [params, setParams] = useState([]);
  const [operator, setOperators] = useState([]);
  const [equation, setEquation] = useState("");
  const [inputVal, setInputVal] = useState(null);
  const [betweenOp, setBtOp] = useState([]);
  const [equationArray, setEquationArray] = useState([]);

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

  const datasets = item.map((dataset, index) => {
    let backGroundcolor = `rgb(${Math.random() * 255}, ${
      Math.random() * 255
    }, ${Math.random() * 255})`;

    let borderColor, backgroundColor;

    if (equationArray.length > 0) {
      let matchObj = equationArray.find(
        (item) => item.param_name === dataset.label
      );

      if (matchObj) {
        // console.log(item.value + matchObj.operator_type + matchObj.value);
        const thresholdValue = parseFloat(matchObj.value);

        // Perform comparison for each value individually
        const backgroundColors = dataset.data.map((dataItem) => {
          const dataValue = dataItem.value;
          const comparison = eval(
            `${dataValue} ${matchObj.operator_type} ${thresholdValue}`
          );
          return comparison ? "green" : "red";
        });

        console.log(backgroundColors, "backgroundColors");

        // Set backgroundColors array based on individual comparisons
        backgroundColor = backgroundColors;
        borderColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`;
      } else {
        console.log("false");
        borderColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`;
        backgroundColor = `rgba(${Math.random() * 255}, ${
          Math.random() * 255
        }, ${Math.random() * 255}, 0.5)`;
      }
    } else {
      borderColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`;
      backgroundColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, 0.5)`;
    }

    return {
      label: dataset.label,
      data: dataset.data.map((item) => item.value),
      borderColor: borderColor,
      backgroundColor: backgroundColor,
      pointRadius: 6,
      hidden: hiddenDatasets[index],
      cursor: "pointer",
    };
  });

  const data = {
    labels: slicedData.map((item) => item.Time),
    datasets: datasets,
  };

  const handleRangeChange = (values) => {
    const sortedValues = values.sort((a, b) => a - b);
    setStartIndex(sortedValues[0]);
    setEndIndex(sortedValues[1]);
  };
  let operators = [
    { label: "Greater than", value: ">" },
    { label: "Less than", value: "<" },
    { label: "Greater than equal to", value: ">=" },
    { label: "Less than equal to", value: "<=" },
    { label: "Equal to", value: "=" },
    { label: "Not Equal to", value: "!=" },
  ];
  let betweenOperator = [
    { label: "AND", value: "&&" },
    { label: "OR", value: "||" },
  ];

  //   useEffect(()=>{
  // // console.log("item",item)
  //   },[inputVal])

  const handleParams = (event) => {
    const {
      target: { value },
    } = event;
    console.log("target value", value[value.length - 1], event);

    setParams(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleOperators = (e) => {
    const {
      target: { value },
    } = e;
    console.log("target value", value[value.length - 1]);
    let eqa = equation;

    setOperators(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleBetweenOp = (e) => {
    const {
      target: { value },
    } = e;
    console.log("target value", value[value.length - 1]);

    setBtOp(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleValueChang = (e) => {
    setInputVal(e.target.value);
    let eqa = equation;
  };
  const genEqaution = () => {
    let param = params.toString();
    let oper = operator.toString();
    let Val = inputVal;
    console.log("expreession", param + oper + Val);
    let eqa = equation;
    if (equation.length > 0) {
      eqa = `${eqa} ${betweenOp} ${param} ${oper} ${Val}`;
    } else {
      eqa = `${param} ${oper} ${Val}`;
    }
    let data = equationArray;
    let conditions = eqa.split(/\s*(&&|\|\|)\s*/);
    conditions.forEach((condition) => {
      // Parsing individual condition
      let match = condition.match(/([^<>=]+)\s*([<>=]+)\s*([0-9]+)/);
      if (match) {
        let parameterName = match[1].trim();
        let operator = match[2].trim();
        let value = parseFloat(match[3]);
        let obj = {
          param_name: parameterName,
          operator_type: operator,
          value: value,
        };
        console.log("eqa arragt", obj);

        data.push(obj);
      } else {
        console.log("Condition format not recognized:", condition);
      }
    });
    setEquation(eqa);
    console.log("set eqa array", data);
    setEquationArray(data);

    setParams([]);
    setOperators([]);
    setBtOp([]);

    setInputVal(0);
  };
  return (
    <>
      <div style={{ height: "150px" }}>
        <p className="d-flex ms-5">
          <TextField
            id="Equation"
            label="Equation"
            value={equation}
            variant="outlined"
            disabled
            style={{ width: "600px" }}
          />
          <Button
            variant="contained"
            className="m-3"
            onClick={() => {
              setEquation("");
              setParams([]);
              setOperators([]);
              setInputVal(0);
              setEquationArray([]);
            }}
          >
            clear
          </Button>
        </p>

        <div className="d-flex mt-2">
          {equation.length > 0 && (
            <div className="ms-5">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Select Between Operator
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  //   multiple
                  value={betweenOp}
                  onChange={handleBetweenOp}
                  input={<OutlinedInput label="Select Operator" />}
                  renderValue={(selected) => selected.join(", ")}
                  //   MenuProps={MenuProps}
                >
                  {betweenOperator.map((item) => (
                    <MenuItem key={item.label} value={item.value}>
                      <Checkbox checked={operator.indexOf(item.value) > -1} />
                      <ListItemText primary={item.label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          )}
          <div className="ms-3">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Parameters
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                //   multiple
                value={params}
                onChange={handleParams}
                input={<OutlinedInput label="Select Parameter" />}
                renderValue={(selected) => selected.join(", ")}
                //   MenuProps={MenuProps}
              >
                {Object.keys(item).map((key) => (
                  <MenuItem key={item[key].label} value={item[key].label}>
                    <Checkbox checked={params.indexOf(item[key].label) > -1} />
                    <ListItemText primary={item[key].label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="ms-5">
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                operators
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                //   multiple
                value={operator}
                onChange={handleOperators}
                input={<OutlinedInput label="Select Operator" />}
                renderValue={(selected) => selected.join(", ")}
                //   MenuProps={MenuProps}
              >
                {operators.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    <Checkbox checked={operator.indexOf(item.value) > -1} />
                    <ListItemText primary={item.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="ms-5 mt-2">
            <TextField
              id="Value"
              value={inputVal}
              type="number"
              onChange={handleValueChang}
              label="Value"
              variant="outlined"
            />
          </div>
          <div className="ms-5 mt-2">
            <Button variant="contained" className="m-3" onClick={genEqaution}>
              Apply
            </Button>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "80%",
          marginLeft: "10%",
          border: "2px solid black",
          padding: "20px",
          justifyContent: "center",
          marginBottom:"20px"
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
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: "5px",
                      width: "100%",
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
