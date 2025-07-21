import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import imageB from "../assets/B.jpg";
import imageC from "../assets/C.jpg";
import imageD from "../assets/D.jpg";

export default function Hero() {
  const { t, ready } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: imageB,
      title: t("hero.slide1.title", "Association Najm"),
      description: t("hero.slide1.description", "Pour un avenir meilleur à travers l'éducation, la culture et la solidarité."),
    },
    {
      src: imageC,
      title: t("hero.slide2.title", "Éducation et Engagement"),
      description: t("hero.slide2.description", "Rejoignez-nous pour construire un monde plus juste et plus humain."),
    },
    {
      src: imageD,
      title: t("hero.slide3.title", "Solidarité Active"),
      description: t("hero.slide3.description", "Unissons nos forces pour un impact positif dans notre société."),
    },
  ];

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
    <section className="m-4 md:m-[20px]">
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group transition-all duration-700">
        <img
          src={src}
          alt={title}
          className="w-full h-[40vh] sm:h-[50vh] md:h-[58vh] lg:h-[65vh] xl:h-[68vh] object-cover transition-transform duration-700"
        />

        {/* Flèche gauche */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-lg md:text-2xl font-bold px-2 md:px-3 py-1 rounded-full z-10 transition-all duration-300"
        >
          &#8592;
        </button>

        {/* Flèche droite */}
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white text-lg md:text-2xl font-bold px-2 md:px-3 py-1 rounded-full z-10 transition-all duration-300"
        >
          &#8594;
        </button>

        {/* Texte */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4 md:p-6">
          <h2 className="text-lg sm:text-xl md:text-4xl lg:text-5xl font-extrabold mb-2 text-white text-center md:text-left leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white drop-shadow-md">
            {description}
          </p>
        </div>

        {/* Indicateurs de pagination */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
