
import React, { useState, useEffect,useRef } from 'react'
import { GoogleMap, useJsApiLoader, Circle, Marker,InfoWindow } from '@react-google-maps/api';
// import { CarOutlined } from '@ant-design/icons';
import { CarOutlined } from '@ant-design/icons';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import MarkerItem1 from '../MapItems/MarkerItem1';
import moment from 'moment';
import MapLine from './MapLine';
import { Box, Card } from '@mui/material';
import Typography from 'antd/es/typography/Typography';

const {GMAP_API_KEY} = require("../../../utils/constants")

const containerStyle = {
  width: '100%',
  height: '100%'
};
function LiveContent({selectCheckParam }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GMAP_API_KEY
  })

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [distance, setDistance] = useState(null);


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

  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const iconStyle = {
    fontSize: '36px', // Adjust the font size as needed to increase the icon size
  };
useEffect(() =>{
    if(selectCheckParam.length>0){
     setCenter({lat:parseFloat(selectCheckParam[0]?.data[0]?.lat) , lng:parseFloat(selectCheckParam[0]?.data[0]?.lng)})
    }
},[selectCheckParam])



const startblinking = (data) =>{
    let today =  moment();
    let createdAt = moment(data?.createdAt);
    const def = today.diff(createdAt, 'minutes');
    console.log(def);
    return true;
}

  return isLoaded ? (
    <Box>
      <Typography style={{textAlign:"center",fontSize:"22px",padding:"10px",background:"#4071C9",color:"#fff",fontWeight:"600"}}>Trip History</Typography>
    {selectCheckParam.length>0 ?
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={10}
      center={center}
      clickableIcons={false} 
      options={{
        clickableIcons: true,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        minZoom: 10,
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

 
      {selectCheckParam.length>0 && selectCheckParam.map((item, index) => {
      return (
        <>
        <Marker
          key={index}
          // label={user.name}
          onClick={() => toggleInfoWindow(index)}
          position={{
            lat: parseFloat(item?.data[0]?.lat),
            lng: parseFloat(item?.data[0]?.lng),
          }}
          animation="BOUNCE"
          // icon={
          //   {
          //   path: startblinking() && "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
          //     fillOpacity: 2,
          //     strokeWeight: 1,
          //     scale: 1,
          //   }
          // }
          
        />

        <MapLine item={item} distance={distance} setDistance={setDistance} />

        <Marker
          key={index}
          // label={user.name}
          // onClick={() => toggleInfoWindow(item?.data?._id)}
          position={{
            lat: parseFloat(item?.data[item?.data.length-1]?.lat),
            lng: parseFloat(item?.data[item?.data.length-1]?.lng),
          }}
          animation="BOUNCE"
          
        />

        {selectedMarker === index &&  <InfoWindow
            key={index}
            position={{
              lat: parseFloat(item?.data[0]?.lat),
              lng: parseFloat(item?.data[0]?.lng),
            }}
            onCloseClick={() => setSelectedMarker(null)}
            options={{ maxWidth: 200 }}
            visible={selectedMarker === index}
          >
           
           <div>
          Distance: {distance ? `${(distance / 1000).toFixed(2)} km` : 'Calculating...'}
        </div>
          </InfoWindow>
}


</>
      
      )})}

    </GoogleMap>
:
<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:'400px'}}>
  <Card sx={{padding:"20px",fontSize:"20px",fontWeight:"600"}}>
  Please Select Location
  </Card>
  </Box>
}
    </Box>
  ) : <></>
}

export default LiveContent;