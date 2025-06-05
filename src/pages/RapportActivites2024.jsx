
import React from "react";
import image36 from "../assets/image36.jpg"; // Replace with the correct image for this section

export default function PartenariatIrchadFaculte() {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 drop-shadow-md">
                        Signature d’un Partenariat Stratégique
                    </h2>
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                        Entre la plateforme <strong>Irchad</strong> et la Faculté des Lettres et des Sciences, pour stimuler le développement local et l’innovation.
                    </p>
                </div>

                <div className="rounded-xl overflow-hidden shadow-xl mb-12">
                    <img src={image36} alt="Signature du partenariat" className="w-full h-96 object-cover" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-800 leading-relaxed">
                    <div>
                        <h3 className="text-2xl font-bold text-blue-800 mb-4 ">Une démarche innovante</h3>
                        <p className="text-justify">
                            Dans une initiative stratégique, une convention de partenariat a été signée le <strong>jeudi 13 janvier 2022</strong>, en présence du Gouverneur de la Préfecture Moulay Rachid.
                            Ce partenariat vise à renforcer les synergies entre les institutions académiques, économiques et sociales pour soutenir l’innovation et le développement durable dans la zone industrielle de <strong>Ben M’sik Sidi Othmane</strong>.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-xl font-semibold text-blue-700">Objectifs clés de la convention :</h4>
                            <ul className="list-disc list-inside mt-3 space-y-2 text-justify">
                                <li><strong>Stimuler l’innovation</strong> et le développement de projets économiques locaux, notamment dans les domaines technologiques et créatifs.</li>
                                <li><strong>Établir un écosystème intégré</strong> liant université, économie et société civile pour un impact durable.</li>
                                <li><strong>Encourager la durabilité</strong> environnementale et sociale dans tous les projets soutenus.</li>
                                <li><strong>Connecter la science et la société</strong> via des initiatives scientifiques et culturelles engageant les étudiants et les citoyens.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-xl font-semibold text-blue-700">Perspectives à venir</h4>
                            <p className="text-justify">
                                Ce partenariat promet de transformer la zone industrielle en un pôle d’attractivité et d’innovation, stimulant l’emploi, l’investissement, et illustrant l’importance de la collaboration interinstitutionnelle pour le développement durable.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
