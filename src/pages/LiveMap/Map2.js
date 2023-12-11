
import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Circle, MarkerF } from '@react-google-maps/api';
const {GMAP_API_KEY} = require("../../utils/constants")
const containerStyle = {
  width: '100%',
  height: '100%'
};

function Map2({  }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GMAP_API_KEY
  })

  const users = [
    {lat  :   18.57734,  lng  :   74.003583,name:"c1"},
    {lat   :   18.542368,  lng  :   73.888223,name:"c2"},
    {lat:"18.3595",lng:"73.7558",name:"c3"},
    {lat    :   18.542503, lng :   73.888381,name:"c4"},
  ]

  const [center, setCenter] = useState({lat: 18.542368, lng: 73.888223});


  








  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={10}
      center={center}
      clickableIcons={false} 
      options={{
        clickableIcons: false,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        minZoom: 10,
        maxZoom: 17,
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


      {users.map((user, index) => (
        <MarkerF
          key={index}
          title={user.name}
          label={user.name}
          position={{
            lat: parseFloat(user.lat),
            lng: parseFloat(user.lng),
          }}
          options={{
            icon: {
              url: "https://img.icons8.com/2266EE/ios-glyphs/20/null/sedan.png",
            },
          }}
        />
      ))}


    </GoogleMap>
  ) : <></>
}

export default Map2