import React from "react";

function Valeurs() {
  const valeurs = [
    { emoji: "🤝", titre: "Solidarité", texte: "Nous renforçons les liens entre les membres de la société." },
    { emoji: "📚", titre: "Éducation", texte: "Nous croyons que l’éducation est la clé du changement." },
    { emoji: "🌍", titre: "Citoyenneté", texte: "Nous encourageons la participation active des jeunes." },
    { emoji: "🎭", titre: "Culture", texte: "Nous valorisons la diversité culturelle et l’expression artistique." },
  ];

  return (
    <section className="bg-gray-100 py-16 mx-6 px-6 text-center rounded-2xl">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-12 text-gray-800 text-center md:text-left leading-tight">Nos Valeurs</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {valeurs.map((valeur, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-500 transform hover:-translate-y-2"
          >
            <div className="text-4xl mb-4">{valeur.emoji}</div>
                          <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center md:text-left leading-tight">{valeur.titre}</h3>
            <p className="text-gray-600 text-sm">{valeur.texte}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Valeurs;