import React from "react";
import image2 from "../assets/image13.jpg";
import image3 from "../assets/image14.jpg";
import { useTranslation } from "react-i18next";

export default function Presentation() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-white m-[25px] rounded-xl overflow-hidden shadow-xl py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">

        {/* Image gauche */}
        <div className="w-full">
          <img
            src={image2}
            alt="Image gauche"
            className="rounded-xl shadow-md object-cover w-full h-full"
          />
        </div>

        {/* Texte centré verticalement */}
        <div className="flex items-center justify-center text-center h-full px-4">
          <div>
            <h2 className="text-3xl font-bold text-blue-800 mb-4">
              {t("presentation_title")}
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {t("presentation_text")}
            </p>
          </div>
        </div>

        {/* Image droite */}
        <div className="w-full">
          <img
            src={image3}
            alt="Image droite"
            className="rounded-xl shadow-md object-cover w-full h-full"
          />
        </div>

      </div>
    </section>
  );
}
