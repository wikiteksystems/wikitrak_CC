
// import React, { useState, useEffect,useRef } from 'react'
// import { GoogleMap, useJsApiLoader, Circle, Marker,InfoWindow } from '@react-google-maps/api';
// // import { CarOutlined } from '@ant-design/icons';
// import { CarOutlined } from '@ant-design/icons';
// import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
// import MarkerItem1 from './MapItems/MarkerItem1';
// import moment from 'moment';
// import WeatherForecast from './WeatherForecast';
// const {GMAP_API_KEY} = require("../../utils/constants")

// const containerStyle = {
//   width: '100%',
//   height: '100%'
// };
// function Map({locationData,vehicleGroupList,vehicleList,gtLocation }) {
//   // console.log(gtLocation.lat, "gtLocation")
//   console.log(locationData, "our location data")
//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: GMAP_API_KEY
//   })

//   const [selectedMarker, setSelectedMarker] = useState(null);

//   const toggleInfoWindow = (markerId) => {
//     console.log(markerId)
//     if (selectedMarker === markerId) {
//       // If the same marker is clicked again, close its InfoWindow
//       setSelectedMarker(null);
//     } else {
//       // Otherwise, open the InfoWindow for the clicked marker
//       setSelectedMarker(markerId);
//     }
//   };

//   const [map, setMap] = React.useState(null)
//   const [users, setUsers] = useState([]);
//   const [cleaners, setCleaners] = useState([]);
//   const radius = 5000; // 5km in meters

//   const [center, setCenter] = useState({ lat: 0, lng: 0 })
//   const iconStyle = {
//     fontSize: '36px', // Adjust the font size as needed to increase the icon size
//   };
// useEffect(() =>{
//     if(locationData.length>0){
//       console.log(locationData[0]?.latestDocument)
//      setCenter({lat:parseFloat(locationData[0]?.latestDocument?.lat) , lng:parseFloat(locationData[0]?.latestDocument?.lng)})
//     }
// },[locationData])





// const getColor = (regNo) =>{

//     let vechialFilter = vehicleList.filter((item) => item?.registration_id === regNo);
//     console.log(vechialFilter ); 
//     if(vechialFilter.length>0){
//         let vechialGroupFilter = vehicleGroupList.filter((item) => item?.id === vechialFilter[0]?.vehicle_group);
//          console.log(vechialGroupFilter[0]?.color)
//        if(vechialGroupFilter.length>0)
//        return `#${vechialGroupFilter[0]?.color}`

//     }
//     return "red";
// }

// const calculateAngleFromEast = (lat, lng) => {
//   const latRadians = (lat * Math.PI) / 180;
//   const lngRadians = (lng * Math.PI) / 180;

//   // Calculate the angle from the East direction in radians
//   const angleRadians = Math.atan2(latRadians, lngRadians);

//   // Convert the angle to degrees
//   const angleDegrees = (angleRadians * 180) / Math.PI;

//   // Ensure the angle is positive and between 0 and 360 degrees
//   const positiveAngle = (angleDegrees + 360) % 360;

//   return positiveAngle;
// };

// const startblinking = (data) => {
//   let today = moment();
//   let createdAt = moment(data?.createdAt);
//   const diff = today.diff(createdAt, 'minutes');
//   return diff < 5; // Example: return true if the time difference is less than 5 minutes
// };

// useEffect(() => {
//   if (locationData.length > 0) {
//     setCenter({
//       lat: parseFloat(locationData[0]?.latestDocument?.lat),
//       lng: parseFloat(locationData[0]?.latestDocument?.lng)
//     });
//   }
// }, [locationData]);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       zoom={10}
//       center={center}
//       clickableIcons={false} 
//       options={{
//         clickableIcons: true,
//         disableDefaultUI: true,
//         zoomControl: true,
//         mapTypeControl: true,
//         scaleControl: true,
//         minZoom: 10,
//         maxZoom: 30,
//         styles: [
// {
//   featureType: "road",
//   stylers: [{ visibility: "off" }],
//   elementType: "geometry.stroke",
//   stylers: [{ color: "#2A324A" }],
// },
// {
//   featureType: "poi",
//   stylers: [{ visibility: "off" }],

// },
// {
//   featureType: "transit",
//   stylers: [{ visibility: "off" }],
// },
// {
//   featureType: "water",
//   stylers: [{ visibility: "off" }],
// },
//         ]
//       }}
//     >

//       <WeatherForecast center={center} locationData={locationData} />

//       {/* {locationData.length>0 && locationData.map((item, index) => (
//         <Marker
//           key={index}
//           // label={user.name}
//           onClick={() => toggleInfoWindow(item?.latestDocument?._id)}
//           position={{
//             lat: parseFloat(item?.latestDocument?.lat),
//             lng: parseFloat(item?.latestDocument?.lng),
//           }}
//           animation="BOUNCE"
//           icon={
//             {
//             path: startblinking() && "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",

//               fillColor: getColor(item?.latestDocument?.registrationNumber),
//               fillOpacity: 2,
//               strokeWeight: 1,
//               rotation: item?.latestDocument?.heading,
//               scale: 1,
//             }
//           }

//         >




//         {selectedMarker === item?.latestDocument?._id &&  <InfoWindow
//             key={item.id}
//             position={{
//               lat: parseFloat(item?.latestDocument?.lat),
//               lng: parseFloat(item?.latestDocument?.lng),
//             }}
//             onCloseClick={() => setSelectedMarker(null)}
//             visible={selectedMarker === item.id}
//           >

//          <MarkerItem1 item={item} />
//           </InfoWindow>

// }


// </Marker>


//       ))} */}
//       {gtLocation?.length > 0 && (
//         <Marker
//           position={{
//             lat: parseFloat(19.075983),
//             lng: parseFloat(72.877655),
//           }}
//           animation={startblinking(locationData[0]?.latestDocument) ? "BOUNCE" : null}
//           icon={{
//             path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
//             fillColor: startblinking(locationData[0]?.latestDocument) ? "blue" : "red",
//             fillOpacity: 2,
//             strokeWeight: 1,
//             scale: 1,
//           }}
//         />
//       )}


//     </GoogleMap>
//   ) : <></>
// }

// export default Map;





import React, { useState, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Circle, Marker, InfoWindow } from '@react-google-maps/api';
// import { CarOutlined } from '@ant-design/icons';
import { CarOutlined } from '@ant-design/icons';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import MarkerItem1 from './MapItems/MarkerItem1';
import moment from 'moment';
import WeatherForecast from './WeatherForecast';
import MarkerItem2 from './MapItems/MarkerItem2';
const { GMAP_API_KEY } = require("../../utils/constants")

const containerStyle = {
  width: '100%',
  height: '100%'
};
function Map({ locationData, vehicleGroupList, vehicleList, gtVehi, wikitekVehi ,gtLocation}) {
  // console.log(gtVehi, "gtLocation map component")
  // console.log(locationData, "our location data")
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GMAP_API_KEY
  })

  const [selectedMarker, setSelectedMarker] = useState(null);
  

  const toggleInfoWindow = (markerId) => {
    console.log(markerId)
    if (selectedMarker === markerId) {
      // If the same marker is clicked again, close its InfoWindow
      setSelectedMarker(null);
    } else {
      // Otherwise, open the InfoWindow for the clicked marker
      setSelectedMarker(markerId);
    }
  };

  const [map, setMap] = React.useState(null)
  const [users, setUsers] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const radius = 5000; // 5km in meters

  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const iconStyle = {
    fontSize: '36px', // Adjust the font size as needed to increase the icon size
  };
  useEffect(() => {
    console.log(gtVehi, "gtLocation map component")
    if (locationData.length > 0) {
      console.log(locationData[0]?.latestDocument)
      setCenter({ lat: parseFloat(locationData[0]?.latestDocument?.lat), lng: parseFloat(locationData[0]?.latestDocument?.lng) })
    }
  }, [locationData])





  const getColor = (regNo) => {

    let vechialFilter = vehicleList.filter((item) => item?.registration_id === regNo);
    console.log(vechialFilter);
    if (vechialFilter.length > 0) {
      let vechialGroupFilter = vehicleGroupList.filter((item) => item?.id === vechialFilter[0]?.vehicle_group);
      console.log(vechialGroupFilter[0]?.color)
      if (vechialGroupFilter.length > 0)
        return `#${vechialGroupFilter[0]?.color}`

    }
    return "red";
  }

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
    const diff = today.diff(createdAt, 'minutes');
    return diff < 5; // Example: return true if the time difference is less than 5 minutes
  };

  useEffect(() => {
  
    if (locationData.length > 0) {
      setCenter({
        lat: parseFloat(locationData[2]?.latestDocument?.lat),
        lng: parseFloat(locationData[2]?.latestDocument?.lng)
      });
    }
  
    console.log(locationData, "locationDatalocationDatalocationData")
  }, [locationData]);
  const defaultLocaiton = { lat: 20.593683, lng: 78.962883 }



  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={13}
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
        ]
      }}
    >

      <WeatherForecast center={center} locationData={locationData} />

      {/* {gtLocation && (
        <Marker
          position={{
            lat: gtLocation.lat,
            lng: gtLocation.lng,
          }}
          icon={{
            path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
            fillColor: 'red',
            fillOpacity: 1,
            scale: 0.5,
            strokeColor: 'red',
            strokeWeight: 1,
          }}
        />
      )} */}

      {/* Uncomment the following block to display markers based on locationData */} *

      {gtVehi.length > 0 && gtVehi.map((item, index) => (
        <Marker
          key={index}
          onClick={() => toggleInfoWindow(item.latestDocument._id)}
          position={{
            lat: parseFloat(item.latestDocument.lat),
            lng: parseFloat(item.latestDocument.lng),
          }}
          animation="BOUNCE"
          icon={{
            path: startblinking() && "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
            fillColor: getColor(item?.latestDocument?.registrationNumber),
            fillOpacity: 2,
            strokeWeight: 1,
            rotation: item?.latestDocument?.heading,
            scale: 1,
          }}
        >
          {selectedMarker === item.latestDocument._id && (
            <InfoWindow
              key={item.id}
              position={{
                lat: parseFloat(31),
                lng: parseFloat(58),
              }}
              onCloseClick={() => setSelectedMarker(null)}
              visible={selectedMarker === item.id}
            >
              <MarkerItem2 item={item} />
            </InfoWindow>
          )}
        </Marker>
      ))}


      {wikitekVehi.length > 0 && wikitekVehi.map((item, index) => (
        <Marker
          key={index}
          onClick={() => toggleInfoWindow(item.latestDocument._id)}
          position={{
            lat: parseFloat(item.latestDocument.lat),
            lng: parseFloat(item.latestDocument.lng),
          }}
          animation="BOUNCE"
          icon={{
            path: startblinking() && "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
            fillColor: getColor(item?.latestDocument?.registrationNumber),
            fillOpacity: 2,
            strokeWeight: 1,
            rotation: item?.latestDocument?.heading,
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
      ))}


      {/* {locationData.length > 0 && locationData.map((item, index) => (
      <Marker
        key={index}
        onClick={() => toggleInfoWindow(item?.latestDocument?._id)}
        position={{
          lat: parseFloat(item?.latestDocument?.lat),
          lng: parseFloat(item?.latestDocument?.lng),
        }}
        animation="BOUNCE"
        icon={{
          path: startblinking() && "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
          fillColor: getColor(item?.latestDocument?.registrationNumber),
          fillOpacity: 2,
          strokeWeight: 1,
          rotation: item?.latestDocument?.heading,
          scale: 1,
        }}
      >
        {selectedMarker === item?.latestDocument?._id && (
          <InfoWindow
            key={item.id}
            position={{
              lat: parseFloat(item?.latestDocument?.lat),
              lng: parseFloat(item?.latestDocument?.lng),
            }}
            onCloseClick={() => setSelectedMarker(null)}
            visible={selectedMarker === item.id}
          >
            <MarkerItem1 item={item} />
          </InfoWindow>
        )}
      </Marker>
    ))} */}

    </GoogleMap>
  ) : <></>
}

export default Map;

