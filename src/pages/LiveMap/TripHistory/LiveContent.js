import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  Polygon,
} from "@react-google-maps/api";
import {
  Box,
  Popover,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ApexChart from "./ApexChart"; // Import the ApexChart component
import MapLine from "./MapLine";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { GMAP_API_KEY, Theme, ThemeColor } from "../../../utils/constants";
import "./animation.css";
import MultiChart from "./MultiChart";
import MovingIcon from "@mui/icons-material/Moving";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsPowerIcon from "@mui/icons-material/SettingsPower";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import "./animation.css";
import axios from "axios";
import { Typography } from "antd";
const filters = {
  harshBreak: "HB",
  harshAcceleration: "HA",
  overSpeed: "OS",
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LiveContent = ({
  harshBreak,
  acceleration,
  selectCheckParam,
  tripHis,
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GMAP_API_KEY,
  });
  const [area, setArea] = useState(null);
  const calculateArea = (polygon) => {
    if (!window.google || !window.google.maps.geometry){
      console.log('hello')
      return;
    } 
    const area = window.google.maps.geometry.spherical.computeArea(polygon.getPath());
    // Convert square meters to acres (1 acre = 4046.86 square meters)
    const areaInAcres = area / 4046.86;
    console.log('areaInAcres', areaInAcres)
    setArea(areaInAcres);
  };
  const generatePDFReport = () => {
    if (!selectedTrip || !selectedTrip.data || selectedTrip.data.length === 0) {
      console.error("No trip data available.");
      return;
    }

    // Extract trip details
    const tripData = selectedTrip.data;
    const startTime = new Date(tripData[0].createdAt).toLocaleString();
    const endTime = new Date(
      tripData[tripData.length - 1].createdAt
    ).toLocaleString();
    const startLocation = selectedTrip.startAddress.full_address;
    const endLocation = selectedTrip.endAddress.full_address;
    const totalDistance = distance
      ? (distance / 1000).toFixed(2)
      : "Calculating...";
    // Calculate max and min voltage from trip data
    const voltageData = tripData.map((item) => item.voltage);
    const maxVoltage = Math.max(...voltageData);
    const minVoltage = Math.min(...voltageData);
    // Calculate travel time
    const travelTimeInMilliseconds = new Date(endTime) - new Date(startTime);
    const travelTime = {
      hours: Math.floor(travelTimeInMilliseconds / (1000 * 60 * 60)),
      minutes: Math.floor((travelTimeInMilliseconds / (1000 * 60)) % 60),
    };
    // Calculate average speed
    const averageSpeed =
      totalDistance / (travelTime.hours + travelTime.minutes / 60);

    // Create a new jsPDF instance
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1100, 800], // Adjust the width and height as needed
    });

    // Render the table content
    const tableContent = `
      <table style="width: 100%; border-collapse: collapse; border: 1px solid black; margin: 0 auto;">
        <thead>
          <tr>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">Date & Time (Start)</th>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">Date & Time (End)</th>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">Start Point Location</th>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">End Point Location</th>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">Total Distance Travel</th>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">Max Voltage</th>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">Min Voltage</th>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">Travel Time</th>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">Average Speed</th>
            <th style="border: 1px solid black; padding: 8px; text-align: center;">Selected Parameter</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${startTime}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${endTime}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${startLocation}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${endLocation}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${totalDistance} km</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${maxVoltage}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${minVoltage}</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${
              travelTime.hours
            } hours ${travelTime.minutes} minutes</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">${averageSpeed.toFixed(
              2
            )} km/h</td>
            <td style="border: 1px solid black; padding: 8px; text-align: center;">TBD</td>
          </tr>
        </tbody>
      </table>
    `;

    // Add the table content to the PDF
    pdf.html(tableContent, {
      callback: () => {
        // Save the PDF file with a specific name
        pdf.save("trip_details_report.pdf");
      },
    });
  };

  const handleClickDownloadPDF = () => {
    generatePDFReport();
  };

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showLast_info, setLastInfo] = useState(false);
  const [distance, setDistance] = useState(null);
  const [aniActive, setAniActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [speed, setSpeed] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [multiTrip, setMultiTrip] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [EndAddress, setEndAddress] = useState();
  const [startAddress, setStartAddress] = useState();
  const [acresM1, setAcresM1] = useState();
  const [acres_boolean, setAcresBoolean] = useState(false);

  const [vertices, setVertices] = useState([]);
  const [map, setMap] = useState(null);
  const [acresM2, setAcresM2] = useState();
  const [acres_booleanM2, setAcresBooleanM2] = useState(false);
  const [polygonInstance, setPolygonInstance] = useState(null);

  const handleMapClick = (event) => {
    if (vertices.length <= 2) {
      const newVertices = [...vertices, event.latLng.toJSON()];
      console.log(newVertices, "newVertices...");
      setVertices(newVertices);
     
    }
  };

  const handlePolygonClick = (polygon) => {
    const areaInAcres = calculatePolygonArea(vertices);
    setAcresM2(areaInAcres);
    setAcresBooleanM2(true);
    console.log("Area of polygon:", areaInAcres, "acres");
  };

  const calculatePolygonArea = (vertices) => {
    // Convert vertices from lat/lng to meters
    const metersPerLatLng = 111319.9; // Approximately, at equator
    const metersVertices = vertices.map(({ lat, lng }) => ({
      x: lng * metersPerLatLng * Math.cos((lat * Math.PI) / 180),
      y: lat * metersPerLatLng,
    }));

    // Calculate the area using the Shoelace formula
    let area = 0;
    for (let i = 0; i < metersVertices.length; i++) {
      const j = (i + 1) % metersVertices.length;
      area +=
        (metersVertices[j].x + metersVertices[i].x) *
        (metersVertices[j].y - metersVertices[i].y);
    }
    area = Math.abs(area) / 2; // Absolute value and divide by 2

    // Convert square meters to acres
    const squareMetersInAcre = 4046.86;
    const areaInAcres = area / squareMetersInAcre;
    return areaInAcres;
  };

  const onLoad = (map) => {
    // console.log(map)
    setMap(map);
  };

  const onPolygonComplete = (polygon) => {
    const path = polygon.getPath();
    const newVertices = path.getArray().map((latLng) => latLng.toJSON());
    setVertices(newVertices);
    setPolygonInstance(polygon); // Save reference to the polygon instance
    handlePolygonClick(); // Recalculate area when the polygon is completed
  };

  const onPolygonUpdate = () => {
    if (polygonInstance) {
      const path = polygonInstance.getPath();
      const newVertices = path.getArray().map((latLng) => latLng.toJSON());
      setVertices(newVertices);
      handlePolygonClick(); // Recalculate area when the polygon is updated
    }
  };

  useEffect(() => {
    console.log(vertices, "vertices...livecontent");
  }, [vertices]);

  useEffect(() => {
    console.log(acresM1, "acresM1...livecontent");
  }, [acresM1]);
  useEffect(() => {
    if (selectCheckParam && selectCheckParam.length > 0) {
      setCenter({
        lat: parseFloat(selectCheckParam[0]?.data[0]?.lat),
        lng: parseFloat(selectCheckParam[0]?.data[0]?.lng),
      });
      setMultiTrip(selectCheckParam);
      // console.log(selectCheckParam, "selected")
    }
  }, [selectCheckParam]);

  // useEffect(() => {
  //   console.log(graphData[0]?.data?.length, "graphData....");
  // }, [graphData]);
  const getColor = () => {
    // Generate random intensity values for red, green, and blue components
    const red = Math.floor(Math.random() * 128); // 0-127
    const green = Math.floor(Math.random() * 128); // 0-127
    const blue = Math.floor(Math.random() * 128); // 0-127

    // Convert the RGB components to a hexadecimal color code
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);

    return color;
  };

  useEffect(() => {
    if (selectCheckParam && selectCheckParam.length > 0) {
      const speedData = selectCheckParam[0]?.data.map((item) => ({
        Date: item.createdAt.substring(0, 10), // Extracting date part
        Time: item.createdAt.substring(11, 23), // Extracting time part
        value: item.speed,
      }));

      const voltageData = selectCheckParam[0]?.data.map((item) => ({
        Date: item.createdAt.substring(0, 10), // Extracting date part
        Time: item.createdAt.substring(11, 23), // Extracting time part
        value: item.mainInputVoltage,
      }));
      const ignition = selectCheckParam[0]?.data.map((item) => ({
        Date: item.createdAt.substring(0, 10), // Extracting date part
        Time: item.createdAt.substring(11, 23), // Extracting time part
        value: item.ignition,
      }));

      // console.log(speedData, "speedData.."); // Logging speedData for debugging
      // console.log(voltageData, "voltageData.."); // Logging voltageData for debugging
      // console.log(ignition, "ignition.."); // Logging voltageData for debugging

      // Update the state with the new data

      setGraphData([
        { data: [...speedData], label: "Speed", randomColor: getColor() },
        {
          data: [...voltageData],
          label: "MainInputVoltage",
          randomColor: getColor(),
        },
        { data: [...ignition], label: "Ignition", randomColor: getColor() },
      ]);
    } else {
      // Handle the case when selectCheckParam is empty
      // Reset the graph data if necessary
      setGraphData([]);
    }

    // console.log(selectCheckParam, "selectCheckParam...");
    setAniActive(false);
    setShowGraph(false);
    setAcresBoolean(false);
    setVertices([]);
    setAcresM2(0);
    setAcresBooleanM2(false);
  }, [selectCheckParam]);

  // console.log(selectedTrip, "SSelected Trip...........");

  useEffect(() => {
    const calculateSpeed = () => {
      // Calculate speed based on the last data point of the selected trip
      if (selectedTrip && selectedTrip.data && selectedTrip.data.length > 0) {
        const lastDataPoint = selectedTrip.data[selectedTrip.data.length - 1];
        setSpeed(lastDataPoint.speed);
      }
    };

    calculateSpeed(); // Initial calculation

    const interval = setInterval(calculateSpeed, 5000); // Update speed every 5 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [selectedTrip]);

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip); // Set selected trip
    setMultiTrip((prevState) => [...prevState, trip]); // Add trip to multiTrip array
  };
  // console.log(multiTrip, "multitripp....................");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAniActive(false);
  };

  // const markerIcon = {
  //   url: `http://maps.google.com/mapfiles/ms/icons/green.png`, // You can replace 'blue' with the desired color
  //   scaledSize: new window.google.maps.Size(30, 30), // Adjust the size of the marker icon as needed
  // };
  // const markerIcon2 = {
  //   url: `http://maps.google.com/mapfiles/ms/icons/yellow.png`, // You can replace 'blue' with the desired color
  //   scaledSize: new window.google.maps.Size(30, 30), // Adjust the size of the marker icon as needed
  // };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const toggleInfoWindow = (markerId) => {
    // console.log(markerId, "markerId...");
    // console.log(selectedMarker, "selectedMarker...");
    if (selectedMarker === markerId) {
      setSelectedMarker(null);
    } else {
      setSelectedMarker(markerId);
    }
  };
  const showLastInfo = () => {
    setLastInfo(!showLast_info);
  };
  const getStartAddress = async (lat, lng) => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_API3_URL}/ccServer/location/getAddressFromCoordinates?lat=${lat}&lng=${lng}`
      );
      // console.log(result.data?.data, "result.data?.data..");
      setStartAddress(result.data?.data);
      return result.data?.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  const getEndAddress = async (lat, lng) => {
    try {
      const result = await axios(
        `${process.env.REACT_APP_API3_URL}/ccServer/location/getAddressFromCoordinates?lat=${lat}&lng=${lng}`
      );
      setEndAddress(result.data?.data);
      return result.data?.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  return isLoaded ? (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {selectCheckParam.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "row",
            padding: "10px",
            alignItems: "center",
          }}
        >
          {/* <Button
          variant="contained"
          onClick={handleClickDownloadPDF}
          style={{ marginRight: "10px" }}
        >
          Download PDF
        </Button> */}
          <Box
            sx={{
              backdropFilter: "blur(8px)",
              background: Theme.light_color,
              padding: "10px",
              borderRadius: "8px",
              marginRight: "10px",
              color: "white",
            }}
          >
            <MovingIcon />
            {"  "}
            <b>
              Total Distance:{" "}
              {distance
                ? `${(distance / 1000).toFixed(2)} km`
                : "Calculating..."}
            </b>
          </Box>
          <Box
            sx={{
              backdropFilter: "blur(8px)",
              background: Theme.light_color,
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            <SpeedIcon />
            <b className="ms-3">
              Speed: {speed !== null ? `${speed} km/h` : "Loading..."}
            </b>
          </Box>
          <Box
            sx={{
              backdropFilter: "blur(8px)",
              background: Theme.light_color,
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            <SettingsPowerIcon />
            <b className="ms-3">
              Ignition:{" "}
              {selectCheckParam &&
              selectCheckParam[0].data.length > 0 &&
              selectCheckParam[0]?.data[0]?.ignition
                ? "On"
                : "Off"}
            </b>
          </Box>

          <Box
            sx={{
              backdropFilter: "blur(8px)",
              background: Theme.light_color,
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            <BoltSharpIcon />
            <b className="ms-3">
              Battery Voltage:
              {selectCheckParam &&
                selectCheckParam[0].data.length > 0 &&
                selectCheckParam[0]?.data[0]?.mainInputVoltage}
            </b>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              onClick={() => {
                setAcresBoolean(!acres_boolean);
              }}
              style={{
                backdropFilter: "blur(8px)",
                background: "#800e0e",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                marginRight: "10px",
              }}
            >
              M1 Calculate Area
            </Button>

            {acres_boolean && (
              <Typography
                style={{
                  backdropFilter: "blur(8px)",
                  background: Theme.light_color,
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  // marginRight: "10px",
                  position: "absolute",
                  marginTop: "40px",
                }}
              >
                Result M1: {acresM1.toFixed(3)} acres
              </Typography>
            )}
          </Box>

          <Button
            disabled={vertices && vertices.length > 0 ? false : true}
            onClick={() => {
              setVertices([]);
              setAcresM2(0);
            }}
            style={{
              backdropFilter: "blur(8px)",
              background: "#800e0e",
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          >
            Clear Shape
          </Button>

          {vertices?.length > 0 && (
            <Box>
              <Button
                disabled={vertices && vertices.length > 0 ? false : true}
                onClick={() => {
                  handlePolygonClick();
                }}
                style={{
                  backdropFilter: "blur(8px)",
                  background: "#800e0e",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              >
                M2 Calculate Area
              </Button>
              {acres_booleanM2 && (
                <Typography
                  style={{
                    backdropFilter: "blur(8px)",
                    background: Theme.light_color,
                    color: "white",
                    padding: "20px",
                    borderRadius: "8px",
                    // marginRight: "10px",
                    position: "absolute",
                    // marginTop:"40px"
                  }}
                >
                  Result M2: {acresM2.toFixed(3)} acres
                </Typography>
              )}
            </Box>
          )}

          <Button
            aria-describedby={id}
            style={{
              background: "#800e0e",
              color: "white",
              fontSize: "12px",
              width: "115px",
            }}
            onClick={handleClick}
          >
            Playback
            {!aniActive ? (
              <div onClick={() => setAniActive(true)} className="ps-1 pb-1">
                <PlayCircleIcon sx={{ fontSize: "25px", cursor: "pointer" }} />
              </div>
            ) : (
              <div onClick={() => setAniActive(false)} className="ps-1 pb-1">
                <PauseCircleIcon sx={{ fontSize: "25px", cursor: "pointer" }} />
              </div>
            )}
          </Button>

          <Button
            style={{
              background: "#800e0e",
              color: "white",
              marginLeft: "8px",
            }}
            onClick={() => {
              setShowGraph(!showGraph);
            }}
          >
            {!showGraph ? "Show Graph" : "Hide Graph"}
          </Button>
        </Box>
      )}
      {selectCheckParam && selectCheckParam.length > 0 ? (
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            height: "100vh",
          }}
        >
          <GoogleMap
            mapContainerStyle={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            zoom={15}
            center={center}
            clickableIcons={false}
            options={{
              clickableIcons: true,
              disableDefaultUI: true,
              zoomControl: true,
              mapTypeControl: true,
              scaleControl: true,
              minZoom: 10,
              maxZoom: 30,
              styles: [
                {
                  featureType: "road",
                  // stylers: [{ visibility: "off" }],
                  elementType: "geometry.stroke",
                  stylers: [{ color: "#2A324A" }],
                },
                {
                  featureType: "poi",
                  stylers: [{ visibility: "on" }],
                },
                {
                  featureType: "transit",
                  stylers: [{ visibility: "off" }],
                },
                {
                  featureType: "water",
                  stylers: [{ visibility: "off" }],
                },
              ],
            }}
            // onClick={(event) => console.log(event.latLng.toJSON())} // Handle click event to capture vertices
            onClick={handleMapClick}
            onLoad={onLoad}
          >
          {
            selectCheckParam.length>0 &&
            <Polygon
            paths={selectCheckParam[0].data}
            options={{
              strokeColor: 'red',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
              editable: false, // Allow editing vertices
            }}
            onLoad={(polygon) => {
              console.log('polygon loaded', polygon)
            }}
            onEdit={(polygon) => calculateArea(polygon)}
          />
          }
            {map && (
              <Polygon
                path={vertices}
                onDragEnd={onPolygonUpdate} // Recalculate area when polygon is dragged
                onMouseUp={onPolygonUpdate} // Recalculate area when polygon is edited
                options={{
                  fillColor: "#800e0e",
                  fillOpacity: 0.35,
                  strokeColor: "#000",
                  strokeOpacity: 1,
                  strokeWeight:2,
                  draggable: true,
                  editable: true,
                  zIndex: 1,
                  scale:5
                }}
                onLoad={(polygon) => {
                  map.polygon = polygon; // Save reference to the polygon
                  onPolygonComplete(polygon);
                }}
              />
            )}
            {selectCheckParam.map((item, index) => (
              <>
                <Marker
                  key={index}
                  onClick={() => {
                    toggleInfoWindow(index);
                    getStartAddress(item?.data[0]?.lat, item?.data[0]?.lng);
                  }}
                  position={{
                    lat: parseFloat(item?.data[0]?.lat),
                    lng: parseFloat(item?.data[0]?.lng),
                  }}
                  animation="BOUNCE"
                  icon={{
                    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                  }}
                />

                <MapLine
                  aniActive={aniActive}
                  item={item}
                  distance={distance}
                  setDistance={setDistance}
                  setSpeed={setSpeed}
                  setAniActive={setAniActive}
                  setAcresM1={setAcresM1}
                  acres_boolean={acres_boolean}
                />

                {harshBreak &&
                  item?.data.map((innerItem, innerIndex) =>
                    innerItem.packetType === filters.harshBreak ? (
                      <Marker
                        key={innerIndex}
                        title={innerItem.packetType}
                        position={{
                          lat: parseFloat(innerItem.lat),
                          lng: parseFloat(innerItem.lng),
                        }}
                        icon={{
                          path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
                          fillColor: "red",
                          fillOpacity: 2,
                          strokeWeight: 1,
                          scale: 0.5,
                        }}
                      />
                    ) : null
                  )}

                {acceleration &&
                  item?.data.map((innerItem, innerIndex) => {
                    return innerItem.packetType ===
                      filters.harshAcceleration ? (
                      <Marker
                        key={innerIndex}
                        title={innerItem.packetType}
                        position={{
                          lat: parseFloat(innerItem.lat),
                          lng: parseFloat(innerItem.lng),
                        }}
                        icon={{
                          path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
                          fillColor: "yellow",
                          fillOpacity: 2,
                          strokeWeight: 1,
                          scale: 0.5,
                          scale: 0.5,
                        }}
                      />
                    ) : null;
                  })}

                {speed &&
                  item?.data.map((innerItem, innerIndex) => {
                    const threshold = 60; // Define your speed threshold here or retrieve it from your data
                    return innerItem.packetType === filters.overSpeed ? (
                      <Marker
                        key={innerIndex}
                        title={innerItem.packetType}
                        position={{
                          lat: parseFloat(innerItem.lat),
                          lng: parseFloat(innerItem.lng),
                        }}
                        icon={{
                          path: "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
                          fillColor:
                            innerItem.speed > threshold ? "red" : "black",
                          fillOpacity: 2,
                          strokeWeight: 1,
                          scale: 0.5,
                        }}
                      />
                    ) : null;
                  })}

                <Marker
                  key={index}
                  onClick={() => {
                    showLastInfo();
                    getEndAddress(
                      item?.data[item?.data.length - 1]?.lat,
                      item?.data[item?.data.length - 1]?.lng
                    );
                  }}
                  position={{
                    lat: parseFloat(item?.data[item?.data.length - 1]?.lat),
                    lng: parseFloat(item?.data[item?.data.length - 1]?.lng),
                  }}
                  animation="BOUNCE"
                />

                {selectedMarker === index && (
                  <InfoWindow
                    key={index}
                    position={{
                      lat: parseFloat(item?.data[0]?.lat),
                      lng: parseFloat(item?.data[0]?.lng),
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                    options={{ maxWidth: 300 }}
                    visible={selectedMarker === index}
                  >
                    <div>
                      <div>
                        {/* <AccessTimeSharpIcon /> */}
                        <b style={{ fontSize: 15, fontWeight: 600 }}>
                          Start Date&Time:{" "}
                        </b>{" "}
                        {item?.data[0]?.createdAt && new Date(item.data[0].createdAt).toLocaleString('en-IN')}
                      </div>

                      <div>
                        <b style={{ fontSize: 15, fontWeight: 600 }}>
                          Start Address:{" "}
                        </b>
                        {startAddress?.full_address}
                      </div>
                    </div>
                  </InfoWindow>
                )}
                {showLast_info && (
                  <InfoWindow
                    key={index}
                    position={{
                      lat: parseFloat(item?.data[item?.data?.length - 1]?.lat),
                      lng: parseFloat(item?.data[item?.data?.length - 1]?.lng),
                    }}
                    onCloseClick={() => showLastInfo()} // Call showLastInfo function here
                    options={{ maxWidth: 300 }}
                    // visible={selectedMarker === index}
                  >
                    <div>
                      <div>
                        <b style={{ fontSize: 15, fontWeight: 600 }}>
                          End Date&Time:{" "}
                        </b>{" "}
                        {
                        // new Date(
                        //   item?.data[item?.data.length - 1]?.createdAt.slice(
                        //     0,
                        //     16
                        //   )
                        // ).toLocaleString()
                        item?.data[item?.data.length - 1]?.createdAt && new Date(item?.data[item?.data.length - 1]?.createdAt).toLocaleString('en-IN')
                        }
                      </div>
                      <div>
                        <b style={{ fontSize: 15, fontWeight: 600 }}>
                          End Address:{" "}
                        </b>
                        {EndAddress?.full_address}
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </>
            ))}
          </GoogleMap>
          <div style={{ position: "absolute", bottom: 80, left: 15 }}>
            {/* {selectedTrip && selectedTrip.data && (
              <ApexChart
                speedData={selectedTrip.data.map((item) => item.speed)} // Pass speed data of the selected trip
                ignitionData={selectedTrip.data.map((item) => item.ignition)} // Pass ignition data of the selected trip
              />
            )} */}
            {graphData[0]?.data?.length > 0 && showGraph && (
              <MultiChart item={graphData} />
            )}
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            display: "center",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            opacity: "0.70",
          }}
        >
          <div style={{ marginTop: "200px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "400px",
              }}
            >
              <div class="map1">
                <div class="car1"></div>
              </div>
            </Box>
          </div>
        </Box>
      )}
    </Box>
  ) : (
    <></>
  );
};

export default LiveContent;
