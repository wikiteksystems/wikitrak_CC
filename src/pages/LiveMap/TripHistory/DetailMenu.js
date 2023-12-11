import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Footer, Header } from "../../../components";
import { matchColor } from "../../../utils/constants";
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import WifiTetheringErrorIcon from '@mui/icons-material/WifiTetheringError';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Layout, Avatar, Menu, Input, Button, Checkbox, Popconfirm, Select, ColorPicker, Typography } from 'antd';
import moment from "moment";
import dayjs from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField,Tooltip } from "@mui/material";
const { Sider } = Layout;



const DetailMenu = ({ setHarshBreak ,harshBreak ,setAcceleration ,acceleration ,setSpeed, speed, fetchTripHis,tripHis,vehicle,menuList, menuCollapsed,setSelecCheckParam,startAddress,endAddress }) => {
    const history = useHistory();
    const { themeColor } = useSelector( ({User}) => User );
    const [searchedMenuList, setSearchedMenuList] = useState([...tripHis]);
    const [startDateValue, setstartDateValue] = useState(dayjs(new moment().toDate()))
    const [endDateValue, setendDateValue] = useState(dayjs(new moment().toDate()))

    const handleTrip = (newValue) =>{
        console.log(newValue)
        setendDateValue(newValue.$d);
        fetchTripHis(startDateValue,newValue.$d);
    }
    
    useEffect(() =>{
        
        fetchTripHis(startDateValue,endDateValue);
    },[endDateValue])
    
    useEffect(() =>{
       setSearchedMenuList([...tripHis])
    },[tripHis])

    const handleCheckboxClick = (e, selectType, index) => {
      if (selectType === 'select-one') {
               
             const list = searchedMenuList.map( (item,innerIndex) => (
                 index === innerIndex ? {
                     ...item,
                     checked: e.target.checked
                 } : {...item}
             ));
             
             setSearchedMenuList(list);
             
             let a = list.filter((item) => item?.checked)
             setSelecCheckParam(a)
 
         } 

    };

    return (
        <div  className="absolute md:relative z-30 md:z-0 right-0">
        <Sider 
        className="h-screen"
            style={{background: 'white', borderLeft: '1px solid black',right:'0px'}}
            breakpoint="lg"
            collapsedWidth={0}
            trigger={null}
            collapsible collapsed={menuCollapsed}
            width={300}
        >
            <div className="detail-menu flex flex-col justify-between h-full">
     
               
                <>
                    <div className="flex justify-between items-center" style={{background: matchColor(themeColor),padding:"17px 5px",marginBottom:"20px", color:"white"}}>
                        <LeftCircleOutlined className='px-2' style={{fontSize: 20}} onClick={ () => history.goBack() } />
                        <p style={{fontSize:"20px",fontWeight:"600"}}>Select Trip {vehicle?.registration_id}</p>
                       
                    </div>
                    <div className="flex items-center ">
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
            onChange={(newValue) =>  setendDateValue(newValue.$d)}
            renderInput={(params) => <TextField {...params} />}
          />
          </LocalizationProvider>
                    </div>

                    <Menu
                        className="overflow-hidden overflow-y-auto"
                        theme="light"
                        mode="inline"
                        style={{ color: 'black', backgroundColor: 'white', flexGrow: 1 }}
                        selectable={false}
                        items={ searchedMenuList.map((item, index) => {
                            console.log(item)
                            return ({
                            key: index,
                            label:
                                <div className="w-full flex justify-between items-center">
                                    <span className="w-5/6 overflow-hidden" style={{textOverflow: 'ellipsis'}} >{startAddress?.locality},{startAddress?.city}  to {endAddress?.locality}, {startAddress?.city}</span>
                                    <Checkbox checked={item.checked} onClick={ e => handleCheckboxClick(e, 'select-one', index) } />
                                </div>
                            })
                        }
                        )}
                    />
                </>
                
                

                <Footer style={{background: matchColor(themeColor), height: 40}} classes={'justify-evenly'}>
              <Tooltip title="Harsh Braking">
                <div onClick={() => setHarshBreak(!harshBreak)}>
               <ShutterSpeedIcon  sx={{cursor:'pointer', color:"white"}} />
               </div>
               </Tooltip>
               <Tooltip title="Over Acceleration">
               <div onClick={() => setAcceleration(!acceleration)}>
               <WifiTetheringErrorIcon sx={{cursor:'pointer', color:"white"}} />
               </div>
               </Tooltip>
               <Tooltip title="Over Speeding">
               <div onClick={() => setSpeed(!speed)}>
                <DirectionsCarIcon sx={{cursor:'pointer', color:"white"}} />  
                </div>
                </Tooltip>
                </Footer>
            </div>
        </Sider>
        </div>
    );
};

export default DetailMenu;