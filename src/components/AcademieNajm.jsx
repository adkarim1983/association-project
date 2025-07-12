import React, { useRef, useEffect } from "react";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import imagenum from "../assets/imagenum.jpg";
import logo from "../assets/logo.png";

const sections = [
  {
    image: image1,
    title: "Pour une transformation numérique inclusive au Maroc",
    text: `L’Association Najm pour l’inclusion économique croit que la transformation numérique représente à la fois un défi et une opportunité prometteuse pour le Maroc.\n\nLa faible accessibilité aux technologies modernes, le manque de formations adaptées et l’élargissement de la fracture numérique constituent parmi les principaux obstacles qui freinent l’intégration des jeunes dans l’économie numérique.\n\nPourtant, la numérisation offre de grandes possibilités pour stimuler l’entrepreneuriat, créer des opportunités d’emploi et dynamiser le tissu socio-économique, notamment au profit des jeunes non scolarisés, sans emploi et non bénéficiaires de formation, qui rencontrent de réelles difficultés d’insertion professionnelle.\n\nConsciente de cette réalité, l’Association Najm s’engage à accompagner les jeunes dans l’acquisition des compétences numériques, à poursuivre la numérisation des entreprises et à encourager l’innovation technologique. En concentrant ses efforts sur ces axes fondamentaux, l’association aspire à contribuer à la construction d’un modèle de développement plus inclusif.`,
    alt: "Jeunes marocains utilisant des outils numériques",
    buttonText: "Découvrir nos programmes",
    buttonLink: "#programmes",
  },
  {
    image: image4,
    title: "Une académie au service de l’avenir numérique du Maroc",
    text: `À travers cette Académie, l’Association Najm offre aux jeunes des opportunités d’insertion économique dans un secteur d’avenir : les métiers du numérique, parfaitement alignés avec le chantier royal de la transition digitale.`,
    alt: "Académie Najm pour l'avenir numérique",
  },
  {
    image: image5,
    title: "Vision stratégique de l’association",
    text: `Depuis sa création, l’Association Najm poursuit son développement pour renforcer l’insertion professionnelle et l’entrepreneuriat des jeunes.\n\nAvec une gouvernance rigoureuse, une équipe structurée et des outils de suivi performants, elle diversifie ses actions et adapte ses programmes aux mutations économiques et numériques.\n\nElle place la formation continue, les partenariats et l’accompagnement post-formation au cœur de sa stratégie durable.`,
    alt: "Vision stratégique de l'association Najm",
  },
];

function useScrollReveal() {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "-100px 0px",
        threshold: 0.1
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return ref;
}

export default function AcademieNajm() {
  const [showTop, setShowTop] = React.useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans relative overflow-hidden">
      {/* Header */}
      <header className="relative flex flex-col items-center justify-center h-64 sm:h-80 md:h-[450px] bg-white mb-0 shadow-md overflow-hidden px-4">
        <img
          src={imagenum}
          alt="Bannière Najm, jeunes et numérique"
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-blue-900/50" />
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-sm leading-tight text-white">
            Académie Najm pour les Métiers du Numérique
          </h1>
          <p className="text-xl md:text-2xl font-light italic drop-shadow-sm opacity-90 text-white">
            Promotion sociale par la numérisation
          </p>
        </div>
      </header>

      {/* Sections */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-4">
        {sections.map((section, idx) => {
          const sectionRef = useScrollReveal();
          return (
            <section
              key={idx}
              ref={sectionRef}
              className={`relative flex flex-col md:flex-row items-center gap-4 p-4 rounded-2xl shadow-xl bg-blue-950 text-gray-200 transform translate-y-20 opacity-0 transition-all duration-1000 ease-out is-revealed:translate-y-0 is-revealed:opacity-100
                ${idx % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2 w-full flex-shrink-0 relative group rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                <img
                  src={section.image}
                  alt={section.alt}
                  className="w-full h-80 object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent rounded-xl"></div>
              </div>
              <div className="md:w-1/2 w-full flex flex-col justify-center text-left">
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight relative">
                  {section.title}
                  <span className="absolute left-0 -bottom-3 w-20 h-1 bg-blue-700 rounded-full"></span>
                </h2>
                <p className="text-gray-300 whitespace-pre-line leading-relaxed text-base mb-6 text-justify">
                  {section.text}
                </p>
                {section.buttonText && (
                  <a
                    href={section.buttonLink}
                    className="inline-block self-start px-10 py-4 bg-blue-700 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-blue-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-950 uppercase tracking-wide"
                  >
                    {section.buttonText}
                  </a>
                )}
              </div>
            </section>
          );
        })}

        {/* Section: Gestion et Administration des Plateformes d'Orientation */}
        <section className="py-4 px-6 bg-gray-50 mt-0 text-gray-800 shadow-inner-xl">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-gray-900">
              Gestion et Administration des Plateformes d'Orientation
              <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
              L’Association Najm gère des plateformes d’orientation et d’emploi des jeunes dans les quartiers de Moulay Rachid depuis 2020, des espaces dédiés au soutien et à l’intégration économique des jeunes dans le cadre du Programme 3 de la troisième phase de l’Initiative Nationale pour le Développement Humain (INDH).
              <br/><br/>
              La plateforme d’orientation, grâce à son modèle de gestion développé par l’Association Najm, est devenue une référence dans l’intégration économique des jeunes, avec un engagement total envers l’esprit de l’INDH. Elle se distingue comme un espace dynamique qui rassemble diverses institutions, organismes et programmes dédiés aux jeunes.
              <br/><br/>
              L’Association Najm s’appuie sur une méthodologie de gouvernance efficace et transparente, basée sur des mécanismes de prise de décision clairs et fluides. L’association a élaboré un guide de procédures couvrant toutes les opérations de gestion, et elle vise à obtenir une certification de qualité pour ses processus administratifs et la reconnaissance en tant qu’association d’utilité publique.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Espace d'Accueil</h3>
                <p className="text-lg text-center leading-relaxed text-gray-700 text-justify">
                  C'est le premier point de contact avec les jeunes, dont la mission est de vérifier leur éligibilité et de leur présenter les différents programmes et services offerts par la plateforme.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-comments"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Espace d'Écoute</h3>
                <p className="text-lg text-center leading-relaxed text-gray-700 text-justify">
                  Dédié à l'écoute des jeunes et à l'analyse de leurs besoins, cet espace vise à identifier leurs ambitions et à évaluer leurs compétences par un diagnostic individuel, permettant une meilleure compréhension de leurs attentes professionnelles et personnelles.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-route"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Espace d'Orientation</h3>
                <p className="text-lg text-center leading-relaxed text-gray-700 text-justify">
                  Après l'évaluation des compétences, les jeunes sont orientés vers le programme le plus adapté à leurs ambitions futures, soit vers un prestataire de services interne à la plateforme, soit vers une autre institution partenaire externe correspondant à leurs besoins.
                </p>
              </div>
            </div>

            <h3 className="text-4xl font-bold mb-8 text-gray-900">Statistiques Clés (au 30 avril 2025)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">5580</p>
                <p className="text-sm font-medium text-center">Jeunes accueillis sur la plateforme</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">2872</p>
                <p className="text-sm font-medium text-center">Jeunes orientés vers l'économie sociale et solidaire</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">98</p>
                <p className="text-sm font-medium text-center">Jeunes orientés vers l'entrepreneuriat</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">610</p>
                <p className="text-sm font-medium text-center">Jeunes orientés vers le renforcement de l'employabilité</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">277</p>
                <p className="text-sm font-medium text-center">Jeunes orientés vers des programmes/partenaires externes</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">4826</p>
                <p className="text-sm font-medium text-center">Total jeunes bénéficiaires des services de la plateforme</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Renforcement des Compétences Parallèles des Jeunes */}
        <section className="py-4 px-6 bg-gray-100 mt-4 text-gray-800 shadow-inner-xl">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-gray-900">
              Renforcement des Compétences Parallèles des Jeunes
              <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
              L'Association Najm a élaboré une série de programmes de formation parallèles visant à renforcer les opportunités d'intégration professionnelle des jeunes. Ces formations sont des ateliers théoriques et pratiques destinés à doter les jeunes de compétences concrètes pour leur insertion professionnelle sur le marché du travail.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-brain"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Développement des Compétences Personnelles</h3>
                <p className="text-sm text-center leading-relaxed text-gray-700 text-justify">
                  Renforcement des compétences en communication, leadership et gestion du stress pour améliorer les opportunités d'emploi.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-search"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Techniques de Recherche d'Emploi</h3>
                <p className="text-sm text-center leading-relaxed text-gray-700 text-justify">
                  Comment rédiger un CV, techniques de réussite des entretiens d'embauche, et comment développer son réseau professionnel.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Sensibilisation à l'Entrepreneuriat</h3>
                <p className="text-sm text-center leading-relaxed text-gray-700 text-justify">
                  Concepts fondamentaux pour la création d'entreprises, la gestion de projets et l'innovation.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-users-cog"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Sensibilisation à l'Importance de la Création de Coopératives</h3>
                <p className="text-sm text-center leading-relaxed text-gray-700 text-justify">
                  Soutien à la création de coopératives soumises à la loi 112/12, et promotion du travail coopératif et solidaire.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Renforcement de l'Entrepreneuriat chez les Jeunes */}
        <section className="py-4 px-6 bg-gray-50 mt-4 text-gray-800 shadow-inner-xl">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-gray-900">
              Renforcement de l'Entrepreneuriat chez les Jeunes
              <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
              Grâce à la compétence de ses membres et à l'engagement constant de sa structure organisationnelle, l'Association Najm a contribué à l'appel à manifestation d'intérêt lancé par la préfecture de Moulay Rachid en novembre 2023, concernant la mise en œuvre de l'axe de soutien à l'entrepreneuriat des jeunes.
              <br/><br/>
              L'excellence du dossier de candidature présenté par l'Association a permis de gagner la confiance du comité de sélection et de Monsieur le Gouverneur, cette confiance s'est concrétisée par l'attribution de cette mission stratégique à l'Association Najm. L'Association a ainsi signé deux conventions de partenariat pour l'année 2024, sur le territoire de la préfecture de Moulay Rachid.
              <br/><br/>
              Ces deux conventions visent à former 200 jeunes en phase de pré-création d'entreprise et à accompagner 115 entrepreneurs en phase post-création au cours de l'année 2024.
            </p>

            <h3 className="text-4xl font-bold mb-8 text-gray-900">Méthodologie et Approche Pédagogique</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-cogs"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Méthodologie de Travail</h3>
                <p className="text-base text-center leading-relaxed text-gray-700 text-justify">
                  L'association a adopté une méthodologie de travail basée sur l'organisation de cycles de formation pré-définis (chaque trimestre), entrecoupés d'un ensemble de mécanismes de suivi et d'évaluation continue. Ces cycles se concluent par des réunions périodiques du Comité Provincial du Développement Humain (CPDH), afin de permettre aux structures de gouvernance de l'INDH de suivre le niveau de réalisation et l'atteinte des objectifs fixés.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Approche Pédagogique</h3>
                <p className="text-base text-center leading-relaxed text-gray-700 text-justify">
                  L'Association Najm adopte une approche pédagogique moderne axée sur l'andragogie, spécialement conçue pour répondre aux besoins d'apprentissage des adultes. Cette approche est renforcée par une formation appliquée et interactive basée sur le traitement de cas réels, selon le principe du "Apprendre par la pratique". Ce parcours est supervisé par une équipe pédagogique permanente, qui assure un accompagnement précis et une qualité de formation, grâce à une communication continue avec des experts et des professionnels, ce qui renforce l'efficacité de l'apprentissage et garantit l'obtention de résultats concrets.
                </p>
              </div>
            </div>

            <h3 className="text-4xl font-bold mb-8 text-gray-900">Résultats Clés (Année 2024)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">261</p>
                <p className="text-sm font-medium text-center">Jeunes formés en phase de pré-création (131% de l'objectif)</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">240</p>
                <p className="text-sm font-medium text-center">Projets acceptés par le CPDH</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">161</p>
                <p className="text-sm font-medium text-center">Projets mis en œuvre (67% des projets acceptés)</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">130%</p>
                <p className="text-sm font-medium text-center">Dépassement des objectifs de dynamisation des entreprises</p>
              </div>
            </div>
            <p className="text-base opacity-85 mt-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
              Compte tenu de ces résultats positifs, le Comité Provincial du Développement Humain a renouvelé sa confiance en l'Association Najm, en signant un nouvel accord pour la mise en œuvre de l'axe « Soutien à l'Entrepreneuriat des Jeunes » au niveau de la préfecture de Moulay Rachid pour l'année 2025.
            </p>
          </div>
        </section>

        {/* Section: Axe de Soutien à l'Économie Sociale et Solidaire */}
        <section className="py-4 px-6 bg-gray-100 mt-4 text-gray-800 shadow-inner-xl">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-gray-900">
              Axe de Soutien à l'Économie Sociale et Solidaire
              <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
              Depuis 2021, l'Association Najm est chargée de la mise en œuvre de l'axe « Soutien à l'Économie Sociale et Solidaire » au niveau de la préfecture de Moulay Rachid. Cet axe vise à accompagner et à renforcer les capacités des acteurs de l'économie sociale et solidaire, avec un accent particulier sur les coopératives soumises à la loi 112.12, ainsi que sur les divers acteurs économiques actifs dans ce domaine.
              <br/><br/>
              Grâce à cette initiative, l'Association Najm offre un soutien complet aux coopératives et aux entrepreneurs sociaux en leur proposant des formations administratives et de gestion, un renforcement des compétences techniques et artisanales, et des opportunités de financement. L'objectif est de renforcer leurs opportunités de développement, d'accroître leur compétitivité et de favoriser leur intégration économique pour un développement durable et inclusif.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-hands-helping"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Rôle Clé de l'Association</h3>
                <p className="text-base text-center leading-relaxed text-gray-700 text-justify">
                  L'Association Najm joue un rôle central dans le soutien des porteurs de projets et des acteurs économiques de l'économie sociale et solidaire. Elle organise régulièrement des appels à propositions de projets, reçoit et étudie les dossiers des organismes candidats, et accompagne les entrepreneurs tout au long des étapes de préparation et de développement des demandes d'aide financière.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Accompagnement Business Plan</h3>
                <p className="text-base text-center leading-relaxed text-gray-700 text-justify">
                  Dans le cadre de son engagement à soutenir le développement économique, l'Association Najm accompagne les porteurs de projets dans l'élaboration de leurs Business Plans. Elle leur fournit des outils et des conseils pour structurer leurs idées, améliorer leur modèle économique et préparer des présentations efficaces devant le Comité Provincial de Développement Économique (CPDE), qui évalue la faisabilité et la pertinence des projets.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Suivi Post-Validation et Financement</h3>
                <p className="text-base text-center leading-relaxed text-gray-700 text-justify">
                  Après validation du projet par le CPDE, l'Association Najm continue d'apporter son soutien en accompagnant les porteurs de projets dans les démarches administratives nécessaires à l'obtention de l'aide financière. Elle s'assure du respect des conditions requises par les organismes subventionnés et les aide à préparer et à soumettre les documents nécessaires dans les délais impartis, garantissant ainsi une réception fluide et rapide des fonds.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200">
                <div className="text-5xl text-blue-700 mb-4">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">Suivi Post-Financement</h3>
                <p className="text-base text-center leading-relaxed text-gray-700 text-justify">
                  Le rôle de l'Association Najm ne se limite pas à l'octroi de financement, mais s'étend à un suivi minutieux après le financement, où elle continue de soutenir les porteurs de projets pendant la phase de mise en œuvre. Ce soutien comprend des conseils en gestion, marketing et développement commercial, contribuant à assurer la durabilité et la croissance des entreprises. L'objectif est d'accompagner ces projets vers le succès à long terme et de renforcer leur impact économique et social au sein de la communauté.
                </p>
              </div>
            </div>

            <h3 className="text-4xl font-bold mb-8 text-gray-900">L'Économie Sociale et Solidaire en Chiffres</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">10</p>
                <p className="text-sm font-medium text-center">Appels à propositions de projets organisés</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">62</p>
                <p className="text-sm font-medium text-center">Projets soumis après les appels à projets</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">48</p>
                <p className="text-sm font-medium text-center">Projets répondant aux critères initiaux</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">36</p>
                <p className="text-sm font-medium text-center">Projets acceptés par le CPDH</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">27</p>
                <p className="text-sm font-medium text-center">Projets financés et en cours</p>
              </div>
            </div>
            <p className="text-base opacity-85 mt-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
              Sur la base de ces résultats également positifs, le Comité Provincial du Développement Humain a renouvelé sa confiance en l'Association Najm en signant un nouvel accord pour la mise en œuvre de l'axe « Soutien à l'Économie Sociale et Solidaire » dans les districts de Moulay Rachid pour l'année 2025.
            </p>
          </div>
        </section>

        {/* Section: Statistiques de l'Académie Najm pour les Métiers du Numérique */}
        <section className="py-4 px-6 bg-gray-50 mt-4 text-gray-800 shadow-inner-xl">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-gray-900">
              Statistiques de l'Académie Najm
              <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
              L'Académie Najm vise à offrir aux jeunes des opportunités d'intégration économique à travers les métiers du numérique, un secteur prometteur en phase avec le projet royal de transition numérique.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">31</p>
                <p className="text-sm font-medium text-center">Jeunes en formation en marketing digital et e-commerce</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">25</p>
                <p className="text-sm font-medium text-center">Jeunes en formation en programmation et conception web</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">26</p>
                <p className="text-sm font-medium text-center">Jeunes en formation en graphisme et multimédia</p>
              </div>
              <div className="bg-blue-700 text-white rounded-xl p-8 shadow-lg flex flex-col items-center">
                <p className="text-6xl font-extrabold mb-2">82</p>
                <p className="text-sm font-medium text-center">Total jeunes bénéficiaires de la formation</p>
              </div>
            </div>
          </div>
        </section>


      </main>

      {/* Section des objectifs */}
      <section id="programmes" className="bg-gray-50 py-4 mt-4 px-6 sm:px-8 lg:px-10 text-gray-800 shadow-inner-xl">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl font-extrabold mb-8 text-gray-900">
              Objectifs de l'Académie Najm
              <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg opacity-85 mb-8 max-w-4xl mx-auto leading-relaxed text-gray-700 text-justify">
              À travers l’élaboration de ce programme « Promotion sociale par la numérisation », l’Association Najm vise les objectifs suivants :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                "Réduire la fracture numérique en démocratisant l’accès aux compétences technologiques.",
                "Renforcer l’employabilité des jeunes en leur fournissant les compétences numériques requises sur le marché du travail.",
                "Sensibiliser à l’entrepreneuriat et doter les jeunes des outils nécessaires pour lancer leurs propres projets numériques.",
                "Encourager l’autonomisation économique par l’acquisition de compétences adaptées à la transition numérique au Maroc."
              ].map((objective, index) => (
                <div key={index} className="flex flex-col items-center bg-white text-gray-800 shadow-lg rounded-xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="text-6xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">
                      {`0${index + 1}`}
                    </div>
                    <p className="text-sm text-center leading-relaxed opacity-90 text-gray-700 text-justify">
                      {objective}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* Section Accompagnement */}
      <section className="py-4 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="text-gray-800">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight relative">
                Accompagnement et coopératives numériques
                <span className="absolute left-0 -bottom-3 w-20 h-1 bg-blue-700 rounded-full"></span>
              </h2>
              <p className="mb-8 text-base text-gray-700 leading-relaxed text-justify">
                L'Association Najm agit avec des entreprises et acteurs du secteur numérique pour 
                connecter les jeunes aux opportunités d'emploi via des ateliers, stages, et formations spécifiques.
              </p>
              <div className="bg-white p-10 rounded-xl shadow-xl border border-gray-200">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Le programme comprend également :</h3>
                <ul className="space-y-5 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-4 text-3xl">&#10003;</span> {/* Checkmark */}
                    <span className="text-sm">Des conseils en entrepreneuriat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-4 text-3xl">&#10003;</span>
                    <span className="text-sm">Un accompagnement dans la rédaction de business plans</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-4 text-3xl">&#10003;</span>
                    <span className="text-sm">L'accès au financement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-700 mr-4 text-3xl">&#10003;</span>
                    <span className="text-sm">La création de coopératives numériques, favorisant les échanges de compétences, 
                    l'accès à de nouveaux marchés, et la croissance collective durable</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-700/10 rounded-3xl transform rotate-3 scale-105"></div>
              <div className="relative w-full h-96 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={image3} // Reusing image3 for this section
                  alt="Accompagnement numérique"
                  className="w-full h-full object-cover rounded-3xl opacity-90 transform scale-105 transition-transform duration-500 hover:scale-100"
                />
                <div className="absolute inset-0 bg-black opacity-20 rounded-3xl"></div>
                <span className="absolute text-3xl font-bold text-white z-10 drop-shadow-lg">Accompagnement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Reconnaissance et ambition nationale */}
      <section className="py-4 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center text-gray-800">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8">
            Reconnaissance et ambition nationale
            <span className="block w-32 h-1 bg-blue-700 mx-auto mt-4 rounded-full"></span>
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <p className="text-base text-gray-700 leading-relaxed mb-8 text-justify">
              Dans le but de renforcer son impact, l'association œuvre à l'obtention du statut 
              d'utilité publique pour élargir ses partenariats, ses financements et sa présence nationale.
            </p>
            <div className="bg-white p-10 rounded-2xl text-gray-800 shadow-xl border border-gray-200">
              <p className="text-base font-medium leading-relaxed opacity-95 text-gray-700 text-justify">
                Fidèle à sa mission, l'Association Najm continue à s'adapter aux défis économiques 
                et sociaux et s'engage pour un Maroc inclusif, numérique et durable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bouton retour en haut */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 z-50 bg-blue-700 text-white p-5 rounded-full shadow-lg hover:bg-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 animate-fade-in-up"
          aria-label="Retour en haut"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
        </button>
      )}

      {/* Styles pour animations */}
      <style>{`
        .is-revealed { animation: slideInUp 1s ease-out forwards; }
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(80px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
