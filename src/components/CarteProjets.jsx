// components/CarteProjets.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix icons Leaflet avec React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function CarteProjets({ projets }) {
  return (
    <div className="max-w-6xl mx-auto h-[70vh] rounded-lg overflow-hidden shadow-lg border my-8 ">

      <MapContainer
        center={[33.5747295, -7.5524299]} // Casablanca par défaut
        zoom={10}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projets.map((projet) => (
          <Marker key={projet.id} position={[projet.lat, projet.lng]}>
            <Popup>
              <div className="space-y-1">
                <h3 className="text-lg font-bold">{projet.name}</h3>
                <p className="text-sm">{projet.description}</p>
                <a
                  href={projet.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  Visiter le site
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
