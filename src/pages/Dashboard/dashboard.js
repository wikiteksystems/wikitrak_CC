
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppMenu, Header, Footer } from '../../components';
// import { AppMenuList, ThemeColor } from '../../utils/constants';
// import { AppActions, LiveMapActions } from '../../stores/actions';
// import { Card, Row, Col, Layout } from 'antd';
// import { AppBar, IconButton, Toolbar } from '@mui/material';
// import axios from 'axios';
// import MenuIcon from '@mui/icons-material/Menu';
// import Home from '@mui/icons-material/Home';
// import { Box, padding, styled } from '@mui/system';
// import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
// import Fab from '@mui/material/Fab';
// // import AppMenu2 from '../../components/AppMenu2';
// import { Content } from 'antd/es/layout/layout';
// import { Icon } from '@iconify/react';
// import ElectricCarIcon from '@mui/icons-material/ElectricCar';
// import './Dashboard.css'
// import { API_VEHICLE_URL } from '../../utils/constants';
// import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
// import CarCrashIcon from '@mui/icons-material/CarCrash';
// import { locationsApi } from '../../mocks/location';
// import Item from 'antd/es/list/Item';
// const Dashboard = () => {


//   const dispatch = useDispatch();
//   const userId = useSelector(({ User }) => User.userId);
//   const { mainMenuCollapsed, detailMenuCollapsed } = useSelector(({ App }) => App);
//   const { vehicleList, vehicleGroupList } = useSelector(({ LiveMap }) => LiveMap);
//   const [onlineDevices, setOnlineDevices] = useState(0);
//   const [imeiList, setImeiList] = useState([]);
//   const [vinDataArray, setVinDataArray] = useState([]);


//   useEffect(() => {
//     dispatch(AppActions.setMainMenuCollapsed(true));
//     dispatch(LiveMapActions.getVehicleList(userId));
//     dispatch(LiveMapActions.getVehicleGroupList(userId));

//     axios.get('http://139.59.37.47:3031/api/vehicle/status')
//       .then(response => {
//         const onlineDevicesCount = response.data['onlineDevices'];
//         setOnlineDevices(onlineDevicesCount);
//         setImeiList(response.data['imeiList']);
//         // console.log(imeiList,"imeiresssssssssss")

//         // Fetch vehicle data for each IMEI
//         // const promises = response.data['imeiList'].map(imei => {
//         //   return axios.get(`${API_VEHICLE_URL}/list/?imei=${imei}`)
//         //     .then(vehicleResponse => {

//         //       // Check if the correct mac_id is present in the imei array
//         //       const vehicle = vehicleResponse.data.results.find(v => v.imei.some(i => i.mac_id === imei));

//         //       // Extract the VIN data from the vehicle response
//         //       const vinData = vehicle?.vin || 'Null';
//         //       return vinData;

//         //     })
//         //     .catch(error => {
//         //       console.error(`Error fetching vehicle data for IMEI ${imei}:`, error);
//         //       // Return 'Null' in case of an error
//         //       return 'Null';
//         //     });
//         // });

//         // Wait for all promises to resolve
//         // Promise.all(promises)
//         //   .then(vinDataArray => {
//         //     // Now, vinDataArray contains the VIN data for each IMEI
//         //     setVinDataArray(vinDataArray);
//         //     // console.log(vinDataArray,"vinnnnnnnnnnnnnnnn")
//         //   })
//         //   .catch(error => {
//         //     console.error('Error fetching VIN data for IMEIs:', error);
//         //   });
//       })
//       .catch(error => {
//         console.error('Error fetching online devices:', error);
//       });
//   }, [dispatch, userId]);




//   const StyledFab = styled(Fab)({
//     position: 'absolute',
//     zIndex: 1,
//     top: -30,
//     left: 0,
//     right: 0,
//     margin: '0 auto',
//   });

//   const handleMainMenuCollapse = () => {
//     dispatch(AppActions.setMainMenuCollapsed(!mainMenuCollapsed));
//   };

//   const handleDetailMenuCollapse = () => {
//     dispatch(AppActions.setDetailMenuCollapsed(!detailMenuCollapsed));
//   };




//   const [locations, setLocations] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let imei = [];
//         for (let k of vehicleList) {
//           for (let i of k?.imei) {
//             imei.push(i?.mac_id);
//           }
//         }
//         let data = { imei, type: "one" };

//         const result = await locationsApi.getImeiToReg(data);

//         // Update the state only if the result is available
//         if (result?.status === "SUCCESS") {
//           setLocations(result?.data);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [vehicleList]);
//   console.log(locations, "locationsdashboard")

//   // const imeiNumbers = locations.map(location => location.latestDocument.imei);
//   const dataArray = [];

//   const extractedData = locations.map(location => ({
//     imei: location.latestDocument.imei,
//     mainInputVoltage: location.latestDocument.mainInputVoltage,
//     ignition: location.latestDocument.ignition ? "Running" : "idle"
//   }));

//   dataArray.push(...extractedData);

//   console.log(dataArray, "dataarray");






//   // console.log(extractedData,"extracteddata")
//   // useEffect(()=>{
//   //   vehicleList.map((item)=>{
//   //     let voltage=locations.find((volt)=>item?.imei[0]?.mac_id===volt.latestDocument.imei)
//   //     console.log(voltage,"voltage")
//   //     // item.voltage=voltage[0]?.mainInputVoltage

//   //   })
//   // },[])


//   // vehicleList.map((item)=>{
//   //   let voltage=locations.find((volt)=>item?.imei[0]?.mac_id===volt.latestDocument.imei)
//   //   console.log(voltage,"voltage")
//   //   item.voltage=voltage[0]?.mainInputVoltage

//   // })

//   // console.log(vehicleList,"vehicle List")

//   return (
//     <>

//       <Layout className="flex h-screen">
//         <Layout>
//           <div className="md:block hidden">
//             <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
//           </div>

//           <div className="md:hidden">
//             {/* <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} /> */}
//           </div>

//           <Layout style={{ flex: '1 1 auto' }} className="h-screen">
//             <Header title={'Dashboard'} showText={false} style={{ justifyContent: 'space-between', background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)' }} />
//             <div className="row no-gutters m-5">
//               <div className="col">
//                 <div className="card shadow border-0">
//                   <div className="card-body rounded" style={{ background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', }}>
//                     <div className="row">
//                       <div className="col">
//                         <span className="h6 font-semibold text-white text-sm d-block mb-2">Total Vehicle</span>
//                         <span className="h3 font-bold mb-0 text-white">{vehicleList.length}</span>
//                       </div>
//                       <div className="col-auto">
//                         <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
//                           <Icon icon="mdi:car-multiple" color="white" width="50" height="40" />
//                         </div>
//                       </div>
//                     </div>


//                     <div className="mt-2 mb-0 text-sm">
//                       <span className="badge badge-pill bg-soft-success text-success me-2">
//                         <i className="bi bi-arrow-up me-1"></i>
//                       </span>
//                       <span className="text-nowrap text-xs text-white">Total registered Vehicles</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card shadow border-0">
//                   <div className="card-body rounded" style={{
//                     background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',
//                   }}>
//                     <div className="row">
//                       <div className="col">
//                         <span className="h6 font-semibold text-white text-sm d-block mb-2">Online Vehicle</span>
//                         <span className="h3 font-bold mb-0">{onlineDevices}</span>
//                       </div>
//                       <div className="col-auto">
//                         <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
//                           <Link to={`/livemap/onlineVehicles`}>
//                             <Icon icon="ic:round-directions-car" color="white" width="50" height="40" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-2 mb-0 text-sm">
//                       <span className="badge badge-pill bg-soft-success text-success me-2">
//                         <i className="bi bi-arrow-up me-1"></i>
//                       </span>
//                       <span className="text-nowrap text-xs text-dark">Total Online Vehicles</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card shadow border-0">
//                   <div className="card-body rounded" style={{
//                     background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',

//                   }}>
//                     <div className="row">
//                       <div className="col">
//                         <span className="h6 font-semibold text-white text-sm d-block mb-2">Offline Vehicle</span>
//                         <span className="h3 font-bold mb-0">{vehicleList.length - onlineDevices}</span>
//                       </div>
//                       <div className="col-auto">
//                         <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
//                           <Link to={`/livemap/offlineVehicles`}>
//                             <Icon icon="mdi:car-off" color="white" width="50" height="40" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-2 mb-0 text-sm">
//                       <span className="badge badge-pill bg-soft-danger text-danger me-2">
//                         <i className="bi bi-arrow-down me-1"></i>
//                       </span>
//                       <span className="text-nowrap text-xs text-white">Total Offline Vehicles</span>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//               {/* //running// */}
//               <div className="col">
//                 <div className="card shadow border-0">
//                   <div className="card-body rounded" style={{
//                     background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',

//                   }}>
//                     <div className="row">
//                       <div className="col">
//                         <span className="h6 font-semibold text-white text-sm d-block mb-2">Running Vehicle</span>
//                         <span className="h3 font-bold mb-0">{vehicleList.length - onlineDevices}</span>
//                       </div>
//                       <div className="col-auto">
//                         <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
//                           {/* <Icon icon="mdi:car-off" color="white" width="50" height="40" /> */}
//                           <EmojiTransportationIcon />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-2 mb-0 text-sm">
//                       <span className="badge badge-pill bg-soft-danger text-danger me-2">
//                         <i className="bi bi-arrow-down me-1"></i>
//                       </span>
//                       <span className="text-nowrap text-xs text-white">Total Running Vehicles</span>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//               <div className="col">
//                 <div className="card shadow border-0">
//                   <div className="card-body rounded" style={{
//                     background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',

//                   }}>
//                     <div className="row">
//                       <div className="col">
//                         <span className="h6 font-semibold text-white text-sm d-block mb-2">Idle Vehicle</span>
//                         <span className="h3 font-bold mb-0">{vehicleList.length - onlineDevices}</span>
//                       </div>
//                       <div className="col-auto">
//                         <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
//                           {/* <Icon icon="mdi:car-off" color="white" width="50" height="40" /> */}
//                           <CarCrashIcon />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-2 mb-0 text-sm">
//                       <span className="badge badge-pill bg-soft-danger text-danger me-2">
//                         <i className="bi bi-arrow-down me-1"></i>
//                       </span>
//                       <span className="text-nowrap text-xs text-white">Total Idle Vehicles</span>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             </div>




           

//             <div className="row mb-7 m-2" style={{ overflowX: 'auto', maxHeight: '1000px' }} >
//               <div className="col-md-12">
//                 <div className="card shadow border-0 mb-7">
//                   <div className="card-header" style={{ background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', }}>
//                     <h5 className="mb-0 text-white">
//                       {/* <TwoWheelerIcon className='me-2' /> */}
//                       <i class="bi bi-bar-chart-fill me-2 fs-3"></i>
//                       Vehicle Analysis</h5>
//                   </div>
//                   <div className="table-responsive" >
//                     <table className="table table-hover table-nowrap">
//                       <thead className="thead-light">
//                         <tr >
//                           <th scope="col" className='fs-4'>Vehicles</th>
//                           <th scope="col" className='fs-4'>Group <i class="bi bi-collection"></i></th>
//                           <th scope="col" className='fs-4'>imei number <i class="bi bi-list-ol"></i></th>
//                           <th scope="col" className='fs-4'>Battery Voltage <i class="bi bi-battery-charging"></i></th>
//                           <th scope="col" className='fs-4'>Status <i class="bi bi-broadcast-pin"></i></th>
//                           <th scope="col" className='fs-4'>Conditions <i class="bi bi-speedometer2"></i></th>

//                         </tr>
//                       </thead>
//                       <tbody>
//                         {vehicleList.map(item => (
//                           <tr key={item.id}>
//                             <td className='d-flex '>
//                               <div className="icon icon-shape bg-dark text-white text-lg rounded-circle">
//                                 <ElectricCarIcon color="white" width="50" height="40" />
//                               </div>
//                               <div className="text-heading font-semibold ps-4 pt-2">
//                                 {/* <Link to="/livemap" >{item?.registration_id}</Link>  */}
//                                 <Link to={`/livemap/${item?.imei[0]?.mac_id}`}>{item?.registration_id}</Link>

//                               </div>
//                             </td>
//                             <td>{getVehicleGroup(item.vehicle_group)}</td>



//                             <td>
//                               <p>{item?.imei[0]?.mac_id}</p>
//                             </td>

//                             <td className='text-success'>
//                               {dataArray.find(data => data.imei === item?.imei[0]?.mac_id)?.mainInputVoltage || 0} volts
//                             </td>

//                             <td>

//                               {imeiList.includes(parseFloat(item?.imei[0]?.mac_id)) ? (
//                                 <>
//                                   <span className="text-success ">Online </span>
//                                   <span className="dot dot-online ms-3"></span>
//                                 </>

//                               ) : (
//                                 <>
//                                   <span className="text-danger ">Offline</span>
//                                   <span className="dot dot-offline ms-3"></span>
//                                 </>

//                               )}
//                             </td>

//                             <td>
//                               {dataArray.find(data => data.imei === item?.imei[0]?.mac_id)?.ignition}
//                             </td>


//                           </tr>
//                         ))}

//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>




//             </div>
//           </Layout>
//         </Layout>

//         <div className="hidden">
//           <Footer>Powered By&nbsp; <b><i>autopeepal</i></b></Footer>
//         </div>

//         <div className="block md:hidden">
//           <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: ThemeColor.dark_color }}>
//             <Toolbar>
//               <IconButton color="inherit" aria-label="open drawer">
//                 <MenuIcon onClick={handleMainMenuCollapse} />
//               </IconButton>
//               <StyledFab style={{ background: ThemeColor.light_color, color: 'white' }} aria-label="add">
//                 <Home />
//               </StyledFab>
//               <Box sx={{ flexGrow: 1 }} />
//               <IconButton color="inherit">
//                 <PlayArrowOutlined sx={{ fontSize: '35px' }} onClick={handleDetailMenuCollapse} />
//               </IconButton>
//             </Toolbar>
//           </AppBar>
//         </div>
//       </Layout>
//     </>

//   );

//   function getVehicleGroup(vehicleGroupId) {
//     const group = vehicleGroupList.find(group => group.id === vehicleGroupId);
//     return group ? group.group_name : 'N/A';


//   }
// };

// export default Dashboard;


//new code//

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
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import { locationsApi } from '../../mocks/location';
import Item from 'antd/es/list/Item';
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
  console.log(vehicleList, "vehicleListdashboard");

  useEffect(() => {
    dispatch(AppActions.setMainMenuCollapsed(true));
    dispatch(LiveMapActions.getVehicleList(userId));
    dispatch(LiveMapActions.getVehicleGroupList(userId));

    axios.get('http://139.59.37.47:3031/api/vehicle/status')
      .then(response => {
        const onlineDevicesCount = response.data['onlineDevices'];
        setOnlineDevices(onlineDevicesCount);
        setImeiList(response.data['imeiList']);
        // console.log(imeiList,"imeiresssssssssss")

        // Fetch vehicle data for each IMEI
        // const promises = response.data['imeiList'].map(imei => {
        //   return axios.get(`${API_VEHICLE_URL}/list/?imei=${imei}`)
        //     .then(vehicleResponse => {

        //       // Check if the correct mac_id is present in the imei array
        //       const vehicle = vehicleResponse.data.results.find(v => v.imei.some(i => i.mac_id === imei));

        //       // Extract the VIN data from the vehicle response
        //       const vinData = vehicle?.vin || 'Null';
        //       return vinData;

        //     })
        //     .catch(error => {
        //       console.error(`Error fetching vehicle data for IMEI ${imei}:`, error);
        //       // Return 'Null' in case of an error
        //       return 'Null';
        //     });
        // });

        // Wait for all promises to resolve
        // Promise.all(promises)
        //   .then(vinDataArray => {
        //     // Now, vinDataArray contains the VIN data for each IMEI
        //     setVinDataArray(vinDataArray);
        //     // console.log(vinDataArray,"vinnnnnnnnnnnnnnnn")
        //   })
        //   .catch(error => {
        //     console.error('Error fetching VIN data for IMEIs:', error);
        //   });
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




  const [locations, setLocations] = useState([]);

  useEffect(() => {
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

  const extractedData = locations.map(location => ({
    imei: location.latestDocument.imei,
    mainInputVoltage: location.latestDocument.mainInputVoltage,
    ignition: location.latestDocument.ignition ? "Running" : "idle"
  }));

  dataArray.push(...extractedData);

  console.log(dataArray, "dataarray");


  useEffect(() => {
    console.log("location data", locationData)
    const ignitionFalseData = locationData.filter(entry => entry.latestDocument.ignition === false);
    const ignitionTrueData = locationData.filter(entry => entry.latestDocument.ignition === true);
    setRunningVehicleList(ignitionTrueData);
    setStopVehicleList(ignitionFalseData)
  }, [locationData])

  useEffect(() => {
    if (vehicleList && vehicleList?.length > 0) fetchImeiData();

  }, [vehicleList, vehicleGroupList]);




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
            <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />
          </div>

          <div className="md:hidden">
            {/* <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} /> */}
          </div>

          <Layout style={{ flex: '1 1 auto' }} className="h-screen">
            <Header title={'Dashboard'} showText={false} hideArrow={true} style={{ justifyContent: 'space-between', background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)' }} />
            <div className="row no-gutters m-5">
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" style={{ background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', }}>
                    <div className="row">
                    <div className="col-auto">
                        <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                        <Link to={`/livemap/allVehicles`}>
                          <Icon icon="mdi:car-multiple" color="white" width="50" height="40" />
                          </Link>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span className="h6 text-white text-sm d-block mb-2">Registered Vehicles: <b>{vehicleList.length}</b></span>                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" style={{
                    background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',
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
                        <span className="h6 font-semibold text-white text-sm d-block mb-2">Online Vehicles: <b>{onlineDevices}</b></span>                        
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" style={{
                    background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',

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
                        <span className="h6 font-semibold text-white text-sm d-block mb-2">Offline Vehicles: <b>{vehicleList.length - onlineDevices}</b></span>
                        <span className="h3 font-bold mb-0"></span>
                      </div>                      
                    </div>
                  </div>
                </div>
              </div>
              {/* //running// */}
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" style={{
                    background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',

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
                        <span className="h6 font-semibold text-white text-sm d-block mb-2">Running Vehicles: <b>{runningVehicleList.length}</b></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow border-0">
                  <div className="card-body rounded" style={{
                    background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)',

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
                        <span className="h6 font-semibold text-white text-sm d-block mb-2">Idle Vehicles: <b>{stopVehicleList.length}</b></span>
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
                  <div className="card-header" style={{ background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', }}>
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
                        {vehicleList.map(item => (
                          <tr key={item.id}>
                            <td className='d-flex '>
                              <div className="icon icon-shape bg-dark text-white text-lg rounded-circle">
                                <ElectricCarIcon color="white" width="50" height="40" />
                              </div>
                              <div className="text-heading font-semibold ps-4 pt-2">
                                {/* <Link to="/livemap" >{item?.registration_id}</Link>  */}
                                <Link to={`/livemap/${item?.imei[0]?.mac_id}`}>{item?.registration_id}</Link>

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

                              {imeiList.includes(parseFloat(item?.imei[0]?.mac_id)) ? (
                                <>
                                  <span className="text-success ">Online </span>
                                  <span className="dot dot-online ms-3"></span>
                                </>

                              ) : (
                                <>
                                  <span className="text-danger ">Offline</span>
                                  <span className="dot dot-offline ms-3"></span>
                                </>

                              )}

                              <span className='condition-column'>
                                {dataArray.find(data => data.imei === item?.imei[0]?.mac_id)?.ignition}
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

















