import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AppMenu, Navbar, Header, Footer } from "../../../components";
import { AppMenuList, ThemeColor } from "../../../utils/constants";
import { AppActions, LiveMonitorActions } from "../../../stores/actions";
import DetailMenu from "./DetailMenu";

import { Layout } from "antd";
import { useState } from "react";
import LiveContent from "./LiveContent";
import { locationsApi } from "../../../mocks/location";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Home from "@mui/icons-material/Home";
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from "@mui/icons-material/PlayArrowOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import Fab from "@mui/material/Fab";
import AppMenu2 from "../../../components/Appmneu2";
import LocationOnSharpIcon from "@mui/icons-material/LocationOnSharp";
import axios from "axios";

const { Content } = Layout;

const TripHistory = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(({ User }) => User.userId);
  const { lMonitorParams } = useSelector(({ LiveMonitor }) => LiveMonitor);
  const { activeVehicle: vehicle } = useSelector(({ LiveMap }) => LiveMap);
  const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(
    ({ App }) => App
  );
  const [selectCheckParam, setSelecCheckParam] = useState([]);
  const [tripHis, setTripHis] = useState([]);
  const [harshBreak, setHarshBreak] = useState(false);
  const [acceleration, setAcceleration] = useState(false);
  const [speed, setSpeed] = useState(false);
  const [tripHistory, setTripHistory] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading

  const fetchTripHis = async (startDate, endDate) => {
    if (vehicle?.imei.length > 0 && startDate && endDate) {
      console.log(vehicle, "Trip");
      // Construct the request data
      let data = { imei: vehicle?.imei[0]?.mac_id, startDate, endDate };

      try {
        setLoading(true)
        // Make the API request
        const result = await locationsApi.getTripHistory(data);

        // Check if the request was successful
        if (result.status === "SUCCESS") {
          // Extract the trip history data from the response
          const tripData = result?.data?.documents;
          setTripHis([...tripData]); // Set the trip history state with the fetched data
          setLoading(false)
          // Additional processing, if needed
          // ...
        } else {
          // Handle error cases
          console.error("Failed to fetch trip history:", result.error);
          // Additional error handling, if needed
          // ...
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error fetching trip history:", error);
        // Additional error handling, if needed
        // ...
      }
    }
  };

  // useEffect(() =>{
  //       fetchTripHis();
  // },[vehicle])

  useEffect(() => {
    if (Object.keys(vehicle).length === 0) {
      history.goBack();
      return;
    }
  }, [history, vehicle]);

  useEffect(() => {
    console.log(vehicle);
    dispatch(AppActions.setMainMenuCollapsed(true));
    dispatch(
      LiveMonitorActions.getLMonitorParams(vehicle.registration_id, "vreg_id")
    );
    dispatch(LiveMonitorActions.getLMonitorParamGroups(userId));
  }, [dispatch, userId, vehicle]);

  useEffect(() => {
    console.log(selectCheckParam);
  }, [selectCheckParam]);

  const [startAddress, setStartAddress] = useState();
  const [endAddress, setEndAddress] = useState();

  // const getStartAddress = async (lat,lng) =>{
  //   try{
  //   let result = await axios(`${process.env.REACT_APP_API3_URL}/ccServer/location/getAddressFromCoordinates?lat=${lat}&lng=${lng}`)
  //   console.log(result?.data)
  //     setStartAddress(result.data?.data)
  //   } catch(err){
  //     console.log(err)
  //   }
  // }

  // const getEndAddress = async (lat,lng) =>{
  //     try{
  //     let result = await axios(`${process.env.REACT_APP_API3_URL}/ccServer/location/getAddressFromCoordinates?lat=${lat}&lng=${lng}`)
  //     console.log(result?.data)
  //       setEndAddress(result.data?.data)
  //     } catch(err){
  //       console.log(err)
  //     }
  //   }

  // useEffect(() =>{
  //     getStartAddress(tripHis[0]?.data[0]?.lat,tripHis[0]?.data[0]?.lng)
  //     getEndAddress(tripHis[0]?.data[tripHis[0]?.data.length-1]?.lat,tripHis[0]?.data[tripHis[0]?.data.length-1]?.lng)
  // },[tripHis])

  const getStartAddress = async (lat, lng) => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_API3_URL}/ccServer/location/getAddressFromCoordinates?lat=${lat}&lng=${lng}`
      );
      return result.data?.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const getEndAddress = async (lat, lng) => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_API3_URL}/ccServer/location/getAddressFromCoordinates?lat=${lat}&lng=${lng}`
      );
      return result.data?.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    // Fetch start and end addresses for each trip
    const fetchAddresses = async () => {
      setLoading(true)
      const updatedTripHistory = await Promise.all(
        tripHis.map(async (trip) => {
          const startLocation = trip.data[0];
          const endLocation = trip.data[trip.data.length - 1];

          const startAddress = await getStartAddress(
            startLocation.lat,
            startLocation.lng
          );
          const endAddress = await getEndAddress(
            endLocation.lat,
            endLocation.lng
          );
          // console.log(startLocation, endLocation,"xxxxx")

          return {
            ...trip,
            startAddress,
            endAddress,
          };
        })
      );
      console.log("tripdata ", updatedTripHistory);
      // console.log("tripold",tripHis);
      setTripHistory(updatedTripHistory);
      setLoading(false)

    };

    fetchAddresses();
  }, [tripHis]);
//   useEffect(() =>{
//     getStartAddress(tripHis[0]?.data[0]?.lat,tripHis[0]?.data[tripHis[0]?.data.length-1]?.lng)
//     getEndAddress(tripHis[0]?.data[0]?.lat,tripHis[0]?.data[tripHis[0]?.data.length-1]?.lng)
//     console.log(tripHis) 
// },[tripHis])

  const StyledFab = styled(Fab)({
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  });

  const handleMainMenuCollapse = () => {
    dispatch(AppActions.setMainMenuCollapsed(!mainMenuCollapsed));
  };
  const handleDetailMenuCollapse = () => {
    dispatch(AppActions.setDetailMenuCollapsed(!detailMenuCollapsed));
  };

  return (
    <Layout className="flex h-screen">
      {/* <Navbar /> */}

      <Layout className="h-screen">
        <div className="md:block hidden">
          <AppMenu activePage ={1} menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
        </div>

        <div className="md:hidden block">
          <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
        </div>

        <Layout style={{ flex: "1 1 auto" }} className="h-screen">
          <Header
            title={"Trip History"}
            showText={false}
            style={{ justifyContent: "space-between" }}
          />

          <Content style={{ width: "100%",overflowY:"hidden" }} className="h-screen">
            <LiveContent
              harshBreak={harshBreak}
              acceleration={acceleration}
              speed={speed}
              selectCheckParam={selectCheckParam}
              setSelecCheckParam={setSelecCheckParam}
              tripHis={tripHis} // Pass trip data to LiveContent
            />
          </Content>
        </Layout>

        <DetailMenu
          setHarshBreak={setHarshBreak}
          harshBreak={harshBreak}
          setAcceleration={setAcceleration}
          acceleration={acceleration}
          setSpeed={setSpeed}
          speed={speed}
          fetchTripHis={fetchTripHis}
          tripHis={tripHistory}
          vehicle={vehicle}
          menuList={lMonitorParams}
          menuCollapsed={detailMenuCollapsed}
          setSelecCheckParam={setSelecCheckParam}
          startAddress={startAddress}
          endAddress={endAddress}
          loading ={loading}
          setLoading={setLoading}
        />
      </Layout>

      <div className="hidden">
        <Footer>
          Powered By &nbsp;{" "}
          <b>
            <i>autopeepal</i>
          </b>
        </Footer>
      </div>

      <div className="block md:hidden">
        <AppBar
          position="fixed"
          sx={{ top: "auto", bottom: 0, background: ThemeColor.light_color_1 }}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon onClick={handleMainMenuCollapse} />
            </IconButton>
            <StyledFab
              style={{ background: ThemeColor.light_color_2, color: "white" }}
              aria-label="add"
            >
              <LocationOnSharpIcon style={{ fontSize: "30px" }} />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton color="inherit">
              <PlayArrowOutlined
                sx={{ fontSize: "35px" }}
                onClick={handleDetailMenuCollapse}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    </Layout>
  );
};

export default TripHistory;
