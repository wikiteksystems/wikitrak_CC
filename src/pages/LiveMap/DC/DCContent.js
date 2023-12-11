import React, { useEffect, useState } from "react";
import { API_TES_URL, API_DEVICE_URL } from "../../../utils/constants";
import axios from "axios";
const DCContent = ({vehicle, selectedSubMenuItem}) => {
    // useEffect( () => {
    //     handleTabChange(0, dcUtiles)
    // },[activeMenu])
    const [currentValue, setCurrentValue] = useState([]);
    const [newValue, setNewValue] =  useState([])
    const [setButtonVisible, setsetButtonVisible] = useState(false)
    const [clearButtonVisible, setClearButtonVisible] = useState(false)
    const [specialButtonVisible, setSpecialButtonVisible] = useState(false)
    const [responseStatus,setResponseStatus] = useState();
    const updateCFG = (config) => {
        let data = {};
        data.config = config;
        data.imei = vehicle?.imei[0].mac_id;
        data.Config_header = selectedSubMenuItem?.config_header;
        let paramString = ""
        if (config !== "CLR") {
            newValue.map(param => paramString = paramString + param + ",");
            paramString = paramString.slice(0, -1);
            data.Config_params = paramString;
        }
            console.log(data)
        const request = axios.post(`${API_TES_URL}/commands/cfg`, data);
        request.then(response => {
            const {Config_params, Error,Config_header, config } = response.data.data;
            if (Config_params === "OK" && Error == "00") {                
                let asdata = {};
                asdata.config_header = Config_header;
                asdata.created_by = vehicle.user.id;
                
                   
                asdata.registration_id = vehicle.registration_id;
                if (config !== "CLR") {          
                    asdata.parameters = [
                        {
                            priority : 1,
                            value:data.Config_params
                        }
                    ]
                 }
                 else {
                    asdata.parameters = [
                        {
                            priority : 1,
                            value:''
                        }
                    ]
                 }
                console.log(asdata)
                const asRequest = axios.post(`${API_DEVICE_URL}/create/tcfg`, asdata)
                asRequest.then(response => {
                    console.log("SUCCESS")
                })
                getCFG();
                setResponseStatus(true);

            }
            else {
                setResponseStatus(false)
            }
            
        }).catch(error => {
            console.log(error)
        })
    }
    const getCFG = () => {
        setCurrentValue([])
        let data ={};
        data.imei = vehicle?.imei[0].mac_id;
        data.config = "GET";
        data.Config_header = selectedSubMenuItem?.config_header;
        let params = selectedSubMenuItem?.config_params;
        let paramString = ""
        if (params && params?.length > 0) {
            params.map(param => paramString = paramString + param.name + ",");
            paramString = paramString.slice(0, -1);
            data.Config_params = paramString;
            console.log(data)
            const request = axios.post(`${API_TES_URL}/commands/cfg`, data);
            request.then(response => {
                const {Config_params, Error, config} = response.data;
                if (Error == "00" && config === 'GET' ) {
                    let tempArray = []
                    let params = Config_params.split(',');
                    console.log(params)
                    setCurrentValue(params)
                    return response.data.data;
                }
                
            }).catch(error => {
                
            })
        }
    }
    useEffect(()=>{
        console.log(selectedSubMenuItem)
        setCurrentValue([])
        setNewValue([])
        setResponseStatus('');
        if (selectedSubMenuItem?.mode[0].set && selectedSubMenuItem?.mode[0].set === true){
            setsetButtonVisible(true)
        }
        else {
            setsetButtonVisible(false)
        }
        if (selectedSubMenuItem?.mode[0].clear && selectedSubMenuItem?.mode[0].clear === true){
            setClearButtonVisible(true)
        }
        else {
            setClearButtonVisible(false)
        }
        if (selectedSubMenuItem?.mode[0].special && selectedSubMenuItem?.mode[0].special === true){
            setSpecialButtonVisible(true)
        }   
        else {
            setSpecialButtonVisible(false)
        }
        getCFG();

    },[vehicle, selectedSubMenuItem])
    useEffect(()=>{
        setNewValue([]);
        setCurrentValue([])
    },[])
    return (
        <>
        {selectedSubMenuItem &&
            <div className="flex justify-center items-center overflow-y-auto">
            <div className="block">
                <h1 className="text-[24px] text-center">{`Configuration Header: ${selectedSubMenuItem.config_header}`}</h1>
                <div className="max-w-[980px] min-w-[600px]">
                    <table className="min-w-full mt-5 border border-[#009999]">
                        <thead className="bg-[#009999] text-white">
                            <tr>
                                <th>Parameter</th>
                                <th>Current Value</th>
                                <th>New Value</th>
                                <th>Default Value</th>
                                <th>Unit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedSubMenuItem?.config_params?.map((val, idx) => (
                                    <tr className="h-[50px] border text-center border-[#009999]">
                                        <td className="h-[50px] ">{val.name}</td>
                                        <td className="h-[50px]">
                                            <input value={ currentValue[idx] ? currentValue[idx] : ''} 
                                                className="text-center focus:outline-none bg-transparent"
                                            ></input>
                                        </td>
                                        <td className="h-[50px]">
                                            { responseStatus === false ?
                                            <input value={newValue[idx] ? newValue[idx] : ''} 
                                            className="text-center focus:outline-none bg-red-500"
                                            onChange={(e)=>
                                            {let temp = Array.from(newValue);temp[idx] = e.target.value;setNewValue(temp)}}></input>
                                            :
                                            <input value={newValue[idx] ? newValue[idx] : ''} 
                                                className={responseStatus === true ? "text-center focus:outline-none bg-green-500" : "text-center focus:outline-none bg-transparent"}
                                                onChange={(e)=>
                                                {let temp = Array.from(newValue);temp[idx] = e.target.value;setNewValue(temp)}}></input>
                                            }
                                        </td>
                                        <td className="h-[50px]">{val.default}</td>
                                        <td className="h-[50px]">{val.unit}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center gap-[10px] mt-[50px]">
                    {
                    setButtonVisible &&
                        <div className="w-[250px] h-[50px] flex justify-center items-center bg-[#009999] cursor-pointer" onClick={()=>updateCFG('SET')}>
                            WRITE NEW VALUE
                        </div>
                    }
                    {
                    clearButtonVisible &&
                        <div className="w-[250px] h-[50px] flex justify-center items-center bg-[#009999] cursor-pointer" onClick={()=>updateCFG('CLR')}>
                            WRITE DEFAULT
                        </div>
                    }
                    {
                    specialButtonVisible &&
                        <div className="w-[250px] h-[50px] flex justify-center items-center bg-[#009999] cursor-pointer" onClick={()=>updateCFG('SPECIAL')}>
                            EXECUTE
                        </div>
                    }
                </div>
            </div>
            </div>
        }
        </>
    )
}

export default DCContent;