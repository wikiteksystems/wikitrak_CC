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
  const dispatch = useDispatch();
  const userId = useSelector(({ User }) => User.userId);
  const [gtLocation, setGtLocation] = useState({lat: 19.075983, 
  lng: 72.877655,})
    const[gtVehi, setGtVehi]= useState()
    const[wikitekVehi, setwikitekVehi]= useState()
    
    const [lat,setLat]=useState(null);
  const [long,setLonng]=useState(null);

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

  const fetchImeiData = async () => {
    let imei = [];
    for (let k of vehicleList) {
      for (let i of k?.imei) {
        imei.push(i?.mac_id);
      }
    }
    let data = { imei, type: "one" };
    let result = await locationsApi.getImeiToReg(data);
    console.log(result);
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
    console.log(locationData, "hello");
    socket.on("locationinfo", (data) => {
      // console.log(typeof(data),'--------type of')
      // let dataArray=data.split(',')
      // console.log("dataArray",dataArray)
      // const hexLatitudeValues = dataArray.slice(11, 15);
      // const hexLongitudeValues = dataArray.slice(15, 19);
    //  let cal_val=calculate_lat_long(hexLatitudeValues, hexLongitudeValues)
      // let a = [];

      //  if(locationData.length>0&&Object.keys(data).length>0){
      //  let arr =   locationData.map((item) => {
      //   console.log(item)
      //   a.push(item)
      //       if(item?.latestDocument?.imei===data?.imei)
      //       return {latestDocument:data,_id:item?._id}
      //     return item
      //     })
      //     console.log(a,arr);
      //     if(arr.length>0)
      //     console.log(locationData,"this is locationbhushan")
      //     setLocationData([...arr])
      //   }
      // console.log(data.split(','), "spacedstring");
      // console.log(hexLatitudeValues,"lat")
      // console.log(hexLongitudeValues,"long")
      // console.log(cal_val,"**********")
      // setGtLocation(cal_val)
      console.log(data, typeof(data) ,"socket data")

      console.log(data.lat,data.lng,data.imei,"lat long")
      // console.log(gtVehi,"gtvehi")
      // console.log(locationData,"location data")
      // setGtLocation(data)
      
      const gt06Data = locationData.filter((item) => item.latestDocument.venderId === 'GT-06');
      console.log(gt06Data,"gt06 data")
      gt06Data.map((item) => {
         if (item.latestDocument.imei===data.imei)
         {
          item.latestDocument.lat=data.lat;
          item.latestDocument.lng=data.lng;
         }
       }
       
       );
      
     setGtVehi(gt06Data)
      console.log(gt06Data,"filtered data")
    });
  }, [socket, locationData]);

  useEffect(()=>{

    const gt06Data = locationData.filter((item) => item.latestDocument.venderId === 'GT-06');
  
    setGtVehi(gt06Data)
    const wikitekData = locationData.filter((item) => item.latestDocument.venderId === 'Wikitek');
    setwikitekVehi(wikitekData)

  }, [locationData])
    

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
            style={{ justifyContent: "space-between" }}
          />
          <Content style={{ width: "100%" }} className="h-screen">
            <MapSection
              locationData={locationData}
              vehicleGroupList={vehicleGroupList}
              vehicleList={vehicleList}
              gtVehi={gtVehi}
              gtLocation={gtLocation}
              wikitekVehi= {wikitekVehi}
              
              
            />
            {/* <Map2 users={locationData} /> */}
          </Content>
        </Layout>

        <DetailMenu
          menuList={vehicleList}
          menuCollapsed={detailMenuCollapsed}
          locationData={locationData}
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
