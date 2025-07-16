import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

// Composant pour le texte tronqué sur toutes les tailles d'écran
function MobileTruncatedText({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="text-gray-800 leading-relaxed text-justify bg-gray-50 p-4 rounded-lg" dir="auto">
      <p className={`${isExpanded ? '' : 'line-clamp-3'}`} dir="auto">
        {text}
      </p>
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="text-blue-600 font-medium mt-2 hover:underline"
          dir="auto"
        >
          {t('common.read_more', 'Lire plus')}
        </button>
      )}
      {isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className="text-blue-600 font-medium mt-2 hover:underline"
          dir="auto"
        >
          {t('common.read_less', 'Lire moins')}
        </button>
      )}
    </div>
  );
}

export default function PageProjet() {
  const { t } = useTranslation();
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === parseInt(id));
  const [isContactVisible, setIsContactVisible] = useState(false);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{t("projects.project_not_found", "Projet non trouvé")}</h2>
          <Link to="/projects" className="text-blue-600 hover:underline">
            {t("projects.back_to_list", "Retour à la liste des projets")}
          </Link>
        </div>
      </div>
    );
  }

  // Créer la clé de base pour ce projet
  const projectKey = project.name.replace('projects.list.', '').replace('.name', '');

 return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Titre avec image du projet */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Image du projet */}
              <div className="flex-shrink-0">
                <img
                  src={project.image}
                  alt={t(project.name)}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-xl ring-4 ring-blue-200"
                />
              </div>
              
              {/* Titre et informations */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-3 tracking-wider" dir="auto">
                  {t(project.name)}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {t(project.category)}
                  </span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    📍 {t(project.location)}
                  </span>
                </div>
                                 <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl" dir="auto">
                   {t(`projects.list.${projectKey}.presentation`, t(project.description)).substring(0, 150)}...
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal en deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne de gauche - Informations détaillées */}
          <div className="space-y-8">
            {/* Section Informations sur la fondatrice */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center" dir="auto">
                <span className="mr-2">📋</span>
                {t('projects.founder_info_title', 'Informations sur la fondatrice')}
              </h2>
              <MobileTruncatedText text={t(`projects.list.${projectKey}.founder_info`, t(project.description))} />
            </div>

            {/* Section Présentation du projet */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center" dir="auto">
                <span className="mr-2">📈</span>
                {t('projects.presentation_title', 'Présentation du projet')}
              </h2>
              <MobileTruncatedText text={t(`projects.list.${projectKey}.presentation`, t(project.description))} />
            </div>

            {/* Section Soutien et accompagnement */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center" dir="auto">
                <span className="mr-2">🤝</span>
                {t('projects.support_title', 'Soutien et accompagnement')}
              </h2>
              <MobileTruncatedText text={t(`projects.list.${projectKey}.support`, 'Information sur le soutien disponible bientôt.')} />
            </div>

            {/* Section Produits et services */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center" dir="auto">
                <span className="mr-2">🛍️</span>
                {t('projects.products_title', 'Produits et services')}
              </h2>
              <MobileTruncatedText text={t(`projects.list.${projectKey}.products`, 'Information sur les produits et services disponible bientôt.')} />
            </div>

            {/* Section Partenaires */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center" dir="auto">
                <span className="mr-2">🤝</span>
                {t('projects.partners_title', 'Partenaires')}
              </h2>
              <MobileTruncatedText text={t(`projects.list.${projectKey}.partners`, 'Information sur les partenaires disponible bientôt.')} />
            </div>
          </div>

          {/* Colonne de droite - Carte et Informations de contact */}
          <div className="space-y-8">
            {/* Carte */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center" dir="auto">
                <span className="mr-2">🗺️</span>
                {t('projects.map_address_title', 'Adresse sur la carte')}
              </h3>
              <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg border-2 border-gray-200 relative z-0">
        <MapContainer
          center={[project.lat, project.lng]}
                zoom={15}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[project.lat, project.lng]}>
                  <Popup maxWidth={380} className="custom-popup">
                    <div className="space-y-2 text-sm max-w-sm" dir="auto">
                      {/* Header with image */}
                      <div className="flex items-center space-x-2" dir="auto">
                        <img 
                          src={project.image} 
                          alt={t(project.name)}
                          className="w-14 h-14 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1">
                          <h3 className="text-blue-700 font-bold text-sm leading-tight" dir="auto">
                            {t(project.name)}
                          </h3>
                          <p className="text-gray-600 text-xs" dir="auto">
                            {t(project.category)}
                          </p>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 space-y-1" dir="auto">
                        <h4 className="font-semibold text-gray-800 text-xs mb-1 flex items-center" dir="auto">
                          <span className="mr-1">📋</span> {t("projects.popup.contact", "Contact")}
                        </h4>
                        
                        {project.phone && (
                          <div className="flex items-center space-x-1" dir="auto">
                            <span className="text-green-600 text-sm">📞</span>
                            <span className="text-gray-700 text-xs">{t("projects.phone_label", "Téléphone")}:</span>
                            <a href={`tel:${project.phone}`} className="text-green-600 hover:text-green-800 text-xs font-medium" dir="ltr">
                              {project.phone}
                            </a>
                          </div>
                        )}
                        
                        {project.email && (
                          <div className="flex items-center space-x-1" dir="auto">
                            <span className="text-blue-600 text-sm">📧</span>
                            <span className="text-gray-700 text-xs">{t("projects.email_label", "Email")}:</span>
                            <a href={`mailto:${project.email}`} className="text-blue-600 hover:text-blue-800 text-xs font-medium break-all" dir="ltr">
                              {project.email}
                            </a>
                          </div>
                        )}
                        
                        {project.address && (
                          <div className="flex items-start space-x-1" dir="auto">
                            <span className="text-red-600 text-sm">📍</span>
                            <span className="text-gray-700 text-xs">{t("projects.address_label", "Adresse")}:</span>
                            <p className="text-gray-700 text-xs leading-tight flex-1">{t(project.address)}</p>
                          </div>
                        )}
                        
                        {project.hours && (
                          <div className="flex items-center space-x-1" dir="auto">
                            <span className="text-purple-600 text-sm">🕒</span>
                            <span className="text-gray-700 text-xs">{t("projects.hours_label", "Horaires")}:</span>
                            <p className="text-gray-700 text-xs">{project.hours}</p>
                          </div>
                        )}
                        
                        {project.website && (
                          <div className="flex items-center space-x-1" dir="auto">
                            <span className="text-indigo-600 text-sm">🌐</span>
                            <span className="text-gray-700 text-xs">{t("projects.website_label", "Site Web")}:</span>
                            <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-xs font-medium" dir="ltr">
                              {project.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
          </Marker>
        </MapContainer>
              </div>
            </div>

            {/* Informations de contact */}
            <div className="bg-gray-50 p-6 rounded-lg">
              {/* Titre cliquable sur desktop, normal sur mobile */}
              <div className="flex items-center justify-between">
                <h3 
                  className="text-lg font-semibold text-blue-600 mb-4 hidden md:flex items-center cursor-pointer hover:text-blue-800 transition-colors" 
                  dir="auto"
                  onClick={() => setIsContactVisible(!isContactVisible)}
                >
                  {t('projects.contact_info_title', 'Informations de contact')}
                  <span className={`ml-2 transform transition-transform ${isContactVisible ? 'rotate-180' : ''}`}>
                    ⌄
                  </span>
                </h3>
                <h3 className="text-lg font-semibold text-blue-600 mb-4 block md:hidden" dir="auto">
                  {t('projects.contact_info_title', 'Informations de contact')}
                </h3>
              </div>
              
              {/* Contenu - caché sur desktop sauf si cliqué, toujours visible sur mobile */}
              <div className={`space-y-2 text-gray-800 block md:${isContactVisible ? 'block' : 'hidden'}`}>
                <p dir="auto"><strong>{t('projects.category_label', 'Catégorie')}:</strong> {t(project.category)}</p>
                <p dir="auto"><strong>{t('projects.location_label', 'Lieu')}:</strong> {t(project.location)}</p>
                <p dir="auto"><strong>{t('projects.address_label', 'Adresse')}:</strong> {t(project.address)}</p>
                <p dir="auto"><strong>{t('projects.phone_label', 'Téléphone')}:</strong> <span dir="ltr">{project.phone}</span></p>
                <p dir="auto"><strong>{t('projects.email_label', 'Email')}:</strong> <span dir="ltr">{project.email}</span></p>
                <p dir="auto"><strong>{t('projects.website_label', 'Site Web')}:</strong> 
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1" dir="ltr">
                    {project.website}
                  </a>
                </p>
                <p dir="auto"><strong>{t('projects.hours_label', 'Horaires')}:</strong> {project.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}