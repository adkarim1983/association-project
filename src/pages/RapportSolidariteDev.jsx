import { useTranslation } from "react-i18next";
import React from "react";
import image36 from "../assets/image36.jpg";
import image37 from "../assets/image37.jpg";

export default function PartenariatIrchadFaculte() {
    const { t } = useTranslation();
  return (
     <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-6 px-6 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
        {t("partnership_irchad.main_title")}
      </h1>

      <div className="flex justify-center mb-5">
        <img
          src={image36}
          alt="Partenariat Irchad et Faculté"
          className="rounded-xl shadow-2xl w-full max-w-5xl object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          {t("partnership_irchad.paragraph1")}
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
        {t("partnership_irchad.section_title")}
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              {t(`partnership_irchad.axis${i}_title`)}
            </h3>
            <p className="text-gray-700 text-justify">
              {t(`partnership_irchad.axis${i}_text`)}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-blue-700 mb-2">
          {t("partnership_irchad.conclusion_title")}
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          {t("partnership_irchad.conclusion_text")}
        </p>
      </div>
    </section>
  );
}
