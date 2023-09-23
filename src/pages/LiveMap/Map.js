import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';

import { GMAP_API_KEY } from '../../utils/constants';
import './Map.css';

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const MapContainer = ({ google, location, zoomLevel }) => {

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100%"
  };

  return (
    <div className='google-map'>
      <Map
        style={{borderRadius: 10}}
        containerStyle={containerStyle}
        google={google}
        zoom={zoomLevel}
        initialCenter={location}
      >
        <Marker position={location} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: GMAP_API_KEY,
})(MapContainer);