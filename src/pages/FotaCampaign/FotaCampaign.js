import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppMenu, Navbar, Header, Footer } from '../../components';
import { AppMenuList } from '../../utils/constants';
import { AppActions, LiveMapActions } from '../../stores/actions';
import { PageContent, SubMenu, SideMenu} from '.';
import axios from "axios";
import { API_DEVICE_URL } from '../../utils/constants';
import { Layout } from "antd";
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
    return (
        <Layout className="flex h-screen">
            <Navbar />

            <Layout>
                <AppMenu activePage={2} menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />

                <Layout style={{ flex: "1 1 auto" }}>
                    <Header title={'FOTA Campaign'} />

                    <Content style={{width: '100%', height: '100%'}}>
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

            <Footer>
                Powered By &nbsp; <b><i>autopeepal</i></b>
            </Footer>
        </Layout>
    );
}

export default FotaCampaign;
