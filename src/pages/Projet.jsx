import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { projects as projectsData } from "../data/projects";

// Fix icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const itemsPerPage = 5;

// === COMPOSANT PRINCIPAL ===
export default function Projet() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all_zones");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const allCategories = ["all", ...Object.keys(t("projects.categories", { returnObjects: true }))];
  const allZones = ["all_zones", ...Object.keys(t("projects.locations", { returnObjects: true }))];

  const filteredProjects = projectsData.filter((p) => {
    const categoryKey = p.category.split('.').pop();
    const locationKey = p.location.split('.').pop();
    
    const matchCategory = selectedCategory === "all" || categoryKey === selectedCategory;
    const matchZone = selectedZone === "all_zones" || locationKey === selectedZone;
    const matchSearch = t(p.name).toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchZone && matchSearch;
  });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  return (
    <section className="min-h-screen px-6 py-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-blue-800 mb-10 text-center whitespace-pre-line">
        {t("projects.title")}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des projets */}
        <div className="lg:col-span-2 space-y-6">
          {paginatedProjects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex"
            >
              <img
                src={p.image}
                alt={t(p.name)}
                className="w-40 h-40 object-cover"
              />
              <div className="p-5 space-y-2 flex-1">
                <h3 className="text-xl font-semibold text-blue-700">{t(p.name)}</h3>
                <p className="text-sm text-gray-600">
                  {t("projects.category_label")}: {t(p.category)}
                </p>
                <p className="text-sm text-gray-500">
                  {t("projects.location_label")}: {t(p.location)}
                </p>
                <Link
                  to={`/projet/${p.id}`}
                  className="inline-block text-sm text-white bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700"
                >
                  {t("projects.popup.view_details")}
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
            <h2 className="text-lg font-semibold mb-3 text-blue-700">{t("projects.search_placeholder")}</h2>
            <input
              type="text"
              placeholder={t("projects.search_placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            {/* Filtres Catégorie */}
            <h2 className="text-lg font-semibold mt-6 mb-2 text-blue-700">{t("projects.all_categories")}</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-1 text-sm rounded-full border transition ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                }`}
              >
                {t("projects.all")}
              </button>
              {allCategories.filter(c => c !== 'all').map((cat) => (
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
            <h2 className="text-lg font-semibold mt-6 mb-2 text-blue-700">{t("projects.all_zones")}</h2>
            <div className="flex flex-wrap gap-2">
              <button
                 onClick={() => setSelectedZone("all_zones")}
                 className={`px-4 py-1 text-sm rounded-full border transition ${
                  selectedZone === "all_zones"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                }`}
              >
                {t("projects.all_zones")}
              </button>
              {allZones.filter(z => z !== 'all_zones').map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-4 py-1 text-sm rounded-full border transition ${
                    selectedZone === zone
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                  }`}
                >
                  {t(`projects.locations.${zone}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Carte Leaflet */}
          <div className="h-[350px] w-full border rounded-xl overflow-hidden">
            <MapContainer
              center={[33.589886, -7.534892]}
              zoom={12}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredProjects.map((p) => (
                <Marker key={p.id} position={[p.lat, p.lng]}>
                  <Popup>
                    <div className="custom-popup">
                      <img src={p.image} alt={t(p.name)} className="w-full h-24 object-cover rounded-t-lg" />
                      <div className="p-2">
                        <h3 className="font-bold text-md mb-1">{t(p.name)}</h3>
                        <div className="text-xs text-gray-600">
                          <p><strong>{t('projects.popup.contact')}:</strong> {p.phone}</p>
                          <p><strong>Email:</strong> {p.email}</p>
                          <p>
                            <strong>{t('projects.popup.about')}:</strong> 
                            {t(p.description).substring(0, 100)}...
                          </p>
                        </div>
                        <Link to={`/projet/${p.id}`} className="text-blue-500 hover:underline text-xs mt-2 inline-block">
                          {t('projects.popup.view_details')}
                        </Link>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}