import React from 'react';
import { useTranslation } from 'react-i18next';
import CountUp from 'react-countup';

const Entrepreneuriat = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language && i18n.language.toLowerCase().startsWith('ar');

  return (
    <section className="py-4 px-6 bg-gray-100 mt-4 text-gray-800">
      <style>{`
        .arabic-text { direction: rtl; text-align: right; font-family: 'Noto Sans Arabic', 'Arial', sans-serif; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        .fade-in { animation: fadeIn .6s ease-out both }
        .fade-in-up { animation: fadeInUp .7s ease-out both }
        @keyframes bounceIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .bounce-in { animation: bounceIn 0.6s ease-out both }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 fade-in-up" style={{ animationDelay: '0s' }}>
          <h1 className={`text-[30px] md:text-5xl font-extrabold text-[#1C398E] mb-4 leading-tight ${isAr ? 'arabic-text' : ''}`}>
            {t('entrepreneurship.header_title')}
          </h1>
          <span className="block w-32 h-1 bg-blue-700 mx-auto mt-2 rounded-full"></span>
        </div>

        {/* Main Paragraph */}
        <div className="fade-in-up mb-12" style={{ animationDelay: '0.05s' }}>
          <div className="bg-white text-gray-700 shadow-lg rounded-2xl p-8 border border-gray-200 max-w-4xl mx-auto">
          <p className={`text-base sm:text-lg leading-relaxed text-justify ${isAr ? 'arabic-text' : ''}`}> 
            {t('entrepreneurship.intro1')}
          </p>
          <p className={`text-base sm:text-lg leading-relaxed mt-4 text-justify ${isAr ? 'arabic-text' : ''}`}>
            {t('entrepreneurship.intro2')}
          </p>
          </div>
        </div>

        {/* Images Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-4 h-64 border border-gray-200 fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-full h-full rounded-xl flex items-center justify-center bg-gray-50">
                <span className="text-gray-700 text-lg font-medium">{t('image_label', { index: 1 })}</span>
              </div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-4 h-64 border border-gray-200 fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="w-full h-full rounded-xl flex items-center justify-center bg-gray-50">
                <span className="text-gray-700 text-lg font-medium">{t('image_label', { index: 2 })}</span>
              </div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-4 h-64 border border-gray-200 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-full h-full rounded-xl flex items-center justify-center bg-gray-50">
                <span className="text-gray-700 text-lg font-medium">{t('image_label', { index: 3 })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8 fade-in-up" style={{ animationDelay: '0.25s' }}>
          <h2 className={`text-[30px] font-extrabold text-[#1C398E] leading-tight ${isAr ? 'arabic-text' : ''}`}>
            {t('entrepreneurship.section_title')}
          </h2>
          <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
        </div>

        {/* Two Cards Section */}
        <div className="mb-16 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {/* First Card */}
            <div className="group flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 transition-colors hover:scale-105 hover:shadow-2xl hover:bg-[#1C398E] hover:text-white border border-gray-200 hover:border-[#1C398E] hover:ring-2 hover:ring-[#1C398E] fade-in-up" style={{ animationDelay: '0.35s' }}>
              <div className="text-5xl text-blue-700 group-hover:text-white transition-colors duration-300 mb-4">📊</div>
              <p className={`text-[18px] text-justify leading-relaxed ${isAr ? 'arabic-text' : ''}`}>
                {t('entrepreneurship.methodology')}
              </p>
            </div>

            {/* Second Card */}
            <div className="group flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 transition-colors hover:scale-105 hover:shadow-2xl hover:bg-[#1C398E] hover:text-white border border-gray-200 hover:border-[#1C398E] hover:ring-2 hover:ring-[#1C398E] fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-5xl text-blue-700 group-hover:text-white transition-colors duration-300 mb-4">🎓</div>
              <p className={`text-[18px] text-justify leading-relaxed ${isAr ? 'arabic-text' : ''}`}>
                {t('entrepreneurship.pedagogy')}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-16 fade-in-up" style={{ animationDelay: '0.45s' }}>
          <div className="text-center mb-8">
            <h2 className={`text-[30px] font-bold mb-4 text-[#1C398E] leading-tight ${isAr ? 'arabic-text' : ''}`}>
              {t('statistics.title')}
            </h2>
            <span className="block w-32 h-1 bg-blue-700 mx-auto rounded-full"></span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {/* Card 1 */}
            <div className="bg-[#1C398E] text-white rounded-xl p-8 shadow-lg flex flex-col items-center fade-in-up" style={{ animationDelay: '0.5s' }}>
                <p className="text-6xl font-extrabold mb-2">
                  <CountUp end={parseInt(t('statistics.card1.number'))} duration={2.5} enableScrollSpy={true} scrollSpyOnce={true} />
                </p>
                <p className="text-[18px] font-medium text-center arabic-text">
                  {t('statistics.card1.text')}
                </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1C398E] text-white rounded-xl p-8 shadow-lg flex flex-col items-center fade-in-up" style={{ animationDelay: '0.6s' }}>
                <p className="text-6xl font-extrabold mb-2">
                  <CountUp end={parseInt(t('statistics.card2.number'))} duration={2.5} enableScrollSpy={true} scrollSpyOnce={true} />
                </p>
                <p className="text-[18px] font-medium text-center arabic-text">
                  {t('statistics.card2.text')}
                </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1C398E] text-white rounded-xl p-8 shadow-lg flex flex-col items-center fade-in-up" style={{ animationDelay: '0.7s' }}>
                <p className="text-6xl font-extrabold mb-2">
                  <CountUp end={parseInt(t('statistics.card3.number'))} duration={2.5} enableScrollSpy={true} scrollSpyOnce={true} />
                </p>
                <p className="text-[18px] font-medium text-center arabic-text">
                  {t('statistics.card3.text')}
                </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#1C398E] text-white rounded-xl p-8 shadow-lg flex flex-col items-center fade-in-up" style={{ animationDelay: '0.8s' }}>
                <p className="text-6xl font-extrabold mb-2">
                  <CountUp end={parseInt(t('statistics.card4.number'))} duration={2.5} enableScrollSpy={true} scrollSpyOnce={true} />
                </p>
                <p className="text-[18px] font-medium text-center arabic-text">
                  {t('statistics.card4.text')}
                </p>
            </div>
          </div>
        </div>

        {/* Stages Section */}
        <div className="mb-16 fade-in-up" style={{ animationDelay: '0.55s' }}>
          <div className="text-center mb-8">
            <h2 className={`text-[30px] font-extrabold text-[#1C398E] mb-2 leading-tight ${isAr ? 'arabic-text' : ''}`}>
              {t('entrepreneurship.stages.title')}
            </h2>
            <span className="block w-40 h-1 bg-blue-700 mx-auto rounded-full"></span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {/* Stage Card 1 */}
            <div
              className="flex flex-col items-center bg-[#FCBD18] text-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 fade-in-up bounce-in"
              style={{ animationDelay: '0s' }}
            >
              <div className="text-5xl text-white mb-4">💡</div>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-white text-center ${isAr ? 'arabic-text' : ''}`}>{t('entrepreneurship.stages.card1.title')}</h3>
              <p className={`text-[18px] text-center text-justify leading-relaxed text-white ${isAr ? 'arabic-text' : ''}`}>{t('entrepreneurship.stages.card1.text')}</p>
            </div>

            {/* Stage Card 2 */}
            <div
              className="flex flex-col items-center bg-[#70499E] text-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 fade-in-up bounce-in"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="text-5xl text-white mb-4">📝</div>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-white text-center ${isAr ? 'arabic-text' : ''}`}>{t('entrepreneurship.stages.card2.title')}</h3>
              <p className={`text-[18px] text-center text-justify leading-relaxed text-white ${isAr ? 'arabic-text' : ''}`}>{t('entrepreneurship.stages.card2.text')}</p>
            </div>

            {/* Stage Card 3 */}
            <div
              className="flex flex-col items-center bg-[#56B04A] text-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 fade-in-up bounce-in"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="text-5xl text-white mb-4">🏗️</div>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-white text-center ${isAr ? 'arabic-text' : ''}`}>{t('entrepreneurship.stages.card3.title')}</h3>
              <p className={`text-[18px] text-center text-justify leading-relaxed text-white ${isAr ? 'arabic-text' : ''}`}>{t('entrepreneurship.stages.card3.text')}</p>
            </div>

            {/* Stage Card 4 */}
            <div
              className="flex flex-col items-center bg-[#1B7CC1] text-white shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 fade-in-up bounce-in"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="text-5xl text-white mb-4">📈</div>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold mb-2 text-white text-center ${isAr ? 'arabic-text' : ''}`}>{t('entrepreneurship.stages.card4.title')}</h3>
              <p className={`text-[18px] text-center text-justify leading-relaxed text-white ${isAr ? 'arabic-text' : ''}`}>{t('entrepreneurship.stages.card4.text')}</p>
            </div>
          </div>
        </div>

        {/* Additional Images Section */}
        <div className="mb-12 fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-4 h-48 border border-gray-200 fade-in-up" style={{ animationDelay: '0.65s' }}>
              <div className="w-full h-full rounded-xl flex items-center justify-center bg-gray-50">
                <span className="text-gray-700 text-lg font-medium">{t('image_label', { index: 4 })}</span>
              </div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-4 h-48 border border-gray-200 fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="w-full h-full rounded-xl flex items-center justify-center bg-gray-50">
                <span className="text-gray-700 text-lg font-medium">{t('image_label', { index: 5 })}</span>
              </div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-4 h-48 border border-gray-200 fade-in-up" style={{ animationDelay: '0.75s' }}>
              <div className="w-full h-full rounded-xl flex items-center justify-center bg-gray-50">
                <span className="text-gray-700 text-lg font-medium">{t('image_label', { index: 6 })}</span>
              </div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-4 h-48 border border-gray-200 fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div className="w-full h-full rounded-xl flex items-center justify-center bg-gray-50">
                <span className="text-gray-700 text-lg font-medium">{t('image_label', { index: 7 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Entrepreneuriat;
