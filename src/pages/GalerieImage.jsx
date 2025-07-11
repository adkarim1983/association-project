
import React, { useState } from "react";


import image2a from "../assets/image2a.jpg";
import image3a from "../assets/image3a.jpg";
import image4a from "../assets/image4a.jpg";
import image5a from "../assets/image5a.jpg";
import image6a from "../assets/image6a.jpg";
import image7a from "../assets/image7a.jpg";
import md1 from "../assets/md1.jpg";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import { useTranslation } from "react-i18next";


export default function GalerieImage() {
  const [activeIndex, setActiveIndex] = useState(null);
  //  const { t } = useTranslation();
  const { t } = useTranslation();


  return (
    <div className="px-8 py-12 bg-white min-h-screen font-sans text-gray-800 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-16 relative pb-4">
          {t("gallery.title")}
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-1 bg-blue-600 rounded-full"></span>
        </h1>


        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <p className="mb-6">
              {t("gallery.section1_p1")}
            </p>
            <p>
              {t("gallery.section1_p2")}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img src={image2a} alt="Inauguration" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_inauguration")}</p>
            </div>
          </div>
        </div>

        {/* Deuxième section - Image à gauche, texte à droite */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group order-2 md:order-1">
            <img src={image4a} alt="Présentation" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_presentation")}</p>
            </div>
          </div>
          <div className="text-gray-700 text-lg leading-relaxed text-justify order-1 md:order-2">
            <p className="mb-6">
              {t("gallery.section2_p1")}
            </p> 
            <p>
              {t("gallery.section2_p2")}
            </p>
          </div>
        </div>

        {/* Troisième section - Programme + image */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("gallery.program_title")}</h2>
            <ul className="list-disc list-inside space-y-3 text-justify">
              <li>{t("gallery.program_web")}</li>
              <li>{t("gallery.program_design")}</li>
              <li>{t("gallery.program_marketing")}</li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img src={md1} alt="Contenu des formations" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_training_content")}</p>
            </div>
          </div>
        </div>

        {/* Quatrième section - Détails sur le déroulement */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-up border-b pb-12 border-gray-200">
          <div className="relative overflow-hidden rounded-2xl shadow-xl group order-2 md:order-1">
            <img src={p1} alt="Déroulement des cours" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_course_progress")}</p>
            </div>
          </div>
          <div className="text-gray-700 text-lg leading-relaxed text-justify order-1 md:order-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("gallery.training_title")}</h2>
            <p className="mb-6">
              {t("gallery.training_p1")}
            </p>
            <p>
              {t("gallery.training_p2")}
            </p>
          </div>
        </div>

        {/* Cinquième section - Image finale + résumé */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-fade-up">
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">{t("gallery.success_title")}</h2>
            <p>
              {t("gallery.success_p")}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-2xl shadow-xl group">
            <img src={p2} alt="Fin de formation" className="rounded-2xl w-full h-auto transform transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-white text-lg font-semibold">{t("gallery.image_end_of_training")}</p>
            </div>
          </div>
        </div>
        {/* Section Galerie interactive finale */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mt-24 mb-12 relative pb-4">
          {t("gallery.gallery_highlights")}
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-24 h-1 bg-blue-600 rounded-full"></span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            { src: image3a, text: t("gallery.image_share_exchange") },
            { src: image5a, text: t("gallery.image_youth_discovering_digital") },
            { src: image6a, text: t("gallery.image_intensive_training") },
            { src: image7a, text: t("gallery.image_group_work") },
            { src: md1, text: t("gallery.image_pedagogical_team") },
            { src: p1, text: t("gallery.image_final_projects") },
            { src: p2, text: t("gallery.image_certificates") },
            { src: image2a, text: t("gallery.image_digital_marketing_workshop") },
            { src: image4a, text: t("gallery.image_tech_trends_discussion") },
          ].map((item, index) => (
            <div
              key={index}
              className="relative rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={item.src}
                alt={`galerie-${index}`}
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute bottom-0 w-full bg-blue-700/80 text-white text-center py-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm px-2">{item.text}</p>
              </div>
              {/* Hide the default overlay as we have a new hover effect */}
              {activeIndex === index && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-base text-center px-6 transition-opacity duration-300 opacity-100">
                  <p className="animate-fade-in-text">{item.text}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </div>

  );
}
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-up {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 1s ease forwards;
  }

  .animate-fade-up {
    animation: fade-up 1s ease forwards;
  }

  .animate-fade-in-text {
    animation: fade-in 0.5s ease-in-out forwards;
  }
`;
document.head.appendChild(style);