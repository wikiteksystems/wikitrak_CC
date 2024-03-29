import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Icon } from '@iconify/react';
import { LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Footer, Header } from "../../../components";
import { LiveMonitorUtils } from "../../../utils";
import { LiveMonitorActions } from "../../../stores/actions";
import { Theme, matchColor } from "../../../utils/constants";

import { Layout, Avatar, Menu, Input, Button, Checkbox, Popconfirm, Select, ColorPicker } from 'antd';
import { liveMonitorApi } from "../../../mocks/liveMonitor";
const { Sider } = Layout;

const DetailMenu = ({ menuList, menuCollapsed,setSelecCheckParam, active }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId, themeColor } = useSelector( ({User}) => User );
    const { lMonitorParamGroups, telematicParams, ivnParams, j1939Params } = useSelector( ({LiveMonitor}) => LiveMonitor );
    const { activeVehicle } = useSelector( ({LiveMap}) => LiveMap );
    const [telematicData,setTelematicData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedMenuList, setSearchedMenuList] = useState([...menuList]);
    const [paramDetailEditable, setParamDetailEditable] = useState(false);
    const [paramDetailVisible, setParamDetailVisible] = useState(false);
    const [selectedParam, setSelectedParam] = useState(null);
    const [selectedParamVal,setSelectedParamVal] = useState(null)

    const [selectedGroupList, setSelectedGroupList] = useState([...lMonitorParamGroups]);
    const [paramGroupVisible, setParamGroupVisible] = useState(false);
    const [paramGroupDetailEditable, setParamGroupDetailEditable] = useState(false);
    const [paramGroupDetailVisible, setParamGroupDetailVisible] = useState(false);
    const [selectedParamGroup, setSelectedParamGroup] = useState(null);
    const [paramsInGroup, setParamsInGroup] = useState([]);

    const [newParam, setNewParam] = useState(false);
    const [newParamGroup, setNewParamGroup] = useState(false);

    const fetchTelematic = async () =>{
            const result = await liveMonitorApi.getTelematicParam();
            let arr = []
           
            for(let k of result?.results){
                  for(let i of k.params)
                  arr.push(i)
            }
        
            setTelematicData([...arr])
    }

    useEffect(() =>{
         fetchTelematic();
    },[])
    useEffect(() =>{
        // console.log(menuList)
        // console.log(lMonitorParamGroups)
        setSearchedMenuList([...menuList])
    },[active])


    useEffect(() =>{
        // console.log(menuList)
        // console.log(lMonitorParamGroups)
    },[menuList,lMonitorParamGroups])

   

    const paramTypes = [
        { key: 0, id: 'Telematic', label: 'Telematic' },
        { key: 1, id: 'IVN', label: 'IVN' },
        { key: 2, id: 'J1939', label: 'J1939' }
    ];

    useEffect( () => {
        setSearchedMenuList(menuList.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()) ))
    }, [searchText, menuList]);

    useEffect( () => {
        setSelectedGroupList([...lMonitorParamGroups]);
    }, [lMonitorParamGroups])

    const [selectParamCheck,setSelectParamCheck] = useState([]);

    const handleCheckboxClick = (e, selectType, selectedId,data) => {
// console.log(e,'selectType',selectType, "selelctedId",selectedId, 'checkbox clicked')
        if (selectType === 'select-all') {
            const list = searchedMenuList.map( item => ({
                ...item,
                checked: e.target.checked
            }));

            setSearchedMenuList(list);
        }
        else if (selectType === 'select-one-param-in-group') {
           console.log(data,"selected one parameter in group list")
              
            const list = paramsInGroup.map( item => (
                selectedId === item._id ? {
                    ...item,
                    checked: e.target.checked
                } : {...item}
            ));
            
 
            setParamsInGroup(list);
            let a = list.filter((item) => item?.checked)
            setSelecCheckParam(a)

        } else if (selectType === 'select-one') {
            console.log(data,"select One")
               
             const list = searchedMenuList.map( item => (
                 selectedId === item._id ? {
                     ...item,
                     checked: e.target.checked
                 } : {...item}
             ));
             
             setSearchedMenuList(list);
             
             let a = list.filter((item) => item?.checked)
             setSelecCheckParam(a)
 
         } 
        else if (selectType === 'group-select-one') {
           
            const list = selectedGroupList.map( item => (
                selectedId === item.id ? {
                    ...item,
                    checked: e.target.checked
                } : {...item}
            ));

            const group = selectedGroupList.find( item => selectedId === item.id );

            const paramList = searchedMenuList.map( item => (
                item.param_group_id === group.id ? {
                    ...item,
                    checked: e.target.checked
                } : {...item}
            ));
            let a = paramList.filter((item) => item?.checked)
            // console.log(a)
            setSelecCheckParam(a)
            setSearchedMenuList(paramList);
            setSelectedGroupList(list);
            console.log("aniket",{
                'selected type':selectType,
                'selected Id':selectedId,
                'selected group list':selectedGroupList,
                'list':list,
                 'Group':group,
                 'searched Menu list':searchedMenuList,
                 'paramList':paramList,
                 'a':a,
                 'menu list':menuList

            })
        }
    };

    const handleParamItemClick = (item) => {
        setParamDetailVisible(true);
        setParamDetailEditable(false);
        setNewParam(false);

        setSelectedParam({ ...item });

        dispatch(LiveMonitorActions.getTelematicParams());
        dispatch(LiveMonitorActions.getIvnParams());
        dispatch(LiveMonitorActions.getJ1939Params());
    };
    const handleVehicleGroupItemClick = (item) => {
        console.log(item,"vehicle group selected");
        setParamGroupDetailVisible(true);
        setParamGroupDetailEditable(false);
        setSelectedParamGroup(item);
        setNewParamGroup(false);

        let list = [{
            type: 'params-in-group',
            label: <div style={{fontWeight: 500}}> The parameters in this group </div>
        }];
    menuList.map( param => (
                item.id === param.param_group_id &&
                list.push( {
                    ...param,                    
                    type: 'params-in-group',
                } 
                )
                
       ) );

        
        setParamsInGroup([...list]);
    };
    const handleInputChange = (e, type) => {
        setSelectedParam({...selectedParam, [type]: e.target.value})
    };
    const handleGroupInputChange = (e, type) => {
        setSelectedParamGroup({...selectedParamGroup, [type]: e.target.value})
    };
    const handleColorChange = (color, type) => {
        if (type === 'color')
            setSelectedParam({...selectedParam, param_group_color: color.toHexString().slice(1)})
        else
            setSelectedParamGroup({...selectedParamGroup, color: color.toHexString().slice(1)})
    }
    
    const handleSelectChange = (value, type) => {
        console.log(type,'this is type');
        if (type === 'param_type') {
            setSelectedParam({...selectedParam, [type]: value, _id: -1});
        }
        else if (type === 'param_group_id') {
            setSelectedParam({...selectedParam, [type]: value});
        }
        else if (type === 'label') {
            setSelectedParam({...selectedParam, _id: value});
        } else if(type === 'param'){
             setSelectedParam({...selectedParam,[type]:value})
        }
        console.log(selectedParam,"selected param")
    }


    const handleClick = (type) => {
        if (type === 'add-param') {
            setParamDetailVisible(true);
            setParamDetailEditable(true);
            setNewParam(true);
            setSelectedParam({param_type: "Telematic"});
        }
        else if (type === 'param_list') {
            setParamGroupVisible(false);
            setParamDetailVisible(false);
            setParamDetailEditable(false);
        }
        else if (type === 'edit-detail') {
            setParamDetailEditable(true);
        }
        else if (type === 'save-detail') {
            setParamDetailEditable(false);
    //    console.log(selectedParam)
          let data1 = {}
             data1 = {
                color: selectedParam.param_group_color || 'ff0000',
                parameter_type: selectedParam.param_type,
                status: true,
                vehicle: activeVehicle.id, 
                parameter_group: selectedParam.param_group_id === undefined ? [] : [selectedParam.param_group_id],
                telematic_parameter:[selectedParam.param],
                ivn_parameter: [],
                j1939_parameter: []
            };
            // for (let i = 0; i < paramTypes.length; i ++) {
            //     if (paramTypes[i].label === selectedParam.param_type)
            //         data1[paramTypes[i].label.toLocaleLowerCase() + '_parameter'] = [`${selectedParam._id}`]
            //     else data1[paramTypes[i].label.toLocaleLowerCase() + '_parameter'] = []
            // }
            console.log("data1=>",selectedParam)
            dispatch(LiveMonitorActions.saveLMonitorParam(data1, newParam, newParam ? '' : selectedParam.param_id));
        }
        else if (type === 'delete-param') {
            dispatch(LiveMonitorActions.deleteLMonitorParam(selectedParam.param_id));
            setParamDetailVisible(false);
        }

        else if (type === 'add-param-group') {
            setParamGroupDetailVisible(true);
            setParamGroupDetailEditable(true);
            setNewParamGroup(true);
            setSelectedParamGroup({});
        }
        else if (type === 'param_group') {
            setParamGroupVisible(true);
            setParamGroupDetailVisible(false);
        }
        else if (type === 'param_group_list') {
            setParamGroupDetailVisible(false);
        }
        else if (type === 'edit-group-detail') {
            setParamGroupDetailEditable(true);
        }
        else if (type === 'save-group-detail') {
            setParamGroupDetailEditable(false);
            const data = {
                ...selectedParamGroup,
                user: userId
            }
            dispatch(LiveMonitorActions.saveLMonitorParamGroup(data, newParamGroup, newParamGroup ? '' : selectedParamGroup.id));
        }
        else if (type === 'delete-param-group') {
            dispatch(LiveMonitorActions.deleteLMonitorParamGroup(selectedParamGroup.id));
            setParamGroupDetailVisible(false);
        }
    };

    const dropdownList = {
        param_type:paramTypes,
        param_group_id: lMonitorParamGroups,
        param:telematicData,
        label: {
            telematic: telematicParams,
            ivn: ivnParams,
            j1939: j1939Params
        }
    };

    return (
        <div  className="absolute md:relative z-30 md:z-0 right-0">
        <Sider 
        className="h-screen"
            style={{background: 'white', borderLeft: '1px solid black',right:'0px'}}
            breakpoint="lg"
            collapsedWidth={0}
            trigger={null}
            collapsible collapsed={menuCollapsed}
            width={300}
        >
            <div className="detail-menu flex flex-col justify-between h-full">
            { !paramGroupVisible ? 
            <>
                { !menuCollapsed && !paramDetailVisible && 
                <>
                    <div className="flex justify-between items-center pb-1" style={{background: Theme.dark_color}}>
                        <LeftCircleOutlined className='px-2' style={{fontSize: 20, color:"white"}} onClick={ () => history.goBack() } />
                        <Header title={'Select Parameters'} style={{paddingInline: 0, fontSize: 18}} />
                        <PlusCircleOutlined title="aniket" className='pr-2' style={{fontSize: 20, color:'white'}} onClick={ () => handleClick('add-param') } />
                    </div>
                    <div className="flex items-center m-1">
                        <Input className='w-5/6' placeholder={'Search'} style={{marginLeft: 18}} value={searchText} onChange={e => setSearchText(e.target.value)} />
                        {/* <Checkbox style={{position: 'absolute', right: 20}} onClick={ e => handleCheckboxClick(e, 'select-all') } /> */}
                    </div>

                    <Menu
                        className="overflow-hidden overflow-y-auto"
                        theme="light"
                        mode="inline"
                        style={{ color: 'black', backgroundColor: 'white', flexGrow: 1 }}
                        selectable={false}
                        items={ searchedMenuList.map((item, index) => ({
                            key: index,
                            icon: 
                                <Avatar style={{color: 'white', backgroundColor: item.param_type === 'Telematic' ? '#87d068' : ( item.param_type === 'IVN' ? '#fda3df' : '#16a7ff' ) }}>
                                    {item.param_type?.charAt(0) === 'I' ? 'V' : item.param_type?.charAt(0)}
                                </Avatar>,
                            label:
                                <div className="w-full flex justify-between items-center">
                                    <span className="w-5/6 overflow-hidden" style={{textOverflow: 'ellipsis'}} onClick={ () => handleParamItemClick(item) }>{item.label} - {item.param_header}</span>
                                    <Checkbox checked={item.checked} onClick={ e => handleCheckboxClick(e, 'select-one', item._id,item) } />
                                </div>
                            })
                        )}
                    />
                </>
                }
                
                { !menuCollapsed && paramDetailVisible &&
                <>
                    <div className="flex justify-between items-center pb-2" style={{background: Theme.dark_color}}>
                        <LeftCircleOutlined className='px-2' style={{fontSize: 20, color:'white'}} onClick={ () => handleClick('param_list') }/>
                        <Header title={'Parameter Detail'} style={{fontSize: 19, paddingInline: 0}} />
                        <div className="h-full flex items-center cursor-pointer pr-2" onClick={ () => handleClick(paramDetailEditable ? 'save-detail' : 'edit-detail') }>
                            { paramDetailEditable ?
                            <Icon icon="akar-icons:save" width="22" height="22" color='white'/>
                            :
                            <Icon icon="fa:edit" width="22" height="22" color='white'/> }
                        </div>
                    </div>

                    <Menu
                        className="overflow-hidden overflow-y-auto"
                        theme="light"
                        mode="inline"
                        style={{ color: 'black', backgroundColor: 'white', flexGrow: 1 }}
                        selectable={false}
                        items={ LiveMonitorUtils.paramDetailMenuItems.map((item, index) => ({
                            key: index,
                            label: item.type === 'input' ? (
                                <Input 
                                    readOnly={!paramDetailEditable}
                                    placeholder={item.label}
                                    value={selectedParam[item.keyName]}
                                    onChange={ e => handleInputChange(e, item.keyName) } 
                                />
                            ) : item.type === 'button' ? (
                                <Button className="w-full">{item.label}</Button>
                            ) : item.type === 'button-delete' ? (
                                <Popconfirm
                                    title="Delete Confirm"
                                    description="Are you sure to delete this param?"
                                    onConfirm={ () => handleClick('delete-param') }
                                    okButtonProps={{ style: {backgroundColor: '#4096ff'} }}
                                    okText="Yes"
                                    cancelText="No"
                                    disabled={newParam}
                                >
                                    <Button className='w-full' danger disabled={newParam}> {item.label} </Button>
                                </Popconfirm>
                            ) : item.type === 'dropdown' ? (
                                <>
                                <Select className={'w-full'}
                                    placeholder={item.label}
                                    value={item.keyName === 'label' ? (selectedParam._id === -1 ? undefined: selectedParam._id) : selectedParam[item.keyName]}
                                    onChange={ value => handleSelectChange(value, item.keyName) }
                                    dropdownRender={(menu) => paramDetailEditable ? menu : null}
                                >
                                    {  (item.keyName === 'label' ? dropdownList[item.keyName][selectedParam.param_type.toLowerCase()] : dropdownList[item.keyName])?.map( optionItem => {
                                         console.log(optionItem,"Option Item: " ,item);
                                       return (
                                        <Select.Option  key={optionItem.key} value={optionItem.id}> {optionItem.label} </Select.Option>
                                    )
                                        }
                                    ) }
                                </Select>
                                </>
                            ) 
                            
                            :
                            item.type === 'dropdown1' ? (
                                <>  
                                <Select className={'w-full'}
                                    placeholder={item.label}
                                    value={item.keyName === 'label' ? (selectedParam._id === -1 ? undefined: selectedParam._id) : selectedParam[item.keyName]}
                                    onChange={ value => handleSelectChange(value, item.keyName) }
                                    dropdownRender={(menu) => paramDetailEditable ? menu : null}
                                >
                                    {  (item.keyName === 'label' ? dropdownList[item.keyName][selectedParam.param_type.toLowerCase()] : dropdownList[item.keyName])?.map( (optionItem,index) => {
                                  
                                        console.log(item,"select change current value1", 'selectedParam',selectedParam);
                                       return (
                                        <Select.Option  key={index} value={optionItem.id}> {optionItem.short_name}   </Select.Option>
                                    )
                             
                                        }
                                    ) }
                                </Select>
                                </>
                            ) :
                            item.type === 'color' ? (
                                <div className="flex justify-between">
                                    {item.label}
                                    <ColorPicker disabled={!paramDetailEditable} value={selectedParam[item.keyName]} onChange={ e => handleColorChange(e, item.keyName) } />
                                </div>
                            ) : (
                                <div className="flex justify-between w-full">
                                    <span className="w-full overflow-hidden" style={{textOverflow: 'ellipsis'}}> {item.label} </span>
                                    <Checkbox checked={item.checked} onClick={ e => handleCheckboxClick(e, 'select-one', item.id) } />
                                </div>
                            )
                        })) }
                    />
                </>
                }
            </>
            :
            <>
                <>
                    <div className="flex justify-between items-center pb-1" style={{background: Theme.dark_color}}>
                    { !paramGroupDetailVisible ?
                    <>
                        <LeftCircleOutlined className='px-2' style={{fontSize: 20, color:'white'}} onClick={ () => history.goBack() }/>
                        <Header title={'Parameter Group'} style={{fontSize: 19, paddingInline: 0}} />
                        <PlusCircleOutlined className='cursor-pointer pr-2' style={{fontSize: 18, color:'white'}} onClick={ () => handleClick('add-param-group') } />
                    </>
                    :
                    <>
                        <LeftCircleOutlined className='px-2' style={{fontSize: 20, color:'white'}} onClick={ () => handleClick('param_group_list') }/>
                        <Header title={'Parameter Group Detail'} style={{fontSize: 19, paddingInline: 0}} />
                        <div className="h-full flex items-center cursor-pointer pr-2" onClick={ () => handleClick(paramGroupDetailEditable ? 'save-group-detail' : 'edit-group-detail') }>
                            { paramGroupDetailEditable ?
                            <Icon icon="akar-icons:save" width="22" height="22" color='white'/>
                            :
                            <Icon icon="fa:edit" width="22" height="22" color='white'/> }
                        </div>
                    </> }
                    </div>

                    <Menu
                        className="overflow-hidden overflow-y-auto"
                        theme="light"
                        mode="inline"
                        style={{ color: 'black', backgroundColor: 'white', flexGrow: 1 }}
                        selectable={false}
                        items={ (paramGroupDetailVisible ? [...LiveMonitorUtils.groupDetailMenuItems, ...paramsInGroup] : selectedGroupList).map((item, index) =>{
                            
                            return ({
                            key: index,
                            label: item.type === 'input' ? (
                                <Input 
                                    readOnly={!paramGroupDetailEditable}
                                    placeholder={item.label}
                                    value={selectedParamGroup[item.keyName]}
                                    onChange={ e => handleGroupInputChange(e, item.keyName) }
                                />
                            ) : item.type === 'button-delete' ? (
                                <Popconfirm
                                    title="Delete Confirm"
                                    description="Are you sure to delete this param group?"
                                    onConfirm={ () => handleClick('delete-param-group') }
                                    okButtonProps={{ style: {backgroundColor: '#4096ff'} }}
                                    okText="Yes"
                                    cancelText="No"
                                    disabled={newParamGroup}
                                >
                                    <Button danger disabled={newParamGroup}> {item.label} </Button>
                                </Popconfirm>
                            ) : item.type === 'color' ? (
                                <div className="flex justify-between">
                                    {item.label}
                                    <ColorPicker disabled={!paramGroupDetailEditable} value={selectedParamGroup[item.keyName]} onChange={ e => handleColorChange(e, 'group-' + item.keyName) } />
                                </div>
                            ) : item.type === 'params-in-group' ? (
                                <div className="flex justify-between">
                                    <span className="w-full overflow-hidden" style={{textOverflow: 'ellipsis'}}  >{item.label} </span>
                                    <Checkbox checked={item.checked} onClick={ e => handleCheckboxClick(e, 'select-one-param-in-group', item._id,item) }/>
                                </div>
                            ) : (
                                <div className="flex justify-between">
                                    <span className="w-full overflow-hidden" style={{textOverflow: 'ellipsis'}} onClick={ () => handleVehicleGroupItemClick(item) }>{item.group_name}</span>
                                    <Checkbox checked={item.checked} onClick={ e => handleCheckboxClick(e, 'group-select-one', item.id) } />
                                </div>
                            )
                        })}) }
                    />
                </>
            </> }

                <Footer style={{background: Theme.dark_color, height: 40}} classes={'justify-evenly'}>
                    <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={ () => handleClick('param_list') } style={!paramGroupVisible ? {filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2} : {}}>
                        <Icon icon="icon-park-solid:setting-two" width={25} height={25} color="white" />
                    </Button>
                    <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={ () => handleClick('param_group') } style={paramGroupVisible ? {filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2} : {}}>
                        <Icon icon="ic:round-settings-suggest" width={30} height={30} color="white" />
                    </Button>
                </Footer>
            </div>
        </Sider>
        </div>
    );
};

export default DetailMenu;