import React, {useState, useEffect} from "react";
import { Layout } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { AppMenu, Navbar, Header, Footer, SideMenu } from '../../../components';
import { AppMenuList, ThemeColor } from "../../../utils/constants";
import { DcUtils } from '../../../utils';
import { DCContent,SubMenu } from "./";
import { API_LMONITOR_URL } from "../../../utils/constants";
import { API_TES_URL } from "../../../utils/constants";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import { AppActions } from "../../../stores/actions";
import AppMenu2 from "../../../components/Appmneu2";
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';

const { Content  } = Layout;

const DC = () => {
    const dispatch = useDispatch();
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector( ({App}) => App );
    const [ subMenuVisible, setSubMenuVisible] = useState(false);
    const [ activeMenu, setActiveMenu] = useState(0);
    const { activeVehicle } = useSelector( ({LiveMap}) => LiveMap );
    const [ selectedSubMenuItem, setSelectedSubMenuItem] = useState();
    const [ subMenuItems, setSubMenuItems ] = useState([]);
    const device_type = activeVehicle?.imei[0].device_typ;
    // let apmode = [];let vmmode = []; let dlrmode =[]; let usrmode = [];
    // const subMenuItems = [apmode, vmmode, dlrmode, usrmode];
    useEffect(()=>{
        if (device_type) {
            const request = axios.get(`${API_LMONITOR_URL}/tconfig/list/?device_type=`+device_type);
            request.then(response => {
                const { results } = response.data;
                let list = [];
                results.forEach( (item, index) => {
                    list.push({
                        ...item,
                        key: index,
                        label: item.config_header
                    });
                });
                const aplist = get_Config_by_mode(list, "APCfg");
                const vmlist = get_Config_by_mode(list, "VMCfg");
                const dlrlist = get_Config_by_mode(list, 'DLRCfg');
                const userlist = get_Config_by_mode(list, 'UserCfg');
                setSubMenuItems([aplist, vmlist, dlrlist, userlist])
            })
        }
    },[device_type])

    const get_Config_by_mode = (list, mode) => {
        const temp = list.filter(item =>  item.mode.find(val => val.category == mode))
        return temp;
    }

    const handleMenuSelect = ({key}) =>{
        let data = {}
        data.imei = activeVehicle?.imei[0].mac_id;
        data.mode = key;
        const request = axios.post(`${API_TES_URL}/commands/cfg/permission`, data);
        request.then(response => {
            if (response.data.success == true) {
                const menu = parseInt(key);
                setActiveMenu(menu);
                setSubMenuVisible(true);
            }
        })
        
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
 return(
    <Layout className="flex h-screen">
       
        <Layout>
        <div className="md:block hidden">
                <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <div className="md:hidden block">
                <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>
            <Layout style={{flex: "1 1 auto"}}>
                {/* <Header title={'Telematics Configuration'}/> */}
                    <Header title={"Device Firmware Update"} showText={false} style={{justifyContent: "space-between"}} />
                <Content style={{width: '100%'   }}>
                    <DCContent
                        activeMenu={activeMenu}
                        vehicle={activeVehicle}
                        selectedSubMenuItem = {selectedSubMenuItem}
                    />
                </Content>
            </Layout>
    
        
        { !subMenuVisible &&
            <SideMenu
                title={'Cfgn Session'}
                items={DcUtils.SessionItems}
                activeMenu={activeMenu}
                menuCollapsed={detailMenuCollapsed}
                handleItemSelect={handleMenuSelect}
            /> }

        { (subMenuVisible && subMenuItems[activeMenu]) &&
            <SubMenu
                title={"Telematics Config"}
                headerStyle={{fontSize: 18}}
                activeMenu={activeMenu}
                items={subMenuItems[activeMenu]}
                menuCollapsed={detailMenuCollapsed}
                mainMenu={!subMenuVisible}
                setSelectedSubMenuItem = {setSelectedSubMenuItem}
                handleBack={() => setSubMenuVisible(false)}
                // handleItemSelect={handleMenuSelect}
            /> }
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
 )
}
export default DC;