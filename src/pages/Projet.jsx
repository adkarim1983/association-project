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

const itemsPerPage = 6;

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Hero Section */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent text-center md:text-left leading-tight" dir="auto">
            {t("projects.title")}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-light max-w-3xl mx-auto leading-relaxed">
            Découvrez nos projets d'inclusion économique et d'autonomisation des jeunes
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar - Filtres */}
          <div className="xl:col-span-1 space-y-6">


            {/* Filtres Catégorie */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-800 ml-3" dir="auto">{t("projects.all_categories")}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    selectedCategory === "all"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                      : "bg-white/70 text-slate-600 border border-slate-200 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  dir="auto"
                >
                  {t("projects.all")}
                </button>
                {allCategories.filter(c => c !== 'all').map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                        : "bg-white/70 text-slate-600 border border-slate-200 hover:bg-blue-50 hover:border-blue-300"
                    }`}
                    dir="auto"
                  >
                    {t(`projects.categories.${cat}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtres Zone */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-800 ml-3" dir="auto">{t("projects.all_zones")}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedZone("all_zones")}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    selectedZone === "all_zones"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                      : "bg-white/70 text-slate-600 border border-slate-200 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                  dir="auto"
                >
                  {t("projects.all_zones")}
                </button>
                {allZones.filter(z => z !== 'all_zones').map((zone) => (
                  <button
                    key={zone}
                    onClick={() => setSelectedZone(zone)}
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                      selectedZone === zone
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                        : "bg-white/70 text-slate-600 border border-slate-200 hover:bg-blue-50 hover:border-blue-300"
                    }`}
                    dir="auto"
                  >
                    {t(`projects.locations.${zone}`)}
                  </button>
                ))}
              </div>
            </div>


          </div>

          {/* Contenu principal - Liste des projets */}
          <div className="xl:col-span-3">
            {/* Barre de statistiques améliorée */}
            <div className="bg-gradient-to-r from-white/90 to-blue-50/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/30 mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Nombre de projets - à gauche */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">{filteredProjects.length}</div>
                    <div className="text-sm text-slate-600">{t("projects.available_projects", "Projets disponibles")}</div>
                  </div>
                </div>

                {/* Barre de recherche - au milieu */}
                <div className="flex-1 max-w-md mx-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("projects.search_placeholder")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                      dir="auto"
                    />
                    <svg className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Pagination - à droite */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a1 1 0 001 1h8a1 1 0 001-1V8M7 8h10M7 8L5 6m2 2l2-2" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-slate-800">Page {currentPage}</div>
                    <div className="text-sm text-slate-600">{t("projects.page_of", "sur {{totalPages}} pages", {totalPages})}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grille des projets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {paginatedProjects.map((p) => (
                <Link
                  key={p.id}
                  to={`/projet/${p.id}`}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative">
                    <img
                      src={p.image}
                      alt={t(p.name)}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-xs font-medium text-slate-700">#{p.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 text-center md:text-left leading-tight" dir="auto">
                        {t(p.name)}
                      </h3>
                      <div className="flex-shrink-0 ml-2">
                        <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-sm text-slate-600" dir="auto">
                          <span className="font-medium">{t("projects.category_label", "Catégorie")}:</span> {t(p.category)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-sm text-slate-600" dir="auto">
                          <span className="font-medium">{t("projects.location_label", "Localisation")}:</span> {t(p.location)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700" dir="auto">
                          {t("projects.popup.view_details", "Voir les détails")}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Explorer →
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination élégante */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        currentPage === 1 
                          ? 'text-slate-400 cursor-not-allowed' 
                          : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {[...Array(totalPages).keys()].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCurrentPage(num + 1)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                          currentPage === num + 1
                            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                            : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {num + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        currentPage === totalPages 
                          ? 'text-slate-400 cursor-not-allowed' 
                          : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Message si aucun projet trouvé */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">Aucun projet trouvé</h3>
                  <p className="text-slate-600 mb-4">Essayez de modifier vos critères de recherche</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedZone("all_zones");
                      setSearchTerm("");
                    }}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Carte Large en bas */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#56B04A' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 ml-4 text-center md:text-left leading-tight">Localisation des projets</h2>
          </div>
          
          <div className="h-[500px] w-full rounded-xl overflow-hidden border border-slate-200 relative z-0">
            <MapContainer
              center={[33.589886, -7.534892]}
              zoom={13}
              scrollWheelZoom={true}
              className="h-full w-full z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {projectsData.map((project, index) => {
                const offset = 0.001;
                const adjustedLat = project.lat + (index % 3) * offset;
                const adjustedLng = project.lng + (Math.floor(index / 3) % 3) * offset;
                
                return (
                  <Marker key={project.id} position={[adjustedLat, adjustedLng]}>
                    <Popup maxWidth={400} className="custom-popup">
                      <div className="space-y-3 text-sm max-w-sm" dir="auto">
                        <div className="flex items-center space-x-3" dir="auto">
                          <img 
                            src={project.image} 
                            alt={t(project.name)}
                            className="w-16 h-16 object-cover rounded-lg shadow-sm"
                          />
                          <div className="flex-1">
                            <h3 className="text-blue-700 font-bold text-base leading-tight" dir="auto">
                              {t(project.name)}
                            </h3>
                            <p className="text-gray-600 text-sm" dir="auto">
                              {t(project.category)}
                            </p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 space-y-2" dir="auto">
                          <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center" dir="auto">
                            <span className="mr-2">📋</span> {t("projects.popup.contact", "Contact")}
                          </h4>
                          
                          {project.phone && (
                            <div className="flex items-center space-x-2" dir="auto">
                              <span className="text-green-600 text-lg">📞</span>
                              <span className="text-gray-700 text-sm">{t("projects.phone_label", "Téléphone")}:</span>
                              <a href={`tel:${project.phone}`} className="text-green-600 hover:text-green-800 text-sm font-medium" dir="ltr">
                                {project.phone}
                              </a>
                            </div>
                          )}
                          
                          {project.email && (
                            <div className="flex items-center space-x-2" dir="auto">
                              <span className="text-blue-600 text-lg">📧</span>
                              <span className="text-gray-700 text-sm">{t("projects.email_label", "Email")}:</span>
                              <a href={`mailto:${project.email}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium break-all" dir="ltr">
                                {project.email}
                              </a>
                            </div>
                          )}
                          
                          {project.address && (
                            <div className="flex items-start space-x-2" dir="auto">
                              <span className="text-red-600 text-lg">📍</span>
                              <span className="text-gray-700 text-sm">{t("projects.address_label", "Adresse")}:</span>
                              <p className="text-gray-700 text-sm leading-tight flex-1">{t(project.address)}</p>
                            </div>
                          )}
                          
                          {project.hours && (
                            <div className="flex items-center space-x-2" dir="auto">
                              <span className="text-purple-600 text-lg">🕒</span>
                              <span className="text-gray-700 text-sm">{t("projects.hours_label", "Horaires")}:</span>
                              <p className="text-gray-700 text-sm">{project.hours}</p>
                            </div>
                          )}
                          
                          {project.website && (
                            <div className="flex items-center space-x-2" dir="auto">
                              <span className="text-indigo-600 text-lg">🌐</span>
                              <span className="text-gray-700 text-sm">{t("projects.website_label", "Site Web")}:</span>
                              <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium" dir="ltr">
                                {project.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}