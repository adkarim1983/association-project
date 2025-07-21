import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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
import { faPhone, faEnvelope, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

import confiance from "../assets/confiance.png";
import affichage from "../assets/affichage.png";
import respect from "../assets/respect.png";
import egalite from "../assets/egalite.png";
import dignite from "../assets/dignite.png";
import engagement from "../assets/engagement.png";
import citoyennete from "../assets/citoyennete.png";

const valeursData = [
  { key: "respect", image: respect },
  { key: "transparence", image: affichage },
  { key: "confiance", image: confiance },
  { key: "egalite", image: egalite },
  { key: "dignite", image: dignite },
  { key: "engagement", image: engagement },
  { key: "citoyennete", image: citoyennete },
  { key: "formation", image: citoyennete }
];

const membresData = [
    {
        id: "amineMoutassim",
        image: image16,
        telephone: "0671 710 091",
        email: "fatima.bennani@example.com",
    },
    {
        id: "sanaaBouadel",
        image: image17,
        telephone: "0671 711 080",
        email: "contact@eerchad.ma",
    },
    {
        id: "khadijaKurdawi",
        image: image18,
        telephone: "0671 711 940",
        email: "assistante.eerchad@gmail.com",
    },
    {
        id: "abdulRazzaqArbah",
        image: image19,
        telephone: "0671 710 091",
        email: "assistant.eerchad@gmail.com",
    },
    {
        id: "zahraBalasi",
        image: image20,
        telephone: "0671 710 091",
        email: "Coordination.eerchad@gmail.com",
    },
    {
        id: "sihamGhazali",
        image: image21,
        telephone: "0671 710 098",
        email: "coordinatrice.eerchad@example.com",
    },
    {
        id: "shaimaAttar",
        image: image22,
        telephone: "0671 710 052",
        email: "Conseillère.eerchad@example.com",
    },
    {
        id: "ayyoubLaghlali",
        image: image23,
        telephone: "0671 710 000",
        email: "formateur.eerchad@example.com",
    },
    {
        id: "muhammadAminAbiAlSurur",
        image: image24,
        telephone: "0671 464 664",
        email: "accompagnateur.eerchad@example.com",
    },
    {
        id: "hanaDahman",
        image: image25,
        telephone: "0671 710 093",
        email: "Formateuse.eerchad@example.com",
    },
    {
        id: "yousraHashoum",
        image: image26,
        telephone: "0671 710 058",
        email: "Accompagnatrice.eerchad@example.com",
    },
    {
        id: "mohsenHaimoud",
        image: image27,
        telephone: "0671 707 272",
        email: "Conseiller.eerchad@example.com",
    },
];



export default function ValeursEtPrincipes() {
    const { t } = useTranslation();
        const membres = membresData.map(member => ({
        ...member,
        nom: t(`equipe.membres.${member.id}.nom`),
        statut: t(`equipe.membres.${member.id}.statut`)
    }));
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

     const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };




    return (
    <>
      {/* Objectifs */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 text-gray-800">
            <h2 className="text-lg sm:text-xl md:text-4xl font-extrabold text-blue-800 mb-6 text-center md:text-left leading-tight">
              {t("objectifs.titre")}
            </h2>
            <div className="text-lg leading-relaxed space-y-5 text-justify">
              {[1, 2, 3, 4].map(i => (
                <p key={i}>{t(`objectifs.p${i}`)}</p>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 flex flex-col gap-13">
            <img src={image30} alt="Objectif 1" className="rounded-xl shadow-md w-full h-80 object-cover" />
            <img src={image32} alt="Objectif 2" className="rounded-xl shadow-md w-full h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-5 px-6 bg-gray-100 mx-6 rounded-lg">
                      <h2 className="text-center text-lg sm:text-xl md:text-3xl font-bold text-blue-800 mb-6 leading-tight">
          {t("valeurs.titre")}
        </h2>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {valeursData.map((valeur, index) => (
            <div key={index} className="group perspective w-80 h-64 cursor-pointer">
              <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
                <div className="absolute w-full h-full bg-[#072ac8] text-white rounded-xl shadow-xl px-6 py-10 flex flex-col items-center justify-center backface-hidden">
                  <img
                    src={valeur.image}
                    alt={t(`valeurs.${valeur.key}.titre`)}
                    className="w-20 h-20 rounded-full bg-white p-1 mb-4 shadow-md object-cover"
                  />
                  <h3 className="text-2xl font-semibold text-center tracking-wide">
                    {t(`valeurs.${valeur.key}.titre`)}
                  </h3>
                </div>
                <div className="absolute w-full h-full bg-white text-gray-800 rounded-xl shadow-xl p-6 rotate-y-180 backface-hidden overflow-auto flex items-center justify-center">
                  <p className="text-sm leading-relaxed text-justify ">
                    {t(`valeurs.${valeur.key}.texte`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision stratégique */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          <div className="flex flex-col justify-between text-gray-800">
            {/* <h2 className="text-lg sm:text-xl md:text-4xl font-extrabold text-blue-800 mb-6 text-center md:text-left leading-tight">
              {t("vision.titre")}
            </h2> */}
            <h2 className="text-[30px] font-extrabold text-[#1C398E] mb-6 text-center leading-tight">
  {t("vision.titre")}
</h2>

            <div className="text-lg leading-relaxed space-y-4 text-justify">
              <p>{t("vision.intro")}</p>
              {t("vision.objectifs", { returnObjects: true }).map((item, i) => (
                <p key={i}>• {item}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 justify-between">
            <img src={image33} alt="Vision 1" className="h-1/2 rounded-xl shadow-lg object-cover w-full max-h-[320px]" />
            <img src={image34} alt="Vision 2" className="h-1/2 rounded-xl shadow-lg object-cover w-full max-h-[320px]" />
          </div>
        </div>
      </section>

      {/* Organigramme */}
      <section className="bg-white pb-10 px-6 mt-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-blue-800 mb-10 text-center md:text-left leading-tight">
            {t("organigramme.titre")}
          </h2> */}
          <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-blue-800 mb-10 text-center leading-tight">
  {t("organigramme.titre")}
</h2>
          <img src={organigramme} alt="Organigramme" className="mx-auto max-w-full h-auto rounded shadow" />
        </div>
      </section>

      {/* Équipe (statique ici sauf si tu veux l’internationaliser aussi) */}
      {/* <section className="bg-gray-100 py-12 px-6">
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
            </section> */}
             <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-800">{t("equipe.titre")}</h2>
      </div>

      <div className="relative">
        {/* Flèche gauche */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-700 shadow-md p-2 rounded-full z-10 hover:bg-blue-100"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {/* Liste membres */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-6 py-4"
        >
          {membres.map((membre, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 bg-white rounded-lg border shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={membre.image}
                alt={membre.nom}
                className="w-full object-cover"
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

        {/* Flèche droite */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-700 shadow-md p-2 rounded-full z-10 hover:bg-blue-100"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
      

      {/* FAQ */}
      <div className="mt-16 mb-6 border-t pt-10 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 text-center mb-8">
          {t("faq.titre")}
        </h2>
        <div className="space-y-4">
          {t("faq.questions", { returnObjects: true }).map((item, i) => (
            <details key={i} className="group p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <summary className="cursor-pointer font-medium text-gray-800 group-open:text-indigo-700">
                {item.q}
              </summary>
              <p className="mt-2 text-gray-600">{item.r}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}