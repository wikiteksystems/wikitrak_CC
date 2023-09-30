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

export default function LiveContent({selectCheckParam}) {
      //  1. Bydefault and actions apply query,filter,page,limit
      
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [parameters,setParameters] = useState(["1"]);
  const [paginatedParameters,setPaginatedParameters] = useState({});

  // Redux Setup
  const dispatch = useDispatch();
  const userId = useSelector( ({User}) => User.userId );
  const { vehicleList,vehicleGroupList } = useSelector( ({LiveMap}) => LiveMap );
  const [loginData,setLoginData] = useState([])
  const [locationData,setLocationData] = useState([])
  const [healthData,setHealthData] = useState([])
  const [emergencyData,setEmergencyData] = useState([])



  const fetchData = async () =>{
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
for(let k of uniqueArrayOfObjects){
  console.log(k)
     if(k.param_header==="LGN"){
       console.log("login packet")
       const result = await loginApi.getImeiToReg({imei:[imeiNo]});
       console.log(result)
       if(result.status==="SUCCESS")
       setLoginData(result.data);
     } else if(k.param_header==="NRM"){
      console.log("location packet")
      const result = await locationsApi.getImeiToReg({imei:[imeiNo]});
      console.log(result)
      if(result.status==="SUCCESS")
      setLocationData(result.data)
     } else if(k.param_header==="HBT"){
      console.log("health packet")
      const result = await healthsApi.getImeiToReg({imei:[imeiNo]});
      console.log(result)
      if(result.status==="SUCCESS")
      setHealthData(result.data)
     } else if(k.param_header==="EPB"){
      console.log("emergency packet")
      const result = await emergencyApi.getImeiToReg({imei:[imeiNo]});
      console.log(result)
      if(result.status==="SUCCESS")
      setEmergencyData(result.data)
     }
}


  }

  useEffect( () => {
    dispatch(LiveMapActions.getVehicleList(userId));
    fetchData();
  
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
  return (
     <Box sx={{color:"#fff"}}>
        <Box sx={{background:"#4071C9",padding:"10px 10px",display:"flex",gap:"30px",alignItems:"center",justifyContent:"flex-end"}}>
            <Typography sx={{fontSize:"22px"}}>Telematic Parameters</Typography>
            <Box sx={{display:"flex",alignItems:"center",gap:"5px",justifyContent:"center"}}>
                <Switch />
                <Typography sx={{fontSize:'20px'}}>Live</Typography>
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

     </Box>
  )
}
