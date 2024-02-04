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
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        data={data[0]?.data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
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
          dataKey="value"
          stroke="#8884d8"
          name={data[0]?.label}
          yAxisId="speed"
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          name={data[1]?.label}
          yAxisId="mainInputVoltage"
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#ffc658"
          name={data[2]?.label}
          yAxisId="ignition"
        />
        <Brush dataKey="Time" height={30} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ZoomableLineChart;
