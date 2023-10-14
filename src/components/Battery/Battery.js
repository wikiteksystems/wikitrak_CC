import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import "./battery.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';

const Battery = ({ locationData, item}) => {
  const [fillColorPer,setFillColorPer] = useState(0);
  useEffect(() =>{
   let result = [];
    result = locationData.filter((val) => val?.latestDocument?.imei === item?.imei[0]?.mac_id )
          if(result.length>0)
           setFillColorPer(result[0]?.latestDocument?.mainInputVoltage*100/12)
       console.log(result[0]?.latestDocument?.gsmStrength)
  },[locationData,item])


  // Define the fill color based on your desired logic
  const fillColor = `#1AE600`;

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{width:"10px",height:"5px",border:"2px solid #000",borderBottom:"0px",background:fillColorPer===100&&fillColor}}></div>
    <div className="battery-container">
      <div className="battery-body">
        <div
          className="battery-fill"
          style={{
            height: `${fillColorPer}%`,
            backgroundColor: fillColor,
          }}
        ></div>
      </div>
    </div>
    </div>
  );
};

export default Battery;
