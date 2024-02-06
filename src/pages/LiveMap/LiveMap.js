import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppMenu, Navbar, Header, Footer } from "../../components";
import { AppMenuList, ThemeColor } from "../../utils/constants";
import { LiveMapUtils } from "../../utils";
import { LiveMapActions } from "../../stores/actions";
import { DetailMenu, MapSection } from "./";

import { Layout } from "antd";
import { locationsApi } from "../../mocks/location";
import { useState } from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Home from "@mui/icons-material/Home";
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from "@mui/icons-material/PlayArrowOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import Fab from "@mui/material/Fab";
import { AppActions, UserActions } from "../../stores/actions";
// import AppMenu2 from "../../components/AppMenu2";
import { socket } from "../../services/Socket";

const { Content } = Layout;

const LiveMap = () => {
  const { activeParametersList, cooridinates_obj } = useSelector(
    ({ LiveMap }) => LiveMap
  );
  const dispatch = useDispatch();
  const userId = useSelector(({ User }) => User.userId);
  const [gtLocation, setGtLocation] = useState({
    lat: 19.075983,
    lng: 72.877655,
  });
  const [gtVehi, setGtVehi] = useState();
  const [wikitekVehi, setwikitekVehi] = useState();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  const [lat, setLat] = useState(null);
  const [long, setLonng] = useState(null);

  const { vehicleList, vehicleGroupList } = useSelector(
    ({ LiveMap }) => LiveMap
  );
  const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(
    ({ App }) => App
  );
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    dispatch(LiveMapActions.getVehicleList(userId));
    dispatch(LiveMapActions.getOEMList());
    dispatch(LiveMapActions.getVehicleGroupList(userId));
  }, [dispatch, userId]);
  // console.log(locationData,"livemappplocation");
  const fetchImeiData = async () => {
    let imei = [];
    for (let k of vehicleList) {
      for (let i of k?.imei) {
        imei.push(i?.mac_id);
      }
    }
    let data = { imei, type: "one" };
    let result = await locationsApi.getImeiToReg(data);
    console.log(result, "result");
    if (result?.status === "SUCCESS") {
      setLocationData(result?.data);
    } else {
      setLocationData([]);
    }
  };

  useEffect(() => {
    if (vehicleList && vehicleList?.length > 0) fetchImeiData();
    // console.log(vehicleList,'this is vehicle list')
    // console.log(vehicleGroupList)
  }, [vehicleList, vehicleGroupList]);

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

  useEffect(() => {
    socket.on("locationinfo", (data) => {
      console.log(
        "live data=>",
        data,
        "data parameter==>",
        activeParametersList,
        "live =>imei",
        data.imei,
        "selected imei--->",
        activeParametersList[0].imei
      );
      if (data.imei === activeParametersList[0].imei) {
        activeParametersList[0].params.map((param) => {
          let par = param.label;

          param.value = data[par];
        });
        dispatch(LiveMapActions.addParameter(activeParametersList));
      }
      // const gt06Data = locationData.filter((item) => item.latestDocument.venderId === 'GT-06');
      const gt06Data = locationData.filter(
        (item) =>
          item.latestDocument.venderId === "WTK4G06" ||
          item.latestDocument.venderId === "WTK2G06"
      );
      //

      locationData.map((item) => {
        // let c_data={};
        // if(Object.keys(cooridinates_obj).length === 0){
        //   let obj={lat:item.latestDocument.lat,lng:item.latestDocument.lng};
        //   data[item.latestDocument.imei]=[obj]
        // }
        // dispatch(LiveMapActions.add_cooridinates_to_obj(data));
        if (item.latestDocument.imei === data.imei) {
          item.latestDocument.lat = data.lat;
          item.latestDocument.lng = data.lng;
          // item.latestDocument.lat=18.566526;
          // item.latestDocument.lng=73.912239;
        }
        //  console.log('activeParameters list',activeParametersList);
      });
      setGtVehi(locationData);

      // console.log('coordinates1',cooridinates_obj,gt06Data);
      // let coordinates=cooridinates_obj
      // if(coordinates.hasOwnProperty(data.imei)){
      //   let obj={lat:data.lat,lng:data.lng};
      //   // let obj={lat:18.566526,lng:73.912239};
      //   coordinates[data.imei].push(obj)
      //  }
      //  dispatch(LiveMapActions.add_cooridinates_to_obj(coordinates));
      //  console.log('updated coordinates1',cooridinates_obj,gt06Data);
    });
  }, [socket, locationData, activeParametersList]);

  useEffect(() => {
    // const gt06Data = locationData.filter((item) => item.latestDocument.venderId === 'GT-06');
    const gt06Data = locationData.filter(
      (item) =>
        item.latestDocument.venderId === "WTK4G06" ||
        item.latestDocument.venderId === "WTK2G06"
    );
    setGtVehi(locationData);

    const wikitekData = locationData.filter(
      (item) => item.latestDocument.venderId === "Wikitek"
    );
    setwikitekVehi(wikitekData);
  }, [locationData]);

  return (
    <Layout className="flex h-screen">
      <Layout className="h-screen">
        <div className="md:block hidden">
          <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
        </div>

        <div className="md:hidden">
          {/* <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/> */}
        </div>

        <Layout style={{ flex: "1 1 auto" }} className="h-screen">
          {/* <Navbar /> */}
          <Header
            title={"Live Map"}
            showText={false}
            style={{
              justifyContent: "space-between",
              background: "rgb(47, 115, 193)",
              background:
                "linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)",
            }}
          />
          <Content style={{ width: "100%" }} className="h-screen">
            <MapSection
              locationData={locationData}
              vehicleGroupList={vehicleGroupList}
              vehicleList={vehicleList}
              gtVehi={gtVehi}
              gtLocation={gtLocation}
              wikitekVehi={wikitekVehi}
              center={center}
              setCenter={setCenter}
              activeParametersList={activeParametersList}
            />
            {/* <Map2 users={locationData} /> */}
          </Content>
        </Layout>

        <DetailMenu
          menuList={vehicleList}
          menuCollapsed={detailMenuCollapsed}
          locationData={locationData}
          center={center}
          setCenter={setCenter}
          gtVehi={gtVehi}
          setGtVehi={setGtVehi}
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
          sx={{ top: "auto", bottom: 0, background: ThemeColor.dark_color }}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer">
              <MenuIcon onClick={handleMainMenuCollapse} />
            </IconButton>
            <StyledFab
              style={{ background: ThemeColor.light_color, color: "white" }}
              aria-label="add"
            >
              <Home />
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

// function calculate_lat_long(hexLatitudeValues, hexLongitudeValues) {
//   console.log(hexLatitudeValues, hexLongitudeValues, "(hexLatitudeValues, hexLongitudeValues)");

//   // Convert hex values to decimal

//  let lat = hexToDecimal(hexLatitudeValues) / 1e6; // Adjust the scale for latitude
//  let lng = hexToDecimal(hexLongitudeValues) / 1e6; // Adjust the scale for longitude

//  return {lat,lng}

//   // You can now use the decimalLatitude and decimalLongitude as needed.
// }

// // Function to convert hex to decimal
// function hexToDecimal(hexValues) {
//   // Parse the hex values and convert them to decimal
//   const decimals = hexValues.map(hex => parseInt(hex, 16));

//   // Combine the decimal values into a single number
//   const result = decimals.reduce((acc, val) => acc * 256 + val, 0);
//   console.log(result, "resultresult")
//   return result;
// }

export default LiveMap;
