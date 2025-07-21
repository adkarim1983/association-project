
import React from "react";
import image36 from "../assets/image36.jpg"; // Replace with the correct image for this section
import { useTranslation } from "react-i18next";


export default function PartenariatIrchadFaculte() {
  const { t } = useTranslation();
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          {/* <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 drop-shadow-md">
            {t("partnership_section.title")}
          </h2> */}
          <h2 className="text-[36px] font-extrabold text-blue-900 mb-6 drop-shadow-md">
            {t("partnership_section.title")}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("partnership_section.subtitle")}
          </p>
        </div>

        <div className="rounded-xl overflow-hidden shadow-xl mb-12">
          <img src={image36} alt="Signature du partenariat" className="w-full h-96 object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-800 leading-relaxed">
          <div>
            {/* <h3 className="text-2xl font-bold text-blue-800 mb-4">
              {t("partnership_section.intro_title")}
            </h3> */}
            <h3 className="text-[30px] font-bold text-[#1C398E] mb-4">
              {t("partnership_section.intro_title")}
            </h3>

            <p className="text-justify">
              {t("partnership_section.intro_text")}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              {/* <h4 className="text-xl font-semibold text-blue-700">
                {t("partnership_section.objectives_title")}
              </h4> */}
              <h4 className="text-[30px] font-semibold text-[#1C398E]">
                {t("partnership_section.objectives_title")}
              </h4>

              <ul className="list-disc list-inside mt-3 space-y-2 text-justify">
                {t("partnership_section.objectives", { returnObjects: true }).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              {/* <h4 className="text-xl font-semibold text-blue-700">
                {t("partnership_section.perspectives_title")}
              </h4> */}
              <h4 className="text-[30px] font-semibold text-[#1C398E]">
  {t("partnership_section.perspectives_title")}
</h4>
              <p className="text-justify">
                {t("partnership_section.perspectives_text")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
