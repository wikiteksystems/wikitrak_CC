import React from 'react';
import { CarOutlined } from '@ant-design/icons';
import carIconUrl from './car-icon.svg';

function CustomMarkerIcon() {
  return (
    <img src={carIconUrl} alt="Car" />
  );
}

export default CustomMarkerIcon;