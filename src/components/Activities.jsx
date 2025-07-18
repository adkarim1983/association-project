import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CarouselActivites() {
  const { t } = useTranslation();
  const activities = [
    {
      title: t("activities.education.title"),
      description: t("activities.education.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq3.jpg",
    },
    {
      title: t("activities.social.title"),
      description: t("activities.social.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq2.jpg",
    },
    {
      title: t("activities.community.title"),
      description: t("activities.community.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq6.jpg",
    },
    {
      title: t("activities.training.title"),
      description: t("activities.training.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq5.jpg",
    },
    {
      title: t("activities.environment.title"),
      description: t("activities.environment.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq1.jpg",
    },
    {
      title: t("activities.innovation.title"),
      description: t("activities.innovation.description"),
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq4.jpg",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index + 3 < activities.length) setIndex(index + 3);
  };

  const prevSlide = () => {
    if (index - 3 >= 0) setIndex(index - 3);
  };

  const visibleCards = activities.slice(index, index + 3);

  return (
    <section className="py-16 mx-1 sm:mx-2 md:mx-4 rounded-2xl" style={{ backgroundColor: '#EFF6FF' }}>
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-900 mb-12 text-center leading-tight">
          {t("activities.title")}
        </h2>

        {/* Desktop version avec flèches */}
        <div className="hidden md:flex items-center justify-between gap-6">
          <button
            onClick={prevSlide}
            className="text-blue-600 hover:text-blue-800 p-3 rounded-full border border-blue-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
            disabled={index === 0}
          >
            ◀
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 flex-1 mx-4">
            {visibleCards.map((activity, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-4 text-center leading-tight">
                    {activity.title}
                  </h3>
                  <p className="text-lg text-gray-600 text-justify leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="text-blue-600 hover:text-blue-800 p-3 rounded-full border border-blue-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0"
            disabled={index + 3 >= activities.length}
          >
            ▶
          </button>
        </div>

        {/* Mobile version scrollable horizontal */}
        <div className="md:hidden overflow-x-auto pb-2">
          <div className="flex gap-10 w-max px-2 scroll-smooth snap-x snap-mandatory">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="w-96 flex-shrink-0 bg-white rounded-xl shadow-lg overflow-hidden snap-start hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center md:text-left leading-tight">
                    {activity.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
