import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { AppMenu, Navbar, Header, Footer } from "../../../components";
import { AppMenuList, ThemeColor } from "../../../utils/constants";
import { AppActions, LiveMonitorActions } from "../../../stores/actions";
import { DetailMenu } from ".";
import './LiveMonitor.css';

import { Layout } from "antd";
import { useState } from "react";
import LiveContent from "./LiveContent";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import AppMenu2 from "../../../components/Appmneu2";
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';

const { Content  } = Layout;

const LiveMonitor = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = useSelector( ({User}) => User.userId );
    const { lMonitorParams } = useSelector( ({LiveMonitor}) => LiveMonitor );
    const { activeVehicle: vehicle } = useSelector( ({LiveMap}) => LiveMap );
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector( ({App}) => App );
    const [selectCheckParam,setSelecCheckParam] = useState([])
    const [active, setActive] = useState(false)


    useEffect( () => {
        if (Object.keys(vehicle).length === 0) {
            history.goBack();
            return;
        }
    }, [history, vehicle]);

    useEffect( () => {
        dispatch(AppActions.setMainMenuCollapsed(true));
        dispatch(LiveMonitorActions.getLMonitorParams(vehicle.registration_id, 'vreg_id'));
        dispatch(LiveMonitorActions.getLMonitorParamGroups(userId));
    }, [dispatch, userId, vehicle]);

useEffect(() =>{
       console.log(selectCheckParam)
},[selectCheckParam])


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
                <AppMenu activePage ={1} menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <div className="md:hidden block">
                <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <Layout style={{ flex: "1 1 auto" }}>
                   

                    <Content style={{width: '100%', height: '100%'}}>
                     <LiveContent selectCheckParam={selectCheckParam} setSelecCheckParam={setSelecCheckParam}active={active} setActive= {setActive} />
                    </Content>
                </Layout>

                <DetailMenu menuList={lMonitorParams} menuCollapsed={detailMenuCollapsed} setSelecCheckParam={setSelecCheckParam} active = {active}/>
            </Layout>

            <div className="hidden">
            <Footer>
                Powered By &nbsp; <b><i>autopeepal</i></b>
            </Footer>
              </div>

              <div className="block md:hidden">
              <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0,background:ThemeColor.light_color_1 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer">
            <MenuIcon onClick={ handleMainMenuCollapse }/>
          </IconButton>
          <StyledFab style={{background: ThemeColor.light_color_2, color:"white" }} aria-label="add">
          <LocationOnSharpIcon  style={{fontSize:"30px"}}/>
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

export default LiveMonitor;