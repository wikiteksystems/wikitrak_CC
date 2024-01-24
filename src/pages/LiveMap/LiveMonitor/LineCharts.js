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
//original code //
const ZoomableLineChart = ({ data }) => {
  console.log(data,"graphdata")
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
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />

          <Brush dataKey="Date" height={30} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ZoomableLineChart;
 
//short multi grph//
// const ZoomableLineChart = ({ data }) => {
//   console.log(data, "graphdata");
//   const lineColors = ['#8884d8', '#82ca9d', '#ff7300', '#0088fe', '#00c49f', '#ffc658', '#ff4842'];

//   return (
//     <div style={{ width: '100%', height: '500px' }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
//           data={data.length > 0 ? data[0].data : []}
//           margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="Time" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           {data.map((item, index) => (
//             <Line
//               key={index}
//               data={item.data}
//               type="monotone"
//               dataKey="value"
//               // stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each line
//               stroke={lineColors[index % lineColors.length]}
//               name={item.label}
//             />
//           ))}
//           <Brush dataKey="Date" height={30} stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };


// export default ZoomableLineChart;





//long multigraph //
// const ZoomableLineChart2 = ({ data }) => {
//   console.log(data, 'graphdata');

//   // Find the maximum number of data points across all datasets
//   const maxDataPoints = Math.max(...data.map((item) => item.data.length));

//   // Fill in missing x-axis values in datasets
//   const filledData = data.map((item) => {
//     const filledDataArray = [];
//     for (let i = 0; i < maxDataPoints; i++) {
//       const existingDataPoint = item.data[i];
//       if (existingDataPoint) {
//         filledDataArray.push(existingDataPoint);
//       } else {
//         // Fill in missing x-axis values with zero
//         filledDataArray.push({ DateTime: i + 1, value: 0 });
//       }
//     }
//     return { label: item.label, data: filledDataArray };
//   });

//   const chartWidth = Math.max(50, maxDataPoints * 20); // Minimum width of 800px

//   const lineColors = ['#8884d8', '#82ca9d', '#ff7300', '#0088fe', '#00c49f', '#ffc658', '#ff4842'];

//   return (
//     <div style={{ width: '100%', height: '600px', overflowY: 'auto', border: '1px solid #ccc' }}>
//       <ResponsiveContainer width={chartWidth} height="100%" marginRight="10px ">
//         <LineChart
//           data={filledData.length > 0 ? filledData[0].data : []}
//           margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="DateTime" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           {filledData.map((item, index) => (
//             <Line
//               key={index}
//               data={item.data}
//               type="monotone"
//               dataKey="value"
//               stroke={lineColors[index % lineColors.length]}
//               name={item.label}
//             />
//           ))}
//           <Brush dataKey="DateTime" height={30} stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ZoomableLineChart2;


//gpt code //


// const ZoomableLineChart = ({ data }) => {
//   console.log(data, 'graphdata');

//   // Find the maximum number of data points across all datasets
//   const maxDataPoints = Math.max(...data.map((item) => item.data.length));

//   // Fill in missing x-axis values in datasets
//   const filledData = data.map((item) => {
//     const filledDataArray = [];
//     for (let i = 0; i < maxDataPoints; i++) {
//       const existingDataPoint = item.data[i];
//       if (existingDataPoint) {
//         filledDataArray.push(existingDataPoint);
//       } else {
//         // Fill in missing x-axis values with zero
//         filledDataArray.push({ DateTime: i + 1, value: 0 });
//       }
//     }
//     return { label: item.label, data: filledDataArray };
//   });

//   const chartWidth = Math.max(50, maxDataPoints * 20); // Minimum width of 800px

//   const lineColors = ['#8884d8', '#82ca9d', '#ff7300', '#0088fe', '#00c49f', '#ffc658', '#ff4842'];

//   return (
//     <div style={{ width: '100%', height: '600px', overflowY: 'auto', border: '1px solid #ccc' }}>
//       <ResponsiveContainer width={chartWidth} height="100%" marginRight="10px">
//         <LineChart
//           data={filledData.length > 0 ? filledData[0].data : []}
//           margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="DateTime" />
//           <Tooltip />
//           <Legend />
//           {filledData.map((item, index) => (
//             <Line
//               key={index}
//               data={item.data}
//               type="monotone"
//               dataKey="value"
//               stroke={lineColors[index % lineColors.length]}
//               name={item.label}
//             />
//           ))}
//           {filledData.map((item, index) => (
//             <YAxis
//               key={index}
//               yAxisId={index}
//               label={{ value: item.label, angle: -90, position: 'insideLeft' }}
//             />
//           ))}
//           <Brush dataKey="DateTime" height={30} stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ZoomableLineChart;

 

