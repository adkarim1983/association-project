import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Composant pour animer les chiffres
function AnimatedNumber({ targetNumber, duration = 2000, suffix = "" }) {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const increment = targetNumber / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          setCurrentNumber(targetNumber);
          clearInterval(timer);
        } else {
          setCurrentNumber(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, targetNumber, duration]);

  return (
    <span ref={ref}>
      {currentNumber}{suffix}
    </span>
  );
}

export default function NajmStatsSection() {
  const { t } = useTranslation();

  const stats = [
    {
      number: 25,
      suffix: '+',
      label: t('stats_1_label'),
      icon: (
        <svg className="w-10 h-10 text-[#1C398E] mb-4 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      number: 500,
      suffix: '+',
      label: t('stats_2_label'),
      icon: (
        <svg className="w-10 h-10 text-[#1C398E] mb-4 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2" />
          <path d="M12 9a4 4 0 100-8 4 4 0 000 8z" />
          <path d="M12 21c-4.418 0-8-1.79-8-4v-2a4 4 0 014-4h8a4 4 0 014 4v2c0 2.21-3.582 4-8 4z" />
        </svg>
      )
    },
    {
      number: 100,
      suffix: '+',
      label: t('stats_3_label'),
      icon: (
        <svg className="w-10 h-10 text-[#1C398E] mb-4 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 7h18M3 12h18M3 17h18" />
        </svg>
      )
    },
  ];

  return (
    <>
    <section className="bg-blue-50 py-16 px-6 mx-6 rounded-lg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#1C398E] mb-10 leading-tight">
          {t('stats_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((item, index) => (
            <div key={index} className="group bg-white p-8 rounded-xl shadow hover:shadow-xl hover:bg-[#1C398E] transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center">{item.icon}</div>
              <p className="text-4xl font-bold text-[#1C398E] group-hover:text-white mb-2 transition-colors duration-300">
                <AnimatedNumber targetNumber={item.number} duration={2000} />
                {item.suffix}
              </p>
              <p className="text-lg font-medium text-slate-700 group-hover:text-white transition-colors duration-300">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
     {/* POUR TESTER LA PAGE D ACCUEIL */}
          

     {/* POUR TESTER LA PAGE D ACCUEIL */}
    </section>

    {/* Section: Statistiques de l'Académie Najm pour les Métiers du Numérique */}
    <section className="py-4 px-6 bg-gray-50 mt-4 text-gray-800 shadow-inner-xl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[30px] font-extrabold text-[#1C398E] mb-8 text-center leading-tight">
          {t("academieNajm.digitalAcademyStats.title")}
          <span className="block w-32 h-1 bg-[#1C398E] mx-auto mt-4 rounded-full"></span>
        </h2>

        <p className="text-[18px] sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
          {t("academieNajm.digitalAcademyStats.text")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {(t("academieNajm.digitalAcademyStats.stats", { returnObjects: true }) || []).map((stat, index) => {
            const digitalAcademyStatsValues = t("academieNajm.digitalAcademyStats.statsValues", { returnObjects: true }) || [];
            // Extraire le nombre de la chaîne (en supposant que les valeurs sont comme "25", "150", etc.)
            const numericValue = parseInt(digitalAcademyStatsValues[index]?.replace(/[^0-9]/g, '') || '0');
            const suffix = digitalAcademyStatsValues[index]?.replace(/[0-9]/g, '') || '';
            
            return (
              <div key={index} className="bg-[#1C398E] text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">
                  <AnimatedNumber targetNumber={numericValue} duration={2000} suffix={suffix} />
                </p>
                <p className="text-[18px] font-medium text-center">{stat}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Section: Résultats Clés (Année 2024) */}
    <section className="py-4 px-6 bg-gray-50 mt-4 text-gray-800 shadow-inner-xl">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-[30px] font-bold mb-8 text-[#1C398E] text-center leading-tight">
          {t("academieNajm.entrepreneurship.resultsTitle")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {(t("academieNajm.entrepreneurship.stats", { returnObjects: true }) || []).map((stat, index) => {
            const entrepreneurshipStatsValues = t("academieNajm.entrepreneurship.statsValues", { returnObjects: true }) || [];
            // Extraire le nombre de la chaîne (en supposant que les valeurs sont comme "25", "150", etc.)
            const numericValue = parseInt(entrepreneurshipStatsValues[index]?.replace(/[^0-9]/g, '') || '0');
            const suffix = entrepreneurshipStatsValues[index]?.replace(/[0-9]/g, '') || '';
            
            return (
              <div key={index} className="bg-[#1C398E] text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">
                  <AnimatedNumber targetNumber={numericValue} duration={2000} suffix={suffix} />
                </p>
                <p className="text-[18px] font-medium text-center">{stat}</p>
              </div>
            );
          })}
        </div>
        <p className="text-[18px] opacity-85 mt-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
          {t("academieNajm.entrepreneurship.renewalText")}
        </p>
      </div>
    </section>

    {/* Section: Objectifs de l'Académie Najm */}
    <section className="bg-gray-50 py-4 mt-4 px-6 sm:px-8 lg:px-10 text-gray-800 shadow-inner-xl">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-[30px] font-extrabold text-[#1C398E] mb-8 text-center leading-tight">
          {t("academieNajm.objectives.title")}
          <span className="block w-32 h-1 bg-[#1C398E] mx-auto mt-4 rounded-full"></span>
        </h2>

        <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
          {t("academieNajm.objectives.text")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {(t("academieNajm.objectives.list", { returnObjects: true }) || []).map((objective, index) => (
            <div key={index} className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="text-6xl font-extrabold text-[#1C398E] mb-6 drop-shadow-sm">
                  {`0${index + 1}`}
                </div>
                <p className="text-[18px] text-center leading-relaxed opacity-90 text-gray-700 text-justify">
                  {objective}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
