import { useEffect } from "react";
import { ThemeColor } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { LiveMapActions } from "../../stores/actions";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudIcon from '@mui/icons-material/Cloud';

function WeatherForecast({center,locationData}) {
    const { weatherForecast,vehicleList,vehicleGroupList } = useSelector( ({LiveMap}) => LiveMap );
   
  console.log(center,locationData,"____________________######")
  
    

    const dispatch = useDispatch();
    console.log(center)

    useEffect( () => {
        dispatch(LiveMapActions.getForecast(center));
    },[])
  return (
    <>
     <div className="" >
  <div className="flex flex-wrap gap-10 justify-evenly" style={{ fontSize: "18px" }}>
    {/* Vehicle Information */}
    <div>
      <DirectionsCarFilledIcon style={{ color: "#ff0000", marginRight: "5px" }} />
      {/* <span>veh: {vehicleList[0]?.label}</span> */}
    </div>

    {/* Temperature Information */}
    <div>
      <p>
        <ThermostatIcon style={{ color: "purple", marginRight: "5px" }} />
        temp: {weatherForecast.main?.temp ? (weatherForecast.main.temp - 273.15).toFixed(2) : ''}°C
      </p>
    </div>

    {/* Humidity Information */}
    <div>
      <p>
        <CloudIcon style={{ color: "#ffff", marginRight: "5px" }} />
        humidity: {weatherForecast.main?.humidity}
      </p>
    </div>
  </div>
</div>
    </>
  );
}

export default WeatherForecast;










