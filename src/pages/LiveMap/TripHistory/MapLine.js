import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Circle,
  Marker,
  InfoWindow,
  Polyline,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
// import { CarOutlined } from '@ant-design/icons';
import { CarOutlined } from "@ant-design/icons";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import moment from "moment";
import MarkerItem2 from "../MapItems/MarkerItem2";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function MapLine({ aniActive, item, distance, setDistance }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [path, setPath] = useState([]);
  const [pathIndex, setPathIndex] = useState(0);
  const [speedAtPoint, setSpeedAtPoint] = useState(null);

  //   const toggleInfoWindow = (markerId) => {
  //     console.log(markerId)
  //     if (selectedMarker === markerId) {
  //       // If the same marker is clicked again, close its InfoWindow
  //       setSelectedMarker(null);
  //     } else {
  //       // Otherwise, open the InfoWindow for the clicked marker
  //       setSelectedMarker(markerId);
  //     }
  //   };

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    let a = item.length;
    console.log(a);
    console.log(item?.data[a - 2]);
    const origin = {
      lat: parseFloat(item?.data[0]?.lat),
      lng: parseFloat(item?.data[0]?.lng),
    }; // Replace with your start coordinates
    const destination = {
      lat: parseFloat(item?.data[item?.data.length - 1]?.lat),
      lng: parseFloat(item?.data[item?.data.length - 1]?.lng),
    };
    console.log(origin, destination);
    directionsService.route(
      {
        origin,
        destination,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);

          const routePath = result.routes[0].overview_path;
          setPath(routePath);

          if (result.routes && result.routes.length > 0) {
            const route = result.routes[0];
            const currentLegIndex = pathIndex - 1;

            if (
              currentLegIndex >= 0 &&
              route.legs &&
              route.legs.length > currentLegIndex
            ) {
              const previousLeg = route.legs[currentLegIndex];
              const time = previousLeg.duration.value; // in seconds
              const speed = (previousLeg.distance.value / time) * 3.6; // speed in km/h
              setSpeedAtPoint(speed.toFixed(2));
            }
          }

          const distanceInMeters = result.routes[0].legs[0].distance.value;
          setDistance(distanceInMeters);
        } else {
          console.error(`Directions request failed: ${status}`);
        }
      }
    );
  }, [item, pathIndex]);

  useEffect(() => {
    if (aniActive) {
      const interval = setInterval(() => {
        if (pathIndex < path.length) {
          setPathIndex(pathIndex + 1);
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust the interval to control the drawing speed (e.g., 100ms for slower motion)
      return () => clearInterval(interval);
    }
  }, [path, pathIndex, aniActive]);
  // console.log(directions,"dirrr****************")

  return (
    <div>
      {directions && (
        <>
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
          <Polyline
            path={path.slice(0, pathIndex)}
            options={{
              strokeColor: "red", // Color of the line
              strokeOpacity: 1, // Opacity of the line
              strokeWeight: 4, // Thickness of the line
            }}
          />
        </>
      )}

      {selectedMarker === item?.latestDocument?._id && (
        <InfoWindow
          key={item.id}
          position={{
            lat: parseFloat(item?.latestDocument?.lat),

            lng: parseFloat(item?.latestDocument?.lng),
          }}
          onCloseClick={() => setSelectedMarker(null)}
          options={{ maxWidth: 200 }}
          visible={selectedMarker === item.id}
        >
          <MarkerItem2 item={item} />
        </InfoWindow>
      )}
      {selectedMarker === item?.latestDocument?._id && (
        <InfoWindow
          key={item.id}
          position={{
            lat: parseFloat(item?.latestDocument?.lat),
            lng: parseFloat(item?.latestDocument?.lng),
          }}
          onCloseClick={() => setSelectedMarker(null)}
          options={{ maxWidth: 200 }}
          visible={selectedMarker === item.id}
        >
          <div>
            <MarkerItem2 item={item} />
            {speedAtPoint && <p>Speed: {speedAtPoint} km/h</p>}
          </div>
        </InfoWindow>
      )}
    </div>
  );
}
