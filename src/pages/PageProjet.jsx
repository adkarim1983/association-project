import React from "react";
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

export default function PageProjet() {
  const { t } = useTranslation();
  const { id } = useParams();
  const project = projectsData.find((p) => p.id === parseInt(id));

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
        {/* Titre centré */}
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8 tracking-wider">
          {t(project.name)}
    </h1>

        {/* Bande d'images du projet */}
        <div className="mb-8">
          <div className="bg-black rounded-lg p-4 flex justify-center items-center min-h-[200px]">
            <div className="flex space-x-4 overflow-x-auto">
              {/* Images circulaires - on utilise l'image principale du projet */}
              {[1,2,3,4,5,6].map((index) => (
                <div key={index} className="flex-shrink-0">
    <img
      src={project.image}
                    alt={`${t(project.name)} ${index}`}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-yellow-400"
                  />
          </div>
        ))}
      </div>
          </div>
        </div>

        {/* Contenu principal en deux colonnes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne de gauche - Informations détaillées */}
          <div className="space-y-8">
            {/* Section Informations sur la fondatrice */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                <span className="mr-2">📋</span>
                {t('projects.founder_info_title', 'Informations sur la fondatrice')}
              </h2>
              <div className="text-gray-800 leading-relaxed text-justify bg-gray-50 p-4 rounded-lg">
                <p>
                  {t(`projects.list.${projectKey}.founder_info`, t(project.description))}
                </p>
              </div>
            </div>

            {/* Section Présentation du projet */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                <span className="mr-2">📈</span>
                {t('projects.presentation_title', 'Présentation du projet')}
              </h2>
              <div className="text-gray-800 leading-relaxed text-justify bg-gray-50 p-4 rounded-lg">
                <p>
                  {t(`projects.list.${projectKey}.presentation`, t(project.description))}
                </p>
              </div>
            </div>

            {/* Section Soutien et accompagnement */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                <span className="mr-2">🤝</span>
                {t('projects.support_title', 'Soutien et accompagnement')}
              </h2>
              <div className="text-gray-800 leading-relaxed text-justify bg-gray-50 p-4 rounded-lg">
                <p>
                  {t(`projects.list.${projectKey}.support`, 'Information sur le soutien disponible bientôt.')}
                </p>
              </div>
            </div>

            {/* Section Produits et services */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                <span className="mr-2">🛍️</span>
                {t('projects.products_title', 'Produits et services')}
              </h2>
              <div className="text-gray-800 leading-relaxed text-justify bg-gray-50 p-4 rounded-lg">
                <p>
                  {t(`projects.list.${projectKey}.products`, 'Information sur les produits et services disponible bientôt.')}
                </p>
              </div>
            </div>

            {/* Section Partenaires */}
            <div>
              <h2 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                <span className="mr-2">🤝</span>
                {t('projects.partners_title', 'Partenaires')}
              </h2>
              <div className="text-gray-800 leading-relaxed text-justify bg-gray-50 p-4 rounded-lg">
                <p>
                  {t(`projects.list.${projectKey}.partners`, 'Information sur les partenaires disponible bientôt.')}
                </p>
              </div>
            </div>
          </div>

          {/* Colonne de droite - Informations de contact et Carte */}
          <div className="space-y-8">
            {/* Informations de contact */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-600 mb-4">{t('projects.contact_info_title', 'Informations de contact')}</h3>
              <div className="space-y-2 text-gray-800">
                <p><strong>{t('projects.category_label', 'Catégorie')}:</strong> {t(project.category)}</p>
                <p><strong>{t('projects.location_label', 'Lieu')}:</strong> {t(project.location)}</p>
                <p><strong>{t('projects.address_label', 'Adresse')}:</strong> {t(project.address)}</p>
                <p><strong>{t('projects.phone_label', 'Téléphone')}:</strong> {project.phone}</p>
                <p><strong>{t('projects.email_label', 'Email')}:</strong> {project.email}</p>
                <p><strong>{t('projects.website_label', 'Site Web')}:</strong> 
                  <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                    {project.website}
                  </a>
                </p>
                <p><strong>{t('projects.hours_label', 'Horaires')}:</strong> {project.hours}</p>
              </div>
            </div>

            {/* Carte */}
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
                  <Popup>
                    <div className="text-center">
                      <h3 className="font-bold text-blue-600">{t(project.name)}</h3>
                      <p className="text-sm">{t(project.address)}</p>
                      <p className="text-xs text-gray-600 mt-1">{project.phone}</p>
                    </div>
                  </Popup>
          </Marker>
        </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}