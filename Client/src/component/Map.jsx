import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DefaultIcon } from "../utils/leafletIcon";
import { useEffect, useState } from "react";

// Set the default icon globally
L.Marker.prototype.options.icon = DefaultIcon;

const RecenterMap = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView(location);
    }
  }, [location, map]);

  return null;
};

const Map = () => {
  const [userLocation, setUserLocation] = useState([28.6139, 77.2090]); // Default to Delhi
  const [routeCoords, setRouteCoords] = useState([]); // for OSRM route

  const positionA = [28.6139, 77.2090]; // Delhi
  const positionB = [28.7041, 77.1025]; // Gurgaon

  // Fetch actual route from OSRM
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${positionA[1]},${positionA[0]};${positionB[1]},${positionB[0]}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const coordinates = data.routes[0].geometry.coordinates.map(coord => [
            coord[1], // lat
            coord[0], // lng
          ]);
          setRouteCoords(coordinates);
        }
      } catch (error) {
        console.error("Failed to fetch route from OSRM:", error);
      }
    };

    fetchRoute();
  }, []);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={userLocation}
        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <RecenterMap location={userLocation} />

        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Show Route */}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" weight={5} />
        )}

        {/* User Marker */}
        <Marker position={userLocation}>
          <Popup>
            {userLocation ? "You're here" : "Default location (Delhi)"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
