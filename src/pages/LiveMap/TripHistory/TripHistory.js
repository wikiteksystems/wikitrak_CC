import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { AppMenu, Navbar, Header, Footer } from "../../../components";
import { AppMenuList } from "../../../utils/constants";
import { AppActions, LiveMonitorActions } from "../../../stores/actions";
import DetailMenu  from "./DetailMenu";

import { Layout } from "antd";
import { useState } from "react";
import LiveContent from "./LiveContent";
import { locationsApi } from "../../../mocks/location";
const { Content  } = Layout;

const TripHistory = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const userId = useSelector( ({User}) => User.userId );
    const { lMonitorParams } = useSelector( ({LiveMonitor}) => LiveMonitor );
    const { activeVehicle: vehicle } = useSelector( ({LiveMap}) => LiveMap );
    const { mainMenuCollapsed, detailMenuCollapsed } = useSelector( ({App}) => App );
    const [selectCheckParam,setSelecCheckParam] = useState([]);
    const [tripHis,setTripHis] = useState([]);

    const fetchTripHis = async () =>{
        if(vehicle?.imei.length>0){
            let data = {imei:vehicle?.imei[0]?.mac_id}
            let result = await locationsApi.getTripHistory(data);
              if(result.status === "SUCCESS")
               setTripHis([...result?.data[0]?.documents])
         }
    }

    useEffect(() =>{
          fetchTripHis();
    },[vehicle])

    useEffect( () => {
        if (Object.keys(vehicle).length === 0) {
            history.goBack();
            return;
        }
    }, [history, vehicle]);

    useEffect( () => { 
        console.log(vehicle);
        dispatch(AppActions.setMainMenuCollapsed(true));
        dispatch(LiveMonitorActions.getLMonitorParams(vehicle.registration_id, 'vreg_id'));
        dispatch(LiveMonitorActions.getLMonitorParamGroups(userId));
    }, [dispatch, userId, vehicle]);

useEffect(() =>{
       console.log(selectCheckParam)
},[selectCheckParam])

    return (
        <Layout className="flex h-screen">
            <Navbar />

            <Layout>
                <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />

                <Layout style={{ flex: "1 1 auto" }}>
                   

                    <Content style={{width: '100%', height: '100%'}}>
                       
                     <LiveContent selectCheckParam={selectCheckParam} setSelecCheckParam={setSelecCheckParam} />
                    </Content>
                </Layout>

                <DetailMenu tripHis={tripHis} vehicle={vehicle} menuList={lMonitorParams} menuCollapsed={detailMenuCollapsed} setSelecCheckParam={setSelecCheckParam} />
            </Layout>

            <Footer>
                Powered By &nbsp; <b><i>autopeepal</i></b>
            </Footer>
        </Layout>
    );
}

export default TripHistory;