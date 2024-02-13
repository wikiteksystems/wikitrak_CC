import {Box,Card,Grid,Table,TableBody,TableCell,TableContainer,TableRow,ToggleButton,ToggleButtonGroup,TextField,Button,Typography,styled,Switch,AppBar,Toolbar,IconButton,} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import TableRowsTwoToneIcon from "@mui/icons-material/TableRowsTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { LiveMapActions, LiveMonitorActions } from "../../../stores/actions";
import { loginApi } from "../../../mocks/login";
import { locationsApi } from "../../../mocks/location";
import LineCharts from "./LineCharts";
import { healthsApi } from "../../../mocks/health";
import { emergencyApi } from "../../../mocks/emergency";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import dayjs from "dayjs";
import { AppMenuList, Theme, ThemeColor } from "../../../utils/constants";
import { AppActions, UserActions } from "../../../stores/actions";
import { Layout, Spin } from "antd";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { AppMenu, Header, Footer } from "../../../components";
import Fab from '@mui/material/Fab';
import Home from '@mui/icons-material/Home';
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ReportChart from "./ReportChart";
import './Report.css';
import AppMenu2 from "../../../components/Appmneu2";

const CardWrapper = styled(Card)(
  ({ theme }) => `
  
    position: relative;
    overflow: visible;
  
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: inherit;
      z-index: 1;
      transition: ${theme.transitions.create(["box-shadow"])};
    }
        
      &.Mui-selected::after {
        box-shadow: 0 0 0 3px blue;
      }
    `
);

const Report = ({ setActive, active }) => {
  //  1. Bydefault and actions apply query,filter,page,limit
  //Report 

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [parameters, setParameters] = useState(["1"]);
  const [paginatedParameters, setPaginatedParameters] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectCheckParam, setSelectCheckParam] = useState([]);
  const [startDateValue, setstartDateValue] = useState(
    dayjs(new moment().toDate())
  );
  const [endDateValue, setendDateValue] = useState(
    dayjs(new moment().toDate())
  );
  const [frequency, setFrequency] = useState(5);

  // Redux Setup
  const dispatch = useDispatch();
  const userId = useSelector(({ User }) => User.userId);
  const { vehicleList, vehicleGroupList } = useSelector(
    ({ LiveMap }) => LiveMap
  );
  const [loginData, setLoginData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [healthData, setHealthData] = useState([]);
  const [emergencyData, setEmergencyData] = useState([]);
  const [date, setDate] = useState(false)
  const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(
    ({ App }) => App
  );
  const { login, themeColor, userName } = useSelector(({ User }) => User);
  const { lMonitorParams } = useSelector(({ LiveMonitor }) => LiveMonitor);
  const [chartValue, setChartValue] = useState([]);
  const [parameterValues, setParameterValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [combinedChartData, setCombinedChartData] = useState([]);
  // const handleChangeActive = (event) => {
  //   setLocationData([]);
  //   setLoginData([]);
  //   setHealthData([]);
  //   setEmergencyData([]);
  //   setActive(event.target.checked);
  //   setSelecCheckParam([]);
  //   setstartDateValue(dayjs(new moment().toDate()));
  //   setendDateValue(dayjs(new moment().toDate()));
  // };

  useEffect(() => {
    console.log(lMonitorParams, "lMonitorParams...")
  }, [lMonitorParams])
  const calculateStatistics = (paramData) => {
    console.log(paramData, "paramData...");

    // Check if paramData.data is empty or contains non-numeric values
    const values = paramData.data.map((item) => parseInt(item.value)).filter(value => !isNaN(value));
    
    // Check if values array is empty
    if (values.length === 0) {
        console.log("Error: No valid numeric values found");
        return { min: NaN, max: NaN, avg: NaN };
    }

    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((acc, val) => acc + val, 0) / values.length;

    console.log({ min, max, avg });
    return { min, max, avg };
};


  const fetchData = async (type) => {

    try {
      setLoading(true);

      console.log(selectCheckParam, "selectCheckParam............");

      // Specify the key for which you want to remove duplicates
      const keyToCheck = "param_header";

      // Create a Set to store unique values
      const uniqueValues = new Set();

      // Create a new array for objects with unique values
      const uniqueArrayOfObjects = [];

      // Iterate through the original array
      for (const obj of selectCheckParam) {
        const valueToCheck = obj[keyToCheck];

        // Check if the value is not in the Set
        if (!uniqueValues.has(valueToCheck)) {
          // Add the value to the Set
          uniqueValues.add(valueToCheck);

          // Push the object to the new array
          uniqueArrayOfObjects.push(obj);
        }
      }

      let imeiNo = "";
      if (uniqueArrayOfObjects.length > 0) {
        const filterData = vehicleList.filter(
          (item) => item?.label === uniqueArrayOfObjects[0]?.vehicle_reg
        );
        console.log(filterData);
        if (filterData.length > 0) imeiNo = filterData[0]?.imei[0]?.mac_id;
      }

      // if (type === "one") {
      //   for (let k of uniqueArrayOfObjects) {
      //     console.log(k);
      //     if (k.param_header === "LGN") {
      //       console.log("login packet");
      //       let data = { imei: [imeiNo], type: "one" };
      //       const result = await loginApi.getImeiToReg(data);

      //       if (result.status === "SUCCESS") setLoginData(result.data);
      //     } else if (k.param_header === "NRM") {
      //       console.log("location packet");
      //       let data = { imei: [imeiNo], type: "one" };
      //       const result = await locationsApi.getImeiToReg(data);
      //       console.log(result);
      //       if (result.status === "SUCCESS") setLocationData(result.data);
      //     } else if (k.param_header === "HBT") {
      //       console.log("health packet");
      //       let data = { imei: [imeiNo], type: "one" };
      //       const result = await healthsApi.getImeiToReg(data);
      //       console.log(result);
      //       if (result.status === "SUCCESS") setHealthData(result.data);
      //     } else if (k.param_header === "EPB") {
      //       console.log("emergency packet");
      //       let data = { imei: [imeiNo], type: "one" };
      //       const result = await emergencyApi.getImeiToReg(data);
      //       console.log(result);
      //       if (result.status === "SUCCESS") setEmergencyData(result.data);
      //     }
      //   }
      // } else 
      if (type === "group") {
        console.log(type);
        let location = [];
        let health = [];
        let login = [];
        let emergency = [];

        for (let k of uniqueArrayOfObjects) {
          console.log(k);
          let data = {
            imei: ["861617064605990"],
            type: "group",
            startDate: startDateValue,
            endDate: endDateValue,
            frequency: 5,
          };
          console.log(data);
          if (k.param_header === "LGN") {
            console.log("login packet");
            const result = await loginApi.getImeiToReg(data);
            console.log(result);
            if (result.status === "SUCCESS") {
              login = result.data;
              setLoginData(result.data);
            }
          } else if (k.param_header === "NRM") {
            console.log("location packet");
            const result = await locationsApi.getImeiToReg(data);
            console.log(result, "");
            if (result.status === "SUCCESS") {
              location = result.data;
              setLocationData(result.data);
            }
          } else if (k.param_header === "HBT") {
            console.log("health packet");
            const result = await healthsApi.getImeiToReg(data);
            console.log(result);
            if (result.status === "SUCCESS") {
              health = result.data;
              setHealthData(result.data);
            }
          } else if (k.param_header === "EPB") {
            console.log("emergency packet");
            const result = await emergencyApi.getImeiToReg(data);
            console.log(result);
            if (result.status === "SUCCESS") {
              emergency = result.data;
              setEmergencyData(result.data);
            }
          }
        }

        let arr = [];
        let innerArr = [];
        console.log(location, "timespeed");

        let ab = "imei";

        for (let k of selectCheckParam) {
          console.log(k?.label);
          innerArr = [];
          if (k?.param_header === "LGN") {
            for (let innerK of login) {
              for (let i of innerK?.data) {
                innerArr.push({
                  time: dayjs(i?.createdAt).format("YYYY-MM-DD"),
                  value: i[k?.label],
                });
              }
            }
          } else if (k?.param_header === "NRM") {
            for (let innerK of location) {
              for (let i of innerK?.data) {
                innerArr.push({
                  Date: dayjs(i?.createdAt).format("YYYY-MM-DD"),
                  // value: i[k?.label],
                  value:
                    i[k?.label] === true
                      ? 1
                      : i[k?.label] === false
                        ? 0
                        : i[k?.label],
                  Time: dayjs(i?.createdAt).format("hh:mm:ss A"),
                  label: k?.label,
                  DateTime: dayjs(i?.createdAt).format("YYYY-MM-DD hh:mm:ss A"),
                  // DateTime: `${dayjs(i?.createdAt).format('YYYY-MM-DD')} [${dayjs(i?.createdAt).format('hh:mm:ss A')}]`,
                  // DateTime: `[${dayjs(i?.createdAt).format('hh:mm:ss A')}] ${dayjs(i?.createdAt).format('YYYY-MM-DD')}`,
                });
              }
            }
          }

          arr.push({ data: [...innerArr, k?.label], label: k?.label });
        }
        arr.sort((a, b) => a.date - b.date);
        setChartValue([...arr]);
        console.log(arr, "arrrrrdatatatatatatatat");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    console.log("loading bro....");
  }
  useEffect(() => {
    dispatch(LiveMapActions.getVehicleList(userId));
    fetchData("group");
  }, [dispatch, userId, selectCheckParam]);

  const handleMultiChartUpdate = (item) => {
    console.log(item, "Parameter Values");
    setParameterValues(item);
  };

  useEffect(() => {
    dispatch(LiveMapActions.getVehicleList(userId));
    if (selectedVehicle) {

      dispatch(LiveMonitorActions.getLMonitorParams(selectedVehicle, "vreg_id"));
    }
  }, [dispatch, userId, selectedVehicle]);

  // 8. page change function
  const handlePageChange = async (_event, newPage) => {
    setPage(newPage);
  };

  // 9. limit change function
  const handleLimitChange = async (event) => {
    setLimit(parseInt(event.target.value));
  };

  // 10. change view(grid or table) function
  const [toggleView, setToggleView] = useState("table_view");

  const handleViewOrientation = (_event, newValue) => {
    setToggleView(newValue);
  };

  // Graph function
  const graphData = (arrayData, key) => {
    console.log(arrayData, "graphdata");
    console.log(key, "keyyy");
    let chartData = [];
    for (let k of locationData) {
      chartData.push({
        x: dayjs(new Date(k?.latestDocument?.createdAt)).format("DD-MM-YY"),
        y: k[key],
      });
    }

    console.log(chartData, "graphdatachart");

    return chartData;
  };

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

  const chartData = [
    {
      x: new Date("2023-01-01").getTime(),
      y: 10,
    },
    {
      x: new Date("2023-01-02").getTime(),
      y: 20,
    },
    {
      x: new Date("2023-01-03").getTime(),
      y: 15,
    },
    {
      x: new Date("2023-01-04").getTime(),
      y: 30,
    },
    {
      x: new Date("2023-01-05").getTime(),
      y: 25,
    },
  ];

  const graphData1 = () => {
    return chartData;
  };
  const chartOptions = {
    chart: {
      type: "line",
      foreColor: "#333",
      stacked: false,
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      background: {
        opacity: 0, // Set the opacity of the background to 0
      },
    },
    stroke: {
      show: true,
      colors: "black",
      width: 2,
    },
    xaxis: {
      type: "datetime",
    },
    fill: {
      type: "gradient", // You can also use 'solid' for a solid color fill
      gradient: {
        shade: "light", // 'light' or 'dark' for gradient shading
        shadeIntensity: 0.4, // 0.1 to 1 (controls the intensity of the shading)
        opacityFrom: 0.7,
        opacityTo: 0.7,
      },
    },
  };

  const handleMainMenuCollapse = () => {
    dispatch(AppActions.setMainMenuCollapsed(!mainMenuCollapsed));
  };
  const handleDetailMenuCollapse = () => {
    dispatch(AppActions.setDetailMenuCollapsed(!detailMenuCollapsed));
  };



  const combineChartData = () => {
    let combinedData = [];

    for (const item of selectCheckParam) {
      const lineData = chartValue.find(
        (data) => data.label === item.label
      )?.data;

      if (lineData) {
        combinedData.push({
          label: item.label,
          data: lineData.map((point) => ({
            time: point.time, // Assuming 'time' is the common x-axis value
            value: point.value, // Use the value from each line
          })),
        });
      }
    }

    setCombinedChartData(combinedData);
  };

  useEffect(() => {
    combineChartData();
  }, [chartValue, selectCheckParam]);

  const handleParamChange = (e) => {
    const selectedValues = e.target.value; // Selected values should be an array
    const selectedParameters = lMonitorParams.filter(
      (param) => selectedValues.includes(param.label)
    );
    setSelectCheckParam(selectedParameters);
  };

  const handleExport = () => {
    const exportData = selectCheckParam.reduce((acc, param) => {
      const paramData = parameterValues.find(
        (item) => item.label === param.label
      );
      if (paramData) {
        return acc.concat(
          paramData.data.map((item) => ({
            Parameter: param.label,
            Time: item.time,
            Value: item.value,
          }))
        );
      }
      return acc;
    }, []);

    const csvContent = `${Object.keys(exportData[0]).join(",")}\n${exportData
      .map((row) => Object.values(row).join(","))
      .join("\n")}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Layout className="flex h-screen">
        <Layout>
          <div className="md:block hidden">
            <AppMenu activePage={2} menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
          </div>

          <div className="md:hidden">
            <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
          </div>

          <Layout style={{ flex: '1 1 auto' }} className="h-screen">
            <Header title={'Report'} showText={false} hideArrow={true} style={{ justifyContent: 'space-between', background: Theme.dark_color}} />

            <div className="row gx-3" style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "30px" }}>
              <div className="col mt-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    className="pe-5"
                    label="From Date"
                    value={startDateValue}
                    onChange={(newValue) => setstartDateValue(newValue)}
                  />
                </LocalizationProvider>
              </div>
              <div className="col mt-3">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="End Date"
                    value={endDateValue}
                    onChange={(newValue) => setendDateValue(newValue)}
                  />
                </LocalizationProvider>
              </div>
              <div className="col mt-1">
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Registration Id</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    style={{ width: '300px' }}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    value={selectedVehicle}
                    input={<OutlinedInput label="Registration Id" />}
                    displayEmpty
                  >
                    {vehicleList.map((item) => (
                      <MenuItem key={item.id} value={item.registration_id}>
                        {item?.registration_id}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col mt-1">
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="demo-multiple-checkbox-label">Parameter</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    style={{ width: '300px' }}
                    multiple
                    value={selectCheckParam.map(param => param.label)} // Set value as an array of labels
                    input={<OutlinedInput label="Parameter" />}
                    onChange={handleParamChange}
                    displayEmpty
                  >
                    {/* <MenuItem value="" disabled>
                    Select Parameter
                  </MenuItem> */}
                    {lMonitorParams.length > 0 &&
                      lMonitorParams.map((parameter, index) => (
                        <MenuItem key={parameter.id} value={parameter.label}>
                          <Checkbox
                            checked={selectCheckParam.some(param => param.label === parameter.label)}
                          />
                          {parameter.label} - {parameter.param_type}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              
              <div className="col mt-3">
                <Button
                  className="text-white"
                  style={{
                    background: Theme.light_color,
                    width: 150,
                    height: 50,
                  }}
                  onClick={handleExport}
                >
                  Export
                </Button>
              </div>
            </div>
            <div className="row">
            <div className="col-6">
            <table class="container" style={{ margin: "40px" }}>
                <thead className="text-white">
                  <tr>
                    <th>Parameter</th>
                    <th>Minimum</th>
                    <th>Maximum</th>
                    <th>Average</th>
                  </tr>
                </thead>
                <tbody>
                  {parameterValues.map((paramData) => (
                    <tr key={paramData.label}>
                      <td>{paramData.label}</td>
                      <td>{calculateStatistics(paramData).min}</td>
                      <td>{calculateStatistics(paramData).max}</td>
                      <td>{calculateStatistics(paramData).avg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div className="col-6">
                <Box
                  sx={{
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  {loading ? (
                    <Spin
                      tip="loading..."
                      size="large"
                      style={{ marginTop: "5%" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "grid",
                        // gap: "5px",
                        padding: "5px",
                        paddingLeft: '50px'
                      }}
                    >
                      {selectCheckParam.length === 0 ? (
                        <Card> </Card>
                      ) : (
                        chartValue &&
                        chartValue.length > 0 && (
                          <Card sx={{ padding: "10px" }}>
                            <ReportChart
                              item={chartValue}
                              onUpdate={handleMultiChartUpdate}
                            />
                          </Card>
                        )
                      )}
                    </Box>
                  )}
                </Box>
              </div>
            </div>


            <div className="row" style={{ marginTop: "30px"}}>
              <div className="col-12" style={{textAlign: 'center'}}>
                <table class="container" style={{ marginLeft: "40px" }}>
                  <thead>
                    <tr>
                      {selectCheckParam.map((param) => (
                        <th key={param.id} style={{color: 'white'}}>
                          <Typography>{param.label}</Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={selectCheckParam.length}>
                          <Spin size="large" />
                        </td>
                      </tr>
                    ) : parameterValues.length > 0 ? (
                      parameterValues[0]?.data.slice(0, 3).map((_, index) => (
                        <tr key={index}>
                          {parameterValues.map((paramData) => (
                            <td key={paramData.label}>
                              <ul>
                                <li>
                                  <span>{paramData.data[index]?.value}</span>
                                </li>
                              </ul>
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : null
                    }
                  </tbody>
                </table>
              </div>
              
            </div>

          </Layout>
        </Layout>
        <div className="hidden">
          <Footer>Powered By&nbsp; <b><i>autopeepal</i></b></Footer>
        </div>

        <div className="block md:hidden">
          <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: ThemeColor.dark_color }}>
            <Toolbar>
              <IconButton color="inherit" aria-label="open drawer">
                <MenuIcon onClick={handleMainMenuCollapse} />
              </IconButton>
              <StyledFab style={{ background: ThemeColor.light_color, color: 'white' }} aria-label="add">
                <Home />
              </StyledFab>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton color="inherit">
                <PlayArrowOutlined sx={{ fontSize: '35px' }} onClick={handleDetailMenuCollapse} />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </Layout>
    </>
  );
};
export default Report;
