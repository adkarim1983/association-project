import { useState, useRef, useEffect } from "react";
import presidentImg from "../assets/image2.jpg";

export default function PresidentMessage() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showFullMessage, setShowFullMessage] = useState(false);

  useEffect(() => {
    let scrollAmount = 0;
    const interval = setInterval(() => {
      if (!isPaused && scrollRef.current && !showFullMessage) {
        scrollAmount += 1;
        scrollRef.current.scrollLeft = scrollAmount;
        if (
          scrollAmount >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollAmount = 0;
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused, showFullMessage]);

  return (
    <section className="bg-gray-100 py-4 px-4 mx-7 mt-25 rounded-lg">
      <div
        className="flex flex-col gap-4 overflow-hidden cursor-pointer md:flex-row md:items-center"
        onMouseEnter={() => {
          setIsPaused(true);
          setShowFullMessage(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setShowFullMessage(false);
        }}
      >
        <h2 className="text-base md:text-lg font-bold text-blue-800 whitespace-nowrap">
          Mot du Président Directeur Général :
        </h2>

        {!showFullMessage ? (
          <div ref={scrollRef} className="flex-1 overflow-hidden">
            <div className="inline-block whitespace-nowrap text-gray-700 text-sm md:text-base min-w-max">
              Monsieur Hassan Rizk, président de l’Association Najm, souhaite la
              bienvenue sur la plateforme de l’association, qui reflète son
              engagement pour l’insertion économique et professionnelle des
              jeunes. L’association croit fermement que les jeunes sont les
              moteurs du changement...
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-lg shadow-md w-full mt-2">
            <img
              src={presidentImg}
              alt="Président"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow"
            />
            <p className="text-gray-700 text-sm sm:text-base text-justify sm:max-w-2xl">
              Monsieur Hassan Rizk, président de l’Association Najm, souhaite la
              bienvenue sur la plateforme de l’association, qui reflète son
              engagement pour l’insertion économique et professionnelle des
              jeunes. L’association croit fermement que les jeunes sont les
              moteurs du changement et que leur accompagnement est essentiel
              pour un développement durable. Elle s'appuie sur des valeurs comme
              le respect, la transparence, l’égalité et la confiance, tout en
              nouant des partenariats locaux et internationaux. Son objectif est
              de devenir une plateforme de référence pour guider, former et
              inspirer les jeunes, afin qu’ils deviennent des acteurs du
              développement et des leaders du futur.
            </p>
            
          </div>
        )}
      </div>
    </section>
  );
}