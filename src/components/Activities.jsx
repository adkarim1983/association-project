import { useState } from "react";
import { useTranslation } from "react-i18next";
import RapportActivites2024 from "../pages/RapportActivites2024";
import RapportCultureEtJeunesse from "../pages/RapportCultureEtJeunesse";
import RapportSolidariteDev from "../pages/RapportSolidariteDev";

export default function CarouselActivites() {
  const { t } = useTranslation();
  const activities = [
    {
      title: t("activities.education.title"),
      description: t("activities.education.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq3.jpg",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      title: t("activities.social.title"),
      description: t("activities.social.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq2.jpg",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: t("activities.community.title"),
      description: t("activities.community.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq6.jpg",
      gradient: "from-amber-500 to-yellow-300"
    },
    {
      title: t("activities.training.title"),
      description: t("activities.training.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq5.jpg",
      gradient: "from-emerald-500 to-teal-400"
    },
    {
      title: t("activities.environment.title"),
      description: t("activities.environment.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq1.jpg",
      gradient: "from-rose-500 to-pink-400"
    },
    {
      title: t("activities.innovation.title"),
      description: t("activities.innovation.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq4.jpg",
      gradient: "from-indigo-500 to-blue-400"
    },
  ];

  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const nextSlide = () => {
    if (index + 3 < activities.length) setIndex(index + 3);
  };

  const prevSlide = () => {
    if (index - 3 >= 0) setIndex(index - 3);
  };

  const handleReadMore = (cardIndex) => {
    // Seules les 3 premières cartes ont du contenu
    if (cardIndex < 3) {
      setSelectedCard(cardIndex);
      setShowModal(true);
    }
  };

  const visibleCards = activities.slice(index, index + 3);

  return (
    <section className="relative py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {t("activities.title")}
            </span>
          </h2> */}
          <h2 className="relative inline-block font-bold mb-4 text-[30px] text-[#1C398E]">
            {t("activities.title")}
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mb-2"></div>
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos différentes activités et engagements
          </p> */}
        </div>

        {/* Desktop Cards */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {visibleCards.map((activity, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image with gradient overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent`}></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{activity.title}</h3>
                  <div className={`w-12 h-1 bg-gradient-to-r ${activity.gradient} mb-3 rounded-full`}></div>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {activity.description}
                </p>
                <button 
                  onClick={() => handleReadMore(i + index)}
                  className={`flex items-center text-sm font-medium transition-colors ${i + index < 3 ? 'text-blue-600 group-hover:text-blue-700 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
                  disabled={i + index >= 3}
                >
                  <span>En savoir plus</span>
                  <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Decorative elements */}
              <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${activity.gradient}`}></div>
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${activity.gradient} opacity-10 rounded-bl-3xl`}></div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-6">
          {activities.map((activity, i) => (
            <div
              key={i}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-0 left-0 right-0 p-4 text-xl font-bold text-white">
                  {activity.title}
                </h3>
              </div>
              <div className="p-5">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal pour afficher les rapports */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Overlay */}
              <div 
                className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
                onClick={() => setShowModal(false)}
              ></div>

              {/* Modal content */}
              <div className="inline-block w-full max-w-6xl p-0 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {/* Header avec bouton de fermeture */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedCard === 0 && "Rapport d'Activités 2024"}
                    {selectedCard === 1 && "Rapport Culture et Jeunesse"}
                    {selectedCard === 2 && "Rapport Solidarité et Développement"}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Contenu du rapport */}
                <div className="max-h-[80vh] overflow-y-auto p-6">
                  {selectedCard === 0 && <RapportActivites2024 />}
                  {selectedCard === 1 && <RapportCultureEtJeunesse />}
                  {selectedCard === 2 && <RapportSolidariteDev />}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={prevSlide}
            disabled={index === 0}
            className={`p-2 rounded-full ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(activities.length / 3) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i * 3)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(index / 3) === i
                    ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={index + 3 >= activities.length}
            className={`p-2 rounded-full ${index + 3 >= activities.length ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
