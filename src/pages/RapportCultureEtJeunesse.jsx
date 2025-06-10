
import React from "react";
import image31 from "../assets/image31.jpg";
import image30 from "../assets/image30.jpg";
import image34 from "../assets/image34.jpg";
import { useTranslation } from "react-i18next";

export default function RapportCultureEtJeunesse() {
  const { t } = useTranslation();
  return (
     <section className="py-16 px-6 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Bloc 1 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img src={image31} alt="Event 1" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-green-700">{t("coop_event_1_title")}</h2>
            <p className="text-justify">{t("coop_event_1_p1")}</p>
            <p className="text-justify">{t("coop_event_1_p2")}</p>
            <p className="text-justify">{t("coop_event_1_p3")}</p>
          </div>
        </div>

        {/* Bloc 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <img src={image30} alt="Event 2" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-green-700">{t("coop_event_2_title")}</h2>
            <p className="text-justify">{t("coop_event_2_p1")}</p>
            <p className="text-justify">{t("coop_event_2_p2")}</p>
          </div>
        </div>

        {/* Bloc 3 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img src={image34} alt="Event 3" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-green-700">{t("coop_event_3_title")}</h2>
            <ul className="list-disc pl-5 space-y-2 text-justify">
              <li>{t("coop_event_3_ul1")}</li>
              <li>{t("coop_event_3_ul2")}</li>
              <li>{t("coop_event_3_ul3")}</li>
            </ul>
            <p className="text-justify">{t("coop_event_3_end")}</p>
          </div>
        </div>

      </div>
    </section>
  );
}
