

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppMenu, Header, Footer } from '../../components';
import { AppMenuList, Theme, ThemeColor } from '../../utils/constants';
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
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { locationsApi } from '../../mocks/location';
import Item from 'antd/es/list/Item';
import AppMenu2 from '../../components/Appmneu2';
import { socket } from '../../services/Socket'
import { NotificationManager } from 'react-notifications';
const Dashboard = () => {
  const dispatch = useDispatch();
  const userId = useSelector(({ User }) => User.userId);
  const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(({ App }) => App);
  const { vehicleList, vehicleGroupList } = useSelector(({ LiveMap }) => LiveMap);
  const [onlineDevices, setOnlineDevices] = useState(0);
  const [imeiList, setImeiList] = useState([]);
  const [vinDataArray, setVinDataArray] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [stopVehicleList, setStopVehicleList] = useState([]);
  const [runningVehicleList, setRunningVehicleList] = useState([]);
  const [allVehiclesList, setAllVehiclesList] = useState([]);
  console.log(vehicleList, "vehicleListdashboard");

  useEffect(() => {
    dispatch(AppActions.setMainMenuCollapsed(true));
    dispatch(LiveMapActions.getVehicleList(userId));
    dispatch(LiveMapActions.getVehicleGroupList(userId));


  }, [dispatch, userId,]);

  useEffect(() => {
    // if (vehicleList) {
    //   axios.get('http://139.59.37.47:3031/api/vehicle/status')
    //     .then(response => {
    //       console.log(response.data['imeiList'], "test vehicle list shubh")
    //       console.log(response.data, "chek data from shubh")

    //       const onlineDevicesCount = response.data['onlineDevices'];
    //       setOnlineDevices(onlineDevicesCount);
    //       setImeiList(response.data['imeiList']);

    //       const register_imei = vehicleList.flatMap(item =>
    //         item.imei ? item.imei.map(imeiData => imeiData.mac_id).filter(Boolean) : []
    //       );
    //       console.log(register_imei, "Registered imei data")

    //       // Filter data based on mac_ids present in vehicleList
    //       // const filteredData = response.data['imeiList'].filter(item =>
    //       //   register_imei.includes(item)
    //       // );
    //       const imeiListAsNumbers = response.data['imeiList'].map(item => parseInt(item, 10));

    //       // Filter IMEI values from imeiListAsNumbers that are present in register_imei
    //       const filteredData = imeiListAsNumbers.filter(item =>
    //         register_imei.includes(item)
    //       );


    //       console.log(filteredData + "filtered data",)
    //     })
    //     .catch(error => {
    //       console.error('Error fetching online devices:', error);
    //     });

    // }
    if (vehicleList) {
      axios.get('http://139.59.37.47:3031/api/vehicle/status')
        .then(response => {
          console.log(response.data['imeiList'], "test vehicle list shubh");
          console.log(response.data, "check data from shubh");
    
          const onlineDevicesCount = response.data['onlineDevices'];
          // setOnlineDevices(onlineDevicesCount);
          // setImeiList(response.data['imeiList']);
    
          const register_imei = vehicleList.flatMap(item =>
            item.imei ? item.imei.map(imeiData => String(imeiData.mac_id)).filter(Boolean) : []
          );
          console.log(register_imei, "Registered imei data");
    
          // Convert response.data['imeiList'] values to strings
          const imeiListAsString = response.data['imeiList'].map(item => String(item));
    
          // Filter IMEI values from imeiListAsString that are present in register_imei
          const filteredData = imeiListAsString.filter(item =>
            register_imei.includes(item)
          );
    
          setOnlineDevices(filteredData.length);
          setImeiList(filteredData);

          console.log(filteredData, "filtered data");
        })
        .catch(error => {
          console.error('Error fetching online devices:', error);
        });
    }
    
  }, [vehicleList])




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




  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setAllVehiclesList(vehicleList)
    const fetchData = async () => {
      try {
        let imei = [];
        for (let k of vehicleList) {
          for (let i of k?.imei) {
            imei.push(i?.mac_id);
          }
        }
        let data = { imei, type: "one" };

        const result = await locationsApi.getImeiToReg(data);

        // Update the state only if the result is available
        if (result?.status === "SUCCESS") {
          setLocations(result?.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [vehicleList]);
  console.log(locations, "locationsdashboard")


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

  // const imeiNumbers = locations.map(location => location.latestDocument.imei);
  const dataArray = [];

  // const extractedData = locations.map(location => ({
  //   imei: location.latestDocument.imei,
  //   mainInputVoltage: location.latestDocument.mainInputVoltage,
  //   ignition: location.latestDocument.ignition ? "Running" : "idle"
  // }));
  const getVehicleStatus = (imei, ignition, speed) => {
    let status = '';
    let color = '';
    let subStatus = '';
    //  imeiList.includes(parseFloat(imei))&& ignition && !speed>5
    if (imeiList.includes(parseFloat(imei))) {
      if (ignition) {
        if (ignition && speed > 5) {
          status = 'Online'
          subStatus = '(Running)'
          color = '#2cb322'
        } else {
          status = 'Online'
          subStatus = '(Idle)'
          // colodr='#e0b01f'
          color = '#2cb322'
        }

      } else {
        status = 'Online'
        subStatus = ''
        color = '#2cb322'
      }
    } else {
      status = 'Offline'
      subStatus = ''
      color = 'red'
    }

    return { status, color, subStatus }
  }
  const extractedData = locations.map((location) => {
    const { imei, ignition, speed } = location.latestDocument
    getVehicleStatus(imei, ignition, speed)
    let obj = {
      imei: location.latestDocument.imei,
      mainInputVoltage: location.latestDocument.mainInputVoltage,
      ignition: getVehicleStatus(imei, ignition, speed),
      speed: location.latestDocument.speed,
      ign: location.latestDocument.ignition,
    }
    dataArray.push(obj);
  })


  useEffect(() => {
    console.log("location data", locationData)
    const ignitionFalseData = locationData.filter(entry => imeiList.includes(parseFloat(entry.latestDocument.imei)) && entry.latestDocument.ignition && entry.latestDocument.speed < 5);
    const ignitionTrueData = locationData.filter(entry => imeiList.includes(parseFloat(entry.latestDocument.imei)) && entry.latestDocument.ignition && entry.latestDocument.speed > 5);
    setRunningVehicleList(ignitionTrueData);
    setStopVehicleList(ignitionFalseData)
  }, [locationData])

  useEffect(() => {
    if (vehicleList && vehicleList?.length > 0) fetchImeiData();

  }, [vehicleList, vehicleGroupList]);


  const handleTotalVehicleClick = () => {

    setAllVehiclesList(vehicleList)
  }

  const handleOnlineVehicleClick = () => {
    let onlineVehicleData = []
    vehicleList.map((item) => {
      if (imeiList.includes(parseFloat(item?.imei[0]?.mac_id))) {
        onlineVehicleData.push(item)
      }
    })
    setAllVehiclesList(onlineVehicleData)
  }

  const handleOfflineVehicleClick = () => {
    let offLineVehicleData = []
    vehicleList.map((item) => {
      if (!imeiList.includes(parseFloat(item?.imei[0]?.mac_id))) {
        offLineVehicleData.push(item)
      }
    })
    setAllVehiclesList(offLineVehicleData)
  }

  const handleRunningVehicleClick = () => {
    let runningVehicleData = []
    vehicleList.map((item) => {
      if (dataArray.find(data => data.imei === item?.imei[0]?.mac_id)?.ignition.subStatus === "(Running)") {
        runningVehicleData.push(item)
      }
      setAllVehiclesList(runningVehicleData);
    })
  }

  const handleIdleVehicleClick = () => {
    let runningVehicleData = []
    vehicleList.map((item) => {
      if (dataArray.find(data => data.imei === item?.imei[0]?.mac_id)?.ignition.subStatus === "(Idle)") {
        runningVehicleData.push(item)
      }
      setAllVehiclesList(runningVehicleData);
    })
  }

  //alert notifications
  const [geofancenotificationShown, setgeofanceNotificationShown] = useState(false);
  const [speednotificationShown, setspeednotificationShown] = useState(false);


  //---------- alert notifications-------------//
  useEffect(() => {
    socket.on("geofenceAlert", (data) => {
      if (!geofancenotificationShown) {
        console.log(data, "geofence alert ");
        let imei = data?.imei;
        if (imei !== null) {
          const vehicleWithImei = allVehiclesList.find(vehicle => vehicle.imei[0].mac_id == imei);
          if (vehicleWithImei) {
            const registrationId = vehicleWithImei.registration_id;
            notification('warning', `${registrationId}-${data.msg}`);
            setgeofanceNotificationShown(true);
          }
        }
      }
    });

    socket.on("speedAlert", (data) => {
      if (!speednotificationShown) {
        console.log(data, " speedAlert ");
        let imei = data?.imei;
        if (imei !== null) {
          const vehicleWithImei = allVehiclesList.find(vehicle => vehicle.imei[0].mac_id == imei);
          if (vehicleWithImei) {
            const registrationId = vehicleWithImei.registration_id;
            notification('warning', `${registrationId}-${data.msg}`);
            setspeednotificationShown(true);
          }
        }
      }
    });
  }, [allVehiclesList, geofancenotificationShown]);

  const notification = (type, title, content) => {
    NotificationManager[type](content, title, 3000);
  };
  //---------- alert notifications close-------------//


  // console.log(extractedData,"extracteddata")
  // useEffect(()=>{
  //   vehicleList.map((item)=>{
  //     let voltage=locations.find((volt)=>item?.imei[0]?.mac_id===volt.latestDocument.imei)
  //     console.log(voltage,"voltage")
  //     // item.voltage=voltage[0]?.mainInputVoltage

  //   })
  // },[])


  // vehicleList.map((item)=>{
  //   let voltage=locations.find((volt)=>item?.imei[0]?.mac_id===volt.latestDocument.imei)
  //   console.log(voltage,"voltage")
  //   item.voltage=voltage[0]?.mainInputVoltage

  // })

  // console.log(vehicleList,"vehicle List")

  return (
    <>

      <Layout className="flex h-screen">
        <Layout>
          <div className="md:block hidden">
            <AppMenu activePage={0} menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
          </div>

          <div className="md:hidden">
            <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
          </div>

          <Layout style={{ flex: '1 1 auto' }} className="h-screen">
            <Header title={'Dashboard'} showText={false} hideArrow={true} style={{ justifyContent: 'space-between', background: Theme.dark_color }} />
            <div className="row no-gutters m-5">
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" title='Total Vehicle' onClick={handleTotalVehicleClick} style={{ background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', cursor: "pointer" }}>
                    <div className="row">
                      <div className="col-auto">
                        <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                          <Link to={`/livemap/allVehicles`}>
                            <Icon icon="mdi:car-multiple" color="white" width="50" height="40" />
                          </Link>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span className="h6 text-white text-sm d-block mb-2">Registered</span>
                        <div className='h5 text-white ps-3'>{vehicleList.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" title='Online Vehicle' onClick={handleOnlineVehicleClick} style={{
                    background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',
                    cursor: "pointer"
                  }}>
                    <div className="row">
                      <div className="col-auto">
                        <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                          <Link to={`/livemap/onlineVehicles`}>
                            <Icon icon="ic:round-directions-car" color="white" width="50" height="40" />
                          </Link>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span className="h6 font-semibold text-white text-sm d-block mb-2">Online</span>
                        <div className='h5 text-white ps-3'>{onlineDevices}</div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" title='Offline Vehicle' onClick={handleOfflineVehicleClick} style={{
                    background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',
                    cursor: "pointer"
                  }}>
                    <div className="row">
                      <div className="col-auto">
                        <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                          <Link to={`/livemap/offlineVehicles`}>
                            <Icon icon="mdi:car-off" color="white" width="50" height="40" />
                          </Link>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span className="h6 font-semibold text-white text-sm d-block mb-2">Offline</span>
                        <div className='h5 text-white ps-3'>{vehicleList.length - onlineDevices}</div>
                        <span className="h3 font-bold mb-0"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* //running// */}
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" title='Running Vehicle' onClick={handleRunningVehicleClick} style={{
                    background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',
                    cursor: "pointer"
                  }}>
                    <div className="row">
                      <div className="col-auto">
                        <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                          {/* <Icon icon="mdi:car-off" color="white" width="50" height="40" /> */}
                          <Link to={`/livemap/runningVeh`}>
                            <EmojiTransportationIcon />
                          </Link>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span className="h6 font-semibold text-white text-sm d-block mb-2">Running</span>
                        <div className='h5 text-white ps-3'>{runningVehicleList.length}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" title='Idle Vehicle' onClick={handleIdleVehicleClick} style={{
                    background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',
                    cursor: "pointer"
                  }}>
                    <div className="row">
                      <div className="col-auto">
                        <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                          {/* <Icon icon="mdi:car-off" color="white" width="50" height="40" /> */}
                          <Link to={`/livemap/stopVeh`}>
                            <CarCrashIcon />
                          </Link>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span className="h6 font-semibold text-white text-sm d-block mb-2">Idel</span>
                        <div className='h5 text-white ps-3'>{stopVehicleList.length}</div>
                        <span className="h3 font-bold mb-0"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>






            <div className="row mb-7 m-2" style={{ overflowX: 'auto', maxHeight: '1000px' }} >
              <div className="col-md-12">
                <div className="card shadow border-0 mb-7">
                  <div className="card-header" style={{ background: Theme.light_color }}>
                    <h5 className="mb-0 text-white">
                      {/* <TwoWheelerIcon className='me-2' /> */}
                      <i class="bi bi-bar-chart-fill me-2 fs-3"></i>
                      Analysis</h5>
                  </div>
                  <div className="table-responsive" >
                    <table className="table table-hover table-nowrap">
                      <thead className="thead-light">
                        <tr >
                          <th scope="col" className='fs-6'>Vehicles</th>
                          <th scope="col" className='fs-6'>Group <i class="bi bi-collection"></i></th>
                          <th scope="col" className='fs-6'>imei number <i class="bi bi-list-ol"></i></th>
                          <th scope="col" className='fs-6'>Battery Voltage <i class="bi bi-battery-charging"></i></th>
                          <th scope="col" className='fs-6'>Status <i class="bi bi-broadcast-pin"></i></th>
                        </tr>
                      </thead>
                      <tbody>
                        {allVehiclesList.length > 0 && allVehiclesList.map(item => (
                          <tr key={item.id}>
                            <td className='d-flex '>
                              <div className="icon icon-shape bg-dark text-white text-lg rounded-circle">
                                <ElectricCarIcon color="white" width="50" height="40" />
                              </div>
                              <div className="text-heading font-semibold ps-4 pt-2">
                                {/* <Link to="/livemap" >{item?.registration_id}</Link>  */}
                                <Link to={`/livemap/${item?.imei[0]?.mac_id}`} >{item?.registration_id}</Link>

                              </div>
                            </td>
                            <td>{getVehicleGroup(item.vehicle_group)}</td>



                            <td>
                              <p>{item?.imei[0]?.mac_id}</p>
                            </td>

                            <td className='text-success'>
                              {dataArray.find(data => data.imei === item?.imei[0]?.mac_id)?.mainInputVoltage || 0} volts
                            </td>

                            <td>

                              {/* {imeiList.includes(parseFloat(item?.imei[0]?.mac_id)) ? (
                                <>
                                  <span className="text-success ">Online </span>
                                  <span className="dot dot-online ms-3"></span>
                                </>

                              ) : (
                                <>
                                  <span className="text-danger ">Offline</span>
                                  <span className="dot dot-offline ms-3"></span>
                                </>

                              )} */}

                              <span className='condition-column' style={{ color: `${dataArray.find(data => data.imei === item?.imei[0]?.mac_id)?.ignition.color}` }} >
                                {dataArray.find(data => data.imei === item?.imei[0]?.mac_id)?.ignition.status} <span style={{ color: "#e0b01f" }}>{dataArray.find(data => data.imei === item?.imei[0]?.mac_id)?.ignition.subStatus}</span>
                              </span>
                            </td>



                          </tr>
                        ))}

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
    </>

  );

  function getVehicleGroup(vehicleGroupId) {
    const group = vehicleGroupList.find(group => group.id === vehicleGroupId);
    return group ? group.group_name : 'N/A';


  }
};

export default Dashboard;

















