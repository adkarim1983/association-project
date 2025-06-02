import { useEffect, useState } from "react";
import logo from "../assets/logo.png"; 

export default function Activities() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const activities = [
    {
      title: "Éducation",
      description:
        "Soutien scolaire, alphabétisation et programmes éducatifs pour enfants défavorisés.",
      // color: "from-blue-500 to-indigo-500",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq3.jpg",
    },
    {
      title: "Aide sociale",
      description:
        "Distribution de nourriture, vêtements et soutien aux familles vulnérables.",
      // color: "from-rose-500 to-pink-400",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq2.jpg",
    },
    {
      title: "Développement communautaire",
      description:
        "Rénovation de quartiers, création d'espaces publics et projets d'inclusion sociale.",
      // color: "from-emerald-500 to-green-400",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq6.jpg",
    },
    {
      title: "Formation professionnelle",
      description:
        "Initiation à l'artisanat, à l'informatique, à la couture et à la cuisine.",
      // color: "from-orange-500 to-yellow-400",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq5.jpg",
    },
    {
      title: "Environnement",
      description:
        "Actions de reboisement, sensibilisation écologique et gestion des déchets.",
      // color: "from-teal-500 to-cyan-400",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq1.jpg",
    },
    {
      title: "Innovation sociale",
      description:
        "Hackathons, idées innovantes et incubation de projets à impact social.",
      // color: "from-purple-500 to-fuchsia-400",
      image: "https://associationnajm.ma/wp-content/uploads/2024/12/qq4.jpg",
    },
  ];

  return (
   <section
  id="activites"className="py-20 bg-cover bg-center bg-no-repeat"style={{backgroundImage: `url(${logo})`,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backgroundBlendMode: "lighten",
    
  }}
>
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800">
            Nos Activités
          </h2>
          <p className="mt-4 text-slate-600 max-w-xl mx-auto">
            Des actions concrètes, ciblées et durables au service de la communauté.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {activities.map((activity, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-3xl overflow-hidden shadow-lg group hover:shadow-2xl transition`}
            >
              <div className="relative">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${activity.color} opacity-70 group-hover:opacity-60 transition`}
                ></div>
              </div>
              <div className="p-6 relative z-10 bg-white">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {activity.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
