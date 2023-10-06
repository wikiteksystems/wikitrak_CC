
import React, { useState, useEffect,useRef } from 'react'
import { GoogleMap, useJsApiLoader, Circle, Marker,InfoWindow,Polyline,DirectionsService, DirectionsRenderer  } from '@react-google-maps/api';
// import { CarOutlined } from '@ant-design/icons';
import { CarOutlined } from '@ant-design/icons';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import MarkerItem1 from './MarkerItem1';
import moment from 'moment';
const {GMAP_API_KEY} = require("../../../utils/constants")

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function MainMap({item,index,vehicleList,vehicleGroupList}) {
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
      const [directions, setDirections] = useState(null);
      
      const [center, setCenter] = useState({ lat: 0, lng: 0 })
      const iconStyle = {
        fontSize: '36px', // Adjust the font size as needed to increase the icon size
      };

    
    
    
    
    
    const getColor = (regNo) =>{
    
        let vechialFilter = vehicleList.filter((item) => item?.registration_id === regNo);
        console.log(vechialFilter ); 
        if(vechialFilter.length>0){
            let vechialGroupFilter = vehicleGroupList.filter((item) => item?.id === vechialFilter[0]?.vehicle_group);
             console.log(vechialGroupFilter[0]?.color)
           if(vechialGroupFilter.length>0)
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
    
    const startblinking = (data) =>{
        let today =  moment();
        let createdAt = moment(data?.createdAt);
        const def = today.diff(createdAt, 'minutes');
        console.log(def);
        return true;
    }

    useEffect(() => {
        const directionsService = new window.google.maps.DirectionsService();
        const origin = { lat: item?.latestDocument?.lat, lng: item?.latestDocument?.lng }; // Replace with your start coordinates
       const destination = { lat: 29.9457, lng: 78.1642 };
      
        directionsService.route(
          {
            origin,
            destination,
            travelMode: 'DRIVING', // You can change this to other travel modes like 'WALKING' or 'BICYCLING'
          },
          (result, status) => {
            if (status === 'OK') {
              setDirections(result);
            } else {
              console.error(`Directions request failed: ${status}`);
            }
          }
        );
      }, []);

  return (
    <div>
              return (
        <Marker
          key={index}
          // label={user.name}
          onClick={() => toggleInfoWindow(item?.latestDocument?._id)}
          position={{
            lat: parseFloat(item?.latestDocument?.lat),
            lng: parseFloat(item?.latestDocument?.lng),
          }}
          animation="BOUNCE"
          icon={
            {
            path: startblinking() && "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
  
              fillColor: getColor(item?.latestDocument?.registrationNumber),
              fillOpacity: 2,
              strokeWeight: 1,
              rotation: calculateAngleFromEast(item?.latestDocument?.lat, item?.latestDocument?.lng),
              scale: 1,
            }
          }
          
        >

{directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true, // Hide the default start and end markers
          }}
        />
      )}

        {selectedMarker === item?.latestDocument?._id &&  <InfoWindow
            key={item.id}
            position={{
              lat: parseFloat(item?.latestDocument?.lat),
              lng: parseFloat(item?.latestDocument?.lng),
            }}
            onCloseClick={() => setSelectedMarker(null)}
            options={{ maxWidth: 200 }}
            visible={selectedMarker === item.id}
          >
           
         <MarkerItem1 item={item} />
          </InfoWindow>
}


</Marker>
    </div>
  )
}
