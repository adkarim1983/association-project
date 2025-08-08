import React from 'react';
import { useTranslation } from 'react-i18next';

const Entrepreneuriat = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('missions.entrepreneuriat')}
          </h1>
          <div className="w-24 h-1 bg-orange-600 mx-auto"></div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Renforcement de l'Entrepreneuriat chez les Jeunes
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Grâce à la compétence de ses membres et à l'engagement constant de sa structure organisationnelle, 
              l'Association Najm a contribué à l'appel à manifestation d'intérêt lancé par la préfecture de Moulay Rachid 
              en novembre 2023, concernant la mise en œuvre de l'axe de soutien à l'entrepreneuriat des jeunes.
            </p>

            <div className="bg-orange-50 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">Excellence reconnue</h3>
              <p className="text-gray-700">
                L'excellence du dossier de candidature présenté par l'Association a permis de gagner la confiance du comité de sélection 
                et de Monsieur le Gouverneur, cette confiance s'est concrétisée par l'attribution de cette mission stratégique à l'Association Najm. 
                L'Association a ainsi signé deux conventions de partenariat pour l'année 2024, sur le territoire de la préfecture de Moulay Rachid.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Formation pré-création</h3>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600">200</div>
                  <div className="text-gray-600">Jeunes formés</div>
                </div>
                <p className="text-gray-700">
                  Formation complète pour les jeunes en phase de pré-création d'entreprise, couvrant tous les aspects 
                  essentiels de l'entrepreneuriat.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Accompagnement post-création</h3>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600">115</div>
                  <div className="text-gray-600">Entrepreneurs accompagnés</div>
                </div>
                <p className="text-gray-700">
                  Accompagnement personnalisé pour les entrepreneurs en phase post-création, garantissant 
                  la pérennité et le développement de leurs entreprises.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold text-purple-800 mb-4">Méthodologie et Approche Pédagogique</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Approche pratique</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Ateliers interactifs</li>
                    <li>Études de cas réels</li>
                    <li>Simulations d'entreprise</li>
                    <li>Mentorat personnalisé</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Soutien continu</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Suivi post-formation</li>
                    <li>Réseau d'entrepreneurs</li>
                    <li>Accès au financement</li>
                    <li>Conseil stratégique</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline or Process */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Processus d'accompagnement</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h4 className="font-semibold mb-2">Évaluation</h4>
              <p className="text-sm text-gray-600">Analyse du profil et du projet entrepreneurial</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="font-semibold mb-2">Formation</h4>
              <p className="text-sm text-gray-600">Programme de formation adapté aux besoins</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h4 className="font-semibold mb-2">Lancement</h4>
              <p className="text-sm text-gray-600">Soutien à la création et au lancement</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h4 className="font-semibold mb-2">Suivi</h4>
              <p className="text-sm text-gray-600">Accompagnement post-création continu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entrepreneuriat;
