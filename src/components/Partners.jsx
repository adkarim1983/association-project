import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import image4 from "../assets/image4.jpg";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";
import image11 from "../assets/image11.png";
import image12 from "../assets/image12.png";
import logo2 from "../assets/logo2.png";

const partners = [
  { id: 1, name: "", image: image4, link: "https://www.univh2c.ma/" },
  { id: 2, name: "", image: image5, link: "https://www.ofppt.ma/" },
  { id: 3, name: "", image: image6, link: "https://anapec.ma/home-page-o1/" },
  { id: 4, name: "", image: image7, link: "https://www.entraide.ma/" },
  { id: 5, name: "", image: image8, link: "https://www.amideast.org/morocco" },
  { id: 6, name: "", image: image9, link: "https://moulayrachid.casablancacity.ma/fr" },
  { id: 7, name: "", image: image10, link: "https://enactus-morocco.org/" },
  { id: 8, name: "", image: image11, link: "https://www.odco.gov.ma/" },
  { id: 9, name: "", image: image12, link: "https://carcs.ma/" },
];

export default function Partners() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        
        // Si on est à la fin, retour au début
        if (scrollLeft >= scrollWidth - clientWidth) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Sinon, continuer à défiler
          scrollContainerRef.current.scrollBy({
            left: 200,
            behavior: 'smooth'
          });
        }
      }
    }, 1000); // Défilement toutes les 3 secondes

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="py-16 mx-5 px-2 sm:px-4 md:px-6 text-center rounded-lg"
      style={{
        backgroundImage: `url(${logo2})`,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backgroundBlendMode: "lighten",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-2 sm:px-3 md:px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-5 text-blue-900 leading-tight">
          {t('partners_title')}
        </h2>
        <p className="text-justify max-w-3xl mx-auto text-gray-700 text-lg">
          {t('partners_text')}
        </p>
        <br />
        <br />
        
        <div className="relative">
          {/* Flèche gauche */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border hover:bg-gray-50 transition-all duration-200 ${
              !canScrollLeft ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            style={{ left: '-20px' }}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Flèche droite */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg border hover:bg-gray-50 transition-all duration-200 ${
              !canScrollRight ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
            }`}
            style={{ right: '-20px' }}
          >
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Container scrollable */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            <div className="flex gap-8 pb-4" style={{ minWidth: 'max-content' }}>
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 h-32 flex items-center justify-center bg-white border-t border-b border-gray-300 rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  {partner.link ? (
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full h-full items-center justify-center"
                    >
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="h-full w-auto object-contain"
                      />
                    </a>
                  ) : (
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="h-full w-auto object-contain"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}