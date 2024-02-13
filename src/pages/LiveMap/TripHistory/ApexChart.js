import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          height: 350,
          type: "line",
          stacked: false,
          background: "#ffffff", // White background
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [4, 4],
        },
        xaxis: {
          type: "datetime", // X-axis type set to datetime
        },
        yaxis: [
          {
            seriesName: "Speed",
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#008FFB",
            },
            labels: {
              style: {
                colors: "#008FFB",
              },
            },
            title: {
              text: "Speed",
              style: {
                color: "#008FFB",
              },
            },
            min: 0, // Set minimum value for y-axis
            max: 100, // Set maximum value for y-axis
          },
          {
            seriesName: "Ignition Status",
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#FEB019",
            },
            labels: {
              style: {
                colors: "#FEB019",
              },
            },
            title: {
              text: "Ignition Status",
              style: {
                color: "#FEB019",
              },
            },
            min: 0, // Set minimum value for y-axis
            max: 1, // Set maximum value for y-axis
            tickAmount: 2, // Set number of ticks for y-axis
            labels: {
              formatter: function (value) {
                return value === 1 ? "True" : "False"; // Customize y-axis labels
              },
            },
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: "topLeft",
            offsetY: 30,
            offsetX: 60,
          },
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
    };
  }

  componentDidUpdate(prevProps) {
    // Check if the selected trip data has changed
    if (
      prevProps.speedData !== this.props.speedData ||
      prevProps.ignitionData !== this.props.ignitionData
    ) {
      // Map the data into series format
      const series = [
        {
          name: "Speed",
          type: "line",
          data: this.props.speedData.map((speed, index) => ({
            x: index, // Assuming x-axis is index
            y: speed,
          })),
        },
        {
          name: "Ignition Status",
          type: "line",
          data: this.props.ignitionData.map((ignition, index) => ({
            x: index, // Assuming x-axis is index
            y: ignition ? 1 : 0,
          })),
        },
      ];

      // Update the state with the new series data
      this.setState({ series });
    }
  }

  render() {
    return (
      <div style={{ position: "relative", marginBottom: 50, marginLeft: 20 }}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={300}
          width={400}
        />
      </div>
    );
  }
}

export default ApexChart;
