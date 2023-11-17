import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import { AppMenu, Navbar, Header, Footer } from "../../components";
import { AppMenuList } from "../../utils/constants";
import { LiveMapUtils } from "../../utils";
import { LiveMapActions } from "../../stores/actions"
import { DetailMenu, MapSection } from "./";

import { Layout } from "antd";
import { locationsApi } from "../../mocks/location";
import { useState } from "react";
import Map2 from "./Map2";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import { AppActions, UserActions } from '../../stores/actions';
import AppMenu2 from "../../components/Appmneu2";

const { Content  } = Layout;

const LiveMap = () => {
    const dispatch = useDispatch();
    const userId = useSelector( ({User}) => User.userId );
    const { vehicleList,vehicleGroupList } = useSelector( ({LiveMap}) => LiveMap );
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector( ({App}) => App );
    const [locationData,setLocationData] = useState([]);

    useEffect( () => {
        dispatch(LiveMapActions.getVehicleList(userId));
        dispatch(LiveMapActions.getOEMList());
        dispatch(LiveMapActions.getVehicleGroupList(userId));
        
    }, [dispatch, userId]);

    const fetchImeiData = async () =>{
        let imei = [];
        for(let k of vehicleList){
          for(let i of k?.imei){
            console.log(i)
            imei.push(i?.mac_id);
          }
        }
        let data = {imei,type:"one"}
       let result = await locationsApi.getImeiToReg(data);
       console.log(result);
       if(result){
            setLocationData(result?.data)
       } else{
        setLocationData([])
       }
    }

    useEffect(() =>{
        if(vehicleList && vehicleList.length>0)
        fetchImeiData();
    console.log(vehicleList,'this is vehicle list')
    console.log(vehicleGroupList)
    },[vehicleList,vehicleGroupList])

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
                <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <div className="md:hidden block">
                <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <Layout style={{ flex: "1 1 auto" }} className="h-screen">
                       <Navbar />

                    <Content style={{width: '100%', height: '100%'}} className="h-screen">
                        <MapSection  locationData={locationData} vehicleGroupList={vehicleGroupList} vehicleList={vehicleList} />
                        {/* <Map2 users={locationData} /> */}
                    </Content>
                </Layout>

                <DetailMenu menuList={vehicleList} menuCollapsed={detailMenuCollapsed} locationData={locationData} />
            </Layout>

            <div className="hidden">
            <Footer>
                Powered By &nbsp; <b><i>autopeepal</i></b>
            </Footer>
              </div>

              <div className="block md:hidden">
              <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0,background:'#B9BDC2' }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon onClick={ handleMainMenuCollapse }/>
          </IconButton>
          <StyledFab color="secondary" aria-label="add">
           <Home/>
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
             <PlayArrowOutlined sx={{fontSize:'35px'}} onClick={ handleDetailMenuCollapse }/>
          </IconButton>
        </Toolbar>
      </AppBar>
      </div>
        </Layout>
    );
}

export default LiveMap;