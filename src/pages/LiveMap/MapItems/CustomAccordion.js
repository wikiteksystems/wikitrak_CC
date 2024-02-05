import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Accordion, Form, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import { API_VEHICLE_URL } from '../../../utils/constants';
// import Checkbox from 'antd/es/checkbox/Checkbox';
import { useDispatch } from "react-redux";

import { LiveMapActions } from "../../../stores/actions";
import { LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import { Layout, Avatar, Menu, Input, Button, Checkbox, Popconfirm, Select, ColorPicker } from 'antd';
import { LiveMonitorUtils } from "../../../utils";
import { matchColor } from "../../../utils/constants";
import CreateParameter from './CreateParameter';
import CreateParameterGroup from './createParameterGroup';
import { LiveMonitorActions } from "../../../stores/actions";



import './CustomAccordian.css'
import { act } from 'react-dom/test-utils';

// import { Form } from 'antd';

function CustomAccordian({ vehicleList, gtVehi }) {
 
  const { userId, themeColor } = useSelector(({ User }) => User);
  const { lMonitorParamGroups, telematicParams, ivnParams, j1939Params } = useSelector(({ LiveMonitor }) => LiveMonitor);
  const dispatch = useDispatch();

  const [paramList, setParamList] = useState([])
  const [parameterGroupList,setParameterGroupList] = useState(lMonitorParamGroups)
  const [activeParamList, setActiveParamList] = useState([])
  const [activeParamGroupList, setActiveParamGroupList] = useState([])
  const [isCreate, setIsCreate] = useState(false)
  const [isCreateGroup, setIsCreateGroup] = useState(false)
  const [selectedParam, setSelectedParam] = useState(null);
  

  useEffect(() => {
    // dispatch(LiveMonitorActions.getLMonitorParamGroups(userId));
  }, [])


  const getLMonitorParams = async (index) => {

    setActiveParamList([])
    console.log('parameter list',paramList)
    // paramList.map((param)=>{
    //   param.checked=false
    // })
    // setParamList(paramList)
    if (index) {
      let reg_id = vehicleList[index].registration_id;


      const request = axios.get(`${API_VEHICLE_URL}/live-monitor-parameter/?registration_id=${reg_id}`)
      let list = [];
      request.then(response => {
        const { results } = response.data;

        let i = 0;
        results?.forEach((item) => {
          item[item.parameter_type.toLowerCase() + '_parameter'].forEach((param) => {
            list.push({
              id: param.id,
              _id: item.id,
              key: i++,
              label: item.parameter_type === 'Telematic' ? param.short_name : (item.parameter_type === 'IVN' ? param.pid_description : param.spn),

              param_type: item.parameter_type,
              param_header: param?.header?.device_header,
              unit: param?.unit,
              param_id: item.id,
              vehicle_reg: item?.vehicle?.vin,
              param_group_id: item.parameter_group[0]?.id,
              param_group_name: item.parameter_group[0]?.group_name,
              param_group_color: item.parameter_group[0]?.color,
              checked: false
            });
          });
        });

        setParamList(list)

      }).catch(error => {
        console.log(error);
      });
    }
  }

  const handleParameterChange = (e, param, imei, id,reg_id) => {

    setParamList((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, checked:e.target.checked } : item
      )
    );
    let active_paramList = activeParamList
    let tempParamList = activeParamList
    if (e.target.checked) {
      gtVehi.map((item) => {
        if (item.latestDocument.imei === imei) {
          // if(!isCreate) active_paramList=[]
          active_paramList.push({ label: param, value: item.latestDocument[param] })
          tempParamList = active_paramList;
          setActiveParamList(active_paramList);
        }
      })
    } else {
      let removeParam = activeParamList.filter(item => item.label !== param);
      tempParamList = removeParam
      setActiveParamList(removeParam)
    }

    let obj = [{ 'reg_id': reg_id, 'imei': imei, params: tempParamList }]
    dispatch(LiveMapActions.addParameter(obj))
  };

  const handleParameterGroupChange = (e, param, imei, id) => {
    // console.log(parameterGroupList)
  setParameterGroupList((prevItems) =>
    prevItems.map((item) =>
      item.id === id ? { ...item, checked: e.target.checked } : item
    )
  );
  const group = parameterGroupList.find( item => id === item.id );
  const parameterList = paramList.map( item => (
    item.param_group_id === group.id ? {
        ...item,
        checked: true
    } : {...item}
        ));
   
   let filteredParameter = parameterList.filter((item) => item?.checked)
   console.log(filteredParameter, 'filtered parameter');
  
   let active_paramList = activeParamGroupList
   let tempParamList = activeParamGroupList
   if (e.target.checked) {
     gtVehi.map((item) => {
       if (item.latestDocument.imei === imei) {
            filteredParameter.map((par)=>{
              let parameter=par.label
              active_paramList.push({ label: parameter, value: item.latestDocument[parameter] })
            })
          tempParamList = active_paramList;
          setActiveParamGroupList(active_paramList);
       }
     })
} else {
   let removeParam=activeParamGroupList
   let removeItem = filteredParameter.map((param) => {
    console.log( activeParamGroupList,param.label)
    removeParam = removeParam.filter(item => item.label !== param.label);   
    tempParamList = removeParam;
   })
    setActiveParamGroupList(removeParam);
   }
   
    let obj = [{ 'reg_id': id, 'imei': imei, params: tempParamList }]
    dispatch(LiveMapActions.addParameter(obj))
  }

  return (
    <Accordion defaultActiveKey="" onSelect={getLMonitorParams} >
      {vehicleList.map((item, index) => {
        return <Accordion.Item eventKey={`${index}`}>
          <Accordion.Header style={{ color: "white" }}><p className='text-light'>{item.registration_id}</p></Accordion.Header>

          <Accordion.Body>

            <Tabs
              fill justify
              defaultActiveKey="Parameters_List"
              id="uncontrolled-tab-example"
              className="mb-3 text-light"
            >
              <Tab eventKey="Parameters_List"
                title={
                  <div className='d-flex'>
                    <Button
                      onClick={() =>{
                        setIsCreate(false);
                        setIsCreateGroup(false);
                        // setActiveParamList([])
                      }}
                      title='Parameters List'
                      className="w-[40px] flex justify-center items-center" shape='circle' size="large"
                    >
                      <Icon icon="ant-design:sliders-outlined" width={25} height={25} />
                      <span title="Create Parameter">
                      </span>
                    </Button>                  

                  </div>
                }

              >

                {isCreate && <CreateParameter selectedParam={selectedParam} setSelectedParam={setSelectedParam} />}
                {!isCreate && <>
                  {paramList && paramList.length > 0 ? <>  {
                    paramList.map((param, index) => {
                      return <div className='text-white'>
                        {param.label}
                        <Checkbox style={{ position: 'absolute', right: 20 }}
                          checked={param.checked}
                          onChange={(e) => {
                            handleParameterChange(e, param.label, item.imei[0].mac_id, param._id,item.registration_id);
                          }}
                        />
                      </div>
                    })
                  }</> : <div className='text-white'>
                    No parameters found
                  </div>}
                </>}




              </Tab>
              <Tab eventKey="Parameter_Groups_List"
                title={
                  <div className='d-flex'>
                    <Button
                      title='Parameter Groups'
                      className="w-[40px] flex justify-center items-center" shape='circle' size="large"
                      onClick={() =>{
                       setIsCreateGroup(false)
                       setIsCreate(false)
                      }}
                    >
                      <Icon icon="ant-design:sliders-filled" width={25} height={25} />
                      
                    </Button>
                    {/* <span className='text-white'>
                      Groups
                    </span> */}
                  </div>}
              >
                    {!isCreateGroup && <>
                  {parameterGroupList && parameterGroupList.length > 0 ? <>  {
                    parameterGroupList.map((param, index) => {
                      
                      return <div className='text-white'>
                        {param.label}
                        <Checkbox style={{ position: 'absolute', right: 20 }}
                          checked={param.checked}
                          onChange={(e) => {
                            handleParameterGroupChange(e, param.label, item.imei[0].mac_id, param.id)
                          }}
                        />
                      </div>
                    })
                  }</> : <div className='text-white'>
                    No parameters found
                  </div>}
                </>}
                {isCreateGroup && <CreateParameterGroup selectedParam={selectedParam} setSelectedParam={setSelectedParam} />}
              </Tab>
            </Tabs>



          </Accordion.Body>
        </Accordion.Item>
      })}


    </Accordion>
  );
}

export default CustomAccordian;
