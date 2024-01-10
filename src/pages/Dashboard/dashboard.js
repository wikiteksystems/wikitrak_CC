import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppMenu, Navbar, Header, Footer } from "../../components";
import { AppMenuList, ThemeColor ,API_VEHICLE_URL} from "../../utils/constants";
import { LiveMapUtils } from "../../utils";
import { LiveMapActions } from "../../stores/actions"
// import { Dashboard, DetailMenu, MapSection } from "./";

import { Layout, Card, Space } from "antd";
import { locationsApi } from "../../mocks/location";
import { useState } from "react";
// import Map2 from "./Map2";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import { AppActions, UserActions } from '../../stores/actions';
import AppMenu2 from "../../components/Appmneu2";
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
import axios from "axios";


// Socket Io
import { socket } from "../../services/Socket";

const { Content } = Layout;

const Dashboard = () => {
    const dispatch = useDispatch();
    const userId = useSelector(({ User }) => User.userId);
    const { vehicleList, vehicleGroupList } = useSelector(({ LiveMap }) => LiveMap);
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(({ App }) => App);
    const [locationData, setLocationData] = useState([]);
    const [onlineDevices, setOnlineDevices] = useState(0);
    const [vinDataArray, setVinDataArray] = useState([]);
    const [imeiList, setImeiList] = useState([]);

    useEffect(() => {
        dispatch(LiveMapActions.getVehicleList(userId));
        dispatch(LiveMapActions.getOEMList());
        dispatch(LiveMapActions.getVehicleGroupList(userId));
        axios.get(`http://139.59.37.47:3031/api/vehicle/status`)
        .then(response => {
          const onlineDevicesCount = response.data['onlineDevices'];
          setOnlineDevices(onlineDevicesCount);
          setImeiList(response.data['imeiList']);
  
          // Fetch vehicle data for each IMEI
          const promises = response.data['imeiList'].map(imei => {
            return axios.get(`${API_VEHICLE_URL}/list/?imei=${imei}`)
              .then(vehicleResponse => {
                // Check if the correct mac_id is present in the imei array
                const vehicle = vehicleResponse.data.results.find(v => v.imei.some(i => i.mac_id === imei));
  
                // Extract the VIN data from the vehicle response
                const vinData = vehicle?.vin || 'Null';
                return vinData;
              })
              .catch(error => {
                console.error(`Error fetching vehicle data for IMEI ${imei}:`, error);
                // Return 'Null' in case of an error
                return 'Null';
              });
          });
  
          // Wait for all promises to resolve
          Promise.all(promises)
            .then(vinDataArray => {
              // Now, vinDataArray contains the VIN data for each IMEI
              setVinDataArray(vinDataArray);
            })
            .catch(error => {
              console.error('Error fetching VIN data for IMEIs:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching online devices:', error);
        });

    }, [dispatch, userId]);

    const fetchImeiData = async () => {
        let imei = [];
        for (let k of vehicleList) {
            for (let i of k?.imei) {
                console.log(i)
                imei.push(i?.mac_id);
            }
        }
        let data = { imei, type: "info" }
        let result = await locationsApi.getImeiToReg(data);
        console.log(result);
        if (result) {
            setLocationData(result?.data)
        } else {
            setLocationData([])
        }
    }
    useEffect(() => {
        
    }, [vehicleList, vehicleGroupList])

    useEffect(() => {
        if (vehicleList && vehicleList.length > 0)
            fetchImeiData();
        console.log(vehicleList, 'this is vehicle list')
        console.log(vehicleGroupList)
    }, [vehicleList, vehicleGroupList])

    const StyledFab = styled(Fab)({
        position: 'absolute',
        zIndex: 1,
        top: -20,
        left: 0,
        right: 0,
        margin: '0 auto',
    });


    const handleMainMenuCollapse = () => {
        dispatch(AppActions.setMainMenuCollapsed(!mainMenuCollapsed));
    };
    const handleDetailMenuCollapse = () => {
        dispatch(AppActions.setDetailMenuCollapsed(!detailMenuCollapsed));
    };


    return (
        <Layout className="flex h-screen">


            <Layout>
                <div className="md:block hidden">
                    <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
                </div>

                <div className="md:hidden block">
                    <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
                </div>

                <Layout style={{ flex: "1 1 auto" }} className="h-screen">
                    <Navbar />

                    {/* <Content style={{ width: '100%', height: '100%' }} className="h-screen "> */}
                    <Space className="d-flex p-2" >
                        <Card
                            className=""
                            title="All Vehicles"
                            style={{
                                width: 300,
                                
                            }}
                        >
                            <h1  className="text-warning" style={{ fontSize: '54px', textAlign: 'center' }}>
                                { vehicleList && vehicleList.length}
                            </h1>
                        </Card>
                        <Card
                        className=""
                            title="Online Vehicles"

                            style={{
                                width: 300,
                            }}
                        >
                            <h1 className="text-success" style={{ fontSize: '54px', textAlign: 'center' }}>
                                {onlineDevices}
                            </h1>
                        </Card>
                        <Card
                        className=""
                            title="Offline Vehicles"

                            style={{
                                width: 300,
                            }}
                        >
                            <h1  className="text-danger" style={{ fontSize: '54px', textAlign: 'center' }}>
                                {vehicleList.length - onlineDevices}
                            </h1>
                        </Card>
                    </Space>
                    {/* </Content> */}
                </Layout>

                {/* <DetailMenu menuList={vehicleList} menuCollapsed={detailMenuCollapsed} locationData={locationData} /> */}
            </Layout>

            <div className="hidden">
                <Footer>
                    Powered By &nbsp; <b><i>autopeepal</i></b>
                </Footer>
            </div>

            <div className="block md:hidden">
                <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: ThemeColor.light_color_1 }}>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="open drawer">
                            <MenuIcon onClick={handleMainMenuCollapse} />
                        </IconButton>
                        <StyledFab style={{ background: ThemeColor.light_color_2, color: "white" }} aria-label="add">
                            <LocationOnSharpIcon style={{ fontSize: "30px" }} />
                        </StyledFab>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton color="inherit">
                            <PlayArrowOutlined sx={{ fontSize: '35px' }} onClick={handleDetailMenuCollapse} />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        </Layout>
    );
}

export default Dashboard;

