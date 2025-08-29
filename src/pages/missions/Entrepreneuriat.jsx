import React from 'react';
import { useTranslation } from 'react-i18next';
import CountUp from 'react-countup';

const Entrepreneuriat = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language && i18n.language.toLowerCase().startsWith('ar');
  
  // Collect images from assets/imgEntr and pick 10 random ones (reuse if fewer than 10 exist)
  const allImages = React.useMemo(() => {
    const modules = import.meta.glob('/src/assets/imgEntr/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, as: 'url' });
    // modules is an object: { path: url }
    return Object.entries(modules).map(([path, url]) => {
      const filename = path.split('/').pop() || '';
      const name = filename.replace(/\.[^.]+$/, '');
      const display = name.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
      return { url, name, display };
    });
  }, []);

  const randomImages = React.useMemo(() => {
    if (!allImages || allImages.length === 0) return [];
    const picks = [];
    for (let i = 0; i < 10; i++) {
      const idx = Math.floor(Math.random() * allImages.length);
      picks.push(allImages[idx]);
    }
    return picks;
  }, [allImages]);

  // Simple modal to enlarge images
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalSrc, setModalSrc] = React.useState(null);

  const openModal = (src) => {
    if (!src) return;
    setModalSrc(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalSrc(null);
  };

  // Close on ESC
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (isModalOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen]);

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

        {/* Title above first images section */}
        <div className="text-center mb-6 fade-in-up" style={{ animationDelay: '0.08s' }}>
          <h2 className={`text-[30px] font-extrabold text-[#1C398E] leading-tight ${isAr ? 'arabic-text' : ''}`}>
            {t('entrepreneurship.workshops_gallery_title', 'Nos ateliers en images')}
          </h2>
          <span className="block w-24 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></span>
        </div>

        {/* Images Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-72 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.1s' }}>
              <img onClick={() => openModal(randomImages[0]?.url)} src={randomImages[0]?.url} alt={randomImages[0]?.display || randomImages[0]?.name || 'image 1'} className="w-full h-[88%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-2 text-center text-sm text-gray-600 truncate">{randomImages[0]?.display || randomImages[0]?.name || 'Image 1'}</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-72 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.15s' }}>
              <img onClick={() => openModal(randomImages[1]?.url)} src={randomImages[1]?.url} alt={randomImages[1]?.display || randomImages[1]?.name || 'image 2'} className="w-full h-[88%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-2 text-center text-sm text-gray-600 truncate">{randomImages[1]?.display || randomImages[1]?.name || 'Image 2'}</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-72 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <img onClick={() => openModal(randomImages[2]?.url)} src={randomImages[2]?.url} alt={randomImages[2]?.display || randomImages[2]?.name || 'image 3'} className="w-full h-[88%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-2 text-center text-sm text-gray-600 truncate">{randomImages[2]?.display || randomImages[2]?.name || 'Image 3'}</div>
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

        {/* Galerie Title (separator between the two image sections) */}
        <div className="text-center mb-6 fade-in-up" style={{ animationDelay: '0.58s' }}>
          <h2 className={`text-[30px] font-extrabold text-[#1C398E] leading-tight ${isAr ? 'arabic-text' : ''}`}>
            {t('entrepreneurship.gallery_title', 'Galerie')}
          </h2>
          <span className="block w-24 h-1 bg-blue-700 mx-auto mt-3 rounded-full"></span>
        </div>

        {/* Additional Images Section */}
        <div className="mb-12 fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-56 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.65s' }}>
              <img onClick={() => openModal(randomImages[3]?.url)} src={randomImages[3]?.url} alt={randomImages[3]?.display || randomImages[3]?.name || 'image 4'} className="w-full h-[85%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-1 text-center text-xs text-gray-600 truncate">{randomImages[3]?.display || randomImages[3]?.name || 'Image 4'}</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-56 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.7s' }}>
              <img onClick={() => openModal(randomImages[4]?.url)} src={randomImages[4]?.url} alt={randomImages[4]?.display || randomImages[4]?.name || 'image 5'} className="w-full h-[85%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-1 text-center text-xs text-gray-600 truncate">{randomImages[4]?.display || randomImages[4]?.name || 'Image 5'}</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-56 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.75s' }}>
              <img onClick={() => openModal(randomImages[5]?.url)} src={randomImages[5]?.url} alt={randomImages[5]?.display || randomImages[5]?.name || 'image 6'} className="w-full h-[85%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-1 text-center text-xs text-gray-600 truncate">{randomImages[5]?.display || randomImages[5]?.name || 'Image 6'}</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-56 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.8s' }}>
              <img onClick={() => openModal(randomImages[6]?.url)} src={randomImages[6]?.url} alt={randomImages[6]?.display || randomImages[6]?.name || 'image 7'} className="w-full h-[85%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-1 text-center text-xs text-gray-600 truncate">{randomImages[6]?.display || randomImages[6]?.name || 'Image 7'}</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-56 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.85s' }}>
              <img onClick={() => openModal(randomImages[7]?.url)} src={randomImages[7]?.url} alt={randomImages[7]?.display || randomImages[7]?.name || 'image 8'} className="w-full h-[85%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-1 text-center text-xs text-gray-600 truncate">{randomImages[7]?.display || randomImages[7]?.name || 'Image 8'}</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-56 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.9s' }}>
              <img onClick={() => openModal(randomImages[8]?.url)} src={randomImages[8]?.url} alt={randomImages[8]?.display || randomImages[8]?.name || 'image 9'} className="w-full h-[85%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-1 text-center text-xs text-gray-600 truncate">{randomImages[8]?.display || randomImages[8]?.name || 'Image 9'}</div>
            </div>
            <div className="bg-white text-gray-800 shadow-lg rounded-xl p-2 h-56 border border-gray-200 fade-in-up overflow-hidden" style={{ animationDelay: '0.95s' }}>
              <img onClick={() => openModal(randomImages[9]?.url)} src={randomImages[9]?.url} alt={randomImages[9]?.display || randomImages[9]?.name || 'image 10'} className="w-full h-[85%] object-cover rounded-lg cursor-zoom-in" loading="lazy" />
              <div className="mt-1 text-center text-xs text-gray-600 truncate">{randomImages[9]?.display || randomImages[9]?.name || 'Image 10'}</div>
            </div>
          </div>
        </div>

        {/* Modal for enlarged image */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeModal}
                className="absolute -top-3 -right-3 bg-white text-gray-700 rounded-full w-9 h-9 shadow flex items-center justify-center hover:bg-gray-100"
                aria-label="Close"
              >
                ✕
              </button>
              <img src={modalSrc || ''} alt="preview" className="w-full max-h-[80vh] object-contain rounded-lg" />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Entrepreneuriat;
