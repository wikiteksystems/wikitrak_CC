// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import { AppMenu, Navbar, Header, Footer } from "../../components";
// import { AppMenuList, ThemeColor, API_VEHICLE_URL } from "../../utils/constants";
// import { LiveMapUtils } from "../../utils";
// import { LiveMapActions } from "../../stores/actions"
// // import { Dashboard, DetailMenu, MapSection } from "./";

// import { Layout, Card, Space } from "antd";
// import { locationsApi } from "../../mocks/location";
// import { useState } from "react";
// // import Map2 from "./Map2";
// import { AppBar, IconButton, Toolbar } from "@mui/material";
// import MenuIcon from '@mui/icons-material/Menu';
// import Home from '@mui/icons-material/Home';
// import { Box, styled } from "@mui/system";
// import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import Fab from '@mui/material/Fab';
// import { AppActions, UserActions } from '../../stores/actions';
// import AppMenu2 from "../../components/Appmneu2";
// import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
// import axios from "axios";


// // Socket Io
// import { socket } from "../../services/Socket";

// const { Content } = Layout;

// const Dashboard = () => {
//     const dispatch = useDispatch();
//     const userId = useSelector(({ User }) => User.userId);
//     const { vehicleList, vehicleGroupList } = useSelector(({ LiveMap }) => LiveMap);
//     const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(({ App }) => App);
//     const [locationData, setLocationData] = useState([]);
//     const [onlineDevices, setOnlineDevices] = useState(0);
//     const [vinDataArray, setVinDataArray] = useState([]);
//     const [imeiList, setImeiList] = useState([]);

//     useEffect(() => {
//         dispatch(LiveMapActions.getVehicleList(userId));
//         dispatch(LiveMapActions.getOEMList());
//         dispatch(LiveMapActions.getVehicleGroupList(userId));
//         axios.get(`http://139.59.37.47:3031/api/vehicle/status`)
//             .then(response => {
//                 const onlineDevicesCount = response.data['onlineDevices'];
//                 setOnlineDevices(onlineDevicesCount);
//                 setImeiList(response.data['imeiList']);


//                 // Fetch vehicle data for each IMEI
//                 const promises = response.data['imeiList'].map(imei => {
//                     return axios.get(`${API_VEHICLE_URL}/list/?imei=${imei}`)
//                         .then(vehicleResponse => {
//                             // Check if the correct mac_id is present in the imei array
//                             const vehicle = vehicleResponse.data.results.find(v => v.imei.some(i => i.mac_id === imei));

//                             // Extract the VIN data from the vehicle response
//                             const vinData = vehicle?.vin || 'Null';
//                             return vinData;
//                         })
//                         .catch(error => {
//                             console.error(`Error fetching vehicle data for IMEI ${imei}:`, error);
//                             // Return 'Null' in case of an error
//                             return 'Null';
//                         });
//                 });

//                 // Wait for all promises to resolve
//                 Promise.all(promises)
//                     .then(vinDataArray => {
//                         // Now, vinDataArray contains the VIN data for each IMEI
//                         setVinDataArray(vinDataArray);
//                     })
//                     .catch(error => {
//                         console.error('Error fetching VIN data for IMEIs:', error);
//                     });
//             })
//             .catch(error => {
//                 console.error('Error fetching online devices:', error);
//             });

//     }, [dispatch, userId]);

//     const fetchImeiData = async () => {
//         let imei = [];
//         for (let k of vehicleList) {
//             for (let i of k?.imei) {
//                 console.log(i)
//                 imei.push(i?.mac_id);
//             }
//         }
//         let data = { imei, type: "info" }
//         let result = await locationsApi.getImeiToReg(data);
//         console.log(result);
//         if (result) {
//             setLocationData(result?.data)
//         } else {
//             setLocationData([])
//         }
//     }
//     useEffect(() => {

//     }, [vehicleList, vehicleGroupList])

//     useEffect(() => {
//         if (vehicleList && vehicleList.length > 0)
//             fetchImeiData();

//         console.log(vehicleGroupList)
//     }, [vehicleList, vehicleGroupList])
//     console.log(vehicleList, "listtt")

//     const StyledFab = styled(Fab)({
//         position: 'absolute',
//         zIndex: 1,
//         top: -20,
//         left: 0,
//         right: 0,
//         margin: '0 auto',
//     });


//     const handleMainMenuCollapse = () => {
//         dispatch(AppActions.setMainMenuCollapsed(!mainMenuCollapsed));
//     };
//     const handleDetailMenuCollapse = () => {
//         dispatch(AppActions.setDetailMenuCollapsed(!detailMenuCollapsed));
//     };




//     return (
//         <Layout className="flex h-screen">

//             <Layout>
//                 <div className="md:block hidden">
//                     <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
//                 </div>

//                 <div className="md:hidden block">
//                     <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
//                 </div>

//                 <Layout style={{ flex: "1 1 auto" }} className="h-screen d-flex align-items-center">
//                     <Navbar />

//                     {/* <Content style={{ width: '100%', height: '100%' }} className="h-screen "> */}
//                     <Space className="d-flex p-2 m-3 " >
//                         <Card
//                             className="me-5 "
//                             title="All Vehicles"
//                             style={{
//                                 width: 400,
//                                 background: 'rgb(47, 115, 193)', // Set the background color using rgb values
//                                 background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',
//                             }}
//                         >
//                             <h1 className="text-white" style={{ fontSize: '54px', textAlign: 'center' }}>
//                                 {vehicleList && vehicleList.length}
//                             </h1>
//                         </Card>
//                         <Card
//                             className="me-5"
//                             title="Online Vehicles"

//                             style={{
//                                 width: 400,
//                                 background: 'rgb(34, 233, 57)', // Set the background color using rgb values
//                                 background: 'linear-gradient(155deg, rgba(34, 233, 57, 0.6951374299719888) 31%, rgba(109, 186, 92, 1) 73%)'
//                             }}
//                         >
//                             <h1 className="text-white" style={{ fontSize: '54px', textAlign: 'center' }}>
//                                 {onlineDevices}
//                             </h1>
//                         </Card>
//                         <Card
//                             className=""
//                             title="Offline Vehicles "

//                             style={{
//                                 width: 400,
//                                 background: 'rgb(233, 34, 34)', // Set the background color using rgb values
//                                 background: 'linear-gradient(155deg, rgba(233, 34, 34, 0.9724483543417367) 44%, rgba(249, 100, 8, 0.9276304271708683) 62%)'
//                             }}
//                         >
//                             <h1 className="text-white" style={{ fontSize: '54px', textAlign: 'center' }}>
//                                 {vehicleList.length - onlineDevices}
//                             </h1>
//                         </Card>
//                     </Space>
//                     <div className="bg-dark text-white container-fluid">
//                         {vehicleList.map((vehicle, index) => (
//                             <div key={index} className="row">
//                                 <div className="d-flex  col-md-6">
//                                     <p>vehicle no: {vehicle.registration_id}</p>

//                                 </div>

//                                 {imeiList.map((imei, index) => (
//                                 <div key={index}>
//                                   <p>imei:{imei}</p>
//                                   {/* <td>{vinDataArray[index]}</td> */}
//                                 </div>
//                               ))}

//                                 <hr />
//                             </div>

//                         ))}

//                     </div>

//                     <div className="bg-dark">

//                     </div>
//                     {/* </Content> */}
//                 </Layout>

//                 {/* <DetailMenu menuList={vehicleList} menuCollapsed={detailMenuCollapsed} locationData={locationData} /> */}
//             </Layout>

//             <div className="hidden">
//                 <Footer>
//                     Powered By &nbsp; <b><i>autopeepal</i></b>
//                 </Footer>
//             </div>

//             <div className="block md:hidden">
//                 <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: ThemeColor.light_color_1 }}>
//                     <Toolbar>
//                         <IconButton color="inherit" aria-label="open drawer">
//                             <MenuIcon onClick={handleMainMenuCollapse} />
//                         </IconButton>
//                         <StyledFab style={{ background: ThemeColor.light_color_2, color: "white" }} aria-label="add">
//                             <LocationOnSharpIcon style={{ fontSize: "30px" }} />
//                         </StyledFab>
//                         <Box sx={{ flexGrow: 1 }} />
//                         <IconButton color="inherit">
//                             <PlayArrowOutlined sx={{ fontSize: '35px' }} onClick={handleDetailMenuCollapse} />
//                         </IconButton>
//                     </Toolbar>
//                 </AppBar>
//             </div>
//         </Layout>
//     );
// }

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppMenu, Header, Footer } from '../../components';
import { AppMenuList, ThemeColor } from '../../utils/constants';
import { AppActions, LiveMapActions } from '../../stores/actions';
import { Card, Row, Col, Layout } from 'antd';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import axios from 'axios';
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { Box, padding, styled } from '@mui/system';
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import Fab from '@mui/material/Fab';
// import AppMenu2 from '../../components/AppMenu2';
import { Content } from 'antd/es/layout/layout';
import { Icon } from '@iconify/react';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import './Dashboard.css'
import { API_VEHICLE_URL } from '../../utils/constants';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';

const Dashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector(({ User }) => User.userId);
  const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(({ App }) => App);
  const { vehicleList, vehicleGroupList } = useSelector(({ LiveMap }) => LiveMap);
  const [onlineDevices, setOnlineDevices] = useState(0);
  const [imeiList, setImeiList] = useState([]);
  const [vinDataArray, setVinDataArray] = useState([]);

  useEffect(() => {
    dispatch(AppActions.setMainMenuCollapsed(true));
    dispatch(LiveMapActions.getVehicleList(userId));
    dispatch(LiveMapActions.getVehicleGroupList(userId));

    axios.get('http://139.59.37.47:3031/api/vehicle/status')
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
            // console.log(vinDataArray,"vinnnnnnnnnnnnnnnn")
          })
          .catch(error => {
            console.error('Error fetching VIN data for IMEIs:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching online devices:', error);
      });
  }, [dispatch, userId]);

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
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

        <div className="md:hidden">
          {/* <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} /> */}
        </div>

        <Layout style={{ flex: '1 1 auto' }} className="h-screen">
          <Header title={'Dashboard'} showText={false} style={{ justifyContent: 'space-between' }} />
          {/* <div className="d-flex flex-column bg-surface-secondary ">
            <div className="h-screen  overflow-y-lg-auto">
              <main className="bg-surface-secondary">
                <div className="container-fluid">
                  <div className="row mb-6">

                    <div className="col-4 m-2" >
                      <div className="card shadow border-0"style={{width:400 ,background: 'rgb(47, 115, 193)',
                                background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)'}}>
                        <div className="card-body " >
                          <div className="row">
                            <div className="col ">
                              <span className="h6 font-semibold text-white text-sm d-block mb-2 ">Total Vehicle</span>
                              <span className="h3 font-bold mb-0">{vehicleList.length}</span>
                            </div>
                            <div className="col-auto">
                              <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                <Icon icon="mdi:car-multiple" color="white" width="50" height="40" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 mb-0 text-sm">
                            <span className="badge badge-pill bg-soft-success text-success me-2">
                              <i className="bi bi-arrow-up me-1"></i>
                            </span>
                            <span className="text-nowrap text-xs text-white">Total registered Vehicles</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-4 m-2">
                      <div className="card shadow border-0" style={{width: 400,
                                background: 'rgb(233, 34, 34)', 
                                background: 'linear-gradient(155deg, rgba(233, 34, 34, 0.9724483543417367) 44%, rgba(249, 100, 8, 0.9276304271708683) 62%)'}}>
                        <div className="card-body" >
                          <div className="row">
                            <div className="col">
                              <span className="h6 font-semibold text-white text-sm d-block mb-2">Online Vehicle</span>
                              <span className="h3 font-bold mb-0">{onlineDevices}</span>
                            </div>
                            <div className="col-auto">
                              <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                                <Icon icon="ic:round-directions-car" color="white" width="50" height="40" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 mb-0 text-sm">
                            <span className="badge badge-pill bg-soft-success text-success me-2">
                              <i className="bi bi-arrow-up me-1"></i>
                            </span>
                            <span className="text-nowrap text-xs text-white">Total Online Vehicles</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-4 m-2">
                      <div className="card shadow border-0"style={{
                                width: 400,
                                background: 'rgb(233, 34, 34)', // Set the background color using rgb values
                                background: 'linear-gradient(155deg, rgba(233, 34, 34, 0.9724483543417367) 44%, rgba(249, 100, 8, 0.9276304271708683) 62%)'
                            }}>
                        <div className="card-body " >
                          <div className="row">
                            <div className="col">
                              <span className="h6 font-semibold text-white text-sm d-block mb-2">Offline Vehicle</span>
                              <span className="h3 font-bold mb-0">{vehicleList.length - onlineDevices}</span>
                            </div>
                            <div className="col-auto">
                              <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                                <Icon icon="mdi:car-off" color="white" width="50" height="40" />
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 mb-0 text-sm">
                            <span className="badge badge-pill bg-soft-danger text-danger me-2">
                              <i className="bi bi-arrow-down me-1"></i>
                            </span>
                            <span className="text-nowrap text-xs text-white">Total Offline Vehicles</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="row mb-7">
                    <div className="col-md-6">
                      <div className="card shadow border-0 mb-7">
                        <div className="card-header">
                          <h5 className="mb-0">
                            <TwoWheelerIcon />
                            Vehicle Lists</h5>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-hover table-nowrap">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Vehicles</th>
                                <th scope="col">Group</th>
                              </tr>
                            </thead>
                            <tbody>
                              {vehicleList.map(item => (
                                <tr key={item.id}>
                                  <td className='d-flex'>
                                    <div className="icon icon-shape bg-dark text-white text-lg rounded-circle">
                                      <ElectricCarIcon color="white" width="50" height="40" />
                                    </div>
                                    <div className="text-heading font-semibold ps-4 pt-2">
                                      {item?.registration_id}
                                    </div>
                                  </td>
                                  <td>{getVehicleGroup(item.vehicle_group)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card shadow border-0 mb-7">
                        <div className="card-header">
                          <h5 className="mb-0">Online Vehicle List</h5>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-hover table-nowrap">
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">IMEI Number</th>
                                <th scope="col">VIN Number</th>
                              </tr>
                            </thead>
                            
                            <tbody>
                              {imeiList.map((imei, index) => (
                                <div key={index}>
                                  <p>{imei}</p>
                                  <td>{vinDataArray[index]}</td>
                                </div>
                                
                              ))
                              
                              }
                              
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div> */}




          <div className="row g-6 m-2 mb-5">
            <div className="col-xl-4 col-sm-6 col-12">
              <div className="card shadow border-0">
                <div className="card-body rounded" style={{ background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', }}>
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-white text-sm d-block mb-2">Total Vehicle</span>
                      <span className="h3 font-bold mb-0 text-white">{vehicleList.length}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                        <Icon icon="mdi:car-multiple" color="white" width="50" height="40" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mb-0 text-sm">
                    <span className="badge badge-pill bg-soft-success text-success me-2">
                      <i className="bi bi-arrow-up me-1"></i>
                    </span>
                    <span className="text-nowrap text-xs text-white">Total registered Vehicles</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12">
              <div className="card shadow border-0">
                <div className="card-body rounded" style={{
                  background: 'rgb(198,255,97)',
                  backgroundImage: 'radial-gradient(circle, rgba(198,255,97,1) 26%, rgba(97,255,150,1) 71%)',
                }}>
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-dark text-sm d-block mb-2">Online Vehicle</span>
                      <span className="h3 font-bold mb-0">{onlineDevices}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                        <Icon icon="ic:round-directions-car" color="white" width="50" height="40" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mb-0 text-sm">
                    <span className="badge badge-pill bg-soft-success text-success me-2">
                      <i className="bi bi-arrow-up me-1"></i>
                    </span>
                    <span className="text-nowrap text-xs text-dark">Total Online Vehicles</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 col-12">
              <div className="card shadow border-0">
                <div className="card-body rounded" style={{
                  background: 'rgb(222,28,28)',
                  backgroundImage: 'linear-gradient(155deg, rgba(222,28,28,1) 40%, rgba(133,72,72,1) 74%)',
                }}>
                  <div className="row">
                    <div className="col">
                      <span className="h6 font-semibold text-white text-sm d-block mb-2">Offline Vehicle</span>
                      <span className="h3 font-bold mb-0">{vehicleList.length - onlineDevices}</span>
                    </div>
                    <div className="col-auto">
                      <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                        <Icon icon="mdi:car-off" color="white" width="50" height="40" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 mb-0 text-sm">
                    <span className="badge badge-pill bg-soft-danger text-danger me-2">
                      <i className="bi bi-arrow-down me-1"></i>
                    </span>
                    <span className="text-nowrap text-xs text-white">Total Offline Vehicles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div className="row mb-7 m-2" style={{ overflowX: 'auto', maxHeight: '1000px' }} >
            <div className="col-md-6">
              <div className="card shadow border-0 mb-7">
                <div className="card-header">
                  <h5 className="mb-0">
                    <TwoWheelerIcon />
                    Vehicle Lists</h5>
                </div>
                <div className="table-responsive" >
                  <table className="table table-hover table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Vehicles</th>
                        <th scope="col">Group</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicleList.map(item => (
                        <tr key={item.id}>
                          <td className='d-flex'>
                            <div className="icon icon-shape bg-dark text-white text-lg rounded-circle">
                              <ElectricCarIcon color="white" width="50" height="40" />
                            </div>
                            <div className="text-heading font-semibold ps-4 pt-2">
                              {item?.registration_id}
                            </div>
                          </td>
                          <td>{getVehicleGroup(item.vehicle_group)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow border-0 mb-7">
                <div className="card-header">
                  <h5 className="mb-0">Online Vehicle List</h5>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">IMEI Number</th>
                        <th scope="col">VIN Number</th>
                      </tr>
                    </thead>

                    <tbody>
                      {imeiList.map((imei, index) => (
                        <div key={index}>
                          <p>{imei}</p>
                          <td>{vinDataArray[index]}</td>
                        </div>

                      ))

                      }

                    </tbody>
                  </table>
                </div>
              </div>
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
  );

  function getVehicleGroup(vehicleGroupId) {
    const group = vehicleGroupList.find(group => group.id === vehicleGroupId);
    return group ? group.group_name : 'N/A';


  }
};

export default Dashboard;

