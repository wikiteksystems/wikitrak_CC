import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import { useState } from "react";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Home from "@mui/icons-material/Home";
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from "@mui/icons-material/PlayArrowOutlined";
import { Fab } from "@mui/material";
import { AppActions, LiveMapActions, UserActions } from "../../stores/actions";
import { AppMenu, Header, Footer, Navbar } from "../../components";
import { AppMenuList, ThemeColor } from "../../utils/constants";
import { locationsApi } from "../../mocks/location";
import { socket } from "../../services/Socket";
import { DetailMenu, MapSection } from "./";

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
  const [locationData, setLocationData] = useState([]);

  const { vehicleList, vehicleGroupList } = useSelector(
    ({ LiveMap }) => LiveMap
  );
  const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(
    ({ App }) => App
  );

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
    if (result?.status === "SUCCESS") {
      setLocationData(result?.data);
    } else {
      setLocationData([]);
    }
  };

  useEffect(() => {
    if (vehicleList && vehicleList?.length > 0) fetchImeiData();
  }, [vehicleList, vehicleGroupList]);

  useEffect(() => {
    socket.on("locationinfo", (data) => {
      const gt06Data = locationData.filter(
        (item) =>
          item.latestDocument.venderId === "WTK4G06" ||
          item.latestDocument.venderId === "WTK2G06"
      );

      locationData.forEach((item) => {
        if (item.latestDocument.imei === data.imei) {
          const prevPosition = {
            lat: item.latestDocument.lat,
            lng: item.latestDocument.lng,
          };
          const duration = 500; // Duration of the animation in milliseconds
          const fps = 60; // Frames per second
          const steps = duration / (1000 / fps); // Number of steps
          const latStep = (data.lat - prevPosition.lat) / steps;
          const lngStep = (data.lng - prevPosition.lng) / steps;

          let stepCount = 0;

          const moveVehicle = setInterval(() => {
            const newLat = prevPosition.lat + latStep * stepCount;
            const newLng = prevPosition.lng + lngStep * stepCount;

            item.latestDocument.lat = newLat;
            item.latestDocument.lng = newLng;

            stepCount++;

            if (stepCount >= steps) {
              clearInterval(moveVehicle);
            }

            setGtVehi([...locationData]);
          }, 1000 / fps);
        }
      });
    });
  }, [socket, locationData, activeParametersList]);

  useEffect(() => {
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
      <Layout className="h-screen">
        <div className="md:block hidden">
          <AppMenu activePage={1} menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
        </div>

        <Layout style={{ flex: "1 1 auto" }} className="h-screen">
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
              style={{ background: ThemeColor.light_color_1, color: "white" }}
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

export default LiveMap;
