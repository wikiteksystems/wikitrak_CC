import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from 'recharts';

const ZoomableLineChart = ({ data }) => {
    return (
    <div style={{ width: '100%', height: '500px' }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Time" />
          <YAxis />
          <Tooltip  />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <Brush dataKey="Date" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ZoomableLineChart;
