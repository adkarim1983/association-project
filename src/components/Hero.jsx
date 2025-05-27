import React, { useState, useEffect } from "react";
import image2 from "../assets/image13.jpg";
import image12 from "../assets/image14.jpg";
import image13 from "../assets/image15.jpg";

const images = [image2, image12, image13];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[65vh] m-[25px] rounded-xl overflow-hidden">

      {/* Image affichée directement */}
      <img
        src={images[currentIndex]}
        alt="Slide"
        className="w-full h-full object-cover transition-opacity duration-1000"
      />

      {/* Texte affiché par-dessus l'image */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Association Najm
        </h1>
        <p className="text-white text-lg max-w-2xl drop-shadow-md">
          Pour un avenir meilleur à travers l'éducation, la culture et la solidarité.
          Rejoignez-nous dans nos actions pour un monde plus juste et plus humain.
        </p>
      </div>
    </section>
  );
}

export default Hero;
