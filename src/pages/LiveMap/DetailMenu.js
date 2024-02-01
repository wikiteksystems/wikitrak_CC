// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link , useParams} from 'react-router-dom';
// import { Icon } from '@iconify/react';
// import { LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
// import { Footer, Header } from "../../components";
// import { LiveMapUtils, notification } from "../../utils";
// import { LiveMapActions } from "../../stores/actions";
// import Battery90Icon from '@mui/icons-material/Battery90';
// import NetworkCellIcon from '@mui/icons-material/NetworkCell';
// import ToggleOffIcon from '@mui/icons-material/ToggleOff';
// import ToggleOnIcon from '@mui/icons-material/ToggleOn';
// import { ThemeColor } from "../../utils/constants";

// import { Layout, Menu, Input, Button, Checkbox, Popconfirm, Select, ColorPicker, Radio } from 'antd';
// import { matchColor } from "../../utils/constants";
// import Battery from "../../components/Battery/Battery";
// import NetworkStrength from "../../components/NetworkStrength/NetworkStrength";
// import { localeData } from "moment";
// import CustomAccordian from "./MapItems/CustomAccordion";
// const { Sider } = Layout;

// const DetailMenu = ({ menuList, menuCollapsed, locationData, center, setCenter,gtVehi }) => {
//     // console.log(locationData,"detaillocation")
//     const dispatch = useDispatch();
//     const { userId, userName, themeColor } = useSelector(({ User }) => User);
//     const { oemList, variantList, modelList, subModelList, vehicleGroupList, segmentList, activeVehicle } = useSelector(({ LiveMap }) => LiveMap);
//     const [modelYearList, setModelYearList] = useState([]);

//     const [searchText, setSearchText] = useState('');
//     const [searchedMenuList, setSearchedMenuList] = useState([...menuList]);
//     const [vehicleDetailEditable, setVehicleDetailEditable] = useState(false);
//     const [vehicleDetailVisible, setVehicleDetailVisible] = useState(false);
//         const [selectedVehicle, setSelectedVehicle] = useState(null);

//     const [selectedGroupList, setSelectedGroupList] = useState([...vehicleGroupList]);
//     const [vehicleGroupVisible, setVehicleGroupVisible] = useState(false);
//     const [vehicleGroupDetailEditable, setVehicleGroupDetailEditable] = useState(false);
//     const [vehicleGroupDetailVisible, setVehicleGroupDetailVisible] = useState(false);
//     const [selectedVehicleGroup, setSelectedVehicleGroup] = useState(null);
//     const [vehiclesInGroup, setVehiclesInGroup] = useState([]);

//     const [newVehicle, setNewVehicle] = useState(false);
//     const [newVehicleGroup, setNewVehicleGroup] = useState(false);
//     const [Vehi, setVehiDetail] = useState(false);
//     const [variantMode, setVariantMode] = useState('variant');

//     const [showVehicleList, setShowVehicleList] = useState(false)

//     const { id } = useParams();

  
      
//     useEffect(() => {
//         // console.log(locationData, 'locationData line 51************************************************')
//         if(id){
//             goToVehicleLocation('fromDashboard', id)
//         }
//         // console.log("menu list", id);
//         setSearchedMenuList(menuList.filter(item => item.registration_id.toLowerCase().includes(searchText.toLowerCase())))
//     }, [searchText, menuList, locationData]);

//     useEffect(() => {
        
//         setSelectedGroupList([...vehicleGroupList]);
//     }, [vehicleGroupList])

//     useEffect(() => {
//         setModelYearList(subModelList.map(subModel => (
//             {
//                 id: subModel.id,
//                 key: subModel.key,
//                 label: subModel.model_year,
//             }
//         )));
//     }, [subModelList]);

//     const handleCheckboxClick = (e, selectType, selectedId) => {
//         if (selectType === 'select-all') {
//             const list = searchedMenuList.map(item => ({
//                 ...item,
//                 checked: e.target.checked
//             }));

//             setSearchedMenuList(list);
//         }
//         else if (selectType === 'select-one') {
//             const list = searchedMenuList.map(item => (
//                 selectedId === item.id ? {
//                     ...item,
//                     checked: e.target.checked
//                 } : { ...item }
//             ));
//             setSearchedMenuList(list);
//         }
//         else if (selectType === 'group-select-one') {
//             const list = selectedGroupList.map(item => (
//                 selectedId === item.id ? {
//                     ...item,
//                     checked: e.target.checked
//                 } : { ...item }
//             ));

//             const group = selectedGroupList.find(item => selectedId === item.id);

//             const vehicleList = searchedMenuList.map(item => (
//                 item.vehicle_group === group.id ? {
//                     ...item,
//                     checked: e.target.checked
//                 } : { ...item }
//             ));

//             setSearchedMenuList(vehicleList);
//             setSelectedGroupList(list);
//         }
//         else if (selectType === 'variant' || selectType === 'model') {
//             setVariantMode(selectType);
//         }
//     };
//     const handleVehicleItemClick = (item) => {
//         setVehicleDetailVisible(true);
//         setNewVehicle(false);

//         const oem = item.vehicle_model?.oem,
//             model = item.vehicle_model?.id,
//             model_year = item.sub_model?.id,
//             sub_model = item.sub_model?.id,
//             variant = item.variant,
//             segment = item.segment,
//             vehicle_group = item.vehicle_group;

//         const newData = {
//             ...item,
//             // imei: item.imei[0]?.mac_id,
//             oem, variant, model, sub_model, model_year, segment, vehicle_group
//         };

//         setSelectedVehicle({ ...newData });
//         dispatch(LiveMapActions.setVehicle(item));

//         if (oem)
//             dispatch(LiveMapActions.getVariantList(oem));
//         if (model) {
//             dispatch(LiveMapActions.getModelList(oem));
//             dispatch(LiveMapActions.getSubModelList(model));
//         }
//         dispatch(LiveMapActions.getSegmentList());
//     };
//     const handleVehicleGroupItemClick = (item) => {
//         setVehicleGroupDetailVisible(true);
//         setSelectedVehicleGroup(item);
//         setNewVehicleGroup(false);

//         let list = [{
//             type: 'vehicles-in-group',
//             label: <div style={{ fontWeight: 500 }}> The vehicles in this group </div>
//         }];
//         menuList.forEach(vehicle => {
//             vehicle.vehicle_group === item.id &&
//                 list.push({
//                     type: 'vehicles-in-group',
//                     label: vehicle.registration_id
//                 });
//         });
//         setVehiclesInGroup(list);
//     };
//     const handleInputChange = (e, type) => {
//         setSelectedVehicle({ ...selectedVehicle, [type]: e.target.value })
//     };
//     const handleGroupInputChange = (e, type) => {
//         setSelectedVehicleGroup({ ...selectedVehicleGroup, [type]: e.target.value })
//     };
//     const handleGroupColorChange = (color, type) => {
//         setSelectedVehicleGroup({ ...selectedVehicleGroup, [type]: color.toHexString().slice(1) })
//     }
//     const handleSelectChange = (value, type) => {
//         if (type === 'oem') {
//             if (value === activeVehicle.vehicle_model?.oem && !newVehicle)
//                 setSelectedVehicle({
//                     ...selectedVehicle,
//                     oem: value,
//                     variant: activeVehicle.variant,
//                     model: activeVehicle.vehicle_model?.model,
//                     sub_model: activeVehicle.sub_model?.id,
//                     model_year: activeVehicle.sub_model?.id,
//                 });
//             else setSelectedVehicle({ ...selectedVehicle, oem: value, variant: -1, model: -1, sub_model: -1, model_year: -1 });

//             dispatch(LiveMapActions.getVariantList(value));
//             dispatch(LiveMapActions.getModelList(value));
//         }
//         else if (type === 'variant') {
//             const selected = variantList.find(variant => variant.id === value);
//             const model = selected?.model_id,
//                 sub_model = selected?.s_model_id;

//             dispatch(LiveMapActions.getSubModelList(model));
//             setSelectedVehicle({ ...selectedVehicle, variant: value, model, sub_model, model_year: sub_model });
//         }
//         else if (type === 'model') {
//             setSelectedVehicle({ ...selectedVehicle, model: value });
//             dispatch(LiveMapActions.getSubModelList(value));
//         }
//         else if (type === 'sub_model') {
//             setSelectedVehicle({ ...selectedVehicle, sub_model: value });
//         }
//         else if (type === 'model_year') {
//             setSelectedVehicle({ ...selectedVehicle, model_year: value });
//         }
//         else if (type === 'vehicle_group') {
//             setSelectedVehicle({ ...selectedVehicle, vehicle_group: value });
//         }
//         else if (type === 'segment') {
//             setSelectedVehicle({ ...selectedVehicle, segment: value });
//         }
//     }
//     const handleClick = (type) => {
//         if (type === 'add-vehicle') {
//             setVehicleDetailVisible(true);
//             setVehicleDetailEditable(true);
//             setNewVehicle(true);
//             setShowVehicleList(false)
//             setSelectedVehicle({
//                 picture: null,
//             });

//             dispatch(LiveMapActions.getSegmentList());
//         }
//         else if (type === 'vehicle_list') {
//             setVehicleGroupVisible(false);
//             setVehicleDetailVisible(false);
//             setVehicleDetailEditable(false);
//             setShowVehicleList(false)
//         }
//         else if (type === 'edit-detail') {
//             setVehicleDetailEditable(true);
//             setShowVehicleList(false)
//         }
//         else if (type === 'save-detail') {
//             setVehicleDetailEditable(false);
//             setShowVehicleList(false)

//             const data = {
//                 ...selectedVehicle,
//                 vehicle_model: selectedVehicle.model,
//                 mobile: null,
//                 user_type: 1,
//                 user: userId
//             }

//             dispatch(LiveMapActions.saveVehicle(newVehicle, data, newVehicle ? '' : selectedVehicle.id));
//         }
//         else if (type === 'delete-vehicle') {
//             dispatch(LiveMapActions.deleteVehicle(selectedVehicle.id));
//             setShowVehicleList(false)
//             setVehicleDetailVisible(false);
//         }

//         else if (type === 'add-vehicle-group') {
//             setVehicleGroupDetailVisible(true);
//             setVehicleGroupDetailEditable(true);
//             setNewVehicleGroup(true);
//             setShowVehicleList(false)
//             setSelectedVehicleGroup({});
//         }
//         else if (type === 'vehicle_group') {
//             setVehicleGroupVisible(true);
//             setVehicleGroupDetailVisible(false);
//             setShowVehicleList(false)
//         }
//         else if (type === 'vehicle_group_list') {
//             setVehicleGroupDetailVisible(false);
//             setShowVehicleList(false)
//         }
//         else if (type === 'edit-group-detail') {
//             setVehicleGroupDetailEditable(true);
//             setShowVehicleList(false)
//         }
//         else if (type === 'save-group-detail') {
//             setVehicleGroupDetailEditable(false);
//             setShowVehicleList(false)
//             const data = {
//                 ...selectedVehicleGroup,
//                 user: userId
//             }
//             dispatch(LiveMapActions.saveVehicleGroup(newVehicleGroup, data, newVehicleGroup ? '' : selectedVehicleGroup.id));
//         }
//         else if (type === 'delete-vehicle-group') {
//             dispatch(LiveMapActions.deleteVehicleGroup(selectedVehicleGroup.id));
//             setVehicleGroupDetailVisible(false);
//             setShowVehicleList(false)
//         }
//     };
    
//     const dropdownList = {
//         oem: oemList,
//         variant: variantList,
//         model: modelList,
//         sub_model: subModelList,
//         model_year: modelYearList,
//         vehicle_group: vehicleGroupList,
//         segment: segmentList
//     };

//     const getBatteryValue = (item) => {
//         console.log(item)

//         return 8;
//     }

//     const goToVehicleLocation = (e, data) => {
//         // console.log(data)
//         // console.log("I am in vehicle location***************************************************", data)
//         // console.log(imei, "Reg")
//         let imei = ""
//         if(id && e == 'fromDashboard'){
//             imei = data
//         }else{
//             imei = data?.imei[0]?.mac_id 
//         }

//         // setTimeout(() => {
//         //     console.log(locationData, "I am in vehicle locationData%%%^%^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            
//         // }, 30000);
//         if (imei) {
//             // console.log(locationData,"I am in vehicle location")
//             let latLong = locationData.find((item) => {
//                 return item?.latestDocument?.imei === imei
//             })
//             console.log(latLong,'latlong')
//             // console.log("lat long Infor ", latLong.latestDocument.lat, latLong.latestDocument.lng)
//             setCenter({
//                 lat: parseFloat(latLong?.latestDocument?.lat),
//                 lng: parseFloat(latLong?.latestDocument?.lng)
//             });
//         } else {
//             notification('warning', 'Info', "Vehicle Not Found")
//         }

//     }


//     return (
//         <div className="absolute md:relative z-30 md:z-0 right-0">
//             <Sider
//                 className="h-screen"
//                 style={{
//                     background: 'rgb(47, 115, 193)', // Set the background color using rgb values
//                     background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', borderLeft: '1px solid black', right: '0px'
//                 }}
//                 breakpoint="lg"
//                 collapsedWidth={0}
//                 trigger={null}
//                 collapsible collapsed={menuCollapsed}
//                 width={300}
//             >
//                 <div className="detail-menu flex flex-col justify-between h-full">
//                 {!showVehicleList?   <>  {!vehicleGroupVisible ?
//                         <>
//                             {!menuCollapsed && !vehicleDetailVisible &&
//                                 <>
//                                     <div className="flex justify-between items-center" style={{
//                                         background: 'rgb(47, 115, 193)', // Set the background color using rgb values
//                                         background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', paddingBottom: "5px"
//                                     }}>
//                                         <Header title={'Vehicle List'} classes='w-full' style={{ fontSize: 20 ,background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)'}} />
//                                         <PlusCircleOutlined className='cursor-pointer' style={{ fontSize: 25, color: 'white', position: 'absolute', right: 10 }} onClick={() => handleClick('add-vehicle')} />
//                                     </div>
//                                     <div className="flex items-center m-1">
//                                         <Input className='w-5/6' placeholder={'Search'} style={{ marginRight: 8 }} value={searchText} onChange={e => setSearchText(e.target.value)} />
//                                         <Checkbox style={{ position: 'absolute', right: 20 }} onClick={e => handleCheckboxClick(e, 'select-all')} />
//                                     </div>
                                    
//                                     <Menu

//                                         className="overflow-hidden overflow-y-auto"
//                                         theme="light"
//                                         mode="inline"
//                                         style={{
//                                             color: 'white', background: 'rgb(47, 115, 193)', // Set the background color using rgb values
//                                             background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', flexGrow: 1
//                                         }}
//                                         selectable={false}
//                                         items={searchedMenuList.length > 0 && searchedMenuList.map((item, index) => ({
//                                             key: index,
//                                             label: item.type === 'input' ? (
//                                                 <Input placeholder={item.registration_id} />
//                                             ) : item.type === 'button' ? (
//                                                 <Button className="w-full">{item.registration_id}</Button>
//                                             ) : (
//                                                 <div className="flex justify-between" style={{ gap: "20px", alignItems: "center" }}>
//                                                     <NetworkStrength locationData={locationData} item={item} />
                                                    
//                                                     <span title="Go to location" onClick={e => goToVehicleLocation(e, item)}> <Battery locationData={locationData} item={item} /></span>
//                                                     <span className="w-full overflow-hidden" title="Registration Id" style={{ textOverflow: 'ellipsis' }} onClick={() => handleVehicleItemClick(item)}> {item?.registration_id}</span>
//                                                     <Checkbox checked={item.checked} onClick={e => handleCheckboxClick(e, 'select-one', item.id)} />
//                                                 </div>
//                                             )
//                                         }))}
//                                     />
//                                 </>
//                             }

//                             {!menuCollapsed && vehicleDetailVisible &&
//                                 <>
//                                     <div className="flex justify-between items-center" style={{ backgroundColor: "#0F4C75", paddingBottom: "5px" }}>
//                                         <LeftCircleOutlined className='px-2' style={{ fontSize: 20, color: 'white' }} onClick={() => handleClick('vehicle_list')} />
//                                         <Header title={'Vehicle Detail'} style={{ fontSize: 19, paddingInline: 0, }} />
//                                         <div className="h-full flex items-center cursor-pointer pr-2" onClick={() => handleClick(vehicleDetailEditable ? 'save-detail' : 'edit-detail')}>
//                                             {vehicleDetailEditable && Vehi ? (
//                                                 <Icon icon="akar-icons:save" width="22" height="22" color="white" />
//                                             ) : (
//                                                 Vehi && <Icon icon="fa:edit" width="22" height="22" color="white" />
//                                             )}
//                                         </div>
//                                     </div>

//                                     {Vehi ? (<Button className=" flex gap-5 text-black" style={{ margin: '20px auto 0 27px', padding: '0 91px 0 70px', color: "black", transition: 'background 0.3s ease' }} onClick={() => {
//                                         setVehiDetail(!Vehi)
//                                         console.log(Vehi)
//                                     }}>
//                                         <ToggleOnIcon />
//                                         <span className="ps-2">Features</span></Button>)
//                                         : (<Button className=" flex gap-5 text-black" style={{ margin: '20px auto 0 27px', padding: '0 91px 0 30px', color: "black", transition: 'background 0.3s ease' }} onClick={() => {
//                                             setVehiDetail(!Vehi)
//                                             console.log(Vehi)
//                                         }}>
//                                             <ToggleOffIcon />
//                                             <span className="ps-2"> Vehicle Details</span></Button>)
//                                     }

//                                     <Menu
//                                         className="overflow-hidden overflow-y-auto md:flex-grow"
//                                         theme="light"
//                                         mode="inline"
//                                         style={{ color: 'black', backgroundColor: 'white', }}
//                                         selectable={false}
//                                         items={[

//                                             ...(Vehi ? LiveMapUtils.vehicleDetailMenuItems : LiveMapUtils.vehicleDetailMenuItems_addin)
//                                         ]
//                                             .filter(item => item.type !== 'input' || item.keyName !== 'user') // Exclude user detail inputs
//                                             .map((item, index) => ({

//                                                 key: index,
//                                                 label: item.type === 'input' ? (
//                                                     item.keyName === 'user' ?
//                                                         <>
//                                                             <Input
//                                                                 className="w-1/2"
//                                                                 readOnly={true}
//                                                                 placeholder={'First Name'}
//                                                                 value={userName.first}
//                                                             />
//                                                             <Input
//                                                                 className="w-1/2"
//                                                                 readOnly={true}
//                                                                 placeholder={'Last Name'}
//                                                                 value={userName.last}
//                                                             />
//                                                         </>
//                                                         :
//                                                         <Input
//                                                             readOnly={!vehicleDetailEditable}
//                                                             placeholder={item.label}
//                                                             value={selectedVehicle[item.keyName]}
//                                                             onChange={e => handleInputChange(e, item.keyName)}
//                                                         />
//                                                 ) : item.type === 'button' ? (
//                                                     <Button className="w-full">{item.label}</Button>
//                                                 ) : item.type === 'button-delete' ? (
//                                                     <Popconfirm
//                                                         title="Delete Confirm"
//                                                         description="Are you sure to delete this vehicle?"
//                                                         onConfirm={() => handleClick('delete-vehicle')}
//                                                         okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
//                                                         okText="Yes"
//                                                         cancelText="No"
//                                                         disabled={newVehicle}
//                                                     >
//                                                         <Button className='w-full flex gap-5' danger disabled={newVehicle}><div>{item.icon}</div> {item.label} </Button>
//                                                     </Popconfirm>
//                                                 ) : item.type === 'link' ? (
//                                                     <Button className="w-full flex gap-5">
//                                                         <div classNaame="">{item.icon} </div><Link to={item.link}>{item.label} </Link>
//                                                     </Button>
//                                                 ) : item.type === 'dropdown' ? (
//                                                     <>
//                                                         <Select className={['variant', 'model'].includes(item.keyName) ? 'w-5/6' : 'w-full'}
//                                                             placeholder={item.label}
//                                                             value={selectedVehicle[item.keyName] === -1 ? undefined : selectedVehicle[item.keyName]}
//                                                             onChange={value => handleSelectChange(value, item.keyName)}
//                                                             dropdownRender={(menu) =>
//                                                                 vehicleDetailEditable ?
//                                                                     (
//                                                                         ['model', 'sub_model', 'model_year', 'variant'].includes(item.keyName) ?
//                                                                             (variantMode === 'variant' ?
//                                                                                 (item.keyName === 'variant' ? menu : null)
//                                                                                 : (['model', 'sub_model', 'model_year'].includes(item.keyName) ? menu : null)
//                                                                             )
//                                                                             : menu
//                                                                     )
//                                                                     : null
//                                                             }
//                                                         >
//                                                             {dropdownList[item.keyName]?.map(optionItem => (
//                                                                 <Select.Option key={optionItem.key} value={optionItem.id}> {optionItem.label} </Select.Option>
//                                                             ))}
//                                                         </Select>
//                                                         {['variant', 'model'].includes(item.keyName) &&
//                                                             <Radio className='w-1/6 ml-5' checked={variantMode === item.keyName} onChange={e => handleCheckboxClick(e, item.keyName)} />
//                                                         }
//                                                     </>
//                                                 ) : (
//                                                     <div className="flex justify-between w-full">
//                                                         <span className="w-full overflow-hidden" style={{ textOverflow: 'ellipsis' }}> {item.label} </span>
//                                                         <Checkbox checked={item.checked} onClick={e => handleCheckboxClick(e, 'select-one', item.id)} />
//                                                     </div>
//                                                 )
//                                             }))}
//                                     />
//                                 </>
//                             }
//                         </>
//                         :
//                         <>
//                             <>
//                                 <div className="flex justify-between items-center" style={{ backgroundColor: "#0F4C75", paddingBottom: "5px" }}>
//                                     {!vehicleGroupDetailVisible ?
//                                         <>
//                                             <Header title={'Vehicle Group List'} classes={'w-full'} style={{ fontSize: 20 }} />
//                                             <PlusCircleOutlined className='cursor-pointer' style={{ fontSize: 18, position: 'absolute', right: 10, color: 'white' }} onClick={() => handleClick('add-vehicle-group')} />
//                                         </>
//                                         :
//                                         <>
//                                             <LeftCircleOutlined className='px-2' style={{ fontSize: 20, color: 'white' }} onClick={() => handleClick('vehicle_group_list')} />
//                                             <Header title={'Vehicle Group Detail'} style={{ fontSize: 19, paddingInline: 0 }} />
//                                             <div className="h-full flex items-center cursor-pointer pr-2" onClick={() => handleClick(vehicleGroupDetailEditable ? 'save-group-detail' : 'edit-group-detail')}>
//                                                 {vehicleGroupDetailEditable ?
//                                                     <Icon icon="akar-icons:save" width="22" height="22" />
//                                                     :
//                                                     <Icon icon="fa:edit" width="22" height="22" color="white" />}
//                                             </div>
//                                         </>}
//                                 </div>

//                                 <Menu
//                                     className="overflow-hidden overflow-y-auto"
//                                     theme="light"
//                                     mode="inline"
//                                     style={{ color: 'black', backgroundColor: 'white', flexGrow: 1 }}
//                                     selectable={false}
//                                     items={(vehicleGroupDetailVisible ? [...LiveMapUtils.groupDetailMenuItems, ...vehiclesInGroup] : selectedGroupList).map((item, index) => ({
//                                         key: index,
//                                         label: item.type === 'input' ? (
//                                             <Input
//                                                 readOnly={!vehicleGroupDetailEditable}
//                                                 placeholder={item.label}
//                                                 value={selectedVehicleGroup[item.keyName]}
//                                                 onChange={e => handleGroupInputChange(e, item.keyName)}
//                                             />
//                                         ) : item.type === 'button-delete' ? (
//                                             <Popconfirm
//                                                 title="Delete Confirm"
//                                                 description="Are you sure to delete this vehicle group?"
//                                                 onConfirm={() => handleClick('delete-vehicle-group')}
//                                                 okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
//                                                 okText="Yes"
//                                                 cancelText="No"
//                                                 disabled={newVehicleGroup}
//                                             >
//                                                 <Button danger disabled={newVehicleGroup}> {item.label} </Button>
//                                             </Popconfirm>
//                                         ) : item.type === 'color' ? (
//                                             <div className="flex justify-between">
//                                                 {item.label}
//                                                 <ColorPicker disabled={!vehicleGroupDetailEditable} value={selectedVehicleGroup[item.keyName]} onChange={e => handleGroupColorChange(e, item.keyName)} />
//                                             </div>
//                                         ) : item.type === 'vehicles-in-group' ? (
//                                             item.label
//                                         ) : (
//                                             <div className="flex justify-between">
//                                                 <span className="w-full overflow-hidden" style={{ textOverflow: 'ellipsis' }} onClick={() => handleVehicleGroupItemClick(item)}>{item.group_name}</span>
//                                                 <Checkbox checked={item.checked} onClick={e => handleCheckboxClick(e, 'group-select-one', item.id)} />
//                                             </div>
//                                         )
//                                     }))}
//                                 />
//                             </>
//                         </>}</>  :<div className="p-2">
//                             <CustomAccordian vehicleList={searchedMenuList} gtVehi={gtVehi}></CustomAccordian>
//                             </div>}
//                         {/* <Modal></Modal> */}
//                     <Footer style={{ background: matchColor(themeColor), height: 40 }} classes={'justify-evenly'}>
//                         <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={() => handleClick('vehicle_list')} style={!vehicleGroupVisible && !showVehicleList ? { filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2 } : {}}>
//                             <Icon icon="ic:round-directions-car" width="35" height="25" />
//                         </Button>
//                         <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={() => handleClick('vehicle_group')} style={vehicleGroupVisible && !showVehicleList ? { filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2 } : {}}>
//                             <Icon icon="mdi:car-multiple" width="30" hegith="25" />
//                         </Button>
//                         {/* <CustomTooltip showTooltip={true} data={"aniket"}> */}
//                          {/* <div style={{marginTop:"-8px"}}> */}
                           
//                          <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={() => setShowVehicleList(true)} style={showVehicleList ? { filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2 } : {}}>
//                             <Icon icon="ant-design:setting-filled" width="30" hegith="25" />
//                         </Button>
//                          {/* </div> */}
//                         {/* </CustomTooltip> */}
//                     </Footer>
//                 </div>
//             </Sider>
//         </div>
//     );
// };

// export default DetailMenu;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link , useParams} from 'react-router-dom';
import { Icon } from '@iconify/react';
import { LeftCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Footer, Header } from "../../components";
import { LiveMapUtils, notification } from "../../utils";
import { LiveMapActions } from "../../stores/actions";
import Battery90Icon from '@mui/icons-material/Battery90';
import NetworkCellIcon from '@mui/icons-material/NetworkCell';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { ThemeColor } from "../../utils/constants";

import { Layout, Menu, Input, Button, Checkbox, Popconfirm, Select, ColorPicker, Radio } from 'antd';
import { matchColor } from "../../utils/constants";
import Battery from "../../components/Battery/Battery";
import NetworkStrength from "../../components/NetworkStrength/NetworkStrength";
import { localeData } from "moment";
import CustomAccordian from "./MapItems/CustomAccordion";
import { LiveMonitorActions } from "../../stores/actions";

const { Sider } = Layout;

const DetailMenu = ({ menuList, menuCollapsed, locationData, center, setCenter,gtVehi }) => {
    // console.log(locationData,"detaillocation")
    const dispatch = useDispatch();
    const { userId, userName, themeColor } = useSelector(({ User }) => User);
    const { oemList, variantList, modelList, subModelList, vehicleGroupList, segmentList, activeVehicle } = useSelector(({ LiveMap }) => LiveMap);
    const [modelYearList, setModelYearList] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [searchedMenuList, setSearchedMenuList] = useState([...menuList]);
    const [vehicleDetailEditable, setVehicleDetailEditable] = useState(false);
    const [vehicleDetailVisible, setVehicleDetailVisible] = useState(false);
        const [selectedVehicle, setSelectedVehicle] = useState(null);

    const [selectedGroupList, setSelectedGroupList] = useState([...vehicleGroupList]);
    const [vehicleGroupVisible, setVehicleGroupVisible] = useState(false);
    const [vehicleGroupDetailEditable, setVehicleGroupDetailEditable] = useState(false);
    const [vehicleGroupDetailVisible, setVehicleGroupDetailVisible] = useState(false);
    const [selectedVehicleGroup, setSelectedVehicleGroup] = useState(null);
    const [vehiclesInGroup, setVehiclesInGroup] = useState([]);

    const [newVehicle, setNewVehicle] = useState(false);
    const [newVehicleGroup, setNewVehicleGroup] = useState(false);
    const [Vehi, setVehiDetail] = useState(false);
    const [variantMode, setVariantMode] = useState('variant');

    const [showVehicleList, setShowVehicleList] = useState(false)

    const { id } = useParams();

  
      
    useEffect(() => {
        // console.log(locationData, 'locationData line 51************************************************')
        if(id){
            goToVehicleLocation('fromDashboard', id)
        }
        // console.log("menu list", id);
        dispatch(LiveMonitorActions.getLMonitorParamGroups(userId));
        setSearchedMenuList(menuList.filter(item => item.registration_id.toLowerCase().includes(searchText.toLowerCase())))
    }, [searchText, menuList, locationData]);

    useEffect(() => {
        
        setSelectedGroupList([...vehicleGroupList]);
    }, [vehicleGroupList])

    useEffect(() => {
        setModelYearList(subModelList.map(subModel => (
            {
                id: subModel.id,
                key: subModel.key,
                label: subModel.model_year,
            }
        )));
    }, [subModelList]);

    const handleCheckboxClick = (e, selectType, selectedId) => {
        if (selectType === 'select-all') {
            const list = searchedMenuList.map(item => ({
                ...item,
                checked: e.target.checked
            }));

            setSearchedMenuList(list);
        }
        else if (selectType === 'select-one') {
            const list = searchedMenuList.map(item => (
                selectedId === item.id ? {
                    ...item,
                    checked: e.target.checked
                } : { ...item }
            ));
            setSearchedMenuList(list);
        }
        else if (selectType === 'group-select-one') {
            const list = selectedGroupList.map(item => (
                selectedId === item.id ? {
                    ...item,
                    checked: e.target.checked
                } : { ...item }
            ));

            const group = selectedGroupList.find(item => selectedId === item.id);

            const vehicleList = searchedMenuList.map(item => (
                item.vehicle_group === group.id ? {
                    ...item,
                    checked: e.target.checked
                } : { ...item }
            ));

            setSearchedMenuList(vehicleList);
            setSelectedGroupList(list);
        }
        else if (selectType === 'variant' || selectType === 'model') {
            setVariantMode(selectType);
        }
    };
    const handleVehicleItemClick = (item) => {
        setVehicleDetailVisible(true);
        setNewVehicle(false);

        const oem = item.vehicle_model?.oem,
            model = item.vehicle_model?.id,
            model_year = item.sub_model?.id,
            sub_model = item.sub_model?.id,
            variant = item.variant,
            segment = item.segment,
            vehicle_group = item.vehicle_group;

        const newData = {
            ...item,
            // imei: item.imei[0]?.mac_id,
            oem, variant, model, sub_model, model_year, segment, vehicle_group
        };

        setSelectedVehicle({ ...newData });
        dispatch(LiveMapActions.setVehicle(item));

        if (oem)
            dispatch(LiveMapActions.getVariantList(oem));
        if (model) {
            dispatch(LiveMapActions.getModelList(oem));
            dispatch(LiveMapActions.getSubModelList(model));
        }
        dispatch(LiveMapActions.getSegmentList());
    };
    const handleVehicleGroupItemClick = (item) => {
        setVehicleGroupDetailVisible(true);
        setSelectedVehicleGroup(item);
        setNewVehicleGroup(false);

        let list = [{
            type: 'vehicles-in-group',
            label: <div style={{ fontWeight: 500 }}> The vehicles in this group </div>
        }];
        menuList.forEach(vehicle => {
            vehicle.vehicle_group === item.id &&
                list.push({
                    type: 'vehicles-in-group',
                    label: vehicle.registration_id
                });
        });
        setVehiclesInGroup(list);
    };
    const handleInputChange = (e, type) => {
        setSelectedVehicle({ ...selectedVehicle, [type]: e.target.value })
    };
    const handleGroupInputChange = (e, type) => {
        setSelectedVehicleGroup({ ...selectedVehicleGroup, [type]: e.target.value })
    };
    const handleGroupColorChange = (color, type) => {
        setSelectedVehicleGroup({ ...selectedVehicleGroup, [type]: color.toHexString().slice(1) })
    }
    const handleSelectChange = (value, type) => {
        if (type === 'oem') {
            if (value === activeVehicle.vehicle_model?.oem && !newVehicle)
                setSelectedVehicle({
                    ...selectedVehicle,
                    oem: value,
                    variant: activeVehicle.variant,
                    model: activeVehicle.vehicle_model?.model,
                    sub_model: activeVehicle.sub_model?.id,
                    model_year: activeVehicle.sub_model?.id,
                });
            else setSelectedVehicle({ ...selectedVehicle, oem: value, variant: -1, model: -1, sub_model: -1, model_year: -1 });

            dispatch(LiveMapActions.getVariantList(value));
            dispatch(LiveMapActions.getModelList(value));
        }
        else if (type === 'variant') {
            const selected = variantList.find(variant => variant.id === value);
            const model = selected?.model_id,
                sub_model = selected?.s_model_id;

            dispatch(LiveMapActions.getSubModelList(model));
            setSelectedVehicle({ ...selectedVehicle, variant: value, model, sub_model, model_year: sub_model });
        }
        else if (type === 'model') {
            setSelectedVehicle({ ...selectedVehicle, model: value });
            dispatch(LiveMapActions.getSubModelList(value));
        }
        else if (type === 'sub_model') {
            setSelectedVehicle({ ...selectedVehicle, sub_model: value });
        }
        else if (type === 'model_year') {
            setSelectedVehicle({ ...selectedVehicle, model_year: value });
        }
        else if (type === 'vehicle_group') {
            setSelectedVehicle({ ...selectedVehicle, vehicle_group: value });
        }
        else if (type === 'segment') {
            setSelectedVehicle({ ...selectedVehicle, segment: value });
        }
    }
    const handleClick = (type) => {
        if (type === 'add-vehicle') {
            setVehicleDetailVisible(true);
            setVehicleDetailEditable(true);
            setNewVehicle(true);
            setShowVehicleList(false)
            setSelectedVehicle({
                picture: null,
            });

            dispatch(LiveMapActions.getSegmentList());
        }
        else if (type === 'vehicle_list') {
            setVehicleGroupVisible(false);
            setVehicleDetailVisible(false);
            setVehicleDetailEditable(false);
            setShowVehicleList(false)
        }
        else if (type === 'edit-detail') {
            setVehicleDetailEditable(true);
            setShowVehicleList(false)
        }
        else if (type === 'save-detail') {
            setVehicleDetailEditable(false);
            setShowVehicleList(false)

            const data = {
                ...selectedVehicle,
                vehicle_model: selectedVehicle.model,
                mobile: null,
                user_type: 1,
                user: userId
            }

            dispatch(LiveMapActions.saveVehicle(newVehicle, data, newVehicle ? '' : selectedVehicle.id));
        }
        else if (type === 'delete-vehicle') {
            dispatch(LiveMapActions.deleteVehicle(selectedVehicle.id));
            setShowVehicleList(false)
            setVehicleDetailVisible(false);
        }

        else if (type === 'add-vehicle-group') {
            setVehicleGroupDetailVisible(true);
            setVehicleGroupDetailEditable(true);
            setNewVehicleGroup(true);
            setShowVehicleList(false)
            setSelectedVehicleGroup({});
        }
        else if (type === 'vehicle_group') {
            setVehicleGroupVisible(true);
            setVehicleGroupDetailVisible(false);
            setShowVehicleList(false)
        }
        else if (type === 'vehicle_group_list') {
            setVehicleGroupDetailVisible(false);
            setShowVehicleList(false)
        }
        else if (type === 'edit-group-detail') {
            setVehicleGroupDetailEditable(true);
            setShowVehicleList(false)
        }
        else if (type === 'save-group-detail') {
            setVehicleGroupDetailEditable(false);
            setShowVehicleList(false)
            const data = {
                ...selectedVehicleGroup,
                user: userId
            }
            dispatch(LiveMapActions.saveVehicleGroup(newVehicleGroup, data, newVehicleGroup ? '' : selectedVehicleGroup.id));
        }
        else if (type === 'delete-vehicle-group') {
            dispatch(LiveMapActions.deleteVehicleGroup(selectedVehicleGroup.id));
            setVehicleGroupDetailVisible(false);
            setShowVehicleList(false)
        }
    };
    
    const dropdownList = {
        oem: oemList,
        variant: variantList,
        model: modelList,
        sub_model: subModelList,
        model_year: modelYearList,
        vehicle_group: vehicleGroupList,
        segment: segmentList
    };

    const getBatteryValue = (item) => {
        console.log(item)

        return 8;
    }

    const goToVehicleLocation = (e, data) => {
        // console.log(data)
        // console.log("I am in vehicle location***************************************************", data)
        // console.log(imei, "Reg")
        let imei = ""
        if(id && e == 'fromDashboard'){
            imei = data
        }else{
            imei = data?.imei[0]?.mac_id 
        }

        // setTimeout(() => {
        //     console.log(locationData, "I am in vehicle locationData%%%^%^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            
        // }, 30000);
        if (imei) {
            // console.log(locationData,"I am in vehicle location")
            let latLong = locationData.find((item) => {
                return item?.latestDocument?.imei === imei
            })
            console.log(latLong,'latlong')
            // console.log("lat long Infor ", latLong.latestDocument.lat, latLong.latestDocument.lng)
            // setCenter({
            //     lat: parseFloat(latLong?.latestDocument?.lat),
            //     lng: parseFloat(latLong?.latestDocument?.lng)
            // });
        } else {
            notification('warning', 'Info', "Vehicle Not Found")
        }

    }


    return (
        <div className="absolute md:relative z-30 md:z-0 right-0">
            <Sider
                className="h-screen"
                style={{
                    background: 'rgb(47, 115, 193)', // Set the background color using rgb values
                    background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', borderLeft: '1px solid black', right: '0px'
                }}
                breakpoint="lg"
                collapsedWidth={0}
                trigger={null}
                collapsible collapsed={menuCollapsed}
                width={300}
            >
                <div className="detail-menu flex flex-col justify-between h-full">
                {!showVehicleList?   <>  {!vehicleGroupVisible ?
                        <>
                            {!menuCollapsed && !vehicleDetailVisible &&
                                <>
                                    <div className="flex justify-between items-center" style={{
                                        background: 'rgb(47, 115, 193)', // Set the background color using rgb values
                                        background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', paddingBottom: "5px"
                                    }}>
                                        <Header title={'Vehicle List'} classes='w-full' style={{ fontSize: 20 ,background: 'rgb(47, 115, 193)', background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)'}} />
                                        <PlusCircleOutlined className='cursor-pointer' style={{ fontSize: 25, color: 'white', position: 'absolute', right: 10 }} onClick={() => handleClick('add-vehicle')} />
                                    </div>
                                    <div className="flex items-center m-1">
                                        <Input className='w-5/6' placeholder={'Search'} style={{ marginRight: 8 }} value={searchText} onChange={e => setSearchText(e.target.value)} />
                                        <Checkbox style={{ position: 'absolute', right: 20 }} onClick={e => handleCheckboxClick(e, 'select-all')} />
                                    </div>
                                    
                                    <Menu

                                        className="overflow-hidden overflow-y-auto"
                                        theme="light"
                                        mode="inline"
                                        style={{
                                            color: 'white', background: 'rgb(47, 115, 193)', // Set the background color using rgb values
                                            background: 'linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)', flexGrow: 1
                                        }}
                                        selectable={false}
                                        items={searchedMenuList.length > 0 && searchedMenuList.map((item, index) => ({
                                            key: index,
                                            label: item.type === 'input' ? (
                                                <Input placeholder={item.registration_id} />
                                            ) : item.type === 'button' ? (
                                                <Button className="w-full">{item.registration_id}</Button>
                                            ) : (
                                                <div className="flex justify-between" style={{ gap: "20px", alignItems: "center" }}>
                                                    <NetworkStrength locationData={locationData} item={item} />
                                                    
                                                    <span title="Go to location" onClick={e => goToVehicleLocation(e, item)}> <Battery locationData={locationData} item={item} /></span>
                                                    <span className="w-full overflow-hidden" title="Registration I" style={{ textOverflow: 'ellipsis' }} onClick={() => handleVehicleItemClick(item)}> {item?.registration_id}</span>
                                                    <Checkbox checked={item.checked} onClick={e => handleCheckboxClick(e, 'select-one', item.id)} />
                                                </div>
                                            )
                                        }))}
                                    />
                                </>
                            }

                            {!menuCollapsed && vehicleDetailVisible &&
                                <>
                                    <div className="flex justify-between items-center" style={{ backgroundColor: "#0F4C75", paddingBottom: "5px" }}>
                                        <LeftCircleOutlined className='px-2' style={{ fontSize: 20, color: 'white' }} onClick={() => handleClick('vehicle_list')} />
                                        <Header title={'Vehicle Detail'} style={{ fontSize: 19, paddingInline: 0, }} />
                                        <div className="h-full flex items-center cursor-pointer pr-2" onClick={() => handleClick(vehicleDetailEditable ? 'save-detail' : 'edit-detail')}>
                                            {vehicleDetailEditable && Vehi ? (
                                                <Icon icon="akar-icons:save" width="22" height="22" color="white" />
                                            ) : (
                                                Vehi && <Icon icon="fa:edit" width="22" height="22" color="white" />
                                            )}
                                        </div>
                                    </div>

                                    {Vehi ? (<Button className=" flex gap-5 text-black" style={{ margin: '20px auto 0 27px', padding: '0 91px 0 70px', color: "black", transition: 'background 0.3s ease' }} onClick={() => {
                                        setVehiDetail(!Vehi)
                                        console.log(Vehi)
                                    }}>
                                        <ToggleOnIcon />
                                        <span className="ps-2">Features</span></Button>)
                                        : (<Button className=" flex gap-5 text-black" style={{ margin: '20px auto 0 27px', padding: '0 91px 0 30px', color: "black", transition: 'background 0.3s ease' }} onClick={() => {
                                            setVehiDetail(!Vehi)
                                            console.log(Vehi)
                                        }}>
                                            <ToggleOffIcon />
                                            <span className="ps-2"> Vehicle Details</span></Button>)
                                    }

                                    <Menu
                                        className="overflow-hidden overflow-y-auto md:flex-grow"
                                        theme="light"
                                        mode="inline"
                                        style={{ color: 'black', backgroundColor: 'white', }}
                                        selectable={false}
                                        items={[

                                            ...(Vehi ? LiveMapUtils.vehicleDetailMenuItems : LiveMapUtils.vehicleDetailMenuItems_addin)
                                        ]
                                            .filter(item => item.type !== 'input' || item.keyName !== 'user') // Exclude user detail inputs
                                            .map((item, index) => ({

                                                key: index,
                                                label: item.type === 'input' ? (
                                                    item.keyName === 'user' ?
                                                        <>
                                                            <Input
                                                                className="w-1/2"
                                                                readOnly={true}
                                                                placeholder={'First Name'}
                                                                value={userName.first}
                                                            />
                                                            <Input
                                                                className="w-1/2"
                                                                readOnly={true}
                                                                placeholder={'Last Name'}
                                                                value={userName.last}
                                                            />
                                                        </>
                                                        :
                                                        <Input
                                                            readOnly={!vehicleDetailEditable}
                                                            placeholder={item.label}
                                                            value={selectedVehicle[item.keyName]}
                                                            onChange={e => handleInputChange(e, item.keyName)}
                                                        />
                                                ) : item.type === 'button' ? (
                                                    <Button className="w-full">{item.label}</Button>
                                                ) : item.type === 'button-delete' ? (
                                                    <Popconfirm
                                                        title="Delete Confirm"
                                                        description="Are you sure to delete this vehicle?"
                                                        onConfirm={() => handleClick('delete-vehicle')}
                                                        okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
                                                        okText="Yes"
                                                        cancelText="No"
                                                        disabled={newVehicle}
                                                    >
                                                        <Button className='w-full flex gap-5' danger disabled={newVehicle}><div>{item.icon}</div> {item.label} </Button>
                                                    </Popconfirm>
                                                ) : item.type === 'link' ? (
                                                    <Button className="w-full flex gap-5">
                                                        <div classNaame="">{item.icon} </div><Link to={item.link}>{item.label} </Link>
                                                    </Button>
                                                ) : item.type === 'dropdown' ? (
                                                    <>
                                                        <Select className={['variant', 'model'].includes(item.keyName) ? 'w-5/6' : 'w-full'}
                                                            placeholder={item.label}
                                                            value={selectedVehicle[item.keyName] === -1 ? undefined : selectedVehicle[item.keyName]}
                                                            onChange={value => handleSelectChange(value, item.keyName)}
                                                            dropdownRender={(menu) =>
                                                                vehicleDetailEditable ?
                                                                    (
                                                                        ['model', 'sub_model', 'model_year', 'variant'].includes(item.keyName) ?
                                                                            (variantMode === 'variant' ?
                                                                                (item.keyName === 'variant' ? menu : null)
                                                                                : (['model', 'sub_model', 'model_year'].includes(item.keyName) ? menu : null)
                                                                            )
                                                                            : menu
                                                                    )
                                                                    : null
                                                            }
                                                        >
                                                            {dropdownList[item.keyName]?.map(optionItem => (
                                                                <Select.Option key={optionItem.key} value={optionItem.id}> {optionItem.label} </Select.Option>
                                                            ))}
                                                        </Select>
                                                        {['variant', 'model'].includes(item.keyName) &&
                                                            <Radio className='w-1/6 ml-5' checked={variantMode === item.keyName} onChange={e => handleCheckboxClick(e, item.keyName)} />
                                                        }
                                                    </>
                                                ) : (
                                                    <div className="flex justify-between w-full">
                                                        <span className="w-full overflow-hidden" style={{ textOverflow: 'ellipsis' }}> {item.label} </span>
                                                        <Checkbox checked={item.checked} onClick={e => handleCheckboxClick(e, 'select-one', item.id)} />
                                                    </div>
                                                )
                                            }))}
                                    />
                                </>
                            }
                        </>
                        :
                        <>
                            <>
                                <div className="flex justify-between items-center" style={{ backgroundColor: "#0F4C75", paddingBottom: "5px" }}>
                                    {!vehicleGroupDetailVisible ?
                                        <>
                                            <Header title={'Vehicle Group List'} classes={'w-full'} style={{ fontSize: 20 }} />
                                            <PlusCircleOutlined className='cursor-pointer' style={{ fontSize: 18, position: 'absolute', right: 10, color: 'white' }} onClick={() => handleClick('add-vehicle-group')} />
                                        </>
                                        :
                                        <>
                                            <LeftCircleOutlined className='px-2' style={{ fontSize: 20, color: 'white' }} onClick={() => handleClick('vehicle_group_list')} />
                                            <Header title={'Vehicle Group Detail'} style={{ fontSize: 19, paddingInline: 0 }} />
                                            <div className="h-full flex items-center cursor-pointer pr-2" onClick={() => handleClick(vehicleGroupDetailEditable ? 'save-group-detail' : 'edit-group-detail')}>
                                                {vehicleGroupDetailEditable ?
                                                    <Icon icon="akar-icons:save" width="22" height="22" />
                                                    :
                                                    <Icon icon="fa:edit" width="22" height="22" color="white" />}
                                            </div>
                                        </>}
                                </div>

                                <Menu
                                    className="overflow-hidden overflow-y-auto"
                                    theme="light"
                                    mode="inline"
                                    style={{ color: 'black', backgroundColor: 'white', flexGrow: 1 }}
                                    selectable={false}
                                    items={(vehicleGroupDetailVisible ? [...LiveMapUtils.groupDetailMenuItems, ...vehiclesInGroup] : selectedGroupList).map((item, index) => ({
                                        key: index,
                                        label: item.type === 'input' ? (
                                            <Input
                                                readOnly={!vehicleGroupDetailEditable}
                                                placeholder={item.label}
                                                value={selectedVehicleGroup[item.keyName]}
                                                onChange={e => handleGroupInputChange(e, item.keyName)}
                                            />
                                        ) : item.type === 'button-delete' ? (
                                            <Popconfirm
                                                title="Delete Confirm"
                                                description="Are you sure to delete this vehicle group?"
                                                onConfirm={() => handleClick('delete-vehicle-group')}
                                                okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
                                                okText="Yes"
                                                cancelText="No"
                                                disabled={newVehicleGroup}
                                            >
                                                <Button danger disabled={newVehicleGroup}> {item.label} </Button>
                                            </Popconfirm>
                                        ) : item.type === 'color' ? (
                                            <div className="flex justify-between">
                                                {item.label}
                                                <ColorPicker disabled={!vehicleGroupDetailEditable} value={selectedVehicleGroup[item.keyName]} onChange={e => handleGroupColorChange(e, item.keyName)} />
                                            </div>
                                        ) : item.type === 'vehicles-in-group' ? (
                                            item.label
                                        ) : (
                                            <div className="flex justify-between">
                                                <span className="w-full overflow-hidden" style={{ textOverflow: 'ellipsis' }} onClick={() => handleVehicleGroupItemClick(item)}>{item.group_name}</span>
                                                <Checkbox checked={item.checked} onClick={e => handleCheckboxClick(e, 'group-select-one', item.id)} />
                                            </div>
                                        )
                                    }))}
                                />
                            </>
                        </>}</>  :<div className="">
                            <CustomAccordian 
                            vehicleList={searchedMenuList} 
                            gtVehi={gtVehi} 
                            menuList={menuList}
                            handleClick={handleClick}
                            ></CustomAccordian>
                            </div>}
                        {/* <Modal></Modal> */}
                    <Footer style={{ background: matchColor(themeColor), height: 40 }} classes={'justify-evenly'}>
                        <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={() => handleClick('vehicle_list')} style={!vehicleGroupVisible && !showVehicleList ? { filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2 } : {}}>
                            <Icon icon="ic:round-directions-car" width="35" height="25" />
                        </Button>
                        <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={() => handleClick('vehicle_group')} style={vehicleGroupVisible && !showVehicleList ? { filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2 } : {}}>
                            <Icon icon="mdi:car-multiple" width="30" hegith="25" />
                        </Button>
                        {/* <CustomTooltip showTooltip={true} data={"aniket"}> */}
                         {/* <div style={{marginTop:"-8px"}}> */}
                           
                        <Button className="w-[40px] flex justify-center items-center" shape='circle' size="large" onClick={() => setShowVehicleList(true)} style={showVehicleList ? { filter: 'drop-shadow(0 0 1px #ffffff)', borderWidth: 2 } : {}}>
                            <Icon icon="ant-design:sliders-outlined" width="30" hegith="25" />
                        </Button>
                         {/* </div> */}
                        {/* </CustomTooltip> */}
                    </Footer>
                </div>
            </Sider>
        </div>
    );
};

export default DetailMenu;