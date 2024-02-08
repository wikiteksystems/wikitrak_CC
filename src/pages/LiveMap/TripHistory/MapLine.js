import React, { useState, useEffect } from "react";
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
import MarkerItem2 from "../MapItems/MarkerItem2";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function MapLine({
  aniActive,
  item,
  distance,
  setDistance,
  setSpeed, // Include setSpeed as a prop
}) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [path, setPath] = useState([]);
  const [pathIndex, setPathIndex] = useState(0);
  const [speedAtPoint, setSpeedAtPoint] = useState(null);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    const origin = {
      lat: parseFloat(item?.data[0]?.lat),
      lng: parseFloat(item?.data[0]?.lng),
    };
    const destination = {
      lat: parseFloat(item?.data[item?.data.length - 1]?.lat),
      lng: parseFloat(item?.data[item?.data.length - 1]?.lng),
    };

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
            let speedPoints = []; // Store speeds for all points

            route.legs.forEach((leg) => {
              leg.steps.forEach((step) => {
                const stepDuration = step.duration.value; // in seconds
                const stepDistance = step.distance.value; // in meters
                const stepSpeed = (stepDistance / stepDuration) * 3.6; // speed in km/h
                const stepPath = step.path;

                stepPath.forEach((point) => {
                  speedPoints.push(stepSpeed.toFixed(1)); // Limit to one decimal place
                });
              });
            });

            setSpeedAtPoint(speedPoints); // Set speed points for all points
          } else {
            console.error(`Directions request failed: ${status}`);
          }
        }
      }
    );
  }, [item]);

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

  useEffect(() => {
    if (speedAtPoint) {
      const currentIndex = Math.min(pathIndex, speedAtPoint.length - 1);
      setSpeed(speedAtPoint[currentIndex]);
    }
  }, [speedAtPoint, pathIndex]);

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
          <div>
            <MarkerItem2 item={item} />
            {speedAtPoint && <p>Speed: {speedAtPoint[pathIndex]} km/h</p>}{" "}
            {/* Select speed for the current point */}
          </div>
        </InfoWindow>
      )}
    </div>
  );
}
