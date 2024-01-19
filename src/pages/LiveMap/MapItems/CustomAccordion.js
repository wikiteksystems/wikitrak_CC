import React, { useEffect, useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import { API_VEHICLE_URL } from '../../../utils/constants';
import Checkbox from 'antd/es/checkbox/Checkbox';
import {useDispatch } from "react-redux";
import { LiveMapActions } from "../../../stores/actions";

function CustomAccordian({vehicleList,gtVehi}) {
  const dispatch = useDispatch();
  const [paramList,setParamList] =useState([])
  const  [activeParamList,setActiveParamList] = useState([])

  const getLMonitorParams=async(index)=>{

    setActiveParamList([])
    // paramList.map((param)=>{
    //   param.checked=false
    // })
    // setParamList(paramList)
 if(index){
  let reg_id = vehicleList[index].registration_id;
 
 
  const request = axios.get(`${API_VEHICLE_URL}/live-monitor-parameter/?registration_id=${reg_id}`)
  let list = [];
  request.then(response => {
    const { results } = response.data;
   
    let i = 0;
    results?.forEach( (item) => {
        item[item.parameter_type.toLowerCase() + '_parameter'].forEach( (param) => {
            list.push({
                id: param.id,
                _id: item.id,
                key: i ++,
                label: item.parameter_type === 'Telematic' ? param.short_name : (item.parameter_type === 'IVN' ? param.pid_description : param.spn),
       
                param_type: item.parameter_type,
                param_header: param?.header?.device_header,
                unit: param?.unit,
                param_id: item.id,
                vehicle_reg:item?.vehicle?.vin,
                param_group_id: item.parameter_group[0]?.id,
                param_group_name: item.parameter_group[0]?.group_name,
                param_group_color: item.parameter_group[0]?.color,
                checked:false
            });
        });
    });

setParamList(list)
  
}).catch(error => {
    console.log(error);
});
 }
  }

  const handleParameterChange=(e,param,imei,id) => {
 
  setParamList((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
      )
    );
  //     console.log(paramArray,'paramArray')
   let active_paramList=activeParamList  
   if(e.target.checked){
      gtVehi.map((item)=>{
       if (item.latestDocument.imei===imei){
           let par=param
           active_paramList.push({label:param,value:item.latestDocument[param]})
           console.log('active_paramList',active_paramList)
           setActiveParamList(active_paramList);
      }
     })

   
   }else{
        let removeParam=activeParamList.filter(item => item.label !== param);
          setActiveParamList(removeParam)
          console.log('removeParam',removeParam)
         }
   };

  const handleAddClick=(reg_id,imei) => {
   console.log('activeParamList',activeParamList)
    let obj=[{'reg_id':reg_id,'imei':imei,params:activeParamList}]
    dispatch(LiveMapActions.addParameter(obj))
  }

  return (
    <Accordion defaultActiveKey="" onSelect={getLMonitorParams} >
      {vehicleList.map((item,index)=>{
  return <Accordion.Item  eventKey={`${index}`}>
        <Accordion.Header style={{color:"white"}}><p className='text-light'>{item.registration_id}</p></Accordion.Header>
        <Accordion.Body>
          {  paramList && paramList.length>0 ?<>  {
         paramList.map((param,index)=>{
            return <div className='text-white'>
                {param.label }
                <Checkbox style={{ position: 'absolute', right: 20}}
                 checked={param.checked}
                 onChange={(e)=>{
                  handleParameterChange(e,param.label,item.imei[0].mac_id,param._id)
                }}
                />
            </div>
          })
          }</>:<div className='text-white'>
              No parameters found
            </div>}
        <button className='btn btn-primary w-100  mt-3' onClick={()=>{handleAddClick(item.registration_id,item.imei[0].mac_id)}}>Add</button>
        </Accordion.Body>
      </Accordion.Item>
      })}
    
     
    </Accordion>
  );
}

export default CustomAccordian;