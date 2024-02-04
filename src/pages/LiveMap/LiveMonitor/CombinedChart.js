// CombinedCharts.js
import React from "react";
import ZoomableLineChart from "./LineCharts";
import { Card } from "@mui/material";

const CombinedCharts = ({ combinedChartData }) => {
  console.log("Combined Data:", combinedChartData);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Card sx={{ margin: "20px", padding: "10px", width: "100%" }}>
        <h2>Combined Chart</h2>
        <ZoomableLineChart data={combinedChartData.map((item) => item.data)} />
      </Card>
    </div>
  );
};

export default CombinedCharts;
