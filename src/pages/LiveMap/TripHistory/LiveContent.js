import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Box, Popover, Button } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Line } from "react-chartjs-2";
import MapLine from "./MapLine";
import { GMAP_API_KEY, ThemeColor } from "../../../utils/constants";
import { Chart, LinearScale, CategoryScale } from "chart.js/auto";

const filters = {
  harshBreak: "HB",
  harshAcceleration: "HA",
  overSpeed: "OS",
};

const containerStyle = {
  width: "100%",
  height: "100%",
};

const LiveContent = ({ harshBreak, acceleration, speed, selectCheckParam }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GMAP_API_KEY,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [aniActive, setAniActive] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [speedData, setSpeedData] = useState([]);
  const [ignitionData, setIgnitionData] = useState([]);

  useEffect(() => {
    if (selectCheckParam && selectCheckParam.length > 0) {
      setCenter({
        lat: parseFloat(selectCheckParam[0]?.data[0]?.lat),
        lng: parseFloat(selectCheckParam[0]?.data[0]?.lng),
      });
    }
  }, [selectCheckParam]);

  useEffect(() => {
    if (selectCheckParam && selectCheckParam.length > 0) {
      const speedData = selectCheckParam.map((trip) => trip.speed);
      const ignitionData = selectCheckParam.map((trip) => trip.ignition);
      setSelectedTrip({ speedData, ignitionData });
      setSpeedData(speedData);
      setIgnitionData(ignitionData);
    }
  }, [selectCheckParam]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAniActive(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const toggleInfoWindow = (markerId) => {
    if (selectedMarker === markerId) {
      setSelectedMarker(null);
    } else {
      setSelectedMarker(markerId);
    }
  };

  // Define chart data
  const chartData = {
    labels: speedData.map((_, index) => index),
    datasets: [
      {
        label: "Speed",
        data: speedData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Ignition",
        data: ignitionData.map((value) => (value ? 1 : 0)),
        fill: false,
        borderColor: "rgba(255, 99, 132, 0.6)",
        tension: 0.1,
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    scales: {
      y: {
        type: "linear", // Specify the type of scale
        beginAtZero: true,
      },
      x: {
        type: "category", // Assuming you're using category scale for labels
      },
    },
  };

  return isLoaded ? (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
      }}
    >
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
        <Box
          sx={{
            backdropFilter: "blur(8px)",
            background: "rgba(255, 255, 255, 0.6)",
            padding: "10px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        >
          <b>
            Total Distance:-
            {distance ? `${(distance / 1000).toFixed(2)} km` : "Calculating..."}
          </b>
        </Box>
        <Box
          sx={{
            backdropFilter: "blur(8px)",
            background: "rgba(255, 255, 255, 0.6)",
            padding: "10px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        >
          <b className="ms-3">Speed:</b>
        </Box>
        <Box
          sx={{
            backdropFilter: "blur(8px)",
            background: "rgba(255, 255, 255, 0.6)",
            padding: "10px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        >
          <b className="ms-3">Ignition Status:</b>
        </Box>
        <Box
          sx={{
            backdropFilter: "blur(8px)",
            background: "rgba(255, 255, 255, 0.6)",
            padding: "10px",
            borderRadius: "8px",
            marginRight: "10px",
          }}
        >
          <b className="ms-3">Battery Voltage:</b>
        </Box>

        <Button
          aria-describedby={id}
          style={{
            background: ThemeColor.light_color_2,
            color: "black",
            fontSize: "12px",
            width: "80px",
          }}
          onClick={handleClick}
        >
          Playback
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              background: ThemeColor.light_color_2,
              padding: "5px 30px",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Trip Playback
          </Box>
          <Box
            sx={{ padding: "15px", display: "flex", justifyContent: "center" }}
          >
            {!aniActive ? (
              <div onClick={() => setAniActive(!aniActive)}>
                <PlayCircleIcon sx={{ fontSize: "30px", cursor: "pointer" }} />
              </div>
            ) : (
              <div onClick={() => setAniActive(!aniActive)}>
                <PauseCircleIcon sx={{ fontSize: "30px", cursor: "pointer" }} />
              </div>
            )}
          </Box>
        </Popover>
      </Box>

      {selectCheckParam && selectCheckParam.length > 0 ? (
        <Box
          sx={{
            position: "relative",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "80px", // Adjust this value to move the graph up or down
              left: "20px",
              zIndex: 1000,
              padding: "10px",
              background: "#fff",
              borderRadius: "8px",
            }}
          >
            <Line data={chartData} options={chartOptions} />
          </Box>

          <GoogleMap
            mapContainerStyle={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            zoom={10}
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
                  stylers: [{ visibility: "off" }],
                  elementType: "geometry.stroke",
                  stylers: [{ color: "#2A324A" }],
                },
                {
                  featureType: "poi",
                  stylers: [{ visibility: "off" }],
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
          >
            {selectCheckParam.map((item, index) => (
              <>
                <Marker
                  key={index}
                  onClick={() => toggleInfoWindow(index)}
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
                          fillColor: "black",
                          fillOpacity: 2,
                          strokeWeight: 1,
                          scale: 0.5,
                        }}
                      />
                    ) : null;
                  })}
                <Marker
                  key={index}
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
                    options={{ maxWidth: 200 }}
                    visible={selectedMarker === index}
                  >
                    <div>
                      Distance:{" "}
                      {distance
                        ? `${(distance / 1000).toFixed(2)} km`
                        : "Calculating..."}
                    </div>
                  </InfoWindow>
                )}
              </>
            ))}
          </GoogleMap>
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
