import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";

const ZoomableLineChart = ({ data }) => {
  console.log("Received Data:", data);
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Time" />
        <YAxis
          yAxisId="speed"
          domain={[0, 100]} // Set the domain for speed
          tick={{ fill: "#8884d8" }}
          axisLine={{ stroke: "#8884d8" }}
        />
        <YAxis
          yAxisId="mainInputVoltage"
          orientation="right"
          domain={[0, 16]} // Set the domain for mainInputVoltage
          tick={{ fill: "#82ca9d" }}
          axisLine={{ stroke: "#82ca9d" }}
        />
        <YAxis
          yAxisId="ignition"
          orientation="right"
          domain={[0, 1]} // Set the domain for ignition
          tick={{ fill: "#ffc658" }}
          axisLine={{ stroke: "#ffc658" }}
        />
        <Tooltip />
        <Line
          type="monotone"
          data={data[0]} // Use the first array for speed
          dataKey="value"
          stroke="#8884d8"
          name="Speed"
          yAxisId="speed"
          dot={false} // Hide dots
        />
        <Line
          type="monotone"
          data={data[1]} // Use the second array for mainInputVoltage
          dataKey="value"
          stroke="#82ca9d"
          name="Main Input Voltage"
          yAxisId="mainInputVoltage"
          dot={false} // Hide dots
        />
        <Line
          type="monotone"
          data={data[2]} // Use the third array for ignition
          dataKey="value"
          stroke="#ffc658"
          name="Ignition"
          yAxisId="ignition"
          dot={false} // Hide dots
        />
        <Brush dataKey="Time" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ZoomableLineChart;
