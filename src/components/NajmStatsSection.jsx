import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Composant pour animer les chiffres
function AnimatedNumber({ targetNumber, duration = 2000 }) {
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
      {currentNumber}
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
    
    
  );
}
