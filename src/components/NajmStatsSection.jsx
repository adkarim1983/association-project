import React from 'react';

const stats = [
    {
        icon: (
            <svg
                className="w-10 h-10 text-blue-500 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        number: '25+',
        label: 'Sites géographiques',
    },
    {
        icon: (
            <svg
                className="w-10 h-10 text-blue-500 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2" />
                <path d="M12 9a4 4 0 100-8 4 4 0 000 8z" />
                <path d="M12 21c-4.418 0-8-1.79-8-4v-2a4 4 0 014-4h8a4 4 0 014 4v2c0 2.21-3.582 4-8 4z" />
            </svg>
        ),
        number: '500+',
        label: 'Opportunités d’emploi',
    },
    {
        icon: (
            <svg
                className="w-10 h-10 text-blue-500 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
        ),
        number: '100+',
        label: 'Entreprises bénéficiaires',
    },
];

export default function NajmStatsSection() {
    return (
        <section className="bg-blue-50 py-16 px-6 mx-6 rounded-lg">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
                    Chiffres clés de l’association
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
                        >
                            <div className="flex justify-center">{item.icon}</div>
                            <p className="text-4xl font-bold text-blue-600 mb-2">{item.number}</p>
                            <p className="text-lg font-medium text-slate-700">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
