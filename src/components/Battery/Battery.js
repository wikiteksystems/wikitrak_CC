import React from 'react';
import "./battery.css"

const Battery = ({ value }) => {
  // Calculate the fill percentage based on the value (1-12 volts)
  const fillPercentage = (value / 12) * 100;

  // Define the fill color based on your desired logic
  const fillColor = `rgb(${255 - (fillPercentage / 100) * 255}, ${(fillPercentage / 100) * 255}, 0)`;

  return (
    <div className="battery-container">
      <div className="battery-body">
        <div
          className="battery-fill"
          style={{
            height: `${fillPercentage}%`,
            backgroundColor: fillColor,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Battery;
