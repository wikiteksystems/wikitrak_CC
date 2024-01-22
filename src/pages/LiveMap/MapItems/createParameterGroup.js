import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { liveMonitorApi } from "../../../mocks/liveMonitor";
import { Layout, Avatar, Menu, Input, Button, Checkbox, Popconfirm, Select, ColorPicker } from 'antd';
import { LiveMonitorUtils } from "../../../utils";
import { LiveMonitorActions } from "../../../stores/actions";
import { paramDetailMenuItems } from "../../../utils/liveMonitorUtils";


const CreateParameterGroup = ({ selectedParam, setSelectedParam }) => {
  const dispatch = useDispatch();
  const { lMonitorParamGroups, telematicParams, ivnParams, j1939Params } = useSelector(({ LiveMonitor }) => LiveMonitor);
  const { activeVehicle } = useSelector(({ LiveMap }) => LiveMap);
  const { userId, themeColor } = useSelector(({ User }) => User);
 
  const [telematicData, setTelematicData] = useState([]);
  const [selectedGroupList, setSelectedGroupList] = useState([...lMonitorParamGroups]);
  const [selectedParamGroup, setSelectedParamGroup] = useState(null);
  
  const [newParam, setNewParam] = useState(false);
  const [newParamGroup, setNewParamGroup] = useState(false);
  const paramTypes = [
    { key: 0, id: 'Telematic', label: 'Telematic' },
    { key: 1, id: 'IVN', label: 'IVN' },
    { key: 2, id: 'J1939', label: 'J1939' }
  ];

  const dropdownList = {
    param_type: paramTypes,
    param_group_id: lMonitorParamGroups,
    param: telematicData,
    label: {
      telematic: telematicParams,
      ivn: ivnParams,
      j1939: j1939Params
    }
  };
  const fetchTelematic = async () => {
    const result = await liveMonitorApi.getTelematicParam();
    let arr = []

    for (let k of result?.results) {
      for (let i of k.params)
        arr.push(i)
    }

    setTelematicData([...arr])
  }

  useEffect(() => {
    console.log(lMonitorParamGroups, "parameter group")
    console.log('LiveMonitorUtils',LiveMonitorUtils.groupDetailMenuItems)
    // dispatch(LiveMonitorActions.getLMonitorParamGroups(userId));
    fetchTelematic();
  }, [])

  const handleInputChange = (e, type) => {
    setSelectedParam({ ...selectedParam, [type]: e.target.value })
  };
  const handleGroupInputChange = (e, type) => {
    setSelectedParamGroup({ ...selectedParamGroup, [type]: e.target.value })
  };
  const handleColorChange = (color, type) => {
    if (type === 'color')
      setSelectedParam({ ...selectedParam, param_group_color: color.toHexString().slice(1) })
    else
      setSelectedParamGroup({ ...selectedParamGroup, color: color.toHexString().slice(1) })
  }

  const handleSelectChange = (value, type) => {
    // console.log(type, 'this is type');
    if (type === 'param_type') {
      setSelectedParam({ ...selectedParam, [type]: value, _id: -1 });
    }
    else if (type === 'param_group_id') {
      setSelectedParam({ ...selectedParam, [type]: value });
    }
    else if (type === 'label') {
      setSelectedParam({ ...selectedParam, _id: value });
    } else if (type === 'param') {
      setSelectedParam({ ...selectedParam, [type]: value })
    }
    // console.log(selectedParam, "selected param")
  }


  const handleClick = (type) => {
    if (type === 'save-detail') {
      // setParamDetailEditable(false);
      //    console.log(selectedParam)
      let data1 = {}
      data1 = {
        color: selectedParam.param_group_color || 'ff0000',
        parameter_type: selectedParam.param_type,
        status: true,
        vehicle: activeVehicle.id,
        parameter_group: selectedParam.param_group_id === undefined ? [] : [selectedParam.param_group_id],
        telematic_parameter: [selectedParam.param],
        ivn_parameter: [],
        j1939_parameter: []
      };
      console.log('date1: ' + data1)
      // for (let i = 0; i < paramTypes.length; i ++) {
      //     if (paramTypes[i].label === selectedParam.param_type)
      //         data1[paramTypes[i].label.toLocaleLowerCase() + '_parameter'] = [`${selectedParam._id}`]
      //     else data1[paramTypes[i].label.toLocaleLowerCase() + '_parameter'] = []
      // }
      // console.log("data1=>", selectedParam)
      dispatch(LiveMonitorActions.saveLMonitorParam(data1, true, true ? '' : selectedParam.param_id));
    }
    else if (type === 'delete-param') {
      dispatch(LiveMonitorActions.deleteLMonitorParam(selectedParam.param_id));
      // setParamDetailVisible(false);
    }



    else if (type === 'save-group-detail') {
    
      const data = {
        ...selectedParamGroup,
        user: userId
      }
     
      console.log('data', data);
      dispatch(LiveMonitorActions.saveLMonitorParamGroup(data, true, true ? '' : selectedParamGroup.id));
    }
    else if (type === 'delete-param-group') {
      dispatch(LiveMonitorActions.deleteLMonitorParamGroup(selectedParamGroup.id));
      // setParamGroupDetailVisible(false);
    }
  };


  const handleCheckboxClick = (e, selectType, selectedId, data) => {
    // console.log(data)
    if (selectType === 'select-all') {
      // const list = searchedMenuList.map( item => ({
      //     ...item,
      //     checked: e.target.checked
      // }));

      // setSearchedMenuList(list);
    }
    else if (selectType === 'select-one-param-in-group') {
      // console.log(data, "selected one parameter in group list")

      // const list = paramsInGroup.map( item => (
      //     selectedId === item._id ? {
      //         ...item,
      //         checked: e.target.checked
      //     } : {...item}
      // ));


      // setParamsInGroup(list);
      // let a = list.filter((item) => item?.checked)
      // setSelecCheckParam(a)

    } else if (selectType === 'select-one') {
      // console.log(data, "select One")

      //  const list = searchedMenuList.map( item => (
      //      selectedId === item._id ? {
      //          ...item,
      //          checked: e.target.checked
      //      } : {...item}
      //  ));

      //  setSearchedMenuList(list);

      //  let a = list.filter((item) => item?.checked)
      //  setSelecCheckParam(a)

    }
    else if (selectType === 'group-select-one') {
      // const list = selectedGroupList.map( item => (
      //     selectedId === item.id ? {
      //         ...item,
      //         checked: e.target.checked
      //     } : {...item}
      // ));

      // const group = selectedGroupList.find( item => selectedId === item.id );

      // const paramList = searchedMenuList.map( item => (
      //     item.param_group_id === group.id ? {
      //         ...item,
      //         checked: e.target.checked
      //     } : {...item}
      // ));
      // let a = paramList.filter((item) => item?.checked)
      // console.log(a)
      // setSelecCheckParam(a)
      // setSearchedMenuList(paramList);
      // setSelectedGroupList(list);
    }
  };

  return (
    <div>
       <h4 className="text-light my-4">Create Parameter Group</h4>
      {
        
        LiveMonitorUtils.groupDetailMenuItems.map((item) => {
          // console.log(dropdownList,'keyname',item.keyName,'hello')
          return (
            <>
             
              {
                item.type === 'input' && <Input placeholder={item.label}
                  className="my-2"
                  value={selectedParam[item.keyName]}
                  onChange={e => handleGroupInputChange(e, item.keyName)} >
                </Input>
              }

              {
                item.type === 'dropdown' && <Select className={'w-full my-2'}
                
                  placeholder={item.label}
                  value={item.keyName === 'label' ? (selectedParam._id === -1 ? undefined : selectedParam._id) : selectedParam[item.keyName]}
                  onChange={value => handleSelectChange(value, item.keyName)}
                  
                // dropdownRender={(menu) => paramDetailEditable ? menu : null}
                >
                  {(item.keyName === 'label' ? dropdownList[item.keyName][selectedParam.param_type.toLowerCase()] : dropdownList[item.keyName])?.map(optionItem => {
                    // console.log(optionItem, "Option Item: ", item);
                    return (
                      <Select.Option key={optionItem.key} value={optionItem.id}> {optionItem.label} </Select.Option>
                    )
                  }
                  )}
                </Select>
              }

              {
                item.type === 'dropdown1' && 
                <Select className={'w-full my-2'}
                placeholder={item.label}
                value={item.keyName === 'label' ? (selectedParam._id === -1 ? undefined: selectedParam._id) : selectedParam[item.keyName]}
                onChange={ value => handleSelectChange(value, item.keyName) }
                // dropdownRender={(menu) => paramDetailEditable ? menu : null}
            >
                {  (item.keyName === 'label' ? dropdownList[item.keyName][selectedParam.param_type.toLowerCase()] : dropdownList[item.keyName])?.map( (optionItem,index) => {
              
                    // console.log(item,"select change current value1", 'selectedParam',selectedParam);
                   return (
                    <Select.Option  key={index} value={optionItem.id}> {optionItem.short_name}   </Select.Option>
                )
         
                    }
                ) }
            </Select>
              }

              {  item.type === 'color' &&(
                                <div className="flex justify-between text-light">
                                     <b>{item.label} :</b>
                                    <ColorPicker  value={selectedParam[item.keyName]} onChange={ e => handleColorChange(e, item.keyName) } />
                                </div>)
              }

             

            </>
          )
        })
      }
       <button className="btn btn-success p-1 " onClick={()=>{handleClick("save-group-detail")}} >Create Group</button>
     <div>

      </div>
    </div>
  )
}

export default CreateParameterGroup;
