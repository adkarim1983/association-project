import React, { useState } from "react";
import organigramme from "../assets/organigramme.png";
import image16 from '../assets/image16.png';
import image17 from '../assets/image17.png';
import image18 from '../assets/image18.png';
import image19 from '../assets/image19.png';
import image20 from '../assets/image20.png';
import image21 from '../assets/image21.png';
import image22 from '../assets/image22.png';
import image23 from '../assets/image23.png';
import image24 from '../assets/image24.png';
import image25 from '../assets/image25.png';
import image26 from '../assets/image26.png';
import image27 from '../assets/image27.png';
import image30 from '../assets/image30.jpg';
import image32 from '../assets/image32.jpg';
import image33 from '../assets/image3.jpg';
import image34 from '../assets/image34.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import confiance from "../assets/confiance.png";
import affichage from "../assets/affichage.png";
import respect from "../assets/respect.png";
import egalite from "../assets/egalite.png";
import dignite from "../assets/dignite.png";
import engagement from "../assets/engagement.png";
import citoyennete from "../assets/citoyennete.png";

const membres = [
    {
        nom: "Amine Moutassim",
        statut: "Directieur Operationnel",
        image: image16,
        telephone: "0671 710 091",
        email: "fatima.bennani@example.com",
    },
    {
        nom: "Sanaa Bouadel",
        statut: "Assistante administrative",
        image: image17,
        telephone: "0671 711 080",
        email: "contact@eerchad.ma",
    },
    {
        nom: "Khadija Kurdawi",
        statut: " Adjointe administrative",
        image: image18,
        telephone: "0671 711 940",
        email: "assistante.eerchad@gmail.com",
    },
    {
        nom: "Abdul Razzaq Arbah",
        statut: "Employé administratif",
        image: image19,
        telephone: "0671 710 091",
        email: "assistant.eerchad@gmail.com",
    },
    {
        nom: "Zahra Balasi",
        statut: "Coordinatrice du projet",
        image: image20,
        telephone: "0671 710 091",
        email: "Coordination.eerchad@gmail.com",
    },
    {
        nom: "Siham Ghazali",
        statut: "Coordinatrice du projet",
        image: image21,
        telephone: "0671 710 098",
        email: "coordinatrice.eerchad@example.com",
    },
    {
        nom: "Shaima Attar",
        statut: "Consultante en orientation et en conseil",
        image: image22,
        telephone: "0671 710 052",
        email: "Conseillère.eerchad@example.com",
    },
    {
        nom: "Ayyoub Laghlali",
        statut: " formateur et superviseur en soft skills",
        image: image23,
        telephone: "0671 710 000",
        email: "formateur.eerchad@example.com",
    },
    {
        nom: "Muhammad Amin Abi Al-Surur",
        statut: "responsable du suivi sur le terrain",
        image: image24,
        telephone: "0671 464 664",
        email: "accompagnateur.eerchad@example.com",
    },
    {
        nom: "Hana Dahman",
        statut: "Formatrice dans le domaine de l'entrepreneuriat",
        image: image25,
        telephone: "0671 710 093",
        email: "Formateuse.eerchad@example.com",
    },
    {
        nom: "Yousra Hashoum",
        statut: " responsable du suivi Administratif.",
        image: image26,
        telephone: "0671 710 058",
        email: "Accompagnatrice.eerchad@example.com",
    },
    {
        nom: "Mohsen Haimoud",
        statut: "conseiller en orientation",
        image: image27,
        telephone: "0671 707 272",
        email: "Conseiller.eerchad@example.com",
    },

];
export default function ValeursEtPrincipes() {
    const valeurs = [
        {
            titre: "Respect",
            couleur: "bg-[#072ac8]",
            texte:
                "L’association accorde une grande importance à l’établissement de relations humaines solides, fondées sur l’estime mutuelle. Elle reconnaît la valeur de chaque individu, notamment les jeunes, comme partenaires essentiels du développement.",
            image: respect,
        },
        {
            titre: "Transparence",
            couleur: "bg-[#072ac8]",
            texte:
                "La transparence garantit la clarté et la crédibilité de nos actions. L’association maintient une communication ouverte avec les jeunes et les partenaires afin de renforcer la confiance et la compréhension.",
            image: affichage,
        },
        {
            titre: "Confiance",
            couleur: "bg-[#072ac8]",
            texte:
                "La confiance est essentielle pour une coopération durable. L’association accompagne les jeunes avec bienveillance afin de leur permettre d’atteindre leurs objectifs avec assurance.",
            image: confiance,
        },
        {
            titre: "Égalité",
            couleur: "bg-[#072ac8]",
            texte:
                "L’égalité des chances entre tous les individus est un principe fondamental dans le travail de l’association. Elle s’engage à offrir un environnement inclusif permettant aux jeunes, quels que soient leurs milieux sociaux ou culturels, d’accéder aux opportunités qui les aident à réaliser leur potentiel et à contribuer au développement durable.",
            image: egalite,
        },
        {
            titre: "Dignité",
            couleur: "bg-[#072ac8]",
            texte:
                "L’association place la préservation de la dignité humaine au cœur de son action en respectant les droits des jeunes et en valorisant leur participation à la société de manière respectueuse de leur valeur et de leur potentiel. Elle s’efforce de créer un environnement favorable qui permet aux jeunes de participer activement au développement socio-économique tout en préservant leur dignité.",
            image: dignite,
        },
        {
            titre: "Engagement",
            couleur: "bg-[#072ac8]",
            texte:
                "L’engagement envers la responsabilité est la pierre angulaire du succès de l’association dans la réalisation de ses objectifs. L’association œuvre avec efficacité et intégrité à concevoir et mettre en œuvre des initiatives visant à l’autonomisation économique et sociale des jeunes, tout en assurant un suivi rigoureux pour garantir l’atteinte des résultats escomptés.",
            image: engagement,
        },
        {
            titre: "Citoyenneté",
            couleur: "bg-[#072ac8]",
            texte:
                "L’association considère les jeunes comme une force motrice du développement économique et social. Elle s’efforce de renforcer leur sentiment d’appartenance en les impliquant dans des projets au service de la nation, contribuant ainsi à ancrer les valeurs d’une citoyenneté active et à favoriser une renaissance durable.",
            image: citoyennete,
        },
        {
            titre: "Formation",
            couleur: "bg-[#072ac8]",
            texte:
                "L’association considère les jeunes comme une force motrice du développement économique et social. Elle s’efforce de renforcer leur sentiment d’appartenance en les impliquant dans des projets au service de la nation, contribuant ainsi à ancrer les valeurs d’une citoyenneté active et à favoriser une renaissance durable.",
            image: citoyennete,
        },
    ];

    return (
        <>
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2 text-gray-800">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-6 text-left">
                            Objectifs de l’Association Najm
                        </h2>
                        <div className="text-lg leading-relaxed space-y-5 text-justify">
                            <p>
                                L’Association Najm aspire à faire de la plateforme Irchad une référence de premier plan en matière d’inclusion économique des jeunes, tout en s’inscrivant dans l’esprit de l’Initiative Nationale pour le Développement Humain.
                            </p>
                            <p>
                                L’association vise à faire de cette plateforme un espace de convergence pour les différents programmes destinés à la jeunesse, en vue d’en faire un modèle offrant informations et orientation, répondant ainsi aux aspirations des jeunes et contribuant à la réalisation de leurs ambitions.            </p>
                            <p>
                                Elle se concentre sur la création d’un environnement de travail propice à l’inclusion économique des jeunes, en concluant des accords et des partenariats avec des institutions et organismes nationaux et internationaux issus des secteurs académique, économique et de la société civile.

                            </p>
                            <p>
                                L’association adopte une bonne gouvernance fondée sur la compétence, en mettant en place des mécanismes transparents et souples de prise de décision, incluant l’élaboration d’un manuel de procédures complet pour les opérations administratives et financières, dans le but d’obtenir le statut d’utilité publique et de renforcer la confiance dans son action.

                            </p>
                        </div>
                    </div>
                    {/* Deux images verticalement alignées */}
                    <div className="md:w-1/2 flex flex-col gap-13">
                        <img
                            src={image30}
                            alt="Objectif 1"
                            className="rounded-xl shadow-md w-full h-80 object-cover"
                        />
                        <img
                            src={image32}
                            alt="Objectif 2"
                            className="rounded-xl shadow-md w-full h-80 object-cover"
                        />
                    </div>

                </div>
            </section>

            <section className="py-5 px-6 bg-gray-100 mx-6 rounded-lg">
                <h2 className="text-center text-3xl font-bold text-blue-800 mb-6">
                    Valeurs et Principes de l’Association
                </h2>

                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {valeurs.map((valeur, index) => (
                        <div
                            key={index}
                            className="group perspective w-80 h-64 cursor-pointer"
                        >
                            <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">

                                {/* Face avant titre */}
                                <div className={`absolute w-full h-full ${valeur.couleur} text-white rounded-xl shadow-xl px-6 py-10 flex flex-col items-center justify-center backface-hidden`}>
                                    <img
                                        src={valeur.image}
                                        alt={valeur.titre}
                                        className="w-20 h-20 rounded-full bg-white p-1 mb-4 shadow-md object-cover"
                                    />
                                    <h3 className="text-2xl font-semibold text-center tracking-wide">{valeur.titre}</h3>
                                </div>

                                {/* Face arriere paragraphe */}
                                <div className="absolute w-full h-full bg-white text-gray-800 rounded-xl shadow-xl p-6 rotate-y-180 backface-hidden overflow-auto flex items-center justify-center">
                                    <p className="text-sm leading-relaxed text-justify">{valeur.texte}</p>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </section>

            <section className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                    {/* Texte à gauche */}
                    <div className="flex flex-col justify-between text-gray-800">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-6 text-left">
                            Vision stratégique de l’Association
                        </h2>
                        <div className="text-lg leading-relaxed space-y-4 text-justify">
                            <p>
                                L’Association Najm pour l’inclusion économique des jeunes vise à :
                            </p>
                            <p><strong>Autonomiser les jeunes :</strong> en développant leurs compétences pour favoriser leur intégration dans le marché du travail.</p>
                            <p><strong>Valoriser les talents :</strong> identifier les potentiels cachés des jeunes et les faire émerger.</p>
                            <p><strong>Améliorer l’employabilité :</strong> offrir des formations efficaces pour augmenter les chances d’embauche.</p>
                            <p><strong>Soutenir l’entrepreneuriat :</strong> accompagner les jeunes porteurs de projets avec appui technique et financier.</p>
                            <p><strong>Encourager l’économie sociale :</strong> promouvoir les initiatives coopératives locales durables.</p>
                            <p><strong>Développer les partenariats :</strong> créer des réseaux avec les secteurs public, privé et associatif.</p>
                            <p><strong>Renforcer la citoyenneté :</strong> diffuser les valeurs de volontariat et d’engagement communautaire.</p>
                            <p><strong>Contribuer au développement durable :</strong> stimuler la créativité des jeunes pour des projets responsables.</p>
                        </div>
                    </div>

                    {/* Images à droite alignées verticalement */}
                    <div className="flex flex-col gap-6 justify-between">
                        <img
                            src={image33}
                            alt="Illustration 1"
                            className="h-1/2 rounded-xl shadow-lg object-cover w-full max-h-[320px]"
                        />
                        <img
                            src={image34}
                            alt="Illustration 2"
                            className="h-1/2 rounded-xl shadow-lg object-cover w-full max-h-[320px]"
                        />
                    </div>
                </div>
            </section>
            <section className="bg-white pb-10 px-6 mt-10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-blue-800 mb-10">
                        Organigramme de l’Association
                    </h2>
                    <img
                        src={organigramme}
                        alt="Organigramme de l’association"
                        className="mx-auto max-w-full h-auto rounded shadow"
                    />
                </div>
            </section>

            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-800">Équipe de l’Association</h2>
                </div>

                <div className="overflow-hidden">
                    <div className="flex animate-scroll gap-6 px-4 my-4" >
                        {membres.concat(membres).map((membre, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-72 bg-white rounded-lg border shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={membre.image}
                                    alt={membre.nom}
                                    className="w-full h-52 object-cover"
                                />
                                <div className="p-4 text-left space-y-2">
                                    <h3 className="text-xl font-semibold text-gray-800">{membre.nom}</h3>
                                    <p className="text-blue-600 font-medium">{membre.statut}</p>
                                    <p className="text-sm text-gray-600">
                                        <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2" />
                                        {membre.telephone}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 mr-2" />
                                        {membre.email}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="mt-16 mb-6 border-t pt-10 max-w-4xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-8">
                    Foire aux questions (FAQ)
                </h2>

                <div className="space-y-4">
                    <details className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                            Comment puis-je rejoindre l’association ?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Vous pouvez nous contacter via le formulaire de contact ou venir directement à notre siège à Moulay Rachid – Sidi Othmane.
                        </p>
                    </details>

                    <details className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                            Est-ce que vous accompagnez les jeunes porteurs de projets ?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Oui, nos plateformes Irchad offrent un accompagnement personnalisé pour structurer, financer et lancer les projets des jeunes.
                        </p>
                    </details>

                    <details className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                            Les formations sont-elles gratuites ?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Toutes nos formations proposées sont gratuites grâce au soutien de nos partenaires institutionnels.
                        </p>
                    </details>

                    <details className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                            Puis-je bénéficier d’un financement pour mon projet ?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Oui, certains projets peuvent bénéficier de soutien financier après évaluation, notamment dans le cadre de l’Initiative Nationale pour le Développement Humain.
                        </p>
                    </details>

                    <details className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                            Quels types de projets soutenez-vous ?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Nous soutenons principalement les projets à fort impact social ou économique : coopératives, auto-entrepreneuriat, initiatives communautaires.
                        </p>
                    </details>

                    <details className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                            Qui peut bénéficier de vos services ?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Tout jeune âgé de 18 à 35 ans, résidant dans la région de Moulay Rachid – Sidi Othmane, ayant une idée ou un projet à développer.
                        </p>
                    </details>

                    <details className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                            Comment se déroule l’accompagnement ?
                        </summary>
                        <p className="mt-2 text-gray-600">
                            Après une première rencontre, nous établissons un plan d'accompagnement qui inclut des formations, des sessions de coaching, et un suivi personnalisé.
                        </p>
                    </details>
                </div>
            </div>










        </>
    );
}

