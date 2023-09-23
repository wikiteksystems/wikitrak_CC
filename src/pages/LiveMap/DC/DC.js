import React, {useState, useEffect} from "react";
import { Layout } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { AppMenu, Navbar, Header, Footer, SideMenu } from '../../../components';
import { AppMenuList } from "../../../utils/constants";
import { DcUtils } from '../../../utils';
import { DCContent,SubMenu } from "./";
import { API_LMONITOR_URL } from "../../../utils/constants";
import { API_TES_URL } from "../../../utils/constants";
const { Content  } = Layout;

const DC = () => {
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
 return(
    <Layout className="flex h-screen">
        <Navbar/>
        <Layout>
            <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed}/>
            <Layout style={{flex: "1 1 auto"}}>
                <Header title={'Telematics Configuration'}/>
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
        <Footer>
                Powered By &nbsp; <b><i>autopeepal</i></b>
        </Footer>
    </Layout>
 )
}
export default DC;