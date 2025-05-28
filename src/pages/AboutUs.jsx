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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';




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
            couleur: "bg-blue-600",
            texte:
                "L’association accorde une grande importance à l’établissement de relations humaines solides, fondées sur l’estime mutuelle. Elle reconnaît la valeur de chaque individu, notamment les jeunes, comme partenaires essentiels du développement.",
            icone: "🤝",
        },
        {
            titre: "Transparence",
            couleur: "bg-yellow-400 text-black",
            texte:
                "La transparence garantit la clarté et la crédibilité de nos actions. L’association maintient une communication ouverte avec les jeunes et les partenaires afin de renforcer la confiance et la compréhension.",
            icone: "✌️",
        },
        {
            titre: "Confiance",
            couleur: "bg-purple-700",
            texte:
                "La confiance est essentielle pour une coopération durable. L’association accompagne les jeunes avec bienveillance afin de leur permettre d’atteindre leurs objectifs avec assurance.",
            icone: "✅",
        },
        {
            titre: "Égalité",
            couleur: "bg-green-500",
            texte:
                "L’égalité des chances entre tous les individus est un principe fondamental dans le travail de l’association. Elle s’engage à offrir un environnement inclusif permettant aux jeunes, quels que soient leurs milieux sociaux ou culturels, d’accéder aux opportunités qui les aident à réaliser leur potentiel et à contribuer au développement durable.",
            icone: "⚖️",
        },
        {
            titre: "Dignité",
            couleur: "bg-red-500",
            texte:
                "L’association place la préservation de la dignité humaine au cœur de son action en respectant les droits des jeunes et en valorisant leur participation à la société de manière respectueuse de leur valeur et de leur potentiel. Elle s’efforce de créer un environnement favorable qui permet aux jeunes de participer activement au développement socio-économique tout en préservant leur dignité.",
            icone: "🌟",
        },
        {
            titre: "Engagement",
            couleur: "bg-orange-500",
            texte:
                "L’engagement envers la responsabilité est la pierre angulaire du succès de l’association dans la réalisation de ses objectifs. L’association œuvre avec efficacité et intégrité à concevoir et mettre en œuvre des initiatives visant à l’autonomisation économique et sociale des jeunes, tout en assurant un suivi rigoureux pour garantir l’atteinte des résultats escomptés.",
            icone: "💪",
        },
        {
            titre: "Citoyenneté",
            couleur: "bg-teal-500",
            texte:
                "L’association considère les jeunes comme une force motrice du développement économique et social. Elle s’efforce de renforcer leur sentiment d’appartenance en les impliquant dans des projets au service de la nation, contribuant ainsi à ancrer les valeurs d’une citoyenneté active et à favoriser une renaissance durable.",
            icone: "🌍",
        },
    ];

    return (
        <>
            <section className="bg-white py-16 px-6">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-800 mb-6">
                        Objectifs de l’Association Najm
                    </h2>
                    <div className="text-gray-700 text-lg leading-relaxed text-justify space-y-6">
                        <p>
                            L’Association Najm aspire à faire de la plateforme Irchad une référence de premier plan en matière d’inclusion économique des jeunes, tout en s’inscrivant dans l’esprit de l’Initiative Nationale pour le Développement Humain.
                        </p>
                        <p>
                            L’association vise à faire de cette plateforme un espace de convergence pour les différents programmes destinés à la jeunesse, en vue d’en faire un modèle offrant informations et orientation, répondant ainsi aux aspirations des jeunes et contribuant à la réalisation de leurs ambitions.
                        </p>
                        <p>
                            Elle se concentre sur la création d’un environnement de travail propice à l’inclusion économique des jeunes, en concluant des accords et des partenariats avec des institutions et organismes nationaux et internationaux issus des secteurs académique, économique et de la société civile.
                        </p>
                        <p>
                            L’association adopte une bonne gouvernance fondée sur la compétence, en mettant en place des mécanismes transparents et souples de prise de décision, incluant l’élaboration d’un manuel de procédures complet pour les opérations administratives et financières, dans le but d’obtenir le statut d’utilité publique et de renforcer la confiance dans son action.
                        </p>
                    </div>
                </div>
            </section>
            <section className="py-16 px-6 bg-gray-100">
                <h2 className="text-center text-3xl font-bold text-gray-800 mb-12">
                    Valeurs et Principes de l’Association
                </h2>
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {valeurs.map((valeur, index) => (
                        <div
                            key={index}
                            className={`rounded-xl shadow-lg p-6 hover:scale-105 transition-transform duration-300 ${valeur.couleur} animate-fadeIn`}
                        >
                            <div className="flex justify-center mb-4">
                                <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-full bg-white text-black shadow">
                                    {valeur.icone}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-center mb-3">{valeur.titre}</h3>
                            <p className="text-sm text-justify leading-relaxed">{valeur.texte}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="bg-white py-16 px-6">
                <div className="max-w-5xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-800 mb-6">
                        Vision stratégique de l’Association
                    </h2>

                    <div className="text-gray-700 text-lg leading-relaxed text-justify space-y-6">
                        <p>
                            L’Association Najm pour l’inclusion économique des jeunes vise à :
                        </p>
                        <p>
                            <strong>Autonomiser les jeunes et renforcer leurs capacités :</strong> en développant leurs compétences pour favoriser leur intégration dans le marché du travail, à travers des programmes de formation spécialisés visant à améliorer leur performance professionnelle et à répondre aux exigences du marché.
                        </p>
                        <p>
                            <strong>Mettre en valeur les talents et compétences individuelles :</strong> l’association identifie les potentiels cachés des jeunes et œuvre à les faire émerger pour favoriser leur excellence et les valoriser dans leur parcours professionnel et économique.
                        </p>
                        <p>
                            <strong>Améliorer l’employabilité :</strong> elle propose des programmes de formation complets pour doter les jeunes des compétences nécessaires à une insertion professionnelle efficace et confiante, augmentant ainsi leurs chances d’embauche.
                        </p>
                        <p>
                            <strong>Encourager l’esprit entrepreneurial et soutenir la création de projets :</strong> elle promeut l’esprit d’initiative et d’entrepreneuriat chez les jeunes, en leur offrant accompagnement, encadrement, appui technique et financier pour concrétiser leurs idées de projet.
                        </p>
                        <p>
                            <strong>Soutenir l’économie sociale et solidaire :</strong> l’association favorise les initiatives collectives et coopératives contribuant au développement local durable et à la réponse aux défis socioéconomiques.
                        </p>
                        <p>
                            <strong>Construire des partenariats et des réseaux :</strong> elle établit des partenariats solides avec les institutions nationales et internationales, ainsi que les secteurs public et privé, afin de multiplier les opportunités de collaboration et d’échange d’expériences.
                        </p>
                        <p>
                            <strong>Ancrer les valeurs de citoyenneté et de volontariat :</strong> l’association diffuse les valeurs citoyennes auprès des jeunes et encourage leur engagement dans des actions volontaires, favorisant ainsi leur participation active à la vie sociale et le développement de leur sens des responsabilités.
                        </p>
                        <p>
                            <strong>Contribuer au développement durable :</strong> elle crée un environnement stimulant qui encourage la créativité et l’implication des jeunes dans l’atteinte des objectifs du développement durable à l’échelle locale et nationale.
                        </p>
                    </div>
                </div>
            </section>
            <section className="bg-white py-16 px-6">
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

            <section className="bg-gray-100 py-16 px-6">
                <div className="max-w-7xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-800">Équipe de l’Association</h2>
                </div>

                <div className="overflow-hidden">
                    <div className="flex animate-scroll gap-6 px-4">
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

