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
  const [speedAtPoint, setSpeedAtPoint] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0); // State variable to store total distance

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

            for (let i = 0; i < route.legs.length; i++) {
              const leg = route.legs[i];
              const steps = leg.steps;

              for (let j = 0; j < steps.length; j++) {
                const step = steps[j];
                const duration = step.duration.value; // in seconds
                const distance = step.distance.value; // in meters
                const speed = (distance / duration) * 3.6; // speed in km/h

                for (let k = 0; k < step.path.length; k++) {
                  speedPoints.push(speed.toFixed(1));
                }
              }
            }

            setSpeedAtPoint(speedPoints); // Set speed points for all points
            setSpeed(speedPoints[0]); // Set initial speed

            // Calculate total distance
            const totalDistance = result.routes[0].legs.reduce(
              (acc, curr) => acc + curr.distance.value,
              0
            );

            setTotalDistance(totalDistance); // Set total distance
            setDistance(totalDistance); // Set distance in the parent component
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
        if (pathIndex < path.length - 1) {
          setPathIndex((prevIndex) => prevIndex + 1);
          setSpeed(speedAtPoint[pathIndex + 1]); // Update speed based on the pathIndex
        } else {
          clearInterval(interval);
        }
      }, 100); // Adjust the interval to control the drawing speed (e.g., 100ms for slower motion)
      return () => clearInterval(interval);
    }
  }, [pathIndex, path, aniActive, speedAtPoint]);

  return (
    <div>
      {directions && (
        <>
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
          <Polyline
            path={path.slice(0, pathIndex + 1)}
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
            <p>Total Distance: {totalDistance} meters</p>{" "}
            {/* Display total distance */}
          </div>
        </InfoWindow>
      )}
    </div>
  );
}
