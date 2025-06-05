// src/pages/RapportCultureEtJeunesse.jsx
import React from "react";
import image31 from "../assets/image31.jpg";
import image30 from "../assets/image30.jpg";
import image34 from "../assets/image34.jpg";

export default function RapportCultureEtJeunesse() {
  return (
    <section className="py-16 px-6 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Image 1 + Texte 1 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img src={image31} alt="Événement 1" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-green-700">Journée d’étude des coopératives : Renforcer l’économie sociale et solidaire</h2>
            <p className="text-justify">
              À l’occasion de la Journée mondiale des coopératives, la préfecture des arrondissements Moulay Rachid a organisé, en partenariat avec l’Association Najm pour l’insertion économique des jeunes, une rencontre d’étude le mardi 16 juillet 2024 sous le thème : « Les coopératives au service d’une économie sociale et solidaire durable ».
            </p>
            <p className="text-justify">
              Cette rencontre s’est tenue à la plateforme Irchad, dédiée au soutien et au développement des capacités des jeunes.
            </p>
            <p className="text-justify">
              Elle a connu la participation de nombreuses figures officielles du secteur public et privé, notamment M. le Gouverneur des arrondissements Moulay Rachid et son équipe, les vice-présidents des arrondissements Sidi Othmane et Moulay Rachid, les chefs de départements, des représentants du ministère de la Coopération, des impôts, de la Chambre de l’artisanat, ainsi que le délégué de la Coopération nationale.
            </p>
          </div>
        </div>

        {/* Image 2 + Texte 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <img src={image30} alt="Événement 2" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-green-700">Renforcer le rôle des coopératives</h2>
            <p className="text-justify">
              La rencontre a mis en lumière le rôle crucial des coopératives dans la réalisation du développement durable et le renforcement de l’économie sociale et solidaire, notamment face aux défis économiques et sociaux des populations vulnérables et des jeunes.
            </p>
            <p className="text-justify">
              Ce fut aussi une occasion d’échange entre les acteurs, incluant les coopératives soutenues par l’Initiative Nationale pour le Développement Humain et le Programme d’insertion économique des jeunes dans le cadre de l’économie sociale et solidaire.
            </p>
          </div>
        </div>

        {/* Image 3 + Texte 3 */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          <img src={image34} alt="Événement 3" className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-green-700">Objectifs de la rencontre</h2>
            <ul className="list-disc pl-5 space-y-2 text-justify">
              <li><strong>Échange d’expériences :</strong> Présentation de modèles coopératifs réussis, identification des défis et des solutions potentielles.</li>
              <li><strong>Renforcement des réseaux :</strong> Favoriser les partenariats durables entre coopératives et institutions de soutien.</li>
              <li><strong>Encouragement à l’innovation :</strong> Stimuler l’innovation pour offrir des produits et services à forte valeur ajoutée.</li>
            </ul>
            <p className="text-justify">
              La rencontre s’est clôturée par un appel à poursuivre ces initiatives collaboratives et à renforcer les efforts conjoints pour que les coopératives deviennent des piliers essentiels du développement local.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
