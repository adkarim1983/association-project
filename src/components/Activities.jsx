import { useEffect, useRef } from "react";

export default function Activities() {
  const scrollRef = useRef(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 4000); // toutes les 4 secondes

    return () => clearInterval(interval);
  }, []);

  const activities = [
    {
      title: "Éducation",
      description:
        "Programmes éducatifs pour les enfants défavorisés, cours d'alphabétisation et soutien scolaire.",
      details:
        "Soutien scolaire, bourses, fournitures scolaires, activités parascolaires.",
    },
    {
      title: "Aide sociale",
      description:
        "Distribution de nourriture, vêtements et fournitures aux familles dans le besoin.",
      details:
        "Caravanes médicales, aides aux personnes âgées et aux orphelins.",
    },
    {
      title: "Développement communautaire",
      description:
        "Projets d'infrastructure et cohésion sociale dans les quartiers défavorisés.",
      details:
        "Rénovation d’écoles, création d’espaces communautaires.",
    },
    {
      title: "Formation professionnelle",
      description:
        "Ateliers de compétences et soutien à l'entrepreneuriat local.",
      details:
        "Informatique, artisanat, couture, cuisine pour générer des revenus.",
    },
    {
      title: "Environnement",
      description:
        "Sensibilisation, reboisement et gestion des déchets.",
      details:
        "Nettoyages, jardinage communautaire, éducation écologique.",
    },
    {
      title: "Innovation sociale",
      description:
        "Défis sociaux, hackathons et incubation d’idées innovantes.",
      details:
        "Concours d’idées, accompagnement des jeunes entrepreneurs sociaux.",
    },
  ];

  return (
    <section id="activites" className="pt-8 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">
            Nos activités
          </h2>
          <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg">
            Découvrez les domaines dans lesquels nous intervenons pour soutenir les communautés locales.
          </p>
        </div>

        <div className="relative">
          {/* Flèche gauche */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 text-gray-800 p-2 rounded-full shadow-md transition duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carrousel horizontal */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 mx-40 scroll-smooth scrollbar-hide gap-6"
          >
            {activities.map((activity, index) => (
              <div
                key={index}
                className="min-w-[340px] mb-8 bg-white border border-slate-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-amber-50 p-4 inline-flex rounded-2xl mb-6">
                  <svg
                    className="w-10 h-10 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.42 1.42M6.34 17.66l-1.42 1.42m12.02 0l1.42-1.42M6.34 6.34L4.92 4.92" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{activity.title}</h3>
                <p className="text-slate-600 mb-4">{activity.description}</p>
                <p className="text-slate-500 text-sm">{activity.details}</p>
              </div>
            ))}
          </div>

          {/* Flèche droite */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white/80 text-gray-800 p-2 rounded-full shadow-md transition duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
