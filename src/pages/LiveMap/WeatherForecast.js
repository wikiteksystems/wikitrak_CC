import { useEffect } from "react";
import { ThemeColor } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { LiveMapActions } from "../../stores/actions";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudIcon from '@mui/icons-material/Cloud';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from "antd";
import "./weather.css";

function WeatherForecast({center, locationData}) {
  const dispatch = useDispatch();
  const userId = useSelector( ({User}) => User.userId );
    const { weatherForecast,vehicleList,vehicleGroupList } = useSelector( ({LiveMap}) => LiveMap );
   


    console.log(locationData)
    

    
    console.log(center)

    useEffect( () => {
        dispatch(LiveMapActions.getForecast());
    },[])

    const handleRefresh =()=>{
      dispatch(LiveMapActions.getVehicleList(userId));
    }
  return (
    <>
     <div className="" style={{ position: "absolute", top: "96%", right: "5%", bottom: "0", maxWidth: '90%', width: '35%', height: "auto", background: ThemeColor.light_color_1, color: "white", opacity: "0.8", padding: "2px 0 0 0", borderRadius: "5px 5px 0 0" }}>
  <div className="flex flex-wrap justify-evenly" style={{ fontSize: "18px" }}>
    {/* Vehicle Information */}
    <div>
    <Button style={{border:"none", padding:"0",  background: ThemeColor.light_color_1}} onClick={handleRefresh}>
    <RefreshIcon style={{ color: "white" }} />
    </Button>
  </div>

    <div>
      <DirectionsCarFilledIcon style={{ color: "#ff0000"}} />
      <span>veh: {vehicleList[0]?.label}</span>
    </div>

    {/* Temperature Information */}
    <div>
      <p>
        <ThermostatIcon style={{ color: "white" }} />
        temp: {weatherForecast.main?.temp ? (weatherForecast.main.temp - 273.15).toFixed(2) : ''}°C
      </p>
    </div>

    {/* Humidity Information */}
    <div>
      <p>
        <CloudIcon style={{ color: "#ffff" }} />
        humidity: {weatherForecast.main?.humidity}
      </p>
    </div>
  </div>
</div>
    </>
  );
}

export default WeatherForecast;
