import TimelineIcon from '@mui/icons-material/Timeline';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import CastSharpIcon from '@mui/icons-material/CastSharp';
import BrowserUpdatedSharpIcon from '@mui/icons-material/BrowserUpdatedSharp';
import PhonelinkSetupSharpIcon from '@mui/icons-material/PhonelinkSetupSharp';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';

export const vehicleDetailMenuItems = [
    {
        key: 0,
        type: 'input',
        label: 'Reg No',
        keyName: 'registration_id'
    }, {
        key: 1,
        type: 'input',
        label: 'VIN',
        keyName: 'vin'
    },
    // {
    //     key: 2,
    //     type: 'input',
    //     label: 'IMEI',
    //     keyName: 'imei'
    // }, 
    {
        key: 3,
        type: 'dropdown',
        label: 'Segment',
        keyName: 'segment'
    }, {
        key: 4,
        type: 'dropdown',
        label: 'OEM',
        keyName: 'oem'
    }, {
        key: 5,
        type: 'dropdown',
        label: 'Variant',
        keyName: 'variant'
    }, {
        key: 6,
        type: 'dropdown',
        label: 'Model',
        keyName: 'model'
    }, {
        key: 7,
        type: 'dropdown',
        label: 'Sub Model',
        keyName: 'sub_model'
    }, {
        key: 8,
        type: 'dropdown',
        label: 'Model Year',
        keyName: 'model_year'
    }, {
        key: 10,
        type: 'dropdown',
        label: 'Group',
        keyName: 'vehicle_group'
    }, {
        key: 11,
        type: 'input',
        label: 'Emergency No1',
        keyName: 'emergency_no_1'
    }, {
        key: 12,
        type: 'input',
        label: 'Emergency No2',
        keyName: 'emergency_no_2'
    }
]
export const vehicleDetailMenuItems_addin = [
    {
        key: 9,
        type: 'input',
        label: 'Customer',
        keyName: 'user'
    }, {
        key: 13,
        type: 'link',
        label: 'Trip History',
        icon: <TimelineIcon />,
        link: '/livemap/trip_history'
    }, {
        key: 14,
        type: 'link',
        label: 'Geofence',
        icon: <PinDropOutlinedIcon />,
        link: '/livemap/geofence'
    }, {
        key: 15,
        type: 'link',
        label: 'Live Monitor',
        icon: <CastSharpIcon / >,
        link: '/livemap/live_monitor'
    },{
        key: 17,
        type: 'link',
        label: 'Device Firmware Update',
        icon: <BrowserUpdatedSharpIcon />,
        link: '/livemap/firmware_update'
    }, {
        key: 18,
        type: 'link',
        label: 'Device Configuration',
        icon: <PhonelinkSetupSharpIcon />,
        link: '/livemap/device_config'
    }, {
        key: 19,
        type: 'button-delete',
        icon: <DeleteSweepOutlinedIcon />,
        label: 'Delete',
    }
]

export const groupDetailMenuItems = [
    {
        key: 0,
        type: 'input',
        label: 'Name',
        keyName: 'group_name'
    }, {
        key: 1,
        type: 'color',
        label: 'Color',
        keyName: 'color'
    }, {
        key: 2,
        type: 'button-delete',
        label: 'Delete',
    }
];

export const centerLocation = {
    lat: 18.578270907869953,
    lng: 74.00429390973979,
};

export const geofences = [
    {
        key: 0,
        label: 'Geofence1',
        center: {lat: 18.57, lng: 74},
        radius: 1000,
        type: 'inward',
        isActive: true
    },
    {
        key: 1,
        label: 'Geofence2',
        center: {lat: 18.6, lng: 74.02},
        radius: 1000,
        type: 'outward',
        isActive: true
    }
];

export const mapContextMenuItems = [
    {
        key: 0,
        label: 'Create Geofence'
    }
];
{/* //running code upper// */}


