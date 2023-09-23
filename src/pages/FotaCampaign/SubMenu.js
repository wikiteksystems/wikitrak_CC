import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Checkbox, Input, Button, Select } from 'antd';
import { LeftCircleOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import { Header, Footer } from "../../components";
import { DotaActions } from "../../stores/actions";
import { matchColor } from "../../utils/constants";
import { API_DEVICE_URL } from "../../utils/constants";
import axios from 'axios';

const { Sider } = Layout;

const SubMenu = ({ title, items, campaign, menuCollapsed, headerStyle, handleBack, setNewCampaignVisible, setNewCampaign }) => {
    const dispatch = useDispatch();
    const { themeColor } = useSelector( ({User}) => User);
    const { vehicleGroupList } = useSelector( ({LiveMap}) => LiveMap );
    const history = useHistory();
    const [searchText, setSearchText] = useState('');
    const [searchedMenuList, setSearchedMenuList] = useState([...items]);
    const [selectedVehicleGroups, setSelectedVehicleGroups] = useState([...items]);
    const { Option } = Select;
    const [vehicleGroupVisible, setVehicleGroupVisible] = useState(false);
    const [campaignName, setCampaignName] = useState();
    const [description, setDescription] = useState();
    const [status, setStatus] = useState('NEW');

    useEffect( () => {
        setSearchedMenuList(items?.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()) ))
    }, [searchText, items]);

    useEffect( () => {
        setSelectedVehicleGroups([...items]);
    }, [items]);

    const handleButtonClick = (type) => {
        if (type === 'vehicle_list') {
            setVehicleGroupVisible(false);
        }
        else if (type === 'vehicle_group') {
            setVehicleGroupVisible(true);
        }
    };
    const handleCheckboxClick = (e, selectType, selectedId) => {
        debugger
        if (selectType === 'select-all') {
            const list = searchedMenuList.map( item => ({
                ...item,
                checked: e.target.checked
            }));

            setSearchedMenuList(list);
        }
        else if (selectType === 'select-one') {
            const list = searchedMenuList.map( item => (
                selectedId === item.id ? {
                    ...item,
                    checked: e.target.checked
                } : {...item}
            ));
            setSearchedMenuList(list);
        }
        else if (selectType === 'group-select-one') {
            const list = selectedVehicleGroups.map( item => (
                selectedId === item.id ? {
                    ...item,
                    checked: e.target.checked
                } : {...item}
            ));

            const group = selectedVehicleGroups.find( item => selectedId === item.id );

            const vehicleList = searchedMenuList.map( item => (
                item.vehicle_group === group.id ? {
                    ...item,
                    checked: e.target.checked
                } : {...item}
            ));
            console.log(vehicleList)
            setSearchedMenuList(vehicleList);
            setSelectedVehicleGroups(list);
        }
    };
    const createNewCampaign = () => {
        let data ={};
        data.label = campaignName;
        data.name = campaignName;
        data.description = description;
        data.status="NEW";
        debugger
        let tempArray = [];
        searchedMenuList.map((item)=>{
            if (item.checked === true)
                {
                    let tempObject = {}
                    tempObject.analyze_fotax = {vehicle : item.registration_id}
                    tempObject.created_by = item.user.id;
                    tempObject.registration_id = item.registration_id;
                    tempObject.current_sw=null;
                    tempObject.status = "OPEN";
                    tempArray.push(tempObject);
                }
        })
        data.ecu_fota = tempArray;
        setNewCampaignVisible(true)
        setNewCampaign(data)
    }
    const handleChange = (value) => {
        setStatus(value)
    }
    return (
        <Sider 
            style={{background: 'white', borderLeft: '1px solid black'}}
            breakpoint="lg"
            collapsedWidth={0}
            trigger={null}
            collapsible collapsed={menuCollapsed}
            width={300}
        >
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-center" style={{background: matchColor(themeColor)}}>
                    <LeftCircleOutlined className='absolute px-2' style={{fontSize: 20}} onClick={ () =>handleBack() } />
                    <Header title={title} classes={'w-full justify-center'} style={{...headerStyle}} />
                </div>
                <div className="flex items-center m-1">
                    <Input className={'w-full'} placeholder={"Enter Campaign Name"} value = {campaignName} onChange={e=> setCampaignName(e.target.value)}/>
                </div>
                <div className="flex items-center m-1">
                <Select placeholder="Select Status" onChange={handleChange} className="w-full">
                    <Option value="NEW">NEW</Option>
                    <Option value="STARTED">STARTED</Option>
                    <Option value="STOP">STOP</Option>
                </Select>
                </div>
                <div className="flex items-center m-1">
                    <Input className={'w-full'} placeholder={"Enter Description"} value = {description} onChange={e=> setDescription(e.target.value)}/>
                </div>
                <div className="flex items-center m-1">
                    <Input className={'w-full'} placeholder={'Search'} style={{marginRight: 8}} value={searchText} onChange={e => setSearchText(e.target.value)} />
                    {/* { activeMenu === 2 && <Checkbox style={{position: 'absolute', right: 20}} onClick={ e => handleCheckboxClick(e, 'select-all') } /> } */}
                </div>
                <Menu
                    className="overflow-hidden overflow-y-auto"
                    theme="dark"
                    mode="inline"
                    style={{ color: 'black', backgroundColor: 'white', flexGrow: 1 }}
                    selectable={false}
                    items={ (vehicleGroupVisible ? selectedVehicleGroups:searchedMenuList).map((item, index) => ({
                        key: index,
                        label: (
                            <div className="flex justify-between">
                                <span className="w-full overflow-hidden" style={{textOverflow: 'ellipsis'}} onClick={ () => {} }>{item.label}</span>
                                <Checkbox checked={item.checked} onClick={ e => handleCheckboxClick(e, (vehicleGroupVisible?'group-':'') + 'select-one', item.id) } />
                            </div>
                        )
                    })) }
                />

                <div className="flex justify-center my-1">
                    <Button className="text-white" size="large" style={{background: matchColor(themeColor), border: 'none'}} onClick={ () => createNewCampaign() }>
                        Submit
                    </Button>
                </div>
                <Footer style={{background: matchColor(themeColor), height: 40}} classes={'justify-evenly'}>
                    <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={ () => handleButtonClick('vehicle_list') } style={!vehicleGroupVisible ? {filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2} : {}}>
                        <Icon icon="ic:round-directions-car" width="25" height="25" />
                    </Button>
                    <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={ () => handleButtonClick('vehicle_group') } style={vehicleGroupVisible ? {filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2} : {}}>
                        <Icon icon="mdi:car-multiple" width="25" hegith="25" />
                    </Button>
                </Footer>
            </div>
        </Sider>
    );
};

export default SubMenu;