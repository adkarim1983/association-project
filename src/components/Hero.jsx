import React, { useState, useEffect } from "react";
import image2 from "../assets/image13.jpg";
import image12 from "../assets/image14.jpg";
import image13 from "../assets/image15.jpg";

const images = [
  {
    src: image2,
    title: "Association Najm",
    description: "Pour un avenir meilleur à travers l'éducation, la culture et la solidarité.",
  },
  {
    src: image12,
    title: "Éducation et Engagement",
    description: "Rejoignez-nous pour construire un monde plus juste et plus humain.",
  },
  {
    src: image13,
    title: "Solidarité Active",
    description: "Unissons nos forces pour un impact positif dans notre société.",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const { src, title, description } = images[currentIndex];

  return (
    <section className="m-[25px]">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl group transition-all duration-700">
       
        <img
          src={src}
          alt={title}
          className="w-full h-[70vh] object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in-up">{title}</h2>
          <p className="text-base md:text-lg text-gray-200 animate-fade-in-up delay-200">{description}</p>
        </div>
      </div>
    </section>
  );
}
