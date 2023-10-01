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

    return (
        <Layout className="flex h-screen">
            <Navbar />

            <Layout>
                <AppMenu menuList={AppMenuList} menuCollapsed={mainMenuCollapsed} />

                <Layout style={{ flex: "1 1 auto" }}>
                    <Header title={'Live Map'} />

                    <Content style={{width: '100%', height: '100%'}}>
                        <MapSection  locationData={locationData} vehicleGroupList={vehicleGroupList} vehicleList={vehicleList} />
                        {/* <Map2 users={locationData} /> */}
                    </Content>
                </Layout>

                <DetailMenu menuList={vehicleList} menuCollapsed={detailMenuCollapsed} />
            </Layout>

            <Footer>
                Powered By &nbsp; <b><i>autopeepal</i></b>
            </Footer>
        </Layout>
    );
}

export default LiveMap;