import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";

// Exemple de données projets (vraies données fictives)
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
    name: "Projet B",
    category: "Entrepreneuriat",
    location: "Sidi Othmane",
    lat: 33.605,
    lng: -7.525,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image9-398x530.jpg",
  },
  {
    id: 3,
    name: "Projet C",
    category: "Éducation",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://source.unsplash.com/400x300/?education",
  },
  {
    id: 4,
    name: "Projet C",
    category: "Formation",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://source.unsplash.com/400x300/?education",
  },
  {
    id: 5,
    name: "Projet D",
    category: "Éducation",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://source.unsplash.com/400x300/?education",
  },
  {
    id: 6,
    name: "Projet E",
    category: "Entrepreneuriat",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://source.unsplash.com/400x300/?education",
  },
  {
    id: 7,
    name: "Projet F",
    category: "Éducation",
    location: "Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://source.unsplash.com/400x300/?education",
  },
];

const categories = ["Tous", "Restauration", "Entrepreneuriat", "Éducation"];

export default function ListingLocationPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((p) => {
    const matchCategory = selectedCategory === "Tous" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY_HERE">
      <section className="py-16 px-4 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
          Projets dans la zone Sidi Othmane
        </h1>

        {/* Barre de recherche */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition duration-300 ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600 shadow"
                  : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cartes des projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-blue-700">
                  {project.name}
                </h3>
                <p className="text-gray-600">Catégorie : <span className="font-medium text-gray-800">{project.category}</span></p>
                <p className="text-sm text-gray-500">Localisation : {project.location}</p>
                <div className="w-full h-[200px] rounded-lg overflow-hidden border border-gray-200">
                  <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={{ lat: project.lat, lng: project.lng }}
                    zoom={15}
                  >
                    <Marker position={{ lat: project.lat, lng: project.lng }} />
                  </GoogleMap>
                </div>
                <Link
                  to={`/projet/${project.id}`}
                  className="inline-block mt-4 text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Voir plus
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </LoadScript>
  );
}
