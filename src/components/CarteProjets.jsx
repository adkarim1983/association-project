// components/CarteProjets.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import projectsData from "../data/projects";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function CarteProjets({ projets }) {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto h-[50vh] rounded-lg overflow-hidden shadow-lg border my-8 ">

      <MapContainer
        center={[33.5747295, -7.5524299]} 
        zoom={10}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projets.map((projet) => {
          // Find project details from the imported data
          const projectDetails = projectsData.find(proj => proj.id === projet.id) || projet;
          
          return (
            <Marker key={projet.id} position={[projet.lat, projet.lng]}>
              <Popup maxWidth={380} className="custom-popup-carte">
                <div className="space-y-3 text-sm max-w-sm">
                  {/* Header with image */}
                  <div className="flex items-center space-x-3">
                    <img 
                      src={projet.image || projectDetails.image} 
                      alt={projectDetails.name}
                      className="w-18 h-18 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1">
                      <h3 className="text-blue-700 font-bold text-base leading-tight">
                        {t(`projects.project_titles.${projet.id}`) || projet.name}
                      </h3>
                      <p className="text-gray-600 text-xs">
                        {projectDetails.category}
                      </p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 space-y-2">
                    <h4 className="font-semibold text-gray-800 text-xs mb-2 flex items-center">
                      <span className="mr-1">📋</span> {t("projects.popup.contact")}
                    </h4>
                    
                    {projectDetails.phone && (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 text-sm">📞</span>
                        <a href={`tel:${projectDetails.phone}`} className="text-green-600 hover:text-green-800 text-xs font-medium">
                          {projectDetails.phone}
                        </a>
                      </div>
                    )}
                    
                    {projectDetails.email && (
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-600 text-sm">📧</span>
                        <a href={`mailto:${projectDetails.email}`} className="text-blue-600 hover:text-blue-800 text-xs font-medium break-all">
                          {projectDetails.email}
                        </a>
                      </div>
                    )}
                    
                    {projectDetails.address && (
                      <div className="flex items-start space-x-2">
                        <span className="text-red-600 text-sm">📍</span>
                        <p className="text-gray-700 text-xs leading-tight">{projectDetails.address}</p>
                      </div>
                    )}
                    
                    {projectDetails.hours && (
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-600 text-sm">🕒</span>
                        <p className="text-gray-700 text-xs">{projectDetails.hours}</p>
                      </div>
                    )}
                    
                    {projectDetails.website && (
                      <div className="flex items-center space-x-2">
                        <span className="text-indigo-600 text-sm">🌐</span>
                        <a href={`https://${projectDetails.website}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                          {projectDetails.website}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Quick Description */}
                  {projectDetails.descriptionSections && projectDetails.descriptionSections[0] && (
                    <div className="bg-gray-50 rounded-lg p-2">
                      <p className="text-gray-700 text-xs leading-relaxed">
                        {projectDetails.descriptionSections[0].content.substring(0, 120)}...
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/projet/${projet.id}`}
                      className="flex-1 text-center text-xs text-white bg-gradient-to-r from-blue-600 to-blue-700 px-3 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm"
                    >
                      {t("projects.viewMore")} →
                    </Link>
                    
                    {projet.site && (
                      <a
                        href={projet.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-xs text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                      >
                        {t("projects.visit_site")} ↗
                      </a>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  );
}
