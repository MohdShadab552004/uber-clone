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
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

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
  const [userLocation, setUserLocation] = useState([]); // Default to Delhi
  const [routeCoords, setRouteCoords] = useState([]); // for OSRM route
  const [pickUpLocationCoords, setPickUpLocationCoords] = useState([]);
  const [dropLocationCoords, setDropLocationCoords] = useState([]);

  const { pickUpLocation, dropLocation } = useContext(UserContext);

  const fetchRoute = async (pickUp, drop) => {
    console.log("routes called")

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/${pickUp[1]},${pickUp[0]};${drop[1]},${drop[0]}?overview=full&geometries=geojson`;
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

  const fetchUserLocation = () => {
    console.log("location called")

    try {
      if (!navigator.geolocation) {
        throw error;
      }
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
      console.log("location end")

      return () => navigator.geolocation.clearWatch(watchId);

    } catch (error) {
      console.error(error.message);
    }
  }

  const fetchRideCoords = () => {
  console.log("coords called");

  // Pickup location using OpenCage
  const pickupUrl = `https://api.opencagedata.com/geocode/v1/json?key=ad75125536ec4f1581f743cc143a1bd6&q=${encodeURIComponent(pickUpLocation)}`;
  console.log("Pickup URL:", pickupUrl);

  fetch(pickupUrl)
    .then(res => res.json())
    .then(data => {
      console.log("OpenCage pickup data:", data);
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        console.log("Pickup:", lat, lng);
        setPickUpLocationCoords([lat, lng]);
      } else {
        console.warn("No pickup results found.");
      }
    });

  // Drop location using Nominatim
  const dropUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(dropLocation)}`;
  console.log("Drop URL:", dropUrl);

  fetch(dropUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Nominatim drop data:", data);
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        console.log("Drop:", lat, lon);
        setDropLocationCoords([lat, lon]);
      } else {
        console.warn("No drop results found.");
      }
    });
};


  useEffect(() => {
    console.log("kiya bolta bhai")
    if (pickUpLocation !== "" && dropLocation !== "") {
      fetchRideCoords(); // just set the coordinates
    } else {
      fetchUserLocation(); // fallback to user's current location
    }
  }, []);

  useEffect(() => {
    if (pickUpLocationCoords.length === 2 && dropLocationCoords.length === 2) {
      fetchRoute(pickUpLocationCoords, dropLocationCoords);
    }
  }, [pickUpLocationCoords, dropLocationCoords]);


  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={
          userLocation.length === 2
            ? userLocation
            : pickUpLocationCoords.length === 2
              ? pickUpLocationCoords
              : [28.6139, 77.2090] // fallback: Delhi
        }

        zoom={12}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <RecenterMap location={
           userLocation.length === 2
            ? userLocation
            : pickUpLocationCoords.length === 2
              ? pickUpLocationCoords
              : [28.6139, 77.2090] // fallback: Delhi
        } />

        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Show Route */}
        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" weight={5} />
        )}

        {/* User Marker */}
        <Marker position={
           userLocation.length === 2
            ? userLocation
            : pickUpLocationCoords.length === 2
              ? pickUpLocationCoords
              : [28.6139, 77.2090] // fallback: Delhi
        }>
          <Popup>
            {userLocation ? "You're here" : "Default location (Delhi)"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
