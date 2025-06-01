import React from "react";
import image2 from "../assets/image13.jpg";
import image3 from "../assets/image14.jpg";

export default function Presentation() {
  return (
    <section className="relative bg-white m-[25px] rounded-xl overflow-hidden shadow-xl py-15">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 ">
        
        {/* Image gauche */}
        <div className="w-full">
          <img
            src={image2}
            alt="Image gauche"
            className="rounded-xl shadow-lg object-cover w-full h-full"
          />
        </div>

        {/* Texte centré */}
        <div className="text-center md:px-6">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Qui sommes-nous ?</h2>
          <p className="text-gray-700 leading-relaxed">
            L’<span className="font-semibold text-blue-600">Association Najm</span> une organisation à but non lucratif qui vise
            à soutenir les jeunes, les enfants et les familles à travers des actions
            éducatives, culturelles et sociales. Elle s'engage activement pour
            promouvoir la solidarité, l'égalité des chances et le développement local.
             L’Association Najm est une organisation à but non lucratif qui vise
            à soutenir les jeunes, les enfants et les familles à travers des actions
            éducatives, culturelles et sociales. Elle s'engage activement pour
            promouvoir la solidarité, l'égalité des chances et le développement local.
          </p>
        </div>

        {/* Image droite */}
        <div className="w-full">
          <img
            src={image3}
            alt="Image droite"
            className="rounded-xl shadow-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
