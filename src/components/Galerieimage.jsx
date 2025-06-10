
import React, { useState } from "react";


import image2a from "../assets/image2a.jpg";
import image3a from "../assets/image3a.jpg";
import image4a from "../assets/image4a.jpg";
import image5a from "../assets/image5a.jpg";
import image6a from "../assets/image6a.jpg";
import image7a from "../assets/image7a.jpg";
import md1 from "../assets/md1.jpg";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";



export default function GalerieImage() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="px-6 py-16 bg-gradient-to-b from-white via-gray-100 to-white min-h-screen animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          Inauguration des Formations Professionnelles
        </h1>

        {/* Première section - Texte + image à droite */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 animate-fade-up">
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className="mb-4">
              L'Association Najm a lancé officiellement trois formations professionnelles destinées aux jeunes :
              <strong> Développement Web</strong>, <strong>Design Graphique</strong> et <strong>Marketing Digital</strong>.
              Cette initiative vise à offrir une opportunité concrète d'insertion professionnelle à travers
              des compétences recherchées sur le marché.
            </p>
            <p>
              Ces programmes sont conçus pour répondre aux besoins actuels du monde numérique en mettant
              l’accent sur la pratique, la créativité et l’innovation.
            </p>
          </div>
          <div>
            <img src={image2a} alt="Inauguration" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
        </div>

        {/* Deuxième section - Image à gauche, texte à droite */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 animate-fade-up">
          <div>
            <img src={image4a} alt="Présentation" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
          <div className="text-gray-700 text-lg leading-relaxed">
            <p className="mb-4">
              Nos formations sont encadrées par des professionnels expérimentés et offrent une approche
              pédagogique orientée projet. Chaque participant bénéficie d’un accompagnement personnalisé,
              de travaux pratiques et de projets concrets à réaliser en groupe ou individuellement.
            </p>
            <p>
              L’objectif est de permettre à chacun de développer ses compétences techniques, sa créativité,
              mais aussi sa confiance en soi dans un cadre dynamique et bienveillant.
            </p>
          </div>
        </div>

        {/* Troisième section - Programme + image */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 animate-fade-up">
          <div className="text-gray-700 text-lg leading-relaxed">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contenu des programmes</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Développement Web :</strong> HTML, CSS, JavaScript, React, création de sites responsives.</li>
              <li><strong>Design Graphique :</strong> Figma, Photoshop, identité visuelle, communication visuelle.</li>
              <li><strong>Marketing Digital :</strong> Réseaux sociaux, création de contenu, SEO, campagnes publicitaires.</li>
            </ul>
          </div>
          <div>
            <img src={md1} alt="Contenu des formations" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
        </div>

        {/* Quatrième section - Détails sur le déroulement */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16 animate-fade-up">
          <div>
            <img src={p1} alt="Déroulement des cours" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
          <div className="text-gray-700 text-lg leading-relaxed">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Déroulement des formations</h2>
            <p className="mb-4">
              Les cours se déroulent dans un environnement dynamique et participatif. Chaque semaine est
              rythmée par des ateliers pratiques, des sessions de feedback, des conférences inspirantes et
              des challenges de groupe.
            </p>
            <p>
              L'accent est mis sur l'engagement des jeunes, le travail collaboratif et la production concrète
              de projets digitaux qui répondent à des problématiques réelles.
            </p>
          </div>
        </div>

        {/* Cinquième section - Image finale + résumé */}
        <div className="grid md:grid-cols-2 gap-10 items-center animate-fade-up">
          <div className="text-gray-700 text-lg leading-relaxed">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Une première édition réussie</h2>
            <p>
              Grâce à l’implication des formateurs, des partenaires et des jeunes, cette première édition a
              posé les bases d’une véritable dynamique d’apprentissage et de transformation. Ce programme
              se veut un tremplin vers l’avenir numérique des jeunes de notre communauté.
            </p>
          </div>
          <div>
            <img src={p2} alt="Fin de formation" className="rounded-xl shadow-lg w-full h-auto" />
          </div>
        </div>
        {/* Section Galerie interactive finale */}
<h2 className="text-4xl font-bold text-center text-gray-900 mt-24 mb-10 border-b-2 border-blue-500 inline-block pb-2">
  Galerie générale des moments forts
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
  {[
    { src: image3a, text: "Travail en équipe sur des projets réels" },
    { src: image5a, text: "Exercice de conception UX/UI en atelier" },
    { src: image6a, text: "Session de coaching individuel" },
    { src: image7a, text: "Échange entre participants" },
    { src: md1, text: "Présentation d'une stratégie marketing" },
    { src: p1, text: "Moment d’apprentissage intense" },
    { src: p2, text: "Clôture avec remise des certificats" }
  ].map((item, index) => (
    <div
      key={index}
      className="relative rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 group"
      onClick={() => setActiveIndex(index)}
    >
      <img
        src={item.src}
        alt={`galerie-${index}`}
        className="w-full h-64 object-cover rounded-xl"
      />
      <div className="absolute bottom-0 w-full bg-blue-600 text-white text-center py-2 font-semibold">
        Image {index + 1}
      </div>
      {activeIndex === index && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-sm text-center px-4">
          <p className="animate-fade-in-text">{item.text}</p>
        </div>
      )}
    </div>
  ))}
</div>

      </div>
      
      

    
    </div>
    
  );
}
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-up {
    0% { opacity: 0; transform: translateY(40px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .animate-fade-in {
    animation: fade-in 1s ease forwards;
  }

  .animate-fade-up {
    animation: fade-up 1s ease forwards;
  }

  .animate-fade-in-text {
    animation: fade-in 0.5s ease-in-out forwards;
  }
`;
document.head.appendChild(style);