import React from 'react';
import { useTranslation } from 'react-i18next';

import CountUp from 'react-countup';

const EconomieSociale = () => {
  const { t } = useTranslation();

  const socialEconomyCards = t("academieNajm.socialEconomy.cards", { returnObjects: true }) || [];
  const socialEconomyStats = t("academieNajm.socialEconomy.stats", { returnObjects: true }) || [];
  const socialEconomyStatsValues = t("academieNajm.socialEconomy.statsValues", { returnObjects: true }) || [];

  return (
    <section className="py-4 px-6 bg-gray-100 mt-4 text-gray-800 shadow-inner-xl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[30px] font-extrabold text-[#1C398E] mb-8 text-center leading-tight">
          {t("academieNajm.socialEconomy.title")}
          <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
        </h2>

        <p
          className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify"
          dangerouslySetInnerHTML={{ __html: t("academieNajm.socialEconomy.text") }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {socialEconomyCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              <div className="text-5xl text-blue-700 mb-4">
                <i
                  className={
                    index === 0
                      ? "fas fa-hands-helping"
                      : index === 1
                      ? "fas fa-chart-line"
                      : index === 2
                      ? "fas fa-money-bill-wave"
                      : "fas fa-sync-alt"
                  }
                ></i>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-[#1C398E] text-center">
                {card.title}
              </h3>
              <p className="text-[18px] text-center text-justify leading-relaxed text-gray-700">{card.text}</p>
            </div>
          ))}
        </div>

        <h3 className="text-[30px] font-bold mb-8 text-[#1C398E] text-center leading-tight">
          {t("academieNajm.socialEconomy.statsTitle")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {socialEconomyStats.map((stat, index) => (
            <div key={index} className="bg-[#1C398E] text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
              <p className="text-6xl font-extrabold mb-2">
                <CountUp
                  end={parseInt(socialEconomyStatsValues[index], 10)}
                  duration={2.5}
                  separator={t("lng") === "ar" ? " " : " "}
                  formattingFn={(value) =>
                    t("lng") === "ar" ? value.toLocaleString('ar-MA') : value.toLocaleString('fr-FR')
                  }
                  enableScrollSpy={true}
                  scrollSpyOnce={true}
                />
              </p>
              <p className="text-[18px] font-medium text-center">{stat}</p>
            </div>
          ))}
        </div>

        <p className="text--[18px]  opacity-85 mt-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
          {t("academieNajm.socialEconomy.renewalText")}
        </p>
      </div>
    </section>
  );
};

export default EconomieSociale;
