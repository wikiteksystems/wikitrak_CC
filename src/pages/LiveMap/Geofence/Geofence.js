import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Icon } from '@iconify/react';

import { AppMenu, Navbar, Header, Footer, SideMenu } from "../../../components";
import { AppMenuList, ThemeColor, matchColor } from "../../../utils/constants";
import { LiveMapUtils } from "../../../utils";
import { AppActions, GeofenceActions } from "../../../stores/actions";
import MapSection from "./Map";
import './Geofence.css';
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';

import { Button, Switch, Layout, message } from "antd";
import AppMenu2 from "../../../components/Appmneu2";
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';

const { Content  } = Layout;

const Geofence = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { themeColor } = useSelector( ({User}) => User);
    const { activeVehicle: vehicle } = useSelector( ({LiveMap}) => LiveMap );
    const { geofences } = useSelector( ({Geofence}) => Geofence );
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector( ({App}) => App );
    const [activeMenu, setActiveMenu] = useState(0);
    const [editable, setEditable] = useState(false);
    const [geofence, setGeofence] = useState({...geofences[activeMenu]});
    const [circleSelected, setCircleSelected] = useState(false);
    const [modified, setModified] = useState(false); 

    useEffect( () => {
        if (Object.keys(vehicle).length === 0) {
            history.goBack();
            return;
        }
    }, [history, vehicle]);

    useEffect( () => {
        dispatch(GeofenceActions.getGeofences(vehicle.id));
    }, [dispatch, vehicle]);

    useEffect( () => {
        setGeofence({...geofences[activeMenu]});
    }, [geofences, activeMenu]);

    useEffect(() => {
         
        if (geofences.length > 0 && geofences[activeMenu] && geofence && geofence.center) {
            console.log("My geofence", geofence);
            const { center, radius, type, status } = geofence;

            const { center: orgCenter, radius: orgRadius, type: orgType, status: orgStatus } = geofences[activeMenu];

            if (
                center.lat !== orgCenter.lat ||
                center.lng !== orgCenter.lng ||
                radius !== orgRadius ||
                type !== orgType ||
                status !== orgStatus
            ) {
                setModified(true);
            } else {
                setModified(false);
            }
        } else {
            return;
        }
    
}, [geofence, geofences, activeMenu]);

    const handleMenuSelect = ({key}) =>{
        const menu = parseInt(key);
        setActiveMenu(menu);
        if (geofences[menu].radius === 0)
            message.warning('No geofence data. Plese right click to create.');

        if (menu !== activeMenu) {
            setEditable(false);
            setCircleSelected(false);
        }
    };
    const handleEdit = () => {
        setEditable(true);
    };
    const handleSwitch = (checked, e, type) => {
        if (type === 'status') {
            setGeofence({...geofence, [type]: checked ? 'Active' : 'Inactive'});
        }
        else if (type === 'type') {
            setGeofence({...geofence, [type]: checked ? 'inward' : 'outward'});
        }
    };
    const handleSubmit = () => {
        const { status, isNew } = geofence;
        const { status: orgStatus, id } = geofences[activeMenu];

        if (isNew) {
            dispatch(GeofenceActions.saveGeofence({...geofence, vehicle: vehicle.id, geofence_history: []}));
        }
        else {
            if (status !== orgStatus)
                dispatch(GeofenceActions.setGeofenceState(id, status));
            else if (modified) {
                dispatch(GeofenceActions.saveGeofence({...geofence, vehicle: vehicle.id}));
            }
        }
    };

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
            {/* <Navbar /> */}

            <Layout>
            <div className="md:block hidden">
                <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <div className="md:hidden block">
                <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <Layout style={{ flex: "1 1 auto" }}>
                    {/* <Header title={'Live Map'} /> */}
                    <Header title={"Geofence"} showText={false} style={{justifyContent: "space-between"}} />

                    <Content style={{width: '100%', height: '100%'}}>
                        <MapSection
                            location={LiveMapUtils.centerLocation}
                            zoomLevel={15}
                            geofence={geofences[activeMenu] || {center: {...LiveMapUtils.centerLocation}, radius: 0}}
                            geofenceType={geofence?.type}
                            editable={editable}
                            setGeofence={setGeofence}
                            setCircleSelected={setCircleSelected}
                        />
                    </Content>
                </Layout>

                <SideMenu
                    theme={'light'}
                    title={'Geofence'}
                    items={geofences.map( item => ({
                        key: item.key,
                        label: 
                            <div className="flex justify-between items-center">
                                <span className="w-full"> {item.geofence} </span>
                                <Button className="border-none bg-transparent" onClick={handleEdit} disabled={editable || item.key !== activeMenu}>
                                    <Icon icon="fa:edit" width="22" height="22" />
                                </Button>
                                <Switch
                                    disabled={item.key !== activeMenu}
                                    onChange={(checked, e) => handleSwitch(checked, e, 'status')}
                                    checked={item.key === activeMenu ? geofence.status === 'Active' : item.status === 'Active'}
                                />
                            </div>
                    })) }
                    activeMenu={activeMenu}
                    menuCollapsed={detailMenuCollapsed}
                    handleItemSelect={handleMenuSelect}
                    footerVisible={editable || circleSelected}
                    footerStyle={{padding: '0', height: '50%'}}
                    footerChildren={
                        <div className="w-full h-full flex flex-col items-center justify-between text-white">
                            <div className="w-full h-1/3 flex flex-col justify-center">
                                <p className=' font-bold' style={{fontSize: 20}}> Add / Edit {geofence.geofence} </p>
                            </div>
                            <div className="w-full h-1/2 flex flex-col items-center justify-evenly">
                                <div className="" style={{fontSize: 19}}>Center @ {geofence?.center?.lat?.toFixed(2)} / {geofence?.center?.lng?.toFixed(2)}</div>
                                <div className="" style={{fontSize: 19}}>Radius - {(geofence.radius / 1000).toFixed(2)} km</div>
                                <div className="w-full">
                                    <Switch
                                        className="custom-switch w-1/2"
                                        style={{height: 30}}
                                        checkedChildren="Inward"
                                        unCheckedChildren="Outward"
                                        onChange={(checked, e) => handleSwitch(checked, e, 'type')}
                                        checked={geofence.type === 'inward'}
                                    />
                                </div>
                                <div className="w-full">
                                    <Switch
                                        className="custom-switch w-1/2"
                                        style={{height: 30}}
                                        checkedChildren="Active"
                                        unCheckedChildren="Inactive"
                                        onChange={(checked, e) => handleSwitch(checked, e, 'status')}
                                        checked={geofence.status === 'Active'}
                                    />
                                </div>
                            </div>
                            <div className="w-full h-1/3 flex flex-col justify-center items-center">
                                <Button
                                    className="w-1/2 text-white"
                                    style={{background: matchColor(themeColor), border: '1px solid ' + matchColor(themeColor)}}
                                    hidden={!editable && circleSelected}
                                    onClick={handleSubmit}
                                    disabled={!modified}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    }
                />
            </Layout>

            <div className="hidden ">
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

export default Geofence;