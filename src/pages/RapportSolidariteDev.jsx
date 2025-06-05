// src/pages/PartenariatIrchadFaculte.jsx
import React from "react";
import image36 from "../assets/image36.jpg";
import image37 from "../assets/image37.jpg";

export default function PartenariatIrchadFaculte() {
  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-6 px-6 min-h-screen">
      {/* Image en haut */}
       <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
        Signature d’un Partenariat entre la Plateforme Irchad et la Faculté des Lettres et des Sciences
      </h1>
      <div className="flex justify-center mb-5">
        <img
          src={image36}
          alt="Partenariat Irchad et Faculté"
          className="rounded-xl shadow-2xl w-full max-w-5xl object-cover"
        />
      </div>

      

      {/* Texte 1 */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          Dans une démarche stratégique visant à instaurer un système de coopération durable, une convention de partenariat a été signée le jeudi 13 janvier 2022 lors d’une cérémonie présidée par le Gouverneur de la préfecture des arrondissements Moulay Rachid.
          Ce partenariat vise à renforcer la collaboration entre les institutions académiques, économiques et sociales pour favoriser le développement durable et l’innovation dans la zone industrielle de Ben M’Sick Sidi Othmane.
        </p>
      </div>

      {/* Titre secondaire */}
      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">Axes de partenariat et objectifs</h2>

      {/* Bloc texte 2 */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Promotion de l’innovation et du développement économique</h3>
          <p className="text-gray-700 text-justify">
            Ce partenariat vise à créer un environnement propice à l’innovation et au développement des projets économiques locaux, notamment dans les domaines technologiques et des industries créatives.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Mise en place d’un écosystème intégré</h3>
          <p className="text-gray-700 text-justify">
            Développer des mécanismes d’interaction entre les institutions académiques, économiques et la société civile pour assurer une synergie bénéfique à tous les acteurs.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Développement durable</h3>
          <p className="text-gray-700 text-justify">
            Soutien à des projets respectueux de l’environnement et du tissu social, tout en impliquant activement la communauté locale dans leur mise en œuvre.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Lien entre enseignement et communauté</h3>
          <p className="text-gray-700 text-justify">
            Organisation d’initiatives culturelles et scientifiques visant à sensibiliser étudiants et citoyens à l’importance de l’intégration entre savoir et action.
          </p>
        </div>
      </div>

      {/* Conclusion */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-2">Perspectives futures</h3>
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          Ce partenariat est appelé à renforcer le développement de la zone industrielle Ben M’Sick Sidi Othmane, à stimuler l’emploi et l’investissement, et à devenir un modèle de collaboration réussie entre institutions pour un développement durable et innovant.
        </p>
      </div>
    </section>
  );
}
