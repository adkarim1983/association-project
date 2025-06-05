import { useParams } from "react-router-dom";
import projects from "../data/projects";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});




export default function PageProjet() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return <div className="text-center py-20 text-red-600">Projet introuvable.</div>;
  }

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-6">{project.name}</h1>

      <img
        src={project.image}
        alt={project.name}
        className="w-full h-64 object-cover rounded-lg shadow mb-8"
      />

      <div className="space-y-6 text-gray-700 leading-relaxed">
        {project.descriptionSections?.map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">{section.title}</h2>
            <p className="text-justify">{section.content}</p>
          </div>
        ))}
      </div>

           <div className="w-full h-[350px] mt-12 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={[project.lat, project.lng]}
          zoom={14}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[project.lat, project.lng]}>
            <Popup>{project.name}</Popup>
          </Marker>
        </MapContainer>
      </div>

    </section>
  );
}