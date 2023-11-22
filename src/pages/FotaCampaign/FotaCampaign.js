import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppMenu, Navbar, Header, Footer } from '../../components';
import { AppMenuList, ThemeColor } from '../../utils/constants';
import { AppActions, LiveMapActions } from '../../stores/actions';
import { PageContent, SubMenu, SideMenu} from '.';
import axios from "axios";
import { API_DEVICE_URL } from '../../utils/constants';
import { Layout } from "antd";
import AppMenu2 from '../../components/Appmneu2';
import Navbar2 from '../../components/Navbar2';
import { AppBar, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Home from '@mui/icons-material/Home';
import { Box, styled } from "@mui/system";
import PlayArrowOutlined from '@mui/icons-material/PlayArrowOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Fab from '@mui/material/Fab';
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';

const { Content  } = Layout;

const FotaCampaign = () => {
    const dispatch = useDispatch();
    const userId = useSelector( ({User}) => User.userId );
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector( ({App}) => App );
    const { vehicleList } = useSelector( ({LiveMap}) => LiveMap );
    const [ menuItems, setMenuItems ] = useState()
    const [activeMenu, setActiveMenu] = useState(0);
    const [subMenuVisible, setSubMenuVisible] = useState(false);
    const [newCampaignVisible, setNewCampaignVisible] = useState(false)
    const [newCampaign, setNewCampaign] = useState();
    const tempItems = [
        
    ];
    useEffect(()=>{
        if (userId != -1) {
            const request = axios.get(`${API_DEVICE_URL}/fotax/get/fotacampaign/list/?user_id=`+ userId);
            request.then(response => {
                debugger
                setMenuItems(response.data.results)
         })
            .catch((err)=>{
                console.log(err)
                setMenuItems(tempItems)
            })
        }
    },[userId])
    

    useEffect( () => {
        dispatch(AppActions.setMainMenuCollapsed(true));
        dispatch(LiveMapActions.getVehicleList(userId));
        dispatch(LiveMapActions.getVehicleGroupList(userId));
    }, [dispatch, userId]);

    const plusIconSelect = () => {
        setSubMenuVisible(true);
    }
    const handleMenuSelect = ({key}) =>{
        const menu = parseInt(key.match(/\d+/)[0]);
        setNewCampaignVisible(false)
        setActiveMenu(menu);
      
    };

    const hideSubMenu = () => {
        setSubMenuVisible(false)
    }

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
            {/* <Navbar2 /> */}
            {/* <Header title={"FOTA Campaign"} showText={false} style={{justifyContent: "space-between"}} /> */}

            <Layout>
            <div className="md:block hidden">
                <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <div className="md:hidden">
                <AppMenu2 menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
                </div>

                <Layout style={{ flex: "1 1 auto" }} className='h-screen'>
            <Navbar2 />
                   

                    <Content style={{width: '100%'}} className='h-screen'>
                        { newCampaignVisible &&
                             <PageContent
                             activeMenu={activeMenu}
                             userId={userId}
                             campaign={newCampaign}
                         />
                        }
                        { (!newCampaignVisible && menuItems && menuItems.length >0) &&
                            <PageContent
                                activeMenu={activeMenu}
                                userId={userId}
                                campaign={menuItems[activeMenu]}
                            />
                        }
                    </Content>
                </Layout>

                { (!subMenuVisible && menuItems) &&
                <SideMenu
                    title={'Select FOTA Campaign'}
                    headerStyle={{fontSize: 18}}
                    items={menuItems}
                    activeMenu={activeMenu}
                    menuCollapsed={detailMenuCollapsed}
                    handleItemSelect={handleMenuSelect}
                    plusIconSelect = {plusIconSelect}
                /> }

                { (subMenuVisible && menuItems) &&
                <SubMenu
                    title={'Create Campaign'}
                    headerStyle={{fontSize: 18}}
                    items={vehicleList}
                    menuCollapsed={detailMenuCollapsed}
                    mainMenu={!subMenuVisible}
                    hideSubMenu={hideSubMenu}
                    setNewCampaignVisible = {setNewCampaignVisible}
                    setNewCampaign = {setNewCampaign}
                    handleBack={() => setSubMenuVisible(false)}
                /> }
            </Layout>

            <div className="block md:hidden">
              <AppBar position="fixed"  sx={{ top: 'auto', bottom: 0,background: ThemeColor.light_color_1 }}>
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

export default FotaCampaign;
