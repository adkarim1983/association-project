
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
    <div className="px-6 py-16 bg-gradient-to-b from-white via-gray-100 to-white min-h-screen animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center  text-gray-800 mb-12">
          {/* {t("irchad.gallery.title")} */}
          {t("gallery.title")}

        </h1>


        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 animate-fade-up">
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className="mb-4 text-justify">
              {t("gallery.section1_p1")}
            </p>
            <p className="text-justify">
              {t("gallery.section1_p2")}
            </p>
          </div>
          <div>
            <img src={image2a} alt="Inauguration" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
        </div>

        {/* Deuxième section - Image à gauche, texte à droite */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 animate-fade-up">
          <div>
            <img src={image4a} alt="Présentation" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className="mb-4 text-justify">
              {t("gallery.section2_p1")}
            </p> 
            <p className="text-justify">
              {t("gallery.section2_p2")}
            </p>
          </div>
        </div>

        {/* Troisième section - Programme + image */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 animate-fade-up">
          <div className="text-gray-700 text-lg leading-relaxed">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contenu des programmes</h2>
            <ul className="list-disc list-inside space-y-2 text-justify">
              <li>{t("gallery.program_web")}</li>
              <li>{t("gallery.program_design")}</li>
              <li>{t("gallery.program_marketing")}</li>
            </ul>
          </div>
          <div>
            <img src={md1} alt="Contenu des formations" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
        </div>

        {/* Quatrième section - Détails sur le déroulement */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 animate-fade-up">
          <div>
            <img src={p1} alt="Déroulement des cours" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
          <div className="text-gray-700 text-lg leading-relaxed">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t("gallery.training_title")}</h2>
            <p className="mb-4 text-justify">
              {t("gallery.training_p1")}
            </p>
            <p className="text-justify">
              {t("gallery.training_p2")}
            </p>
          </div>
        </div>

        {/* Cinquième section - Image finale + résumé */}
        <div className="grid md:grid-cols-2 gap-10 items-center animate-fade-up">
          <div className="text-gray-700 text-lg leading-relaxed">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t("gallery.success_title")}</h2>
            <p className="text-justify">
              {t("gallery.success_p")}
            </p>
          </div>
          <div>
            <img src={p2} alt="Fin de formation" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
        </div>
        {/* Section Galerie interactive finale */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mt-24 mb-10 border-b-2 border-blue-500 inline-block pb-2">
          {t("gallery.gallery_highlights")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
          {[
            { src: image3a, text: t("gallery.img1") },
            { src: image5a, text: t("gallery.img2") },
            { src: image6a, text: t("gallery.img3") },
            { src: image7a, text: t("gallery.img4") },
            { src: md1, text: t("gallery.img5") },
            { src: p1, text: t("gallery.img6") },
            { src: p2, text: t("gallery.img7") }
          ].map((item, index) => (
            <div
              key={index}
              className="relative rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 group"
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={item.src}
                alt={`galerie-${index}`}
                className="w-full h-64 object-cover rounded-xl"
              />
              <div className="absolute bottom-0 w-full bg-blue-600 text-white text-center py-2 font-semibold">
                Image {index + 1}
              </div>
              {activeIndex === index && (
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-sm text-center px-4">
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