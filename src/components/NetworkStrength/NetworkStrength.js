import React from 'react';
import "./NetworkStrength.css"
import { useEffect } from 'react';
import { useState } from 'react';
import { ThemeColor } from '../../utils/constants';

const NetworkStrength = ({ locationData, item}) => {
  // Calculate the filling percentage based on the value
  const [fillColorPer,setFillColorPer] = useState(0);
   useEffect(() =>{
    let result = [];
     result = locationData.filter((val) => val?.latestDocument?.imei === item?.imei[0]?.mac_id )
           if(result.length>0)
            setFillColorPer(result[0]?.latestDocument?.gsmStrength*100/31)
        console.log(result[0]?.latestDocument?.gsmStrength)
   },[locationData,item])

  return (
    <div className="network-strength">
      <div className="network-icon">
        <div className="network-bar" style={{ width: `${fillColorPer}%`, backgroundColor:ThemeColor.light_color_2 }}></div>
      </div>
    </div>
  );
};

export default NetworkStrength;
