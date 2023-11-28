import { useEffect } from "react";
import { ThemeColor } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { LiveMapActions } from "../../stores/actions";
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudIcon from '@mui/icons-material/Cloud';

function WeatherForecast({center, locationData}) {
    const { weatherForecast,vehicleList,vehicleGroupList } = useSelector( ({LiveMap}) => LiveMap );
   


    console.log(locationData)
    

    const dispatch = useDispatch();
    console.log(center)

    useEffect( () => {
        dispatch(LiveMapActions.getForecast());
    },[])
  return (
    <>
     <div className="" style={{ position: "absolute", top: "96%", right: "5%", bottom: "0", maxWidth: '90%', width: '35%', height: "auto", background: "#009999", color: "white", opacity: "0.7", padding: "2px 5px 0 5px", borderRadius: "5px 5px 0 0" }}>
  <div className="flex flex-wrap gap-10 justify-evenly" style={{ fontSize: "18px" }}>
    {/* Vehicle Information */}
    <div>
      <DirectionsCarFilledIcon style={{ color: "#ff0000", marginRight: "5px" }} />
      <span>veh: {vehicleList[0]?.label}</span>
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
