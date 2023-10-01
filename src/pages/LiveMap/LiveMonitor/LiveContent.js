import {
    Avatar,
    CircularProgress,
    Box,
    Card,
    Checkbox,
    DialogContent,
    Autocomplete,
    DialogActions,
    Grid,
    Slide,
    Divider,
    Tooltip,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableSortLabel,
    TableHead,
    TablePagination,
    TableContainer,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Tab,
    Tabs,
    TextField,
    DialogTitle,
    Button,
    Typography,
    Dialog,
    Zoom,
    styled,
    Switch
  } from '@mui/material';
import React from 'react'
import { useState, useEffect } from 'react';
import GridViewTwoToneIcon from '@mui/icons-material/GridViewTwoTone';
import TableRowsTwoToneIcon from '@mui/icons-material/TableRowsTwoTone';
import { useSelector, useDispatch } from "react-redux";
import { LiveMapActions } from '../../../stores/actions';
import { loginApi } from '../../../mocks/login';
import { locationsApi } from '../../../mocks/location';
import { healthsApi } from '../../../mocks/health';
import { emergencyApi } from '../../../mocks/emergency';
import { deviceParam } from '../../../constants/deviceConstant';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment"
import dayjs from "dayjs"
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Line } from 'react-chartjs-2';
import ReactApexChart from 'react-apexcharts';

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
      transition: ${theme.transitions.create(['box-shadow'])};
    }
        
      &.Mui-selected::after {
        box-shadow: 0 0 0 3px blue;
      }
    `
  );

export default function LiveContent({selectCheckParam,setSelecCheckParam}) {
      //  1. Bydefault and actions apply query,filter,page,limit
      
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [parameters,setParameters] = useState(["1"]);
  const [paginatedParameters,setPaginatedParameters] = useState({});
  const [startDateValue, setstartDateValue] = useState(dayjs(new moment().toDate()))
  const [endDateValue, setendDateValue] = useState(dayjs(new moment().toDate()))

  // Redux Setup
  const dispatch = useDispatch();
  const userId = useSelector( ({User}) => User.userId );
  const { vehicleList,vehicleGroupList } = useSelector( ({LiveMap}) => LiveMap );
  const [loginData,setLoginData] = useState([])
  const [locationData,setLocationData] = useState([])
  const [healthData,setHealthData] = useState([])
  const [emergencyData,setEmergencyData] = useState([])
  const [active,setActive] = useState(false)

  const handleChangeActive = (event) =>{
    setLocationData([]);
    setLoginData([]);
    setHealthData([])
    setEmergencyData([])
    setActive(event.target.checked)
    setSelecCheckParam([]);
    setstartDateValue(dayjs(new moment().toDate()))
    setendDateValue(dayjs(new moment().toDate()))
  }

const [chartValue,setChartValue] = useState([]);

  const fetchData = async (type) =>{
    console.log(selectCheckParam);

// Specify the key for which you want to remove duplicates
const keyToCheck = 'param_header';

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
   if(uniqueArrayOfObjects.length>0){
      const filterData = vehicleList.filter((item) => item?.label===uniqueArrayOfObjects[0]?.vehicle_reg)
      console.log(filterData);
      if(filterData.length>0)
      imeiNo=filterData[0]?.imei[0]?.mac_id
   }
  if(type==='one'){
for(let k of uniqueArrayOfObjects){
  console.log(k)
     if(k.param_header==="LGN"){
       console.log("login packet")
       let data = {imei:[imeiNo],type:"one"}
       const result = await loginApi.getImeiToReg(data);
       console.log(result)
       if(result.status==="SUCCESS")
       setLoginData(result.data);
     } else if(k.param_header==="NRM"){
      console.log("location packet")
      let data = {imei:[imeiNo],type:"one"}
      const result = await locationsApi.getImeiToReg(data);
      console.log(result)
      if(result.status==="SUCCESS")
      setLocationData(result.data)
     } else if(k.param_header==="HBT"){
      console.log("health packet")
      let data = {imei:[imeiNo],type:"one"}
      const result = await healthsApi.getImeiToReg(data);
      console.log(result)
      if(result.status==="SUCCESS")
      setHealthData(result.data)
     } else if(k.param_header==="EPB"){
      console.log("emergency packet")
      let data = {imei:[imeiNo],type:"one"}
      const result = await emergencyApi.getImeiToReg(data);
      console.log(result)
      if(result.status==="SUCCESS")
      setEmergencyData(result.data)
     }
}
  } else if(type==='group'){
    console.log(type)
    let location=[];
    let health=[];
    let login=[];
    let emergency=[];
    for(let k of uniqueArrayOfObjects){
      console.log(k)
      let data = {imei:[imeiNo],type:"group",startDate:startDateValue,endDate:endDateValue,frequency:5}
      console.log(data);
         if(k.param_header==="LGN"){
           console.log("login packet")
           const result = await loginApi.getImeiToReg(data);
           console.log(result)
           if(result.status==="SUCCESS"){
           login=result.data;
           setLoginData(result.data);
           }
         } else if(k.param_header==="NRM"){
          console.log("location packet")
          const result = await locationsApi.getImeiToReg(data);
          console.log(result)
          if(result.status==="SUCCESS"){
          location = result.data
          setLocationData(result.data)
          }
         } else if(k.param_header==="HBT"){
          console.log("health packet")
          const result = await healthsApi.getImeiToReg(data);
          console.log(result)
          if(result.status==="SUCCESS"){
          health=result.data
          setHealthData(result.data)
          }
         } else if(k.param_header==="EPB"){
          console.log("emergency packet")
          const result = await emergencyApi.getImeiToReg(data);
          console.log(result)
          if(result.status==="SUCCESS"){
          emergency=result.data
          setEmergencyData(result.data)
          }
         }
    }

    let arr =[]
    let innerArr = [];
    console.log(location);

   for(let k of selectCheckParam){
    innerArr=[]
       if(k?.param_header==="LGN"){
            for(let innerK of login){
              for(let i of innerK?.data){
               innerArr.push({
                x: new Date(i?.createdAt).getTime(),
                y: i[k?.label],
               })
              }
            }
       } else  if(k?.param_header==="NRM"){
        for(let innerK of location){
          for(let i of innerK?.data){
          console.log(innerK)
          innerArr.push({
           x: new Date(i?.createdAt).getTime(),
           y: i[k?.label],
          })
        }
       }
        
       }

       arr.push({data:[...innerArr],label:k?.label});
   }
 setChartValue([...arr]);
 console.log(arr);

  }


  }

  useEffect( () => {
    dispatch(LiveMapActions.getVehicleList(userId));
    fetchData('one');
}, [dispatch, userId,selectCheckParam]);


    // 8. page change function
    const handlePageChange = async (_event, newPage) => {
        setPage(newPage)
       
    };
  
    // 9. limit change function
    const handleLimitChange = async (event) => {
        setLimit(parseInt(event.target.value));
    };
    
// 10. change view(grid or table) function
const [toggleView, setToggleView] = useState('table_view');

const handleViewOrientation = (_event, newValue) => {
  setToggleView(newValue);
};


// Graph function
const graphData = (arrayData,key) =>{
  console.log(arrayData)
  console.log(key)
     let chartData = []
     for(let k of locationData){
        chartData.push( {
          x: new Date(k?.latestDocument?.createdAt).getTime(),
          y: k[key],
        })
     }

     console.log(chartData)

    return chartData; 
}


const chartData =[
  {
    x: new Date('2023-01-01').getTime(),
    y: 10,
  },
  {
    x: new Date('2023-01-02').getTime(),
    y: 20,
  },
  {
    x: new Date('2023-01-03').getTime(),
    y: 15,
  },
  {
    x: new Date('2023-01-04').getTime(),
    y: 30,
  },
  {
    x: new Date('2023-01-05').getTime(),
    y: 25,
  }
];

const graphData1 = () =>{



  return chartData
}

const chartOptions = {
  chart: {
    id: 'line-chart',
  },
  xaxis: {
    type: 'datetime',
  },
};


  return (
     <Box sx={{color:"#fff",display:'flex',flexDirection:"column",gap:"20px",maxHeight:"600px",overflowY:"scroll"}} >
        <Box sx={{background:"#4071C9",padding:"10px 10px",display:"flex",gap:"30px",alignItems:"center",justifyContent:"flex-end"}}>
            <Typography sx={{fontSize:"22px"}}>Telematic Parameters</Typography>
            <Box sx={{display:"flex",alignItems:"center",gap:"5px",justifyContent:"center"}}>
               <Typography sx={{fontSize:'20px'}}>Live</Typography>
                <Switch checked={active} onChange={(event) => handleChangeActive(event)} />
                <Typography sx={{fontSize:'20px'}}>History</Typography>
            </Box>
            <ToggleButtonGroup
          sx={{
            mt: { xs: 2, sm: 0 }
          }}
          value={toggleView}
          exclusive
          onChange={handleViewOrientation}
        >
          <ToggleButton disableRipple value="table_view">
            <TableRowsTwoToneIcon sx={{color:"#fff"}} />
          </ToggleButton>
          <ToggleButton disableRipple value="grid_view">
            <GridViewTwoToneIcon sx={{color:"#fff"}} />
          </ToggleButton>
        </ToggleButtonGroup>
        </Box>
  {!active ?
    <>
      <Box>
     {toggleView === "table_view" &&
      (<Card>
      {selectCheckParam.length === 0 ? (
            <>
              <Typography
                sx={{
                  py: 10
                }}
                variant="h5"
                fontWeight="normal"
                color="text.secondary"
                align="center"
              >
            We couldn't find any users matching your search criteria
              </Typography>
            </>
          ) : (
            <>
              <TableContainer>
                <Table>
               
                <TableBody>
  {selectCheckParam.map((item, index) => {
    console.log(item);
    if (item.param_header === 'LGN' ) {
      // Use a React.Fragment to enclose multiple JSX elements
      console.log(true);
      return (
        <React.Fragment key={index}>
          {loginData.length>0 && loginData.map((loginItem, innerIndex) => {
            console.log(loginItem?.latestDocument[item?.label.replace(/[^a-zA-Z0-9]/g, '')],'this is login Item',item?.label)
            return (
              <TableRow hover key={innerIndex}>
                <TableCell>
                  <Typography>{item?.label}</Typography>
                </TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Typography>{loginItem?.latestDocument[item?.label.replace(/[^a-zA-Z0-9]/g, '')]}</Typography>
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
    console.log(item);
    if (item.param_header === 'NRM' ) {
      // Use a React.Fragment to enclose multiple JSX elements
      console.log(true);
      return (
        <React.Fragment key={index}>
          {locationData.length>0 && locationData.map((loginItem, innerIndex) => {
            console.log(loginItem,'this is login Item')
            return (
              <TableRow hover key={innerIndex}>
                <TableCell>
                  <Typography>{item?.label}</Typography>
                </TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Typography>{loginItem?.latestDocument[item?.label]}</Typography>
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
    console.log(item);
    if (item.param_header === 'EPB' ) {
      // Use a React.Fragment to enclose multiple JSX elements
      console.log(true);
      return (
        <React.Fragment key={index}>
          {emergencyData.length>0 && emergencyData.map((loginItem, innerIndex) => {
            console.log(loginItem,'this is login Item')
            return (
              <TableRow hover key={innerIndex}>
                <TableCell>
                  <Typography>{item?.label}</Typography>
                </TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Typography>{loginItem?.latestDocument[item?.label]}</Typography>
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
    console.log(item);
    if (item.param_header === 'HBT' ) {
      // Use a React.Fragment to enclose multiple JSX elements
      console.log(true);
      return (
        <React.Fragment key={index}>
          {healthData.length>0 && healthData.map((loginItem, innerIndex) => {
            console.log(loginItem,'this is login Item')
            return (
              <TableRow hover key={innerIndex}>
                <TableCell>
                  <Typography>{item?.label}</Typography>
                </TableCell>
                <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Typography>{loginItem?.latestDocument[item?.label]}</Typography>
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

{toggleView === 'grid_view' && (
        <>
          <Card
            sx={{
              p: 2,
              mb: 3
            }}
          >
    
          </Card>
          {selectCheckParam.length === 0 ? (
             <>
              <Typography
                sx={{
                  py: 10
                }}
                variant="h5"
                fontWeight="normal"
                color="text.secondary"
                align="center"
              >
            We couldn't find any users matching your search criteria
              </Typography>
            </>
          ) : (
            <>
                   <Grid container spacing={3}>
           {selectCheckParam.map((item, index) => {

          if (item.param_header === 'LGN' ) {
                     
                       return (
                       <>
                       {loginData.length>0 && loginData.map((loginItem, innerIndex) =>(
                        <Grid item xs={12} sm={6} md={4} key={innerIndex} >
                          <CardWrapper
                      
                          >
                            <Box
                              sx={{
                                position: 'relative',
                                zIndex: '2'
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
                                <Typography>
                                {item?.label}
                                </Typography>
                                <Typography variant='h5'>
                                {loginItem?.latestDocument[item?.label.replace(/[^a-zA-Z0-9]/g, '')]}
                                </Typography>
                             
                                
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

if (item.param_header === 'NRM' ) {
           
             return (
             <>
             {locationData.length>0 && locationData.map((loginItem, innerIndex) =>(
              <Grid item xs={12} sm={6} md={4} key={innerIndex} >
                <CardWrapper
            
                >
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: '2'
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
                      <Typography>
                      {item?.label}
                      </Typography>
                      <Typography variant='h5'>
                      {loginItem?.latestDocument[item?.label.replace(/[^a-zA-Z0-9]/g, '')]}
                      </Typography>
                   
                      
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

if (item.param_header === 'EPB' ) {
           
             return (
             <>
             {emergencyData.length>0 && emergencyData.map((loginItem, innerIndex) =>(
              <Grid item xs={12} sm={6} md={4} key={innerIndex} >
                <CardWrapper
            
                >
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: '2'
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
                      <Typography>
                      {item?.label}
                      </Typography>
                      <Typography variant='h5'>
                      {loginItem?.latestDocument[item?.label.replace(/[^a-zA-Z0-9]/g, '')]}
                      </Typography>
                   
                      
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

if (item.param_header === 'HBT' ) {
           
             return (
             <>
             {healthData.length>0 && healthData.map((loginItem, innerIndex) =>(
              <Grid item xs={12} sm={6} md={4} key={innerIndex} >
                <CardWrapper
            
                >
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: '2'
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
                      <Typography>
                      {item?.label}
                      </Typography>
                      <Typography variant='h5'>
                      {loginItem?.latestDocument[item?.label.replace(/[^a-zA-Z0-9]/g, '')]}
                      </Typography>
                   
                      
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
      :
       <Box sx={{color:"black",display:"flex",flexDirection:"column",gap:"30px"}}>
        <Box sx={{display:'flex',gap:'30px',alignItems:"cneter",margin:"25px 15px 10px"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker
            value={startDateValue}
            label='From Date'
            onChange={(newValue) => setstartDateValue(newValue.$d)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            value={endDateValue}
            label='End Date'
            onChange={(newValue) => setendDateValue(newValue.$d)}
            renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>
          <div  onClick={() => fetchData('group')}  style={{background:"#4071C9", display:"flex",alignItems:"center",justifyContent:"center",height:"40px",width:'40px',borderRadius:"10px"}}>
          <KeyboardArrowRightIcon  sx={{color:"#fff"}} />
          
          </div>
         </Box>
       
<Box sx={{display:'flex',flexDirection:"column",gap:"20px",padding:"20px"}}>
        {selectCheckParam.length===0?
          <Card>No Result</Card>
        :
    chartData.length>0 && chartValue.map((item,index) => (   
       <Card key={index} sx={{margin:"20px",padding:"10px"}}>
          <h2>{item.label}</h2>
      <ReactApexChart
        options={chartOptions}
        series={[
          {
            name: item.label,
            data: item.data,
          },
        ]}
        type="line"
        height={130}
      />
   </Card>
     ))
}
</Box>

             

          
       </Box>
     }

     </Box>
  )
}
