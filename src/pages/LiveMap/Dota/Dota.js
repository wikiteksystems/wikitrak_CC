import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppMenu, Navbar, Header, Footer, SideMenu } from '../../../components';
import { DotaUtils } from '../../../utils';
import { AppMenuList, ThemeColor } from '../../../utils/constants';
import { AppActions, DotaActions } from '../../../stores/actions';
import { DotaContent, SubMenu } from './';

import { Layout } from "antd";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import AppMenu2 from '../../../components/Appmneu2';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';

const { Content  } = Layout;

const Dota = () => {
    const dispatch = useDispatch();
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector( ({App}) => App );
    const { liveParams, writeParams, actuatorTest, routineTest, ecuInfos, ecuTab } = useSelector( ({Dota}) => Dota );
    const { activeVehicle } = useSelector( ({LiveMap}) => LiveMap );
    const sub_model_id = activeVehicle?.sub_model?.id;

    const [activeMenu, setActiveMenu] = useState(0);
    const [subMenuVisible, setSubMenuVisible] = useState(false);

    const [selectedSubMenuItem, setSelectedSubMenuItem] = useState();
    
    let fotaFiles = activeVehicle.sub_model?.ecus[ecuTab.flashing]?.ecu[0]?.file
    fotaFiles = fotaFiles?.map( file => ({
        ...file,
        label: file.sw_part_no
    })) || [];
    const subMenuItems = [[], [], liveParams, writeParams, actuatorTest, routineTest, ecuInfos, fotaFiles];

    useEffect( () => {
        if (sub_model_id !== undefined) {
            dispatch(AppActions.setMainMenuCollapsed(true));
            dispatch(DotaActions.getActuatorTest(sub_model_id));
        }
    }, [dispatch, sub_model_id]);

    const handleMenuSelect = ({key}) =>{
        const menu = parseInt(key);
        setActiveMenu(menu);
        if ((menu >= 2 && menu <= 5) || menu === 7)
            setSubMenuVisible(true);
        else setSubMenuVisible(false);
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
           

            <Layout>
            <div className="md:block hidden">
                <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <div className="md:hidden block">
                <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <Layout style={{ flex: "1 1 auto" }}>
                    <Header title={DotaUtils.MenuItems[activeMenu].label} />

                    <Content style={{width: '100%', height: '100%'}}>
                        <DotaContent
                            activeMenu={activeMenu}
                            vehicle={activeVehicle}
                            selectedSubMenuItem = {selectedSubMenuItem}
                        />
                    </Content>
                </Layout>

                { !subMenuVisible &&
                <SideMenu
                    title={'Select Function'}
                    items={DotaUtils.MenuItems}
                    activeMenu={activeMenu}
                    menuCollapsed={detailMenuCollapsed}
                    handleItemSelect={handleMenuSelect}
                /> }

                { subMenuVisible &&
                <SubMenu
                    title={'Select ' + DotaUtils.MenuItems[activeMenu].label}
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
    );
}

export default Dota;
