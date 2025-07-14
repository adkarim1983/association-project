import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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


// debut changement

export default function PageProjet() {
  const { t } = useTranslation();
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  

  if (!project) {
    return <div className="text-center py-20 text-red-600">{t("projects.project_not_found")}</div>;
  }

  // Obtenir les détails traduits du projet
  const getProjectDetails = () => {
    // Vérifier si les traductions existent pour ce projet
    const projectDetails = t(`project_details.${id}`, { returnObjects: true, defaultValue: null });
    
    // Si les traductions existent, les utiliser, sinon utiliser les données par défaut
    if (projectDetails && projectDetails.sections) {
      return projectDetails.sections;
    }
    
    // Fallback vers les données hard-codées si pas de traduction
    return project.descriptionSections || [];
  };

 return (
  <section className="py-16 px-6 max-w-7xl mx-auto">
    {/* ✅ Titre centré */}
    <h1 className="text-4xl font-bold text-blue-800 text-center mb-12">
      {t(`projects.project_titles.${id}`) || project.name}
    </h1>

    {/* ✅ Image principale */}
    <img
      src={project.image}
      alt={project.name}
      className="w-full h-64 object-cover rounded-xl shadow mb-12"
    />

    {/* ✅ 2 colonnes équilibrées */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* 📝 Texte scrollable à gauche */}
      <div className="space-y-6 text-gray-800 leading-relaxed max-h-[500px] overflow-y-auto pr-2">
        {getProjectDetails().map((section, index) => (
          <div key={index}>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              {section.title}
            </h2>
            <p className="text-justify text-base">{section.content}</p>
          </div>
        ))}
      </div>

      {/* 🗺️ Carte fixe à droite */}
      <div className="w-full h-[350px] rounded-xl overflow-hidden border border-blue-300 shadow-md">
        <MapContainer
          center={[project.lat, project.lng]}
          zoom={14}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[project.lat, project.lng]}>
            <Popup maxWidth={320} className="custom-popup-detailed">
              <div className="space-y-3 text-xs max-w-xs">
                {/* Header with image */}
                <div className="flex items-center space-x-2">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-blue-700 font-bold text-sm leading-tight">
                      {t(`projects.project_titles.${id}`) || project.name}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                  <h4 className="font-semibold text-gray-800 text-xs mb-1">📋 {t("projects.popup.contact")}</h4>
                  
                  {project.phone && (
                    <div className="flex items-center space-x-1">
                      <span className="text-green-600 text-xs">📞</span>
                      <a href={`tel:${project.phone}`} className="text-green-600 hover:text-green-800 text-xs font-medium">
                        {project.phone}
                      </a>
                    </div>
                  )}
                  
                  {project.email && (
                    <div className="flex items-center space-x-1">
                      <span className="text-blue-600 text-xs">📧</span>
                      <a href={`mailto:${project.email}`} className="text-blue-600 hover:text-blue-800 text-xs font-medium break-all">
                        {project.email}
                      </a>
                    </div>
                  )}
                  
                  {project.address && (
                    <div className="flex items-start space-x-1">
                      <span className="text-red-600 text-xs">📍</span>
                      <p className="text-gray-700 text-xs leading-tight">{project.address}</p>
                    </div>
                  )}
                  
                  {project.hours && (
                    <div className="flex items-center space-x-1">
                      <span className="text-purple-600 text-xs">🕒</span>
                      <p className="text-gray-700 text-xs font-medium">{project.hours}</p>
                    </div>
                  )}
                  
                  {project.website && (
                    <div className="flex items-center space-x-1">
                      <span className="text-indigo-600 text-xs">🌐</span>
                      <a href={`https://${project.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                        {project.website}
                      </a>
                    </div>
                  )}
                </div>

                {/* Description Preview */}
                <div className="bg-blue-50 rounded-lg p-2">
                  <h4 className="font-semibold text-blue-800 text-xs mb-1">ℹ️ {t("projects.popup.about")}</h4>
                  <p className="text-gray-700 text-xs leading-relaxed">
                    {getProjectDetails()[0]?.content.substring(0, 100)}...
                  </p>
                </div>

                {/* CTA - Already on the project page */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-2 text-center">
                  <p className="text-white text-xs font-medium">
                    📍 {t("projects.popup.current_page")}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  </section>
);

}