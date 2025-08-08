import React from 'react';
import { useTranslation } from 'react-i18next';
import CountUp from 'react-countup';

const GestionPlateformes = () => {
  const { t } = useTranslation();
  
  const platformManagementCards = t("academieNajm.platformManagement.cards", { returnObjects: true }) || [];
  const platformManagementStats = t("academieNajm.platformManagement.stats", { returnObjects: true }) || [];
  const platformManagementStatsValues = t("academieNajm.platformManagement.statsValues", { returnObjects: true }) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('missions.gestion_plateformes')}
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Platform Management Content - Exact copy from Axe.jsx */}
        <section className="py-4 px-6 bg-gray-50 mt-0 text-gray-800 shadow-inner-xl">
          <div className="mt-10 max-w-7xl mx-auto text-center">
            <h2 className="text-[34px] font-extrabold text-[#1C398E] mb-8 text-center leading-tight">
              {t("academieNajm.platformManagement.title")}
              <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
            </h2>

            <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify"
              dangerouslySetInnerHTML={{ __html: t("academieNajm.platformManagement.text") }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {platformManagementCards.map((card, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 hover:bg-[#1C398E]"
                >
                  <div className="text-5xl text-blue-700 mb-4 group-hover:text-white">
                    <i className={index === 0 ? "fas fa-handshake" : index === 1 ? "fas fa-comments" : "fas fa-route"}></i>
                  </div>
                  <h3 className="text-[24px] font-semibold text-[#1C398E] mb-4 text-center leading-tight group-hover:text-white">
                    {card.title}
                  </h3>

                  <p className="text-lg leading-relaxed text-gray-700 text-justify group-hover:text-white">
                    {card.text}
                  </p>
                </div>
              ))}
            </div>

            <h3 className="text-[30px] font-bold text-[#1C398E] mb-8 text-center leading-tight">
              {t("academieNajm.platformManagement.statsTitle")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {platformManagementStats.map((stat, index) => (
                <div key={index} className="bg-[#1C398E] text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                  <p className="text-6xl font-extrabold mb-2">
                    <CountUp
                      end={parseInt(platformManagementStatsValues[index], 10)}
                      duration={2.5}
                      separator={t("lng") === "ar" ? " " : " "}
                      formattingFn={(value) => t("lng") === "ar" ? value.toLocaleString('ar-MA') : value.toLocaleString('fr-FR')}
                      enableScrollSpy={true}
                      scrollSpyOnce={true}
                    />
                  </p>
                  <p className="text-sm font-medium text-center">{stat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GestionPlateformes;
