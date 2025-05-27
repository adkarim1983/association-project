import React from 'react';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const reports = [
  {
    image: image1,
    text: 'Découvrez nos activités sociales et éducatives réalisées en 2024.',
    link: '#',
  },
  {
    image: image2,
    text: 'Retour sur nos projets culturels avec les jeunes et les enfants.',
    link: '#',
  },
  {
    image: image3,
    text: 'Nos actions de solidarité et de développement local.',
    link: '#',
  },
];

export default function ReportsSection() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Nos Rapports en Images
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
                <a
                  href={report.link}
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Plus d’infos
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
