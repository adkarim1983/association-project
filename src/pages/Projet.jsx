import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import projectsData from "../data/projects";

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
    location: "Annexe administrative de Sidi Othmane",
    lat: 33.6005,
    lng: -7.5306,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image12.jpg",
  },
  {
    id: 2,
    name: "Alphacom",
    category: "Marketing Digital",
    location: "Zone industrielle Sidi Othmane",
    lat: 33.605,
    lng: -7.525,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image9-398x530.jpg",
  },
  {
    id: 3,
    name: "Baha Happye Park",
    category: "Événementiel",
    location: "Annexe administrative du quartier Moulay Rachid",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image56-375x530.png",
  },
  {
    id: 4,
    name: "Pixel Prod",
    category: "Design",
    location: "Annexe administrative du quartier Mabrouka",
    lat: 33.5747295,
    lng: -7.5524299,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image55.png",
  },
  {
    id: 5,
    name: "Taha ProdD",
    category: "Audio Visuel",
    location: "Annexe administrative du quartier Mabrouka",
    lat: 33.5725,
    lng: -7.5590,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image41-299x530.jpg",
  },
  {
    id: 6,
    name: "AZ Event 733",
    category: "Événementiel",
    location: "Annexe administrative de Sidi Othmane",
    lat:  33.5747295,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image51.jpg",
  },
  {
    id: 7,
    name: "Pretty Events",
    category: "Événementiel",
    location: "Annexe administrative du quartier Moulay Rachid",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image35-398x530.jpg",
  },
   {
    id: 8,
    name: "ERREGYBY EVENT ",
    category: "Événementiel",
    location: "Annexe administrative du quartier Sadri",
    lat: 33.57472951,
    lng: -7.5524299,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image38-398x530.jpg",
  },
   {
    id: 9,
    name: "Snack",
    category: "Restauration",
    location: "Hay El Rajae",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image30.jpg",
  },
   {
    id: 10,
    name: "Snack Yacout",
    category: "Restauration",
    location: "Zone industrielle Moulay Rachid",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image28-244x530.jpg",
  },
   {
    id: 11,
    name: "Dar Miya",
    category: "Restauration",
    location: "Annexe administrative du quartier Moulay Rachid",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image25-398x530.jpg",
  },
   {
    id: 12,
    name: "Foratino",
    category: "Restauration",
    location: "Annexe administrative du quartier Moulay Rachid",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image19-397x530.jpg",
  },
   {
    id: 13,
    name: "La Table d’emotion",
    category: "Restauration",
    location: "Annexe administrative du quartier Moulay Rachid",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image16-524x530.jpg",
  },
   {
    id: 14,
    name: "Om Ali Food",
    category: "Restauration",
    location: "Annexe administrative El Harouiyine",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image15.jpg",
  },
   {
    id: 15,
    name: "kitchen chaimaa",
    category: "Restauration",
    location: "Zone industrielle Moulay Rachid",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image14-399x530.jpg",
  },
   {
    id: 16,
    name: "Wafae El Hana",
    category: "Restauration",
    location: "Hay El Rajae",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image9-398x530.jpg",
  },
   {
    id: 17,
    name: "GO EVENT DIGILAB",
    category: "Marketing Digital",
    location: "Hay El Rajae",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/IMG_6635-Red-Reda-707x530.jpeg",
  },
   {
    id: 18,
    name: "Doja EVENT",
    category: "Événementiel",
    location: "Annexe administrative de Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/WhatsApp-Image-2025-01-04-at-11.34.44-516x530.jpeg",
  },
   {
    id: 19,
    name: "MaMoN Food’s",
    category: "Restauration",
    location: "Annexe administrative du quartier Sadri",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2025/01/Image23-524x530.jpg",
  },
  {
    id: 20,
    name: "Mohcin Najmi Production",
    category: "Marketing Digital",
    location: "Annexe administrative de Sidi Othmane",
    lat: 33.61,
    lng: -7.54,
    image: "https://associationnajm.ma/wp-content/uploads/classified-listing/2024/12/WhatsApp-Image-2024-12-03-at-23.21.32-707x530.jpeg",
  },

];








const categoryKeyMap = {
  "Restauration": "restauration",
  "Marketing Digital": "marketing_digital",
  "Événementiel": "evenementiel",
  "Design": "design",
  "Audio Visuel": "audio_visuel"
};

const zoneKeyMap = {
  "Annexe administrative de Sidi Othmane": "sidi_othmane_admin",
  "Zone industrielle Sidi Othmane": "sidi_othmane_industrial",
  "Annexe administrative du quartier Moulay Rachid": "moulay_rachid_admin",
  "Annexe administrative du quartier Mabrouka": "mabrouka_admin",
  "Annexe administrative du quartier Sadri": "sadri_admin",
  "Hay El Rajae": "hay_el_rajae",
  "Zone industrielle Moulay Rachid": "moulay_rachid_industrial",
  "Annexe administrative El Harouiyine": "el_harouiyine_admin"
};

const itemsPerPage = 5;

export default function ListingLocationPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all_zones");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fonctions pour obtenir les catégories et zones traduites
  const getCategories = () => {
    return ["all", "restauration", "marketing_digital", "evenementiel", "design", "audio_visuel"];
  };

  const getZones = () => {
    return ["all_zones", "sidi_othmane_admin", "sidi_othmane_industrial", "moulay_rachid_admin", "mabrouka_admin", "sadri_admin", "hay_el_rajae", "moulay_rachid_industrial", "el_harouiyine_admin"];
  };

  const filteredProjects = projects.filter((p) => {
    const matchCategory = selectedCategory === "all" || categoryKeyMap[p.category] === selectedCategory;
    const matchZone = selectedZone === "all_zones" || zoneKeyMap[p.location] === selectedZone;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());

// la partie ajoutee:
    function normalizeCategoryKey(category) {
  if (!category) return ""; // sécurité si category est undefined
  return category.toLowerCase().replaceAll(" ", "_");
}
//fin de partie ajoutee




    return matchCategory && matchSearch && matchZone;
  });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <section className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center">
        {t("projects.title")}
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
                <h3 className="text-xl font-semibold text-blue-700">{t(`projects.project_titles.${project.id}`) || project.name}</h3>
                <p className="text-sm text-gray-600">
                  {t("projects.category") + " : " + t(`projects.categories.${categoryKeyMap[project.category] || "restauration"}`)}
                </p>
                <p className="text-sm text-gray-500">
                  {t("projects.location") + " : " + (zoneKeyMap[project.location] ? t(`projects.zones.${zoneKeyMap[project.location]}`) : project.location)}
                </p>
                <Link
                  to={`/projet/${project.id}`}
                  className="inline-block text-sm text-white bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700"
                >
                  {t("projects.viewMore")}
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

        {/* Barre de recherche + filtres + carte */}
        <div className="space-y-8">
          <div className="bg-white p-5 rounded-xl shadow border">
            <h2 className="text-lg font-semibold mb-3 text-blue-700">{t("projects.searchTitle")}</h2>
            <input
              type="text"
              placeholder={t("projects.searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* Filtres Catégorie */}
            <div className="mt-4 flex flex-wrap gap-2">
              {getCategories().map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 text-sm rounded-full border transition ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                  }`}
                >
                  {t(`projects.categories.${cat}`)}
                </button>
              ))}
            </div>

            {/* Filtres Zone */}
            <h2 className="text-lg font-semibold mt-6 mb-2 text-blue-700">{t("projects.filters.filter_by_zone")}</h2>
            <div className="flex flex-wrap gap-2">
              {getZones().map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-4 py-1 text-sm rounded-full border transition ${
                    selectedZone === zone
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                  }`}
                >
                  {t(`projects.zones.${zone}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Carte Leaflet */}
          <div className="h-[350px] w-full border rounded-xl overflow-hidden">
            <MapContainer
  center={[33.61, -7.54]}
  zoom={13}
  scrollWheelZoom={false}
  className="h-full w-full"
>
  <TileLayer
    attribution="© OpenStreetMap"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {filteredProjects.map((p) => {
    // Find project details from the imported data
    const projectDetails = projectsData.find(proj => proj.id === p.id) || p;
    
    return (
      <Marker key={p.id} position={[p.lat, p.lng]}>
        <Popup maxWidth={320} className="custom-popup-detailed">
          <div className="space-y-3 text-xs max-w-xs">
            {/* Header with image */}
            <div className="flex items-center space-x-2">
              <img 
                src={p.image} 
                alt={projectDetails.name}
                className="w-16 h-16 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-blue-700 font-bold text-sm leading-tight">
                  {t(`projects.project_titles.${p.id}`) || p.name}
                </h3>
                <p className="text-gray-600 text-xs">
                  {t(`projects.categories.${categoryKeyMap[p.category] || "restauration"}`)}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-lg p-2 space-y-1">
              <h4 className="font-semibold text-gray-800 text-xs mb-1">📋 {t("projects.popup.contact")}</h4>
              
              {projectDetails.phone && (
                <div className="flex items-center space-x-1">
                  <span className="text-green-600 text-xs">📞</span>
                  <a href={`tel:${projectDetails.phone}`} className="text-green-600 hover:text-green-800 text-xs font-medium">
                    {projectDetails.phone}
                  </a>
                </div>
              )}
              
              {projectDetails.email && (
                <div className="flex items-center space-x-1">
                  <span className="text-blue-600 text-xs">📧</span>
                  <a href={`mailto:${projectDetails.email}`} className="text-blue-600 hover:text-blue-800 text-xs font-medium break-all">
                    {projectDetails.email}
                  </a>
                </div>
              )}
              
              {projectDetails.address && (
                <div className="flex items-start space-x-1">
                  <span className="text-red-600 text-xs">📍</span>
                  <p className="text-gray-700 text-xs leading-tight">{projectDetails.address}</p>
                </div>
              )}
              
              {projectDetails.hours && (
                <div className="flex items-center space-x-1">
                  <span className="text-purple-600 text-xs">🕒</span>
                  <p className="text-gray-700 text-xs font-medium">{projectDetails.hours}</p>
                </div>
              )}
              
              {projectDetails.website && (
                <div className="flex items-center space-x-1">
                  <span className="text-indigo-600 text-xs">🌐</span>
                  <a href={`https://${projectDetails.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                    {projectDetails.website}
                  </a>
                </div>
              )}
            </div>

            {/* Description Preview */}
            {projectDetails.descriptionSections && projectDetails.descriptionSections[0] && (
              <div className="bg-blue-50 rounded-lg p-2">
                <h4 className="font-semibold text-blue-800 text-xs mb-1">ℹ️ {t("projects.popup.about")}</h4>
                <p className="text-gray-700 text-xs leading-relaxed">
                  {projectDetails.descriptionSections[0].content.substring(0, 100)}...
                </p>
              </div>
            )}

            {/* Action Button */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-2 text-center">
              <Link
                to={`/projet/${p.id}`}
                className="text-white text-xs font-medium hover:text-blue-100 transition-colors"
              >
                📍 {t("projects.popup.view_details")} →
              </Link>
            </div>
          </div>
        </Popup>
      </Marker>
    )
  })}
</MapContainer>

          </div>
        </div>
      </div>
    </section>
  );
}