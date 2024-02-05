import {
  Box,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
  Typography,
  styled,
  Switch,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import TableRowsTwoToneIcon from "@mui/icons-material/TableRowsTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { LiveMapActions } from "../../../stores/actions";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ThemeColor } from "../../../utils/constants";
import {
  LeftCircleOutlined,
  MenuOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { AppActions, UserActions } from "../../../stores/actions";
import { Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import CombinedCharts from "./CombinedChart";
import ZoomableLineChart from "./LineCharts";

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

const LiveContent = ({ selectCheckParam, setSelecCheckParam }) => {
  //  1. Bydefault and actions apply query,filter,page,limit

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [parameters, setParameters] = useState(["1"]);
  const [paginatedParameters, setPaginatedParameters] = useState({});

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
  const [active, setActive] = useState(false);

  const handleChangeActive = (event) => {
    setLocationData([]);
    setLoginData([]);
    setHealthData([]);
    setEmergencyData([]);
    setActive(event.target.checked);
    setSelecCheckParam([]);
    setstartDateValue(dayjs(new moment().toDate()));
    setendDateValue(dayjs(new moment().toDate()));
  };

  const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(
    ({ App }) => App
  );
  const { login, themeColor, userName } = useSelector(({ User }) => User);

  const [chartValue, setChartValue] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (type) => {
    try {
      setLoading(true);

      console.log(selectCheckParam, "selectCheckParam");

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
      if (type === "one") {
        for (let k of uniqueArrayOfObjects) {
          console.log(k);
          if (k.param_header === "LGN") {
            console.log("login packet");
            let data = { imei: [imeiNo], type: "one" };
            const result = await loginApi.getImeiToReg(data);

            if (result.status === "SUCCESS") setLoginData(result.data);
          } else if (k.param_header === "NRM") {
            console.log("location packet");
            let data = { imei: [imeiNo], type: "one" };
            const result = await locationsApi.getImeiToReg(data);
            console.log(result);
            if (result.status === "SUCCESS") setLocationData(result.data);
          } else if (k.param_header === "HBT") {
            console.log("health packet");
            let data = { imei: [imeiNo], type: "one" };
            const result = await healthsApi.getImeiToReg(data);
            console.log(result);
            if (result.status === "SUCCESS") setHealthData(result.data);
          } else if (k.param_header === "EPB") {
            console.log("emergency packet");
            let data = { imei: [imeiNo], type: "one" };
            const result = await emergencyApi.getImeiToReg(data);
            console.log(result);
            if (result.status === "SUCCESS") setEmergencyData(result.data);
          }
        }
      } else if (type === "group") {
        console.log(type);
        let location = [];
        let health = [];
        let login = [];
        let emergency = [];
        for (let k of uniqueArrayOfObjects) {
          console.log(k);
          let data = {
            imei: [imeiNo],
            type: "group",
            startDate: startDateValue,
            endDate: endDateValue,
            frequency: frequency,
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
            console.log(result, "bhushanlocatongraph");
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
    fetchData("one");
  }, [dispatch, userId, selectCheckParam]);

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

  const [combinedChartData, setCombinedChartData] = useState([]);

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

  return (
    <Box
      sx={{
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxHeight: "1000px",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          background: ThemeColor.light_color_1,
          padding: "10px 10px",
          display: "flex",
          gap: "30px",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="hidden md:flex  font-bold text-2xl  justify-between items-center">
          {login && (
            <MenuOutlined
              className="w-6 h-5"
              style={{ fontSize: 20 }}
              onClick={handleMainMenuCollapse}
            />
          )}
        </div>
        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              sm: "18px",
              md: "22px",
              justifyContent: "center",
              textAlign: "center",
              flex: "auto",
            },
          }}
        >
          Telematic Parameter
        </Typography>

        <div className="hidden md:flex    justify-center items-center">
          {detailMenuCollapsed ? (
            <LeftCircleOutlined
              className=""
              style={{ fontSize: 30 }}
              onClick={handleDetailMenuCollapse}
            />
          ) : (
            <RightCircleOutlined
              className=""
              style={{ fontSize: 30 }}
              onClick={handleDetailMenuCollapse}
            />
          )}
        </div>
      </Box>

      <div className="d-flex" style={{ display: "flex" }}>
        {/* Your first Box content */}
        <Box
          sx={{
            padding: "5px 5px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "3px 0px 0px 10px",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "14px", sm: "18px", md: "20px" },
                color: "black",
                marginRight: "5px",
              }}
            >
              Live
            </Typography>
            <Switch
              size="small"
              checked={active}
              onChange={(event) => handleChangeActive(event)}
            />
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "18px",
                  md: "20px",
                  color: "black",
                  marginRight: "5px",
                },
              }}
            >
              History
            </Typography>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ToggleButtonGroup
              sx={{
                mt: { xs: 2, sm: 0 },
              }}
              value={toggleView}
              exclusive
              onChange={handleViewOrientation}
            >
              <ToggleButton disableRipple value="table_view">
                <TableRowsTwoToneIcon
                  sx={{
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    color: "black",
                  }}
                />
              </ToggleButton>
              <ToggleButton disableRipple value="grid_view">
                <GridViewTwoToneIcon
                  sx={{
                    color: "#fff",
                    fontSize: { xs: "16px", sm: "18px", md: "20px" },
                    color: "white",
                    background: "black",
                  }}
                />
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              style={{
                border: "1px solid black",
                padding: "5px",
                margin: "5px",
              }}
              onClick={() => fetchData("one")}
            >
              <RefreshIcon style={{ color: "black" }} />
            </Button>
          </div>
        </Box>

        {/* Your second Box content */}
        {active && (
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              margin: "15px 0px 5px",
              justifyContent: "flex-end",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={startDateValue}
                label="From Date"
                onChange={(newValue) => setstartDateValue(newValue.$d)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                value={endDateValue}
                label="End Date"
                onChange={(newValue) => setendDateValue(newValue.$d)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>

            <TextField
              label="Frequency"
              name="frequency"
              onChange={(e) => setFrequency(e.target.value)}
              type="number"
              value={frequency}
              variant="outlined"
            />
            <div
              onClick={() => fetchData("group")}
              style={{
                background: "#4071C9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                width: "40px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <KeyboardArrowRightIcon sx={{ color: "#fff" }} />
            </div>
          </Box>
        )}
      </div>

      {/* //table// */}
      {!active ? (
        <>
          <Box className="d-flex justify-content-center " mb={3}>
            {toggleView === "table_view" && (
              <Card style={{ height: "auto", width: "800px" }}>
                {selectCheckParam.length === 0 ? (
                  <>
                    <div
                      variant="h5"
                      fontWeight="normal"
                      color="text.secondary"
                      align="center"
                    >
                      Please Select Parameters in side menu
                    </div>
                  </>
                ) : (
                  <>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {selectCheckParam &&
                            selectCheckParam.map((item, index) => {
                              console.log(item);
                              if (item.param_header === "LGN") {
                                // Use a React.Fragment to enclose multiple JSX elements
                                console.log(true, "trye");
                                return (
                                  <React.Fragment key={index}>
                                    {loginData.length > 0 &&
                                      loginData.map((loginItem, innerIndex) => {
                                        console.log(
                                          loginItem?.latestDocument[
                                            item?.label.replace(
                                              /[^a-zA-Z0-9]/g,
                                              ""
                                            )
                                          ],
                                          "this is login Item",
                                          item?.label
                                        );
                                        return (
                                          <TableRow hover key={innerIndex}>
                                            <TableCell>
                                              <Typography>
                                                {item?.label}
                                              </Typography>
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                              }}
                                            >
                                              <Typography>
                                                {
                                                  loginItem?.latestDocument[
                                                    item?.label.replace(
                                                      /[^a-zA-Z0-9]/g,
                                                      ""
                                                    )
                                                  ]
                                                }{" "}
                                                {item?.unit}
                                              </Typography>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                  </React.Fragment>
                                );
                              }
                              // If the condition is not met, return null or an empty element
                              return null;
                            })}

                          {selectCheckParam.map((item, index) => {
                            console.log(
                              item,
                              "checked click",
                              "checked parames",
                              selectCheckParam
                            );
                            if (item.param_header === "NRM") {
                              // Use a React.Fragment to enclose multiple JSX elements

                              return (
                                <React.Fragment key={index}>
                                  {locationData.length > 0 &&
                                    locationData.map(
                                      (loginItem, innerIndex) => (
                                        <Table hover key={innerIndex}>
                                          <tbody>
                                            <tr
                                              style={{
                                                border: "1px solid black",
                                              }}
                                              className="mb-3"
                                            >
                                              <td className="p-3">
                                                <span>{item.label}</span>
                                              </td>
                                              <td
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "flex-end",
                                                  padding: "10px",
                                                }}
                                              >
                                                <span>
                                                  {typeof loginItem
                                                    .latestDocument[
                                                    item.label
                                                  ] === "boolean"
                                                    ? loginItem.latestDocument[
                                                        item.label
                                                      ]
                                                      ? "on"
                                                      : "off"
                                                    : loginItem.latestDocument[
                                                        item.label
                                                      ]}{" "}
                                                  {item.unit}
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </Table>
                                      )
                                    )}
                                </React.Fragment>
                              );
                            }
                            // If the condition is not met, return null or an empty element
                            return null;
                          })}

                          {selectCheckParam.map((item, index) => {
                            console.log(item);
                            if (item.param_header === "EPB") {
                              // Use a React.Fragment to enclose multiple JSX elements
                              console.log(true);
                              return (
                                <React.Fragment key={index}>
                                  {emergencyData.length > 0 &&
                                    emergencyData.map(
                                      (loginItem, innerIndex) => {
                                        console.log(
                                          loginItem,
                                          "this is login Item"
                                        );
                                        return (
                                          <TableRow hover key={innerIndex}>
                                            <TableCell>
                                              <Typography>
                                                {item?.label}
                                              </Typography>
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                              }}
                                            >
                                              <Typography>
                                                {
                                                  loginItem?.latestDocument[
                                                    item?.label
                                                  ]
                                                }{" "}
                                                {item?.unit}
                                              </Typography>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    )}
                                </React.Fragment>
                              );
                            }
                            // If the condition is not met, return null or an empty element
                            return null;
                          })}

                          {selectCheckParam.map((item, index) => {
                            console.log(item, "hbt");
                            if (item.param_header === "HBT") {
                              // Use a React.Fragment to enclose multiple JSX elements
                              console.log(true);
                              return (
                                <React.Fragment key={index}>
                                  {healthData.length > 0 &&
                                    healthData.map((loginItem, innerIndex) => {
                                      console.log(
                                        loginItem,
                                        "this is login Item"
                                      );
                                      return (
                                        <TableRow hover key={innerIndex}>
                                          <TableCell>
                                            <Typography>
                                              {item?.label}
                                            </Typography>
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              display: "flex",
                                              justifyContent: "flex-end",
                                            }}
                                          >
                                            <Typography>
                                              {
                                                loginItem?.latestDocument[
                                                  item?.label
                                                ]
                                              }{" "}
                                              {item?.unit}
                                            </Typography>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                </React.Fragment>
                              );
                            }
                            // If the condition is not met, return null or an empty element
                            return null;
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                )}
              </Card>
            )}

            {toggleView === "grid_view" && (
              <>
                {/* <Card
                  sx={{
                    p: 2,
                    mb: 3
                  }}
                >

                </Card> */}
                {selectCheckParam.length === 0 ? (
                  <>
                    <Typography
                      sx={{
                        py: 10,
                      }}
                      variant="h5"
                      fontWeight="normal"
                      color="text.secondary"
                      align="center"
                    >
                      {/* We couldn't find any users matching your search criteria */}
                      Please Select Parameter
                    </Typography>
                  </>
                ) : (
                  <>
                    <Grid container spacing={3}>
                      {selectCheckParam.map((item, index) => {
                        if (item.param_header === "LGN") {
                          return (
                            <>
                              {loginData.length > 0 &&
                                loginData.map((loginItem, innerIndex) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={innerIndex}
                                  >
                                    <CardWrapper>
                                      <Box
                                        sx={{
                                          position: "relative",
                                          zIndex: "2",
                                          backgroundColor: `#${item?.param_group_color}`,
                                          border: "1px solid #000",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <Box
                                          pl={2}
                                          py={1}
                                          pr={1}
                                          display="flex"
                                          flexDirection="column"
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <Typography>{item?.label}</Typography>
                                          <Typography variant="h5">
                                            {
                                              loginItem?.latestDocument[
                                                item?.label.replace(
                                                  /[^a-zA-Z0-9]/g,
                                                  ""
                                                )
                                              ]
                                            }
                                          </Typography>
                                          <Typography>{item?.unit}</Typography>
                                        </Box>
                                      </Box>
                                    </CardWrapper>
                                  </Grid>
                                ))}
                            </>
                          );
                        }
                      })}

                      {selectCheckParam.map((item, index) => {
                        if (item.param_header === "NRM") {
                          return (
                            <>
                              {locationData.length > 0 &&
                                locationData.map((loginItem, innerIndex) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={innerIndex}
                                  >
                                    <div
                                      className="position-relative"
                                      style={{
                                        zIndex: "2",
                                        background:
                                          "linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)",
                                        minHeight: "85px",
                                        padding: "20px",
                                      }}
                                    >
                                      <div className="pl-2 py-1 pr-1 d-flex flex-column align-items-center justify-content-center">
                                        <h6 className="text-white">
                                          {item?.label}
                                        </h6>
                                        <h4
                                          style={{
                                            color: loginItem.latestDocument[
                                              item.label
                                            ]
                                              ? "yellow"
                                              : "red",
                                          }}
                                        >
                                          {typeof loginItem.latestDocument[
                                            item.label
                                          ] === "boolean"
                                            ? loginItem.latestDocument[
                                                item.label
                                              ]
                                              ? "on"
                                              : "off"
                                            : loginItem.latestDocument[
                                                item.label
                                              ]}{" "}
                                          {item.unit}
                                        </h4>
                                        <p className="text-white">
                                          {item?.unit}
                                        </p>
                                      </div>
                                    </div>
                                  </Grid>
                                ))}
                            </>
                          );
                        }
                      })}

                      {selectCheckParam.map((item, index) => {
                        if (item.param_header === "EPB") {
                          return (
                            <>
                              {emergencyData.length > 0 &&
                                emergencyData.map((loginItem, innerIndex) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={innerIndex}
                                  >
                                    <CardWrapper>
                                      <Box
                                        sx={{
                                          position: "relative",
                                          zIndex: "2",
                                          backgroundColor: `#${item?.param_group_color}`,
                                        }}
                                      >
                                        <Box
                                          pl={2}
                                          py={1}
                                          pr={1}
                                          display="flex"
                                          flexDirection="column"
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <Typography>{item?.label}</Typography>
                                          <Typography variant="h5">
                                            {
                                              loginItem?.latestDocument[
                                                item?.label.replace(
                                                  /[^a-zA-Z0-9]/g,
                                                  ""
                                                )
                                              ]
                                            }
                                          </Typography>
                                          <Typography>{item?.unit}</Typography>
                                        </Box>
                                      </Box>
                                    </CardWrapper>
                                  </Grid>
                                ))}
                            </>
                          );
                        }
                      })}

                      {selectCheckParam.map((item, index) => {
                        if (item.param_header === "HBT") {
                          return (
                            <>
                              {healthData.length > 0 &&
                                healthData.map((loginItem, innerIndex) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={innerIndex}
                                  >
                                    <CardWrapper>
                                      <Box
                                        sx={{
                                          position: "relative",
                                          zIndex: "2",
                                          backgroundColor: `#${item?.param_group_color}`,
                                        }}
                                      >
                                        <Box
                                          pl={2}
                                          py={1}
                                          pr={1}
                                          display="flex"
                                          flexDirection="column"
                                          alignItems="center"
                                          justifyContent="center"
                                        >
                                          <Typography>{item?.label}</Typography>
                                          <Typography variant="h5">
                                            {
                                              loginItem?.latestDocument[
                                                item?.label.replace(
                                                  /[^a-zA-Z0-9]/g,
                                                  ""
                                                )
                                              ]
                                            }
                                          </Typography>
                                          <Typography>{item?.unit}</Typography>
                                        </Box>
                                      </Box>
                                    </CardWrapper>
                                  </Grid>
                                ))}
                            </>
                          );
                        }
                      })}
                    </Grid>
                  </>
                )}
              </>
            )}
          </Box>
        </>
      ) : (
        <Box
          sx={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            flex: "auto",
          }}
        >
          {loading ? (
            <Spin tip="loading..." size="large" style={{ marginTop: "5%" }} />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                padding: "20px",
              }}
            >
              <CombinedCharts combinedChartData={combinedChartData} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
export default LiveContent;
