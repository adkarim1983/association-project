import React from "react";
import image1 from "../assets/image1.jpg"; // voir d autres images

function Presentation() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <img
            src={image1}
            alt="Activité Najm"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="md:w-1/2 text-gray-800">
          <h2 className="text-3xl font-bold mb-4">Qui sommes-nous ?</h2>
          <p className="text-lg leading-relaxed">
            L’Association Najm est une organisation à but non lucratif qui vise
            à soutenir les jeunes, les enfants et les familles à travers des actions
            éducatives, culturelles et sociales. Elle s'engage activement pour
            promouvoir la solidarité, l'égalité des chances et le développement local.
             L’Association Najm est une organisation à but non lucratif qui vise
            à soutenir les jeunes, les enfants et les familles à travers des actions
            éducatives, culturelles et sociales. Elle s'engage activement pour
            promouvoir la solidarité, l'égalité des chances et le développement local.
            
          </p>
        </div>
      </div>
    </section>
  );
}

export default Presentation;



// version originale du code,,,
