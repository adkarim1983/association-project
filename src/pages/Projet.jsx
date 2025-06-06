import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// === DONNÉES ===
const projects = [
  {
    id: 1,
    name: "PLANET FOOD",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.6005,
    lng: -7.5306,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image12.jpg",
  },
  {
    id: 2,
    name: "Alphacom",
    category: "Marketing Digital",
    location: "Sidi Othmane",
    lat: 33.605,
    lng: -7.525,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image9-398x530.jpg",
  },
  {
    id: 3,
    name: "Baha Happye Park",
    category: "Événementiel",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image56-375x530.png",
  },
  {
    id: 4,
    name: "Pixel Prod",
    category: "Design",
    location: "Sidi Othmane",
    lat: 33.5747295,
    lng: -7.5524299,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image55.png",
  },
  {
    id: 5,
    name: "Taha ProdD",
    category: "Audio Visuel",
    location: "Sidi Othmane",
    lat: 33.5725,
    lng: -7.5590,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image41-299x530.jpg",
  },
  {
    id: 6,
    name: "AZ Event 733",
    category: "Événementiel",
    location: "Sidi Othmane",
    lat:  33.5747295,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image51.jpg",
  },
  {
    id: 7,
    name: "Pretty Events",
    category: "Événementiel",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image35-398x530.jpg",
  },
   {
    id: 8,
    name: "ERREGYBY EVENT ",
    category: "Événementiel",
    location: "Sidi Othmane",
    lat: 33.57472951,
    lng: -7.5524299,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image38-398x530.jpg",
  },
   {
    id: 9,
    name: "Snack",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image30.jpg",
  },
   {
    id: 10,
    name: "Snack Yacout",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image28-244x530.jpg",
  },
   {
    id: 11,
    name: "Dar Miya",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image25-398x530.jpg",
  },
   {
    id: 12,
    name: "Foratino",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image19-397x530.jpg",
  },
   {
    id: 13,
    name: "La Table d’emotion",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image16-524x530.jpg",
  },
   {
    id: 14,
    name: "Om Ali Food",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image15.jpg",
  },
   {
    id: 15,
    name: "kitchen chaimaa",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image14-399x530.jpg",
  },
   {
    id: 16,
    name: "Wafae El Hana",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image9-398x530.jpg",
  },
   {
    id: 17,
    name: "GO EVENT DIGILAB",
    category: "Marketing Digital",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/IMG_6635-Red-Reda-707x530.jpeg",
  },
   {
    id: 18,
    name: "Doja EVENT",
    category: "Événementiel",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/WhatsApp-Image-2025-01-04-at-11.34.44-516x530.jpeg",
  },
   {
    id: 19,
    name: "MaMoN Food’s",
    category: "Restauration",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image23-524x530.jpg",
  },
  {
    id: 20,
    name: "Mohcin Najmi Production",
    category: "Marketing Digital",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2024/12/WhatsApp-Image-2024-12-03-at-23.21.32-707x530.jpeg",
  },

];

const categories = ["Tous", "Restauration", "Marketing Digital", "Événementiel", "Design", "Audio Visuel"];
const itemsPerPage = 3;

export default function ListingLocationPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = projects.filter((p) => {
    const matchCategory = selectedCategory === "Tous" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <section className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">
        Projets dans la zone Sidi Othmane
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des projets */}
        <div className="lg:col-span-2 space-y-6">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-40 h-40 object-cover"
              />
              <div className="p-5 space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-blue-700">{project.name}</h3>
                <p className="text-sm text-gray-600">Catégorie : {project.category}</p>
                <p className="text-sm text-gray-500">Localisation : {project.location}</p>
                <Link
                  to={`/projet/${project.id}`}
                  className="inline-block text-sm text-white bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700"
                >
                  Voir plus
                </Link>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num + 1)}
                className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                  currentPage === num + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Recherche + Carte */}
        <div className="space-y-8">
          {/* Barre de recherche + filtres */}
          <div className="bg-white p-5 rounded-xl shadow border">
            <h2 className="text-lg font-semibold mb-3 text-blue-700">Rechercher</h2>
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 text-sm rounded-full border transition ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Carte Leaflet */}
          <div className="h-[300px] w-full border rounded-xl overflow-hidden">
            <MapContainer
              center={[33.61, -7.54]}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='© OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredProjects.map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]}>
                  <Popup>{p.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
