import React, { useState } from "react";
import videoSrc from "../assets/video.mp4";
import image2a from "../assets/image2a.jpg";
import { useTranslation } from "react-i18next";
const sections = [
    {
        title: "Axes d'intervention",
        content: `La Plateforme des Jeunes Irchad a été créée pour soutenir et accompagner les coopératives émergentes, les initiatives libres et l’auto-emploi au niveau de la préfecture d’arrondissements Moulay Rachid, dans le cadre de la troisième phase de l’Initiative Nationale pour le Développement Humain (INDH).
Cette plateforme vise à fournir un soutien matériel et intellectuel aux jeunes souhaitant lancer des projets économiques ou des initiatives sociales, en particulier dans les domaines de l’auto-emploi et de la création de coopératives.
Elle constitue un espace d’innovation sociale, en mettant l’accent sur des formations et des ateliers destinés à renforcer les compétences des jeunes dans divers domaines tels que la gestion, le marketing et la gestion de projets. Elle cherche également à promouvoir l’emploi, à encourager la création d’entreprises et à développer les coopératives, tout en facilitant l’accès à l’information sur les opportunités économiques et les sources de financement disponibles.
À travers cette plateforme, l’initiative ambitionne de stimuler l’esprit entrepreneurial et la coopération entre les jeunes, tout en renforçant l’innovation et le développement durable dans la région. Elle contribue ainsi à accroître le développement économique et social dans la préfecture de Moulay Rachid.

`,
    },
    {
        title: "Mission de la « Plateforme des Jeunes »",
        content: `La mission de la plateforme repose sur l’écoute, l’orientation et le conseil. Elle vise à fournir un accompagnement psychologique et social aux jeunes à travers plusieurs volets :
Écoute : La plateforme permet aux jeunes de s’exprimer librement sur leurs idées et ressentis, renforçant ainsi leur capacité à faire face aux défis de la vie.
Orientation : Elle offre des conseils spécialisés dans divers domaines tels que l’éducation, l’emploi, les relations, la santé mentale, et d’autres sujets importants pour la jeunesse.
Conseil : La plateforme guide les jeunes dans leurs prises de décision, tant sur le plan personnel que professionnel, les aidant à construire un avenir meilleur.
À travers cette mission, la plateforme œuvre à renforcer les capacités des jeunes et à les autonomiser, afin qu’ils deviennent des acteurs actifs et influents au sein de la société.`,
    },
    {
        title: "Gestion des plateformes Irchad de Moulay Rachid – Sidi Othmane",
        content: `L’Association Najm pour l’inclusion économique des jeunes assure la gestion de deux plateformes Irchad situées dans la préfecture Moulay Rachid – Sidi Othmane. À travers cette initiative, l’association accompagne les porteurs d’idées de projets en les accueillant, en écoutant leurs idées et projets, puis en leur proposant un accompagnement adapté à chaque cas.

Les plateformes offrent un environnement stimulant pour les jeunes entrepreneurs, avec un appui professionnel, technique et financier, facilitant ainsi leur intégration économique et le développement de leurs idées en projets concrets et réussis.`,
    },
    {
        title: "Économie sociale et solidaire : Mesures de soutien aux coopératives",
        content: `Dans le cadre du développement économique et de la promotion de l’innovation sociale, des mesures spécifiques de soutien aux coopératives sont mises en œuvre, couvrant plusieurs axes :
Accompagnement des coopératives
Un soutien intégré et progressif est proposé aux coopératives et aux porteurs de projets, depuis la phase de création jusqu’à l’après-lancement. Ce soutien vise à assurer leur pérennité et développement, avec un accent particulier sur les projets issus de l’analyse des chaînes de valeur.
Soutien technique et assistance à la création
Cela inclut un accompagnement dans les démarches de création, la préparation de plans d’affaires, et la structuration des coopératives. Le soutien s’étend aussi à l’identification des activités économiques pertinentes via l’analyse des chaînes de valeur.
Création d’identités de marque
Le soutien aide à développer des marques qui reflètent l'identité des coopératives et des projets locaux, renforçant leur crédibilité et leur positionnement sur le marché, au niveau local et international.
Certifications de qualité
Le soutien comprend aussi l’obtention de certifications qui garantissent la qualité des produits ou services, améliorant ainsi la réputation des coopératives et la confiance des consommateurs.
Accompagnement post-création
En plus de la phase de lancement, un suivi continu est assuré : conseils supplémentaires, formations ciblées, appui à la gestion financière et administrative, facilitant le passage à l’étape de croissance.
L’objectif de ces actions est de garantir une croissance durable, la compétitivité des coopératives, et la création d’emplois pour les jeunes et la population locale, tout en valorisant l’innovation.

`,
    },
    {
        title: "Composantes d’un incubateur de projets",
        content: `Un incubateur de projets est une structure dédiée à l’appui des individus ou équipes souhaitant lancer un projet, surtout dans les premières étapes. Son objectif est d’offrir un environnement favorable à la transformation d’idées en projets viables et évolutifs.
Soutien technique et orientation
L’incubateur fournit des conseils en stratégie, marketing, finance et gestion, afin que les projets soient bâtis sur des fondations solides et capables de s’adapter au marché.
Soutien financier
Certains incubateurs proposent un financement initial ou facilitent l’accès à des sources de financement (subventions, prêts, capital-risque), pour couvrir les coûts de lancement.
Formations et ateliers
Des ateliers et formations spécialisées sont offerts dans des domaines tels que le marketing digital, les présentations investisseurs, la gestion d’équipe, ou encore la planification financière.
Soutien logistique
Les incubateurs mettent à disposition des espaces de coworking avec tout le nécessaire (internet, bureaux, salles de réunion), favorisant un cadre de travail motivant.
Réseautage et accompagnement
Ils offrent des opportunités de mise en relation avec des investisseurs, des experts sectoriels, d’autres entrepreneurs, ou encore des institutions académiques.
Accès aux marchés
Les incubateurs appuient la commercialisation des produits, en facilitant la participation à des foires, salons et événements économiques.
Suivi continu
Ils assurent un accompagnement à moyen et long terme, via l’analyse des performances du projet, des ajustements stratégiques et un appui ciblé.`,
    },
    {
        title: "Objectifs d’un incubateur de projets",
        content: `+ Stimuler l’innovation à travers le soutien aux projets innovants
+ Réduire les risques d’échec en offrant un appui dès les premières étapes
+ Favoriser la création d’emplois
+ Renforcer l’économie locale via la valorisation de l’entrepreneuriat`,
    },

    {
        title: "Développement des capacités des jeunes",
        content: `Renforcement des compétences personnelles et professionnelles
La plateforme vise à renforcer des compétences clés telles que :
- La communication efficace
- La gestion du temps
- La résolution de problèmes
- L’utilisation d’outils numériques
- Le leadership
- La gestion financière

Soutien à l’entrepreneuriat:
Les jeunes sont accompagnés dans la transformation de leurs idées en entreprises, avec des formations en :
- Élaboration de plans d’affaires
- Marketing digital
- Gestion de projet
- Assistance technique pour PME

Accès à l’emploi :
La plateforme facilite l’insertion professionnelle via :
- Des formations certifiantes
- Des stages et expériences terrain
- Des salons de l’emploi et sessions de coaching

Stimulation de l’innovation et de la créativité:
Des espaces de présentation et de prototypage sont proposés pour inciter les jeunes à créer des solutions innovantes aux défis sociaux et économiques.

Renforcement de la conscience sociale:
À travers des programmes de volontariat, les jeunes sont encouragés à s’impliquer dans des projets communautaires touchant à l’éducation, la santé ou l’environnement.

Activités et programmes proposés par la plateforme des jeunes:

- Formations professionnelles : en programmation, design, marketing digital…
- Ateliers de compétences de vie : pensée critique, négociation, organisation personnelle
- Conseil et accompagnement : pour fixer des objectifs de carrière, lancer un projet
- Préparation à l’entrepreneuriat : plan d’affaires, étude de marché, gestion
- Foires et opportunités d’emploi : rencontres entreprises, coaching CV/entretien
- Événements communautaires : actions sociales et environnementales

Avantages de la plateforme :
- Autonomisation des jeunes : développement personnel et indépendance financière
- Impact local positif : création d’emplois, hausse de la productivité locale
- Adaptation à l’ère numérique : acquisition de compétences digitales
- Renforcement de la culture entrepreneuriale : valorisation de l’innovation`,
    },


];


export default function IrchadPage() {
    const [openIndex, setOpenIndex] = useState(null);
const { t } = useTranslation();

  const sections = t("irchad.sections", { returnObjects: true });
    const toggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
    <>  <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-25 mb-10">
  <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">
    {t("vision_guidelines.title")}
  </h2>
  <p className="text-gray-800 leading-relaxed whitespace-pre-line text-justify">
    {t("vision_guidelines.paragraph")}
    {"\n\n"}
    <span className="font-semibold italic">
      {t("vision_guidelines.citation")}
    </span>
  </p>
</div>

      {/* Vidéo */}

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden p-6 mb-5">
        <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          {t("irchad.videoTitle")}
        </h3>
        <div className="rounded-lg overflow-hidden">
          <video className="w-full h-auto" controls muted loop>
            <source src={videoSrc} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos HTML5.
          </video>
        </div>
      </div>

      {/* Titre principal et accordéon */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          {t("irchad.mainTitle")}
        </h1>

        {sections &&
          sections.map((section, index) => (
            <div key={index} className="mb-6 border-b">
              <button
                onClick={() => toggle(index)}
                className="w-full text-left text-xl font-semibold text-gray-800 hover:text-indigo-700 transition py-4"
              >
                {section.title}
              </button>
              {openIndex === index && (
                <div className="text-gray-700 bg-white p-4 rounded-lg shadow">
                  {/* Section spéciale pour "Mission de la « Plateforme des Jeunes »" avec image */}
                  {section.title === "Mission de la « Plateforme des Jeunes »" ? (
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      <div className="flex-1">
                        <p className="leading-relaxed whitespace-pre-line text-justify">
                          {section.content}
                        </p>
                      </div>
                      <div className="flex-shrink-0 lg:w-1/3">
                        <img 
                          src={image2a} 
                          alt="Mission de la Plateforme des Jeunes" 
                          className="w-full h-auto rounded-lg shadow-md"
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="leading-relaxed whitespace-pre-line text-justify">
                      {section.content}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
}