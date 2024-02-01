import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { CarOutlined } from '@ant-design/icons';
import { CarOutlined } from "@ant-design/icons";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import MarkerItem1 from "../MapItems/MarkerItem1";
import moment from "moment";
import MapLine from "./MapLine";
import {
  Box,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  Modal,
  Popover,
} from "@mui/material";
import Typography from "antd/es/typography/Typography";
import Button from "@mui/material/Button";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import tripHistoryImage from "./trip-history.png";

const { GMAP_API_KEY, ThemeColor } = require("../../../utils/constants");

const filters = {
  harshBreak: "HB",
  harshAcceleration: "HA",
  overSpeed: "OS",
};

const style = {
  position: "absolute",
  top: "10%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const containerStyle = {
  width: "100%",
  height: "100%",
};
function LiveContent({ harshBreak, acceleration, speed, selectCheckParam }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GMAP_API_KEY,
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [distance, setDistance] = useState(null);
  const [aniActive, setAniActive] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    console.log(markerId);
    if (selectedMarker === markerId) {
      // If the same marker is clicked again, close its InfoWindow
      setSelectedMarker(null);
    } else {
      // Otherwise, open the InfoWindow for the clicked marker
      setSelectedMarker(markerId);
    }
  };

  useEffect(() => {
    console.log(harshBreak);
  }, [harshBreak]);

  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const iconStyle = {
    fontSize: "36px", // Adjust the font size as needed to increase the icon size
  };
  useEffect(() => {
    if (selectCheckParam.length > 0) {
      setCenter({
        lat: parseFloat(selectCheckParam[0]?.data[0]?.lat),
        lng: parseFloat(selectCheckParam[0]?.data[0]?.lng),
      });
    }
  }, [selectCheckParam]);

  const startblinking = (data) => {
    let today = moment();
    let createdAt = moment(data?.createdAt);
    const def = today.diff(createdAt, "minutes");
    console.log(def);
    return true;
  };

  return isLoaded ? (
    <Box sx={{ position: "relative", display: "flex", flexDirection: "row" }}>
      {/* Move the box to the top-right corner with horizontal alignment */}
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          display: "flex",
          flexDirection: "row", // Change the flexDirection to "row"
          padding: "10px",
          alignItems: "center", // Align items in the center vertically
        }}
      >
        <Box
          sx={{
            backdropFilter: "blur(8px)", // Add a blurred background
            background: "rgba(255, 255, 255, 0.6)", // Add a semi-transparent white background
            padding: "10px",
            borderRadius: "8px", // Add border radius for rounded corners
            marginRight: "10px",
          }}
        >
          <b>
            {" "}
            Total Distance:-
            {distance
              ? `${(distance / 1000).toFixed(2)} km`
              : "Calculating..."}{" "}
          </b>
        </Box>
        <Box
          sx={{
            backdropFilter: "blur(8px)", // Add a blurred background
            background: "rgba(255, 255, 255, 0.6)", // Add a semi-transparent white background
            padding: "10px",
            borderRadius: "8px", // Add border radius for rounded corners
            marginRight: "10px",
          }}
        >
          <b className="ms-3">Speed:</b>
        </Box>
        <Box
          sx={{
            backdropFilter: "blur(8px)", // Add a blurred background
            background: "rgba(255, 255, 255, 0.6)", // Add a semi-transparent white background
            padding: "10px",
            borderRadius: "8px", // Add border radius for rounded corners
            marginRight: "10px",
          }}
        >
          <b className="ms-3">Ignition Status:</b>
        </Box>
        <Box
          sx={{
            backdropFilter: "blur(8px)", // Add a blurred background
            background: "rgba(255, 255, 255, 0.6)", // Add a semi-transparent white background
            padding: "10px",
            borderRadius: "8px", // Add border radius for rounded corners
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
            fontSize: "12px", // Decrease the size of the button
            width: "80px", // Decrease the width of the button
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

      {selectCheckParam.length > 0 ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
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
          {selectCheckParam.length > 0 &&
            selectCheckParam.map((item, index) => {
              return (
                <>
                  <Marker
                    key={index}
                    // label={user.name}
                    onClick={() => toggleInfoWindow(index)}
                    position={{
                      lat: parseFloat(item?.data[0]?.lat),
                      lng: parseFloat(item?.data[0]?.lng),
                    }}
                    animation="BOUNCE"
                    // icon={
                    //   {
                    //   path: startblinking() && "M29.395,0H17.636c-3.117,0-5.643,3.467-5.643,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759   c3.116,0,5.644-2.527,5.644-5.644V6.584C35.037,3.467,32.511,0,29.395,0z M34.05,14.188v11.665l-2.729,0.351v-4.806L34.05,14.188z    M32.618,10.773c-1.016,3.9-2.219,8.51-2.219,8.51H16.631l-2.222-8.51C14.41,10.773,23.293,7.755,32.618,10.773z M15.741,21.713   v4.492l-2.73-0.349V14.502L15.741,21.713z M13.011,37.938V27.579l2.73,0.343v8.196L13.011,37.938z M14.568,40.882l2.218-3.336   h13.771l2.219,3.336H14.568z M31.321,35.805v-7.872l2.729-0.355v10.048L31.321,35.805",
                    //     fillOpacity: 2,
                    //     strokeWeight: 1,
                    //     scale: 1,
                    //   }
                    // }
                  />

                  <MapLine
                    aniActive={aniActive}
                    item={item}
                    distance={distance}
                    setDistance={setDistance}
                  />
                  {harshBreak &&
                    item?.data.map((innerItem, innerIndex) => {
                      return innerItem.packetType === filters.harshBreak ? (
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
                      ) : (
                        <></>
                      );
                    })}

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
                          }}
                        />
                      ) : (
                        <></>
                      );
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
                      ) : (
                        <></>
                      );
                    })}

                  <Marker
                    key={index}
                    // label={user.name}
                    // onClick={() => toggleInfoWindow(item?.data?._id)}
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
              );
            })}
        </GoogleMap>
      ) : (
        <Box
          sx={{
            backgroundImage: `url(${tripHistoryImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            display: "center",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Card sx={{ padding: "20px", fontSize: "20px", fontWeight: "600" }}>
            Choose Date Range From Right Panel
          </Card>
        </Box>
      )}
    </Box>
  ) : (
    <></>
  );
}

export default LiveContent;
