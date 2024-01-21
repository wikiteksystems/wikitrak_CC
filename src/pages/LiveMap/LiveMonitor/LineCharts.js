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
  Legend,
} from 'recharts';

// const ZoomableLineChart = ({ data }) => {
//   console.log(data,"graphdata")
//     return (
//     <div style={{ width: '100%', height: '500px' }}>
//       <ResponsiveContainer>
//         <LineChart
//           data={data}
//           margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="Time" />
//           <YAxis />
//           <Tooltip  />
//           <Line type="monotone" dataKey="value" stroke="#8884d8" />
//           <Line type="monotone" dataKey="value" stroke="#82ca9d" />

//           <Brush dataKey="Date" height={30} stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };
 

const ZoomableLineChart = ({ data }) => {
  console.log(data, "graphdata");
  const lineColors = ['#8884d8', '#82ca9d', '#ff7300', '#0088fe', '#00c49f', '#ffc658', '#ff4842'];

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data.length > 0 ? data[0].data : []}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data.map((item, index) => (
            <Line
              key={index}
              data={item.data}
              type="monotone"
              dataKey="value"
              // stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each line
              stroke={lineColors[index % lineColors.length]}
              name={item.label}
            />
          ))}
          <Brush dataKey="Date" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default ZoomableLineChart;

 

