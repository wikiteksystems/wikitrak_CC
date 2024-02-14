import AtmIcon from "@mui/icons-material/Atm";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { useDispatch, useSelector } from "react-redux";
import { LiveMapActions } from "../../stores/actions";
import { Button } from "antd";
//new change//up
import Geofence from "../LiveMap/Geofence/Geofence";
import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
  InfoWindow,
  Polyline,
} from "@react-google-maps/api";
// import { CarOutlined } from '@ant-design/icons';
import { CarOutlined } from "@ant-design/icons";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import MarkerItem1 from "./MapItems/MarkerItem1";
import moment from "moment";
import WeatherForecast from "./WeatherForecast";
import MarkerItem2 from "./MapItems/MarkerItem2";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const { GMAP_API_KEY, ThemeColor } = require("../../utils/constants");
const containerStyle = {
  width: "100%",
  height: "100%",
};
//new change//
const servicesState = {
  atm: false,
  gas_station: false,
  lodging: false,
  restaurant: false,
  hospital: false,
  car_repair: false,
};
function Map({
  locationData,
  vehicleGroupList,
  vehicleList,
  gtVehi,
  wikitekVehi,
  gtLocation,
  center,
  setCenter,
  activeParametersList,
}) {
  const [apiData, setApiData] = useState(null);
  const [imeiList, setImeiList] = useState([]);
  const [activeDevices, SetActiveDevices] = useState();
  const [filterd_activeVehi, setFilterdActiveD] = useState([]);
  const [filterd_in_activeVehi, setFilterdInActiveD] = useState([]);
  const [stopVehicleList, setStopVehicleList] = useState([]);
  const [runningVehicleList, setRunningVehicleList] = useState([]);
  let { id } = useParams();
  // console.log(gtVehi,"gtvehiheading")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://139.59.37.47:3031/api/vehicle/status"
        );
        const data = await response.json();
        setApiData(data);
        setImeiList(data.imeiList);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    fetchData();
  }, []);
  // console.log(imeiList, "testing for data");

  const { showWeather, services, activeVehicle, cooridinates_obj } =
    useSelector(({ LiveMap }) => LiveMap);
  // console.log(gtVehi, "gtLocation map component1212",cooridinates_obj)

  // console.log(locationData, "our location data")
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GMAP_API_KEY,
  });
  //new change//
  const [n_service, setServices] = useState(servicesState);
  const [active_vehiLocation, setActive_vehiLocation] = useState();
  // const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [icon_path, setIconPath] = useState("default-svg-path");
  const [servicesLocation, setServicesLocation] = useState(null);
  const [showService, setShowservice] = useState(false);

  const dispatch = useDispatch();

  const [selectedMarker, setSelectedMarker] = useState(null);

  const toggleInfoWindow = (markerId) => {
    console.log(markerId);
    if (selectedMarker === markerId) {
      // If the same marker is clicked again, close its InfoWindow
      setSelectedMarker(null);
    } else {
      // Otherwise, open the InfoWindow for the clicked marker
      setSelectedMarker(markerId);
    }
  };

  const [map, setMap] = React.useState(null);
  const [users, setUsers] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const radius = 5000; // 5km in meters

  // const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const iconStyle = {
    fontSize: "36px", // Adjust the font size as needed to increase the icon size
  };
  useEffect(() => {
    // console.log(gtVehi, "gtLocation map component12133",cooridinates_obj)
    if (locationData?.length > 0) {
      console.log(locationData[0]?.latestDocument);
      setCenter({
        lat: parseFloat(locationData[0]?.latestDocument?.lat),
        lng: parseFloat(locationData[0]?.latestDocument?.lng),
      });
    }
  }, [locationData]);

  //new change//
  const shouldRenderMarker = () => {
    return Object.values(n_service).some((value) => value === true);
  };
  useEffect(() => {
    // console.log(showWeather.show, "showWeather.show");
    // console.log(showWeather.item, "showWeather.item");
    // console.log(services, "services");
    setServicesLocation(services);
    // console.log(servicesLocation, "services");
  }, [services]);
  const [google, setGoogle] = useState(null);

  const handleGeofenceAlert = (vehicleLocation) => {
    // Iterate through each geofence
    Geofence.length>0 && Geofence.forEach((geofence) => {
      // This line is likely causing the error
      // Check if the vehicle location is within the geofence radius
      const distanceFromCenter =
        google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(geofence.center.lat, geofence.center.lng),
          new google.maps.LatLng(vehicleLocation.lat, vehicleLocation.lng)
        );

      if (distanceFromCenter <= geofence.radius) {
        // Vehicle is inside the geofence, trigger alert
        alert(`Vehicle entered geofence: ${geofence.name}`);
      }
    });
  };

  useEffect(() => {
    if (activeVehicle && locationData.length > 0) {
      let active_vehicle = locationData.filter((item) => {
        const imeiArray = item.latestDocument.imei;

        if (imeiArray && imeiArray.length > 0) {
          return imeiArray.includes(activeVehicle?.imei[0]?.mac_id);
        }

        return false;
      });

      const vehicleLocation = {
        lat: parseFloat(active_vehicle[0].latestDocument.lat),
        lng: parseFloat(active_vehicle[0].latestDocument.lng),
      };

      setActive_vehiLocation({
        lat: active_vehicle[0].latestDocument.lat,
        lng: active_vehicle[0].latestDocument.lng,
      });
      // Check for geofence alert
      handleGeofenceAlert(vehicleLocation);
    }
  }, [activeVehicle]);
  useEffect(() => {
    if (active_vehiLocation) {
      setShowservice(true);
    }
  }, [active_vehiLocation]);

  const handleServices = (type) => {
    dispatch(LiveMapActions.getServices(type, active_vehiLocation));
    // dispatch(LiveMapActions.getServices("atm", {lat:"18.578100", lng:"73.970062"}));
  };

  const getColor = (regNo) => {
    let vechialFilter = vehicleList.filter(
      (item) => item?.registration_id === regNo
    );
    console.log(vechialFilter);
    if (vechialFilter?.length > 0) {
      let vechialGroupFilter = vehicleGroupList.filter(
        (item) => item?.id === vechialFilter[0]?.vehicle_group
      );
      console.log(vechialGroupFilter[0]?.color);
      if (vechialGroupFilter?.length > 0)
        return `#${vechialGroupFilter[0]?.color}`;
    }
    return "red";
  };

  const calculateAngleFromEast = (lat, lng) => {
    const latRadians = (lat * Math.PI) / 180;
    const lngRadians = (lng * Math.PI) / 180;

    // Calculate the angle from the East direction in radians
    const angleRadians = Math.atan2(latRadians, lngRadians);

    // Convert the angle to degrees
    const angleDegrees = (angleRadians * 180) / Math.PI;

    // Ensure the angle is positive and between 0 and 360 degrees
    const positiveAngle = (angleDegrees + 360) % 360;

    return positiveAngle;
  };

  const startblinking = (data) => {
    let today = moment();
    let createdAt = moment(data?.createdAt);
    const diff = today.diff(createdAt, "minutes");
    return diff < 5; // Example: return true if the time difference is less than 5 minutes
  };

  const defaultLocaiton = { lat: 20.593683, lng: 78.962883 };

  //new change//
  const buttonStyle = {
    background: ThemeColor.light_color_1,
    color: "white",
    opacity: "0.8",
  };
  const icon_style = {
    cursor: "pointer",
    fontSize: "45px",
    paddingBottom: "20px",
  };

  const getOnlineVehicles = () => {
    const onlineVehicle = vehicleList.filter((vehicle) => {
      // Assuming imeiList is an array of numbers
      return imeiList.includes(parseInt(vehicle.imei[0].mac_id, 10));
    });

    console.log(vehicleList, "vehicleList............");
    console.log(imeiList, "imeiList............");
    console.log(onlineVehicle, "onlineVehicle............");
    SetActiveDevices(onlineVehicle);
    // return onlineVehicle
  };

  useEffect(() => {
    if (id === "onlineVehicles" || id === "offlineVehicles") {
      getOnlineVehicles();
    }
  }, [imeiList, vehicleList]);

  useEffect(() => {
    console.log(activeDevices, "activeDevices");
    console.log(locationData, "locationData");

    if (
      locationData &&
      locationData.length > 0 &&
      activeDevices &&
      activeDevices.length > 0
    ) {
      const activeImeis = activeDevices.map(
        (device) => device.imei && device.imei[0] && device.imei[0].mac_id
      );
      console.log(activeImeis, "activeImeis");
      const matchingLocationData = [];
      const nonMatchingLocationData = [];

      locationData.forEach((location) => {
        const imei = location.latestDocument.imei;
        if (activeImeis.includes(imei)) {
          matchingLocationData.push(location);
        } else {
          nonMatchingLocationData.push(location);
        }
      });
      setFilterdActiveD(matchingLocationData);
      setFilterdInActiveD(nonMatchingLocationData);
      console.log(matchingLocationData, "matchingLocationData");
      console.log(nonMatchingLocationData, "nonMatchingLocationData");
    }
  }, [locationData, activeDevices]);

  useEffect(() => {
    // Filter data based on ignition status
    const ignitionFalseData = locationData.filter(
      (entry) => entry.latestDocument.ignition === false
    );
    const ignitionTrueData = locationData.filter(
      (entry) => entry.latestDocument.ignition === true
    );
    setRunningVehicleList(ignitionTrueData);
    setStopVehicleList(ignitionFalseData);
    // Print or use the filtered arrays as needed
    console.log("Ignition False Data:", ignitionFalseData);
    console.log("Ignition True Data:", ignitionTrueData);
  }, [locationData]);

  return isLoaded ? (
    <>
      <div style={{ position: "relative" }}>
        {showService && (
          <div
            className="flex justify-center flex-wrap"
            style={{
              height: "5%",
              width: "70%",
              margin: "auto",
              position: "absolute",
              zIndex: "1",
            }}
          >
            <Button
              onClick={() => {
                handleServices("atm");
                setIconPath(
                  "M8 9v1.5h2.25V15h1.5v-4.5H14V9zM6 9H3c-.55 0-1 .45-1 1v5h1.5v-1.5h2V15H7v-5c0-.55-.45-1-1-1zm-.5 3h-2v-1.5h2V12zM21 9h-4.5c-.55 0-1 .45-1 1v5H17v-4.5h1V14h1.5v-3.51h1V15H22v-5c0-.55-.45-1-1-1z"
                );
                setServices((prevServices) => ({
                  ...prevServices,
                  atm: !prevServices.atm,
                }));
              }}
              style={buttonStyle}
            >
              <AtmIcon style={icon_style} />
            </Button>

            <Button
              onClick={() => {
                setServices((prevServices) => ({
                  ...prevServices,
                  restaurant: !prevServices.restaurant,
                }));
                setIconPath(
                  "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"
                );
                handleServices("restaurant");
              }}
              style={buttonStyle}
            >
              <RestaurantIcon style={icon_style} />
            </Button>

            <Button
              onClick={() => {
                setIconPath(
                  "M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"
                );
                setServices((prevServices) => ({
                  ...prevServices,
                  lodging: !prevServices.lodging,
                }));
                handleServices("lodging");
              }}
              style={buttonStyle}
            >
              <HotelIcon style={icon_style} />
            </Button>

            <Button
              onClick={() => {
                setIconPath(
                  "M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"
                );

                setServices((prevServices) => ({
                  ...prevServices,
                  hospital: !prevServices.hospital,
                }));
                handleServices("hospital");
              }}
              style={buttonStyle}
            >
              <LocalHospitalIcon style={icon_style} />
            </Button>

            <Button
              onClick={() => {
                setIconPath(
                  "M16.22 12c.68 0 1.22-.54 1.22-1.22 0-.67-.54-1.22-1.22-1.22S15 10.11 15 10.78c0 .68.55 1.22 1.22 1.22zm-9.66-1.22c0 .67.54 1.22 1.22 1.22S9 11.46 9 10.78c0-.67-.54-1.22-1.22-1.22s-1.22.55-1.22 1.22zM7.61 4 6.28 8h11.43l-1.33-4H7.61zm8.67-1s.54.01.92.54c.02.02.03.04.05.07.07.11.14.24.19.4.22.65 1.56 4.68 1.56 4.68v6.5c0 .45-.35.81-.78.81h-.44c-.43 0-.78-.36-.78-.81V14H7v1.19c0 .45-.35.81-.78.81h-.44c-.43 0-.78-.36-.78-.81v-6.5S6.34 4.67 6.55 4c.05-.16.12-.28.19-.4.03-.02.04-.04.06-.06.38-.53.92-.54.92-.54h8.56zM4 17.01h16V19h-7v3h-2v-3H4v-1.99z"
                );

                setServices((prevServices) => ({
                  ...prevServices,
                  car_repair: !prevServices.car_repair,
                }));
                handleServices("car_repair");
              }}
              style={buttonStyle}
            >
              <CarRepairIcon style={icon_style} />
            </Button>

            <Button
              onClick={() => {
                setIconPath(
                  "m19.77 7.23.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                );
                setServices((prevServices) => ({
                  ...prevServices,
                  gas_station: !prevServices.gas_station,
                }));
                handleServices("gas_station");
              }}
              style={buttonStyle}
            >
              <LocalGasStationIcon style={icon_style} />
            </Button>
            {/* <Button style={buttonStyle} >
            <RefreshIcon style={icon_style} />
          </Button> */}
            {/* {showWeather?.show && (
            <WeatherForecast center={center} locationData={showWeather.item} />
          )} */}
          </div>
        )}
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={8}
          center={center}
          clickableIcons={false}
          options={{
            clickableIcons: true,
            disableDefaultUI: true,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            minZoom: 2,
            maxZoom: 30,
            styles: [
              {
                featureType: "road",
                stylers: [{ visibility: "off" }],
                elementType: "geometry.stroke",
                stylers: [{ color: "#2A324A" }],
              },
              {
                featureType: "poi",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "water",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {/* Uncomment the following block to display markers based on locationData */}{" "}
          *
          {servicesLocation &&
            servicesLocation.nearbyPlaces &&
            servicesLocation.nearbyPlaces.length > 0 &&
            shouldRenderMarker() &&
            servicesLocation.nearbyPlaces.map((element, index) => (
              // console.log(element)
              <Marker
                key={index}
                position={{
                  lat: parseFloat(element?.location?.lat),
                  lng: parseFloat(element?.location?.lng),
                }}
                animation="BOUNCE"
                icon={{
                  path: icon_path,
                  fillOpacity: 2,
                  strokeWeight: 1,
                  scale: 1,
                  fillColor: "red",
                }}
              ></Marker>
            ))}
          {id === "onlineVehicles" &&
            filterd_activeVehi?.length > 0 &&
            filterd_activeVehi.map((item, index) => (
              <Marker
                key={index}
                onClick={() => toggleInfoWindow(item.latestDocument._id)}
                position={{
                  lat: parseFloat(item.latestDocument.lat),
                  lng: parseFloat(item.latestDocument.lng),
                }}
                animation="BOUNCE"
                icon={{
                  // path: startblinking() && "M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z",

                  // path:"M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0",
                  path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",

                  fillColor: apiData?.imeiList.includes(
                    parseFloat(item.latestDocument.imei)
                  )
                    ? "red"
                    : "grey",
                  fillOpacity: 2,
                  strokeWeight: 1,
                  // rotation: item?.latestDocument?.heading,
                  rotation: (item?.latestDocument?.heading * 180) / Math.PI,
                  // rotation: calculateAngleFromEast(
                  //   item?.latestDocument?.lat,
                  //   item?.latestDocument?.lng
                  // ),
                  scale: 1,
                }}
              >
                {selectedMarker === item.latestDocument._id && (
                  <InfoWindow
                    key={item.latestDocument._id}
                    position={{
                      lat: parseFloat(item.latestDocument.lat),
                      lng: parseFloat(item.latestDocument.lng),
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                    visible={selectedMarker === item.latestDocument._id}
                  >
                    <MarkerItem2 item={item} />
                  </InfoWindow>
                )}
              </Marker>
            ))}
          {id === "offlineVehicles" &&
            filterd_in_activeVehi?.length > 0 &&
            filterd_in_activeVehi.map((item, index) => (
              <Marker
                key={index}
                onClick={() => toggleInfoWindow(item.latestDocument._id)}
                position={{
                  lat: parseFloat(item.latestDocument.lat),
                  lng: parseFloat(item.latestDocument.lng),
                }}
                animation="BOUNCE"
                icon={{
                  // path: startblinking() && "M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z",
                  // path:"M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0",
                  path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",

                  fillColor: apiData?.imeiList.includes(
                    parseFloat(item.latestDocument.imei)
                  )
                    ? "red"
                    : "grey",
                  fillOpacity: 2,
                  strokeWeight: 1,
                  // rotation: item?.latestDocument?.heading,
                  rotation: (item?.latestDocument?.heading * 180) / Math.PI,
                  // rotation: calculateAngleFromEast(
                  //   item?.latestDocument?.lat,
                  //   item?.latestDocument?.lng
                  // ),
                  scale: 1,
                }}
              >
                {selectedMarker === item.latestDocument._id && (
                  <InfoWindow
                    key={item.latestDocument._id}
                    position={{
                      lat: parseFloat(item.latestDocument.lat),
                      lng: parseFloat(item.latestDocument.lng),
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                    visible={selectedMarker === item.latestDocument._id}
                  >
                    <MarkerItem2 item={item} />
                  </InfoWindow>
                )}
              </Marker>
            ))}
          {id === "runningVeh" &&
            runningVehicleList?.length > 0 &&
            runningVehicleList.map((item, index) => (
              <Marker
                key={index}
                onClick={() => toggleInfoWindow(item.latestDocument._id)}
                position={{
                  lat: parseFloat(item.latestDocument.lat),
                  lng: parseFloat(item.latestDocument.lng),
                }}
                animation="BOUNCE"
                icon={{
                  // path: startblinking() && "M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z",
                  // path:"M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0",
                  path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",

                  fillColor: apiData?.imeiList.includes(
                    parseFloat(item.latestDocument.imei)
                  )
                    ? "red"
                    : "grey",
                  fillOpacity: 2,
                  strokeWeight: 1,
                  // rotation: item?.latestDocument?.heading,
                  rotation: (item?.latestDocument?.heading * 180) / Math.PI,
                  // rotation: calculateAngleFromEast(
                  //   item?.latestDocument?.lat,
                  //   item?.latestDocument?.lng
                  // ),
                  scale: 1,
                }}
              >
                {selectedMarker === item.latestDocument._id && (
                  <InfoWindow
                    key={item.latestDocument._id}
                    position={{
                      lat: parseFloat(item.latestDocument.lat),
                      lng: parseFloat(item.latestDocument.lng),
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                    visible={selectedMarker === item.latestDocument._id}
                  >
                    <MarkerItem2 item={item} />
                  </InfoWindow>
                )}
              </Marker>
            ))}
          {id === "stopVeh" &&
            stopVehicleList?.length > 0 &&
            stopVehicleList.map((item, index) => (
              <Marker
                key={index}
                onClick={() => toggleInfoWindow(item.latestDocument._id)}
                position={{
                  lat: parseFloat(item.latestDocument.lat),
                  lng: parseFloat(item.latestDocument.lng),
                }}
                animation="BOUNCE"
                icon={{
                  // path: startblinking() && "M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z",
                  // path:"M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0",
                  path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",

                  fillColor: apiData?.imeiList.includes(
                    parseFloat(item.latestDocument.imei)
                  )
                    ? "red"
                    : "grey",
                  fillOpacity: 2,
                  strokeWeight: 1,
                  // rotation: item?.latestDocument?.heading,
                  rotation: (item?.latestDocument?.heading * 180) / Math.PI,
                  // rotation: calculateAngleFromEast(
                  //   item?.latestDocument?.lat,
                  //   item?.latestDocument?.lng
                  // ),
                  scale: 1,
                }}
              >
                {selectedMarker === item.latestDocument._id && (
                  <InfoWindow
                    key={item.latestDocument._id}
                    position={{
                      lat: parseFloat(item.latestDocument.lat),
                      lng: parseFloat(item.latestDocument.lng),
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                    visible={selectedMarker === item.latestDocument._id}
                  >
                    <MarkerItem2 item={item} />
                  </InfoWindow>
                )}
              </Marker>
            ))}
          {id !== "onlineVehicles" &&
            id !== "offlineVehicles" &&
            id !== "runningVeh" &&
            id !== "stopVeh" && (
              <>
                {gtVehi?.length > 0 &&
                  gtVehi.map((item, index) => (
                    <Marker
                      key={index}
                      onClick={() => toggleInfoWindow(item.latestDocument._id)}
                      position={{
                        lat: parseFloat(item.latestDocument.lat),
                        lng: parseFloat(item.latestDocument.lng),
                      }}
                      animation="BOUNCE"
                      icon={{
                        // path: startblinking() &&"M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z",//car//
                        // path:"M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0",//plane
                        path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",

                        fillColor: apiData?.imeiList.includes(
                          parseFloat(item.latestDocument.imei)
                        )
                          ? "red"
                          : "grey",
                        fillOpacity: 2,
                        strokeWeight: 1,
                        // rotation: item?.latestDocument?.heading,
                        rotation:
                          (item?.latestDocument?.heading * 180) / Math.PI,
                        // rotation: calculateAngleFromEast(
                        //   item?.latestDocument?.lat,
                        //   item?.latestDocument?.lng
                        // ),

                        scale: 1,
                      }}
                    >
                      {selectedMarker === item.latestDocument._id && (
                        <InfoWindow
                          key={item.id}
                          position={{
                            lat: parseFloat(31),
                            // lng: parseFloat(58),
                          }}
                          onCloseClick={() => setSelectedMarker(null)}
                          visible={selectedMarker === item.id}
                        >
                          <MarkerItem2 item={item} />
                        </InfoWindow>
                      )}
                    </Marker>
                  ))}
                {/* {wikitekVehi?.length > 0 &&
                  wikitekVehi.map((item, index) => (
                    <Marker
                      key={index}
                      onClick={() => toggleInfoWindow(item.latestDocument._id)}
                      position={{
                        lat: parseFloat(item.latestDocument.lat),
                        lng: parseFloat(item.latestDocument.lng),
                      }}
                      animation="BOUNCE"
                      icon={{
                        path:
                          startblinking() &&
                          "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
                        fillColor: apiData?.imeiList.includes(
                          parseFloat(item.latestDocument.imei)
                        )
                          ? "red"
                          : "grey",
                        fillOpacity: 2,
                        strokeWeight: 1,
                        // rotation: item?.latestDocument?.heading,
                        rotation:
                          (item?.latestDocument?.heading * 180) / Math.PI,
                        // rotation: calculateAngleFromEast(
                        //   item?.latestDocument?.lat,
                        //   item?.latestDocument?.lng
                        // ),
                        scale: 1,
                      }}
                    >
                      {selectedMarker === item.latestDocument._id && (
                        <InfoWindow
                          key={item.id}
                          position={{
                            lat: parseFloat(item.latestDocument.lat),
                            lng: parseFloat(item.latestDocument.lng),
                          }}
                          onCloseClick={() => setSelectedMarker(null)}
                          visible={selectedMarker === item.id}
                        >
                          <MarkerItem1 item={item} />
                        </InfoWindow>
                      )}
                    </Marker>
                  ))} */}
              </>
            )}
          {activeParametersList[0].reg_id && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                overflow: "auto",
                justifyContent: "center",
              }}
            >
              <div
                style={{ bottom: 0, justifyContent: "center" }}
                className="text-white "
              >
                <div className="d-flex text-light">
                  <div
                    className="m-2  p-2 rounded card text-white w-25 "
                    style={{
                      background:
                        "linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)",
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <h4 className="text-white">Registration id</h4>
                        <p>(vehicle RTO number)</p>
                      </div>
                      <div className="col-md-6 d-flex align-items-center">
                        <h4 className="text-light">
                          {activeParametersList[0].reg_id}
                        </h4>
                      </div>
                    </div>

                    {/* <b>Registration id</b>:<span className='text-light'>{activeParametersList[0].reg_id}</span> */}
                  </div>
                  {activeParametersList[0].params.map((item, index) => {
                    return (
                      <div
                        className="m-2 bg-success p-2 rounded card w-25"
                        style={{
                          background:
                            "linear-gradient(155deg, rgba(47, 115, 193, 1) 4%, rgba(0, 134, 145, 1) 56%)",
                        }}
                      >
                        <div className="row">
                          <div className="col-md-7">
                            <h4 className="text-white">{item.label}</h4>
                            <p className="text-white">(Live Telematics)</p>
                          </div>
                          <div className="col-md-5">
                            <h4 className="text-light">
                              {typeof item.value === "boolean" ? (
                                item.value ? (
                                  <h4 className="text-success ml-1">On</h4>
                                ) : (
                                  <h4 className="ml-1 text-danger">Off</h4>
                                )
                              ) : (
                                item.value
                              )}
                            </h4>
                          </div>
                        </div>
                        {/* <b>{item.label}</b>:<span className='text-light'>{typeof (item.value) === 'boolean' ? item.value ? <span className='text-warning ml-1'>On</span> : <span className='ml-1 text-danger'>Off</span> : item.value}</span> */}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </GoogleMap>
      </div>
    </>
  ) : (
    <></>
  );
}

export default Map;
