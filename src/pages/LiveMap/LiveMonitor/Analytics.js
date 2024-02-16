import React, { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { notification } from "../../../utils";
import { Spin } from "antd";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";
import {
  Layout,
  Avatar,
  Menu,
  Input,
  Button,
  Popconfirm,
  ColorPicker,
} from "antd";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
const Analytics = ({ graphData, setGraphData, setEqu }) => {
  const [params, setParams] = useState([]);
  const [operator, setOperators] = useState([]);
  const [equation, setEquation] = useState("");
  const [inputVal, setInputVal] = useState(null);
  const [betweenOp, setBtOp] = useState([]);
  const [equationArray, setEquationArray] = useState([]);
  const [newEqa, setNewEqa] = useState("");
  const [trueCount, setTrueCount] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [newEquationArray, setNewEquationArray] = useState([]);
  const [indexes, setIndexes] = useState(0);
  let operators = [
    { label: "Greater than", value: ">" },
    { label: "Less than", value: "<" },
    { label: "Greater than equal to", value: ">=" },
    { label: "Less than equal to", value: "<=" },
    { label: "Equal to", value: "=" },
    { label: "Not Equal to", value: "!=" },
  ];

  useEffect(() => {}, [equation, isLoading, setLoading]);

  const handleParams = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;

    setParams(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleOperators = (e) => {
    const {
      target: { value },
    } = e;

    let eqa = equation;

    setOperators(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleValueChang = (e) => {
    setInputVal(e.target.value);
    let eqa = equation;
  };
  const genEquation = () => {
    graphData.map((item, i) => {
      item.data.map((d) => d.color && delete d.color);
    });
    setGraphData(graphData);
    let param = params.toString();
    let oper = operator.toString();
    let Val = inputVal;
    if (!param && !oper && !betweenOp.toString())
      return notification(
        "error",
        "Info",
        "Please select the parameter and operator"
      );

    let newEquation = `${param} ${oper} ${Val}`;
    let eqa = equation;

    eqa = `${eqa} ${param} ${oper} ${Val}`;

    setNewEqa(newEquation);
    let arr = [...newEquationArray];
    arr.push(newEquation);
    setIndexes(arr.length - 1);
    setNewEquationArray(arr);
    let data = equationArray;

    setEquation(eqa);
    let obj = {
      betweenOperators: betweenOp.toString(),
      param_name: param.toString(),
      operator_type: operator.toString(),
      value: inputVal,
    };
    console.log("eqa arragt", obj);

    data.push(obj);
    setEquationArray(data);

    setParams([]);
    setOperators([]);
    setBtOp([]);
    setInputVal(0);
    // evaluateEquation(eqa)
  };

  const evaluateEquation = () => {
    setEqu(true);
    //  if(!equation) return notification('error', 'Info', 'Please Add Equation');
    setLoading(true);
    graphData.map((item, i) => {
      item.data.map((d) => d.color && delete d.color);
    });
    setGraphData(graphData);
    if (!equation) {
      setLoading(false);
      return notification("error", "Info", "Please Add Equation");
    }
    let equationArray = makeSeparateEquation(equation);
    let filteredData = [];
    let resultArray = [];
    equationArray.map((item) => {
      let value = makeSeparateEquation(item.replace(/[()]/g, ""));
      console.log("evaluateEquation", equation);
      console.log("equationArray", equationArray);
      console.log("value", value);
      value.map((val, i) => {
        let stringWithoutOperators = val.replace(/[&|]/g, "");
        graphData.map((data) => {
          if (val.includes(data.label)) {
            let obj = {};
            let obj2 = {};

            // let pattern = new RegExp(data.label + "|[&|]", "g");
            let removedLabel = stringWithoutOperators.replace(data.label, "");
            console.log("removedLabel", removedLabel, "val", val, data.label);
            let newData = data.data.filter((ele) => {
              let expression = `${ele.value}${removedLabel}`;
              try {
                return eval(expression);
              } catch (error) {
                return notification("error", "error", `${error.message}`);
              }
            });
            obj = {
              label: data.label,
              data: newData,
              status: newData.length > 0 ? true : false,
              equation: `${val}`,
            };
            obj2 = {
              label: `${stringWithoutOperators.trim()}`,
              value: newData.length > 0 ? true : false,
            };
            filteredData.push(obj);
            resultArray.push(obj2);
          }
        });
      });
    });

    console.log("filteredData", filteredData, "equationArray", equationArray);
    console.log("result Array", resultArray);
    const replacedString = replaceLabels(equation, resultArray);
    console.log("replacedString", replacedString);
    const isTrue = eval(replacedString);
    let newGraphData = [...graphData];
    if (isTrue) {
      let newFilteredArray = [];
      equationArray.map((equ, i) => {
        if (/\(|\)/.test(equ)) {
          let value = makeSeparateEquation(equ.replace(/[()]/g, ""));
          const newData = [];
          let obj = {};
          value.map((val, i) => {
            let bracketData = filteredData.find(
              (item) => item.equation === val
            );
            let regex = /[&|]/;
            obj = {
              data: bracketData.data,
              oper: val,
              label: bracketData.label,
            };
            newData.push(obj);
          });
          console.log("filteredData", filteredData);
          console.log("newData", newData);
          newData.map((data, i) => {
            console.log("i", i);
            if (newData.length > 1) {
              if (i > 0) {
                console.log("labels", newData[i - 1].label, newData[i].label);
                if (newData[i - 1].label === newData[i].label) {
                  if (data.oper.includes("&")) {
                    let newArray = findCommonValues(
                      newData[i - 1].data,
                      newData[i].data
                    );
                    let Obj = {
                      data: newArray,
                      label: newData[i].oper,
                      betweenOp: "&",
                    };
                    newFilteredArray.push(Obj);
                    console.log(newArray, "NEW ARRAY VAL common");
                  }
                  if (data.oper.includes("|")) {
                    let newArray = removeDuplicates([
                      ...newData[i - 1].data,
                      ...newData[i].data,
                    ]);
                    let Obj = {
                      data: newArray,
                      label: newData[i].oper,
                      betweenOp: "|",
                    };
                    newFilteredArray.push(Obj);
                    console.log(newArray, "NEW ARRAY VAL remove duplicates");
                  }
                } else {
                  console.log(
                    "obj1",
                    newData[i - 1].label,
                    newData[i - 1].data
                  );
                  let Obj1 = {
                    data: newData[i - 1].data,
                    label: newData[i - 1].oper,
                    betweenOp:
                      (newData[i - 1].oper.includes("|") && "|") ||
                      (newData[i - 1].oper.includes("&") && "&"),
                  };
                  console.log("obj2", newData[i].label, newData[i].data);
                  let Obj2 = {
                    data: newData[i].data,
                    label: newData[i].oper,
                    betweenOp:
                      (newData[i].oper.includes("|") && "|") ||
                      (newData[i].oper.includes("&") && "&"),
                  };
                  newFilteredArray.push(Obj1);
                  newFilteredArray.push(Obj2);
                }
              } else {
              }
            } else {
              let Obj = {
                data: data.data,
                label: newData[i].oper,
                betweenOp: "",
              };
              newFilteredArray.push(Obj);
              console.log(data.data, "single value");
            }
          });
        } else {
          let bracketData = filteredData.find((item) => item.equation === equ);
          let Obj = {
            data: bracketData.data,
            label: bracketData.label,
            betweenOp:
              (bracketData.equation.includes("|") && "|") ||
              (bracketData.equation.includes("&") && "&"),
          };
          newFilteredArray.push(Obj);
        }
      });
      console.log("newFiltered Array", newFilteredArray);
      newFilteredArray = mergeArray(newFilteredArray);
      console.log("newFiltered Array2", newFilteredArray);

      let countArray = [];
      newFilteredArray.map((para) => {
        // let findArray= graphOriginalData.find((e)=>para.label.includes(e.label));

        let count = 0;
        let isValid = false;

        newGraphData.map((e) => {
          if (para.label.includes(e.label)) {
            e.data.forEach((item1) => {
              const found = para.data.find(
                (item2) => item2.value === item1.value
              );
              if (found) {
                if (!isValid) {
                  count++;
                  isValid = true;
                }
                item1.color = "green"; // Or any color you want to assign
              } else {
                isValid = false;
              }
            });
          }
        });
        console.log("count---------->", count, para.label);
        let newObj = {
          label: para.label.replace(/[^a-zA-Z ]/g, ""),
          count: count,
        };
        countArray.push(newObj);

        // setGraphOriginalData(graphData)
        // setGraphData(graphData)
      });
      setTrueCount(countArray);

      setLoading(false);
    } else {
      newGraphData.map((item, i) => {
        item.data.map((d) => d.color && delete d.color);
      });
      setLoading(false);
      notification("info", "warning", "Equation result false");
      // setGraphOriginalData(graphData)
    }
    console.log("newGraphData", newGraphData);
    setGraphData(newGraphData);
    console.log("GraphData", graphData);
  };

  const makeSeparateEquation = (equation) => {
    // Separate by mathematical priority
    const separatedEquations = [];
    let currentToken = "";
    let parenthesesCount = 0;

    for (let i = 0; i < equation.length; i++) {
      const char = equation[i];

      if (char === "(") {
        parenthesesCount++;
      } else if (char === ")") {
        parenthesesCount--;
      }

      if (
        (char === "&" && equation[i + 1] === "&") ||
        (char === "|" && equation[i + 1] === "|")
      ) {
        if (parenthesesCount === 0) {
          separatedEquations.push(currentToken.trim());
          currentToken = "";
        } else {
          currentToken += char;
        }
      } else {
        currentToken += char;
      }
    }

    if (currentToken.trim() !== "") {
      separatedEquations.push(currentToken.trim());
    }
    return separatedEquations;
  };

  const replaceLabels = (string, conditions) => {
    for (const condition of conditions) {
      const regex = new RegExp(
        condition.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        "g"
      );
      string = string.replace(regex, condition.value);
    }
    return string;
  };

  const findCommonValues = (arr1, arr2) => {
    const set = new Set(arr1.map((item) => item.value));
    const commonValues = arr2.filter((item) => set.has(item.value));
    return commonValues;
  };

  function removeDuplicates(arr) {
    const uniqueArray = arr.reduce((acc, current) => {
      const existingItemIndex = acc.findIndex(
        (item) => item.value === current.value && item.time === current.time
      );
      if (existingItemIndex === -1) {
        acc.push(current);
      }
      return acc;
    }, []);

    return uniqueArray;
  }

  const mergeArray = (arr) => {
    let mergedArray = [];

    arr.forEach((item) => {
      let existingIndex = mergedArray.findIndex(
        (element) => element.label === item.label
      );

      if (existingIndex !== -1) {
        if (item.betweenOp === "&") {
          // Merge arrays with common values
          //   let filter=mergedArray[existingIndex].data.filter((obj) => {
          //     item.data.some(newObj => newObj.value === obj.value)
          //   })
          let newArray = findCommonValues(
            mergedArray[existingIndex].data,
            item.data
          );

          mergedArray[existingIndex].data = newArray;
        } else if (item.betweenOp === "|") {
          // Merge arrays removing duplicates
          item.data.forEach((newObj) => {
            if (
              !mergedArray[existingIndex].data.some(
                (obj) => obj.value === newObj.value
              )
            ) {
              mergedArray[existingIndex].data.push(newObj);
            }
          });
        }
      } else {
        // If label not found, add the item to the merged array
        mergedArray.push({ ...item });
      }
    });

    return mergedArray;
  };

  const handlePrevClick = () => {
    const result = removeSubstringAndFollowing(equation, newEqa);
    let eqa = equation ? equation.replace(newEqa, "") : equation;
    setEquation(result);
  };
  const handleNextClick = () => {
    // console.log('equation',equation,'newEqa',newEqa,"newEquationArray",newEquationArray, 'indexes',newEquationArray[indexes])
    let eqa = equation + " " + newEqa;
    setEquation(eqa);
  };

  const handleRemoveBracketClick = () => {
    let eqa = equation.replace("(", "").replace(")", "");
    setEquation(eqa);
  };

  const handleAddParenthesisClick = (parentheses) => {
    if (
      parentheses === ")" &&
      (equation.match(/\(/g) || []).length ===
        (equation.match(/\)/g) || []).length
    ) {
      // If the number of closing parentheses is greater than opening ones, we don't add it.
      return notification(
        "info",
        "warning",
        "Please first add open Parenthesis"
      );
    }
    setEquation((prevOutput) => prevOutput + parentheses);
  };

  const removeSubstringAndFollowing = (str, substring) => {
    const index = str.indexOf(substring);
    if (index !== -1) {
      return str.substring(0, index);
    }
    return str;
  };
  return (
    <>
      {isLoading && (
        <Spin
          tip="loading..."
          size="large"
          style={{ top: "50%", position: "absolute", left: "40%" }}
        />
      )}
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

          <span className="text-danger" title="Clear equation">
            <CloseSharpIcon
              style={{ cursor: "pointer" }}
              onClick={() => {
                setEqu(false);
                setEquation("");
                setParams([]);
                setOperators([]);
                setInputVal(0);
                setEquationArray([]);
                setTrueCount([]);
                let newGraphData = [...graphData];
                newGraphData.map((item, i) => {
                  item.data.map((d) => d.color && delete d.color);
                });
                setGraphData(newGraphData);
                // setGraphOriginalData(graphData);
              }}
              className="mt-4 ms-1"
            />
          </span>
          <Button
            className="mt-3 ms-2"
            style={{ cursor: "pointer" }}
            title="Remove Last Equation"
            onClick={handlePrevClick}
          >
            <KeyboardBackspaceIcon />
          </Button>
          <Button
            className="mt-3 ms-2"
            style={{ cursor: "pointer" }}
            title="Add Last Equation"
            onClick={handleNextClick}
          >
            <EastIcon />
          </Button>

          <Button
            className="mt-3 ms-2"
            title={"Add open parenthesis"}
            value="("
            onClick={(e) => {
              handleAddParenthesisClick("(");
            }}
          >{`(`}</Button>

          <FormControl className="mt-3 ms-1">
            <Button
              sx={{ p: 5 }}
              title={"Add closing parenthesis"}
              value=")"
              onClick={(e) => {
                handleAddParenthesisClick(")");
              }}
            >{`)`}</Button>
          </FormControl>
          <Button
            className="mt-3 ms-1"
            title={"Add && Operator"}
            value="&&"
            onClick={(e) => {
              handleAddParenthesisClick(" &&");
            }}
          >{`&&`}</Button>
          <Button
            className="mt-3 ms-1"
            title={"Add || Operator"}
            value="||"
            onClick={(e) => {
              handleAddParenthesisClick(" ||");
            }}
          >{`||`}</Button>
          {/* {equation.length>1 && (
            <div className="ms-3">
              <FormControl sx={{ m: 1, width: 100 }}>
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
          )} */}
          <Button
            className="mt-3 ms-1"
            title="Remove Brackets"
            onClick={handleRemoveBracketClick}
          >
            {" "}
            <DeleteOutlinedIcon /> Bracket
          </Button>
          {/* <Button className="mt-3 ms-1" title="Add Brackets" onClick={handleAddBracketWholeEquaClick}>Add Bracket to whole eqa</Button> */}

          <FormControl>
            <Button
              // variant="contained"
              title="Apply equation filter on graph"
              className="mt-3 ms-1"
              onClick={() => {
                evaluateEquation();
              }}
            >
              Apply
            </Button>
          </FormControl>
        </p>

        <div className="d-flex mt-2">
          {/* {equation.length>1 && (
            <div className="ms-3">
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
          )} */}
          <div className="ms-3 mt-3">
            {/* <FormControl sx={{ m: 1, width: 50 }}>
            <Button sx={{ p:5}} title={'Add open parenthesis'} value="("
             onClick={(e) => {
              handleAddParenthesisClick(e)
           }}
            >{`(`}</Button>
            </FormControl> */}
          </div>
          <div className="">
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
                {Object.keys(graphData).map((key) => (
                  <MenuItem
                    key={graphData[key].label}
                    value={graphData[key].label}
                  >
                    <Checkbox
                      checked={params.indexOf(graphData[key].label) > -1}
                    />
                    <ListItemText primary={graphData[key].label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="">
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
          <div className="">
            <FormControl sx={{ m: 1, width: 200 }}>
              <TextField
                id="Value"
                value={inputVal}
                type="number"
                onChange={handleValueChang}
                label="Value"
                variant="outlined"
              />
            </FormControl>
          </div>
          {/* <div className="ms-3 mt-3"> */}
          {/* <FormControl sx={{ m: 1, width: 50 }}>
            <Button sx={{ p:5}} title={'Add closing parenthesis'} value=")"
             onClick={(e) => {
               handleAddParenthesisClick(e)
            }}
            >{`)`}</Button>
            </FormControl> */}
          {/* </div> */}

          <Button
            variant="contained"
            className="mt-5 ms-1"
            onClick={genEquation}
          >
            Add
          </Button>

          {trueCount.length > 0 && (
            <div
              className=""
              style={{
                borderRadius: "5px",
                marginTop: "-20px",
                marginLeft: "10px",
              }}
            >
              <div
                className="mt-2 "
                style={{
                  border: "1px solid #e3e1da",
                  borderRadius: "5px",
                  padding: "2px",
                  overflowX: "auto",
                  width: "230px",
                  height: "90px",
                }}
              >
                <b>Intervals :</b>
                {trueCount.length > 0 &&
                  trueCount.map((item, i) => {
                    return (
                      <div className="p-0" style={{ fontSize: "12px" }}>
                        <b className="ms-2 p-0">{item.label}</b>:
                        <span className="text-success">{item.count}</span>
                      </div>
                    );
                  })}
              </div>
              {/* <div>
                <b className='text-success'>Green dots showing the result of equation</b>
            </div> */}
            </div>
          )}
        </div>
        {trueCount.length > 0 && (
          <div style={{ marginTop: "-15px", marginLeft: "20px" }}>
            <span className="text-success">
              Note - Green dots showing the result of equation
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Analytics;
