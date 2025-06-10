import React from 'react';
import { useTranslation } from 'react-i18next';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import { Link } from "react-router-dom";

export default function ReportsSection() {
  const { t } = useTranslation();

  const reports = [
    {
      image: image1,
      text: t('reports.report1'),
      link: '/rapports/activites-2024',
    },
    {
      image: image2,
      text: t('reports.report2'),
      link: '/rapports/culture-et-jeunesse',
    },
    {
      image: image3,
      text: t('reports.report3'),
      link: '/rapports/solidarite-developpement',
    },
  ];

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          {t('reports.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reports.map((report, index) => (
            <div key={index} className="bg-white shadow-md rounded-xl overflow-hidden">
              <img
                src={report.image}
                alt={`Report ${index + 1}`}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-700 mb-4">{report.text}</p>
                <Link
                  to={report.link}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  {t('reports.more')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
