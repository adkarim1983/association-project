import React from 'react';

const objectives = [
    {
        title: 'Autonomisation des jeunes et renforcement de leurs capacités',
        description: 'à travers le développement des compétences des jeunes et le perfectionnement de leurs aptitudes afin de les préparer à une meilleure intégration dans le marché du travail. Cela se fait par la mise en place de programmes de formation spécialisés visant à améliorer leur performance professionnelle et à répondre aux exigences du marché de l’emploi.',
    },
    {
        title: 'Mise en valeur des compétences et aptitudes individuelles',
        description: 'L’Association Najm œuvre à la découverte des potentiels cachés et des talents individuels des jeunes, et s’efforce de les mettre en lumière et de les renforcer afin de favoriser l’excellence et de les valoriser dans leur parcours professionnel et économique.',
    },
    {
        title: 'Renforcement de l’employabilité',
        description: 'L’Association Najm propose des programmes de formation et de préparation spécialisés et complets, axés sur l’acquisition des compétences nécessaires permettant aux jeunes d’intégrer le marché du travail avec confiance et efficacité, ce qui contribue à augmenter leurs chances d’emploi.',
    },
];

export default function PlatformObjectives() {
    return (
        <section className="bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
                    Objectifs et composantes de la plateforme
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {objectives.map((item, index) => (
                        <div
                            key={index}
                            className="bg-blue-50 rounded-xl p-6 shadow hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
                            <p className="text-gray-700">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
