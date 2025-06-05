import { useState } from "react";

export default function CarouselActivites() {
  const activities = [
    {
      title: "Éducation",
      description:
        "Soutien scolaire, alphabétisation et programmes éducatifs pour enfants défavorisés.",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq3.jpg",
    },
    {
      title: "Aide sociale",
      description:
        "Distribution de nourriture, vêtements et soutien aux familles vulnérables.",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq2.jpg",
    },
    {
      title: "Développement communautaire",
      description:
        "Rénovation de quartiers, création d'espaces publics et projets d'inclusion sociale.",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq6.jpg",
    },
    {
      title: "Formation professionnelle",
      description:
        "Initiation à l'artisanat, à l'informatique, à la couture et à la cuisine.",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq5.jpg",
    },
    {
      title: "Environnement",
      description:
        "Actions de reboisement, sensibilisation écologique et gestion des déchets.",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq1.jpg",
    },
    {
      title: "Innovation sociale",
      description:
        "Hackathons, idées innovantes et incubation de projets à impact social.",
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
    <section className="py-16 mx-6 bg-gray-100 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 relative">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">Nos Activités</h2>

        <div className="flex items-center justify-between gap-4">
          {/* Flèche gauche */}
          <button
            onClick={prevSlide}
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full border border-blue-200 bg-white shadow"
            disabled={index === 0}
          >
            ◀
          </button>

          {/* Cartes visibles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
            {visibleCards.map((activity, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Flèche droite */}
          <button
            onClick={nextSlide}
            className="text-blue-600 hover:text-blue-800 p-2 rounded-full border border-blue-200 bg-white shadow"
            disabled={index + 3 >= activities.length}
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
