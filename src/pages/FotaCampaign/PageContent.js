import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { API_DEVICE_URL, API_VEHICLE_URL } from '../../utils/constants';

import { DotaActions } from '../../stores/actions';
import { matchColor } from '../../utils/constants';
import './FotaCampaign.css'

const PageContent = ({ campaign, userId }) => {
    const dispatch = useDispatch();
    const { themeColor } = useSelector( ({User}) => User );
    const [recordData, setRecordData] = useState([] );
    const [ downloadStart, setDownloadStart ] = useState(false)
    const [ flashingStart, setFlashingStart ] = useState(false)
    const [ downloadStatus, setDownloadStatus] = useState([]);
    const [ flashStatus, setFlashStatus] = useState([])
    const [ datas, setDatas ] = useState();
    const [ ecuId, setECUId] = useState([]);
    const [ datasetId, setDatasetId] = useState([]);
    const [downloadIds, setDownloadIds] = useState(Array(campaign?.ecu_fota?.length).fill(0));
    const [flashIds, setFlashIds] = useState(Array(campaign?.ecu_fota?.length).fill(0))
    const [ecuFotaId, setEcuFotaId] = useState([]);

    const handleSelectChange = async (type, value, record) => {    
        if (type === 'ecu') {
            const dataset_id = record.ecuOptions.filter(ecu => ecu.id === value)[0].ecu[0].file[0].sw_part_no;
            const datasetOptions = record.ecuOptions.filter(ecu => ecu.id === value)[0].ecu[0].file;
            let newData = [...recordData];
            
            let tempEUCId = Array.from(ecuId)
            tempEUCId[record.key] = value
            setECUId(tempEUCId)

            let targetRecord = newData.find(item => item.key === record.key);
            if (targetRecord) {
                targetRecord.ecu_id = value;
                targetRecord.dataset_id = dataset_id;
                targetRecord.datasetOptions = datasetOptions;
                targetRecord.datasetOptionId = datasetOptions.length ? datasetOptions[0].id : '';
            }
            setRecordData(newData);
        } else if (type === 'dataset') {

            let newData = [...recordData];
            let tempDatasetId = Array.from(datasetId)
            tempDatasetId[record.key] = value
            setDatasetId(tempDatasetId)
            
            let targetRecord = newData.find(item => item.key === record.key);
            if (targetRecord) {
                targetRecord.dataset_id = value;
            }
            setRecordData(newData);
        }
    }

    const createCampaign = () => {
      
        campaign.ecu_fota.map((item, id) =>{
            delete item.analyze_fotax;
            item.ecu = ecuId[id] ? ecuId[id].id : null;
            if (datasetId && datasetId[id].sw_part_no) {
                item.server_sw = datasetId[id].sw_part_no
            }
            else {
                item.server_sw = datasetId ? datasetId[id] : null
            }
            }
        )
        
        const request = axios.post(`${API_DEVICE_URL}/create_fotacampaign/`, campaign);
        request.then(response => {
            setDownloadStart(true)
        })
    }


    const startCampaign = (index) => {
        let tempFlashIds = [];
        let tempDownloadIds = [];
        let tempEcuFotaIds = [];
        for (let idx =0; idx< campaign?.ecu_fota.length; idx++){
            
        }
        campaign?.ecu_fota.map((item, idx) =>{
            let data ={}
            data.current_ws = "null";
            data.server_sw = item?.label;
            data.status = "OPEN";
            data.ecu = item?.ecu.id;
            data.imei = datas?.filter(data =>data.vin == item.analyze_fotax.vehicle)[0].imei[0].mac_id;
            data.created_by = JSON.parse(localStorage.getItem('token')).user_id;
            if (index == '0') {
            console.log(`${API_DEVICE_URL}/create_ecufota`)
            const request = axios.post(`${API_DEVICE_URL}/create_ecufota/`, data);
            request.then(response => {
                let new_data = {}
                new_data.latest_percentage ="0%";
                new_data.created_by = data.created_by;
                new_data.ecu_fota = response.data.id; 
                tempEcuFotaIds[idx] = response.data.id;
                new_data.status = "New";
   
                    const new_request = axios.post(`${API_DEVICE_URL}/fotax/create/ecufota/downloadattempt/`,new_data);
                        new_request.then(new_response => {
                            setDownloadStart(true);
                            tempDownloadIds[idx] = new_response.data.id;
                    })
                })
            }
            else if (index == '1') {
                    debugger
                    let new_data = {}
                    new_data.latest_percentage ="0%";
                    new_data.created_by = data.created_by;
                    new_data.ecu_fota = ecuFotaId[idx];
                    new_data.latest_response = "OK";
                    if (ecuFotaId[idx]) {
                        const new_request = axios.post(`${API_DEVICE_URL}/fotax/create/ecufota/flashingattempt/`,new_data);
                            new_request.then(new_response => {
                            tempFlashIds[idx] = new_response.data.id;
                            setFlashingStart(true)
                        })
                    }

            }
            
        })
        setDownloadIds(tempDownloadIds)
        setFlashIds(tempFlashIds)
        setEcuFotaId(tempEcuFotaIds)
    }

    useEffect(() => {
        if (datas){
        let tempECU = [];
        let tempDataset = []
        let tempFlashIds = [];
        let tempDownloadIds = [];
        let defaultData = campaign?.ecu_fota.map((item, index) => {
            const ecuOptions = datas?.filter(data=>data.vin == item.analyze_fotax.vehicle)[0].sub_model.ecus;
            tempFlashIds[index] = 0;
            tempDownloadIds[index] = 0;
            const datasetOptions = ecuOptions && ecuOptions.length >0 ? 
            item.ecu ? 
                ecuOptions?.filter(option=>option.id == item.ecu.id)[0].ecu[0].file : 
                ecuOptions[0].ecu[0].file : 
                [];

            tempECU[index] = ecuOptions ? item.ecu ? ecuOptions.filter(option => option.id == item.ecu.id)[0] : ecuOptions[0] : null
            tempDataset[index] = datasetOptions ? item.server_sw ? datasetOptions.filter(option => option.sw_part_no == item.server_sw)[0] : datasetOptions[0] : null

            return(
                {
                    key: index,
                    index: index + 1,
                    vid: item.analyze_fotax.vehicle,
                    ecu_id: tempECU[index]?.id,
                    dataset_id: tempDataset[index]?.sw_part_no,
                    ecuOptions: ecuOptions,
                    datasetOptions: datasetOptions,
                    datasetOptionId: 0,
                    downloadStatus: 0,
                    flashStatus: 0,
                })
        });
            setRecordData(defaultData);
            setDownloadIds(tempDownloadIds);
            setFlashIds(tempFlashIds);
            setECUId(tempECU);
            
            setDatasetId(tempDataset);
        }
    },[campaign,datas])

    useEffect(() => {
        const request = axios.get(`${API_VEHICLE_URL}/list/?customer_id=${userId}`);
        request.then(response => {
            console.log(response.data.results)
            const data = response.data.results;

            setDatas(data);    
        })
    },[])

    useEffect( () => {
    
        const interval = setInterval(()=> {
            if (downloadStart) {
                downloadIds.map((item, idx)=>{
                    if (item != '0') {
                   
                    const request = axios.get(`${API_DEVICE_URL}/fotax/ecufota/downloadattempt/list/?id=`+item);
                    request.then(response => {
                        const percent = parseInt(response.data.results[0].latest_percentage);
                        if (percent == '100'){
                            clearInterval(interval);
                            setDownloadStart(false)
                        }
                        let newData = [...recordData];
                        let targetData = newData.find(item => item.key === idx);
                        targetData.downloadStatus = percent;
                        setRecordData(newData);
                    })
                    }
                })              
            }
            if (flashingStart) {
                flashIds.map((item, idx)=> {
                    if (item != '0') {
                        const request = axios.get(`${API_DEVICE_URL}/fotax/ecufota/flashingattempt/list/?id=`+item);
                        request.then(response => {
                        const percent = parseInt(response.data.results[0].latest_percentage);
                        if (percent == '100'){
                            clearInterval(interval);
                            setFlashingStart(false)
                        }
                        let newData = [...recordData];
                        let targetData = newData.find(item => item.key === idx);
                        targetData.flashStatus = percent;
                        setRecordData(newData);
                    })
                }
                })
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    },[downloadStart, flashingStart])

    const columns = [
        {
            title: 'SI No',
            dataIndex: 'index',
            key: 'No',
            width: 70,
        },
        {
            title: 'Vehicle ID',
            dataIndex: 'vid',
            key: 'vehicle id',
            width: 200,
        },
        {
            title: 'ECU',
            dataIndex: 'ecu',
            key: 'ecu',
            width: '20%',
            ellipsis: true,
            render: (text, record) => 
                <Select className='w-full' value={record.ecu_id} onSelect={value => handleSelectChange('ecu', value, record)}>
                { record.ecuOptions?.map( ecu => 
                    <Select.Option key={ecu.id} value={ecu.id}> {ecu.name} </Select.Option>
                )
                }
                </Select>
        },
        {
            title: 'Dataset',
            dataIndex: 'dataset',
            key: 'dataset',
            width: '20%',
            ellipsis: true,
            render: (text, record) =>
                <Select className='w-full' value={record.dataset_id} onChange={(value) => handleSelectChange('dataset', value, record)}>
                { record.datasetOptions?.map( dataset => 
                    <Select.Option key={dataset.id} value={dataset.sw_part_no}> {dataset.sw_part_no} </Select.Option>
                )
                }
                </Select>
        },
        {
            title: 'Download Status',
            dataIndex: 'downloadStatus',
            key: 'download',
            render: (text, record) => <span>{record.downloadStatus}%</span>

        },
        {
            title: 'Flashing Status',
            dataIndex: 'flashStatus',
            key: 'flashing',
            render: (text, record) => <span>{record.flashStatus}%</span>

        }
    ];

    return (
        <div className='w-full h-full flex flex-col items-center justify-between overflow-hidden overflow-y-auto p-5'>
            <div className='w-full flex flex-col'>
            <div className="w-full flex items-center justify-between text-[18px] pb-10">
                <div className='flex items-center'>
                    { campaign?.name }
                    <Icon className='ml-3' icon="fa:edit" width="22" height="22" />
                </div>
                <div> Status: {campaign?.status} </div>
                <InfoCircleOutlined className='text-[20px]' />
            </div>
            <div className="w-full h-[400px] flex items-start justify-between">
                <Table
                    columns={columns}
                    dataSource={recordData}
                    pagination={false}
                    scroll={{ y: 320 }} />
            </div>
            </div>
            <div className="w-full h-[50px] flex justify-center items-center text-2xl mt-10">
                <Button
                    className={`w-full h-full text-center text-white m-3`}
                    onClick={createCampaign}
                    style={{background: themeColor, border: '1px solid ' + matchColor(themeColor), width: 150, height: 50}}
                    // onClick={() => handleButtonClick('actuatorTest', 'return_control')}
                >
                    Save
                </Button>
                {downloadStart ?
                    <Button
                        className={`w-full h-full text-center text-white m-3`}
                        style={{background: themeColor, border: '1px solid ' + matchColor(themeColor), width: 200, height: 50}}
                        onClick={()=> setDownloadStart(false)}
                    >
                        Stop Download Campaign
                    </Button>
                    :
                    <Button
                        className={`w-full h-full text-center text-white m-3`}
                        style={{background: themeColor, border: '1px solid ' + matchColor(themeColor), width: 200, height: 50}}
                        onClick={() => startCampaign(0)}
                    >
                        Start Download Campaign
                    </Button>
                }

                {
                    flashingStart ?
                        <Button
                        className={`w-full h-full text-center text-white m-3`}
                        style={{background: themeColor, border: '1px solid ' + matchColor(themeColor), width: 200, height: 50}}
                        onClick={()=>setFlashingStart(false)}
                    >
                        Stop Flash Campaign
                    </Button>
                    :
                    <Button
                        className={`w-full h-full text-center text-white m-3`}
                        style={{background: themeColor, border: '1px solid ' + matchColor(themeColor), width: 200, height: 50}}
                        onClick={() => startCampaign(1)}
                    >
                        Start Flash Campaign
                    </Button>
                }
                

            </div>
        </div>
    );
};

export default PageContent;
