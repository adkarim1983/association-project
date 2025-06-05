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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const { src, title, description } = images[currentIndex];

  return (
    <section className="m-[25px]">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl group transition-all duration-700">
        <img
          src={src}
          alt={title}
          className="w-full h-[70vh] object-cover transition-transform duration-700"
        />

        {/* Flèche gauche */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-2xl font-bold px-3 py-1 rounded-full z-10"
        >
          &#8592;
        </button>

        {/* Flèche droite */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-2xl font-bold px-3 py-1 rounded-full z-10"
        >
          &#8594;
        </button>

        {/* Texte */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-white">
  {title}
</h2>
          <p className="text-base md:text-lg text-white drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
