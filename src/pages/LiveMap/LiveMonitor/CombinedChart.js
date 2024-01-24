import React from 'react';
import ZoomableLineChart from './ZoomableLineChart';
import ZoomableLineChart2 from './ZoomableLineChart2';



const CombinedCharts = ({ data }) => {

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ZoomableLineChart data={data} />
        <ZoomableLineChart2 data={chartValue} />
      </div>
    );
  };
  
  export default CombinedCharts;