// import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Circle,
//   Marker,
//   InfoWindow,
//   Polyline,
//   DirectionsService,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
// import MarkerItem2 from "../MapItems/MarkerItem2";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// export default function MapLine({
//   aniActive,
//   item,
//   distance,
//   setDistance,
//   setSpeed, // Include setSpeed as a prop
// }) {
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [map, setMap] = useState(null);
//   const [path, setPath] = useState([]);
//   const [pathIndex, setPathIndex] = useState(0);
//   const [speedAtPoint, setSpeedAtPoint] = useState([]);
//   const [totalDistance, setTotalDistance] = useState(0); // State variable to store total distance

//   useEffect(() => {
//     console.log(item,"MapLine Item data...............")
//     const directionsService = new window.google.maps.DirectionsService();
//     const origin = {
//       lat: parseFloat(item?.data[0]?.lat),
//       lng: parseFloat(item?.data[0]?.lng),
//     };
//     const destination = {
//       lat: parseFloat(item?.data[item?.data.length - 1]?.lat),
//       lng: parseFloat(item?.data[item?.data.length - 1]?.lng),
//     };

//     directionsService.route(
//       {
//         origin,
//         destination,
//         travelMode: "DRIVING",
//       },
//       (result, status) => {
//         if (status === "OK") {
//           setDirections(result);

//           const routePath = result.routes[0].overview_path;
//           setPath(routePath);

//           if (result.routes && result.routes.length > 0) {
//             const route = result.routes[0];
//             let speedPoints = []; // Store speeds for all points

//             for (let i = 0; i < route.legs.length; i++) {
//               const leg = route.legs[i];
//               const steps = leg.steps;

//               for (let j = 0; j < steps.length; j++) {
//                 const step = steps[j];
//                 const duration = step.duration.value; // in seconds
//                 const distance = step.distance.value; // in meters
//                 const speed = (distance / duration) * 3.6; // speed in km/h

//                 for (let k = 0; k < step.path.length; k++) {
//                   speedPoints.push(speed.toFixed(1));
//                 }
//               }
//             }

//             setSpeedAtPoint(speedPoints); // Set speed points for all points
//             setSpeed(speedPoints[0]); // Set initial speed

//             // Calculate total distance
//             const totalDistance = result.routes[0].legs.reduce(
//               (acc, curr) => acc + curr.distance.value,
//               0
//             );

//             setTotalDistance(totalDistance); // Set total distance
//             setDistance(totalDistance); // Set distance in the parent component
//           } else {
//             console.error(`Directions request failed: ${status}`);
//           }
//         }
//       }
//     );
//   }, [item]);

//   useEffect(() => {
//     if (aniActive) {
//       const interval = setInterval(() => {
//         if (pathIndex < path.length - 1) {
//           setPathIndex((prevIndex) => prevIndex + 1);
//           setSpeed(speedAtPoint[pathIndex + 1]); // Update speed based on the pathIndex
//         } else {
//           clearInterval(interval);
//         }
//       }, 100); // Adjust the interval to control the drawing speed (e.g., 100ms for slower motion)
//       return () => clearInterval(interval);
//     }
//   }, [pathIndex, path, aniActive, speedAtPoint]);

//   return (
//     <div>
//       {directions && (
//         <>
//           <DirectionsRenderer
//             directions={directions}
//             options={{ suppressMarkers: true }}
//           />
//           <Polyline
//             path={path.slice(0, pathIndex + 1)}
//             options={{
//               strokeColor: "red", // Color of the line
//               strokeOpacity: 1, // Opacity of the line
//               strokeWeight: 4, // Thickness of the line
//             }}
//           />
//         </>
//       )}

//       {selectedMarker === item?.latestDocument?._id && (
//         <InfoWindow
//           key={item.id}
//           position={{
//             lat: parseFloat(item?.latestDocument?.lat),
//             lng: parseFloat(item?.latestDocument?.lng),
//           }}
//           onCloseClick={() => setSelectedMarker(null)}
//           options={{ maxWidth: 200 }}
//           visible={selectedMarker === item.id}
//         >
//           <div>
//             <MarkerItem2 item={item} />
//             <p>Speed: {speedAtPoint[pathIndex]} km/h</p>
//             <p>Total Distance: {totalDistance} meters</p>
//           </div>
//         </InfoWindow>
//       )}
//     </div>
//   );
// }




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
  setAniActive
}) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [path, setPath] = useState([]);
  const [pathIndex, setPathIndex] = useState(0);
  const [speedAtPoint, setSpeedAtPoint] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0); // State variable to store total distance
  const [startToEndPath, setStartToEndPath] = useState([]); // Path from start to end location
  const [startToCurrentPath, setStartToCurrentPath] = useState([]); // Path from start to current location

  useEffect(() => {
    setAniActive(false)
    console.log(item, "MapLine Item data...............");
    const Speed = []

    if (item && item.data && item.data.length > 0) {
        item.data.map((innerItem)=>{
          Speed.push(innerItem.speed).toFixed(2)
        })
        setSpeedAtPoint(Speed)
        setSpeed(item.data[0].speed)
    }
    if (item && item.data && item.data.length > 0) {
      const routePath = item.data.map((point) => ({
        lat: parseFloat(point.lat),
        lng: parseFloat(point.lng),
      }));
      setPath(routePath);

      // Calculate total distance
      const totalDistance = item.data.reduce((acc, curr, index) => {
        if (index === 0) return acc;
        const prevPoint = item.data[index - 1];
        const distance = getDistance(
          prevPoint.lat,
          prevPoint.lng,
          curr.lat,
          curr.lng
        );
        return acc + distance;
      }, 0);

      setTotalDistance(totalDistance); // Set total distance
      setDistance(totalDistance); // Set distance in the parent component

      // Set path from start to end location
      setStartToEndPath(routePath.slice(0));

      // Set initial path from start to current location
      setStartToCurrentPath([routePath[0]]);

    }
  }, [item]);

  useEffect(() => {
    if (aniActive) {
      const pathLength = path.length;
      const animationSpeed = 9000; // milliseconds
      const steps = 10000; // number of steps for animation
      const stepInterval = animationSpeed / steps;
  
      let stepCount = 0;
  
      const interval = setInterval(() => {
        if (stepCount < steps) {
          const fraction = stepCount / steps;
          const index = Math.floor(fraction * pathLength);
          setPathIndex(index);
          setSpeed(speedAtPoint[index]); // Update speed based on the index
  
          // Update path from start to current location
          setStartToCurrentPath(path.slice(0, index + 1));
  
          stepCount++;
        } else {
          clearInterval(interval);
        }
      }, stepInterval);
  
      return () => clearInterval(interval);
    }
  }, [aniActive, path, speedAtPoint]);

  return (
    <div>
      {startToEndPath.length > 0 && (
        <>
          {/* Blue line: Start to current location */}
          <Polyline
            path={startToCurrentPath}
            options={{
              strokeColor: "blue",
              strokeOpacity: 1,
              strokeWeight: 4,
            }}
          />

          {/* Red line: Entire trip */}
          <Polyline
            path={startToEndPath}
            options={{
              strokeColor: "red",
              strokeOpacity: 1,
              strokeWeight: 4,
            }}
          />
        </>
      )}
      {
        aniActive
        &&
        <Polyline
            path={path.slice(0, pathIndex+1)}
            options={{
              strokeColor: "green",
              strokeOpacity: 1,
              strokeWeight: 4,
              zIndex:1000
            }}
          />

      }

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
            <p>Speed: {speedAtPoint[pathIndex]} km/h</p>
            <p>Total Distance: {totalDistance} meters</p>
          </div>
        </InfoWindow>
      )}
    </div>
  );
}

// Function to calculate distance between two points using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 1000; // Convert to meters
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
