import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Footer, Header } from "../../../components";
import { Theme, matchColor } from "../../../utils/constants";
import ShutterSpeedIcon from "@mui/icons-material/ShutterSpeed";
import WifiTetheringErrorIcon from "@mui/icons-material/WifiTetheringError";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Spin } from "antd";
import {
  Layout,
  Avatar,
  Menu,
  Input,
  Button,
  Checkbox,
  Popconfirm,
  Select,
  ColorPicker,
  Typography,
} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField, Tooltip } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
const { Sider } = Layout;

const DetailMenu = ({
  setHarshBreak,
  harshBreak,
  setAcceleration,
  acceleration,
  setSpeed,
  speed,
  fetchTripHis,
  tripHis,
  vehicle,
  menuList,
  menuCollapsed,
  setSelecCheckParam,
  startAddress,
  endAddress,
  loading,
  setLoading
}) => {
  const history = useHistory();
  const { themeColor } = useSelector(({ User }) => User);
  const [searchedMenuList, setSearchedMenuList] = useState([...tripHis]);
  const [startDateValue, setstartDateValue] = useState(
    dayjs(new moment().toDate())
  );
  const [endDateValue, setendDateValue] = useState(
    dayjs(new moment().toDate())
  );
 

  const handleTrip = (newValue) => {
    setendDateValue(newValue.$d);
    fetchTripData(startDateValue, newValue.$d);
  };

  const fetchTripData = async (startDate, endDate) => {
    setLoading(true); // Set loading to true while fetching data
    try {
      await fetchTripHis(startDate, endDate);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchTripData(startDateValue, endDateValue);
  }, [endDateValue]);

  useEffect(() => {
      setSearchedMenuList([...tripHis]);
       }, [tripHis]);

  const handleCheckboxClick = (index) => {
    const list = searchedMenuList.map((item, innerIndex) => {
      const isChecked = index === innerIndex;
      return {
        ...item,
        checked: isChecked,
      };
    });
  
    setSearchedMenuList(list);
  
    let a = list.filter((item) => item?.checked);
    setSelecCheckParam(a);
  };

  return (
    <div className="absolute md:relative z-30 md:z-0 right-0">
      <Sider
      className="h-screen"
      style={{
        background: "white",
        borderLeft: "1px solid black",
        right: "0px",
      }}
      breakpoint="md"
      collapsedWidth={0}
      trigger={null}
      collapsible
      collapsed={menuCollapsed}
      width={325}
      >
        <div className="detail-menu flex flex-col justify-between h-full">
          <>
            <div
              className="flex"
              style={{
                background: Theme.dark_color,
                marginBottom: "20px",
                color: "white",
              }}
            >
              <LeftCircleOutlined
                className="ps-4 pt-5"
                style={{ fontSize: 20 }}
                onClick={() => history.goBack()}
              />
              <Header
              title={vehicle?.registration_id}
              style={{ fontSize: 19, paddingInline: 0 }}
              />
            </div>
            <div className="">
             {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              </LocalizationProvider>   */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                      className="ms-5"
                        value={startDateValue}
                        label='From Date'
                        onChange={(newValue) => setstartDateValue(newValue.$d)}
                      />
                      <DateTimePicker
                        className="mt-5 ms-5"
                        value={endDateValue}
                        label='End Date'
                        onChange={(newValue) => setendDateValue(newValue.$d)}
                      />
                    </LocalizationProvider> 

            </div>

             
              <Menu
              className="overflow-y-auto mt-4"
              theme="light"
              mode="inline"
              style={{
                color: "black",
                backgroundColor: "white",
                flexGrow: 1,
                height:'70vh',
              }}
              selectable={true}
                items={
                  (loading  )
                      ? [
                          {
                            key: 1,
                            label: <div style={{ display:'flex', justifyContent:"center", padding: '2px'  }}><Spin size="large"  /> </div>,
                          },
                        ]
                        
                  :
                searchedMenuList.map((item, index) => {
                  console.log(item, "triphistorydata");
                  return {
                    key: index,
                    label: (
                      <div className="w-full flex justify-between items-center">
                        <span
                          className="overflow-hidden scroll-smooth"
                          style={{ textOverflow: "ellipsis" }}
                          onClick={() => handleCheckboxClick(index)}
                        >
                          {item?.startAddress?.full_address &&
                          item?.startAddress?.full_address
                            ? `${item.startAddress.full_address?.split(" ").slice(0, 3).join(" ")}`
                            : `${item?.startAddress?.city},${item?.startAddress?.locality}`}
                          &nbsp;To&nbsp;
                          {item?.endAddress?.full_address &&
                          item?.startAddress?.full_address
                            ? `${item?.endAddress?.city} ${item.endAddress.full_address?.split(" ").slice(0, 3).join(" ")}`
                            : `${item?.startAddress?.city},${item.startAddress?.locality}`}
                        </span>
                        {/* <span className="w-5/6 overflow-hidden" style={{textOverflow: 'ellipsis'}} >{startAddress?.locality},{startAddress?.city}  to {endAddress?.locality}, {startAddress?.city}</span> */}
                        {/* <Checkbox
                          checked={item.checked}
                          onClick={(e) =>
                            handleCheckboxClick(e, "select-one", index)
                          }
                        /> */}
                      </div>
                    ),
                  };
                }
                
                
                )
              }
              />
           
          </>

          <Footer
            style={{ background: Theme.dark_color, height: 40 }}
            classes={"justify-evenly"}
          >
            <Tooltip title="Harsh Braking">
              <div onClick={() => setHarshBreak(!harshBreak)}>
                <ShutterSpeedIcon sx={{ cursor: "pointer", color: "white" }} />
              </div>
            </Tooltip>
            <Tooltip title="Over Acceleration">
              <div onClick={() => setAcceleration(!acceleration)}>
                <WifiTetheringErrorIcon
                  sx={{ cursor: "pointer", color: "white" }}
                />
              </div>
            </Tooltip>
            <Tooltip title="Over Speeding">
              <div onClick={() => setSpeed(!speed)}>
                <DirectionsCarIcon sx={{ cursor: "pointer", color: "white" }} />
              </div>
            </Tooltip>
          </Footer>
        </div>
      </Sider>
    </div>
  );
};

export default DetailMenu;
