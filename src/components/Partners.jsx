import React from "react";
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
  return (
     <section
      className="py-16 mx-5 px-6 text-center rounded-lg"
      style={{
        backgroundImage: `url(${logo2})`,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backgroundBlendMode: "lighten",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-5 text-gray-800">
          {t('partners_title')}
        </h2>
        <p className="text-justify max-w-3xl mx-auto text-gray-700 text-lg">
           {t('partners_text')}
        </p>
          <br />
          <br />
        <div className="overflow-hidden">
          <div className="flex animate-scroll gap-8">
            {partners.concat(partners).map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-32 flex items-center justify-center bg-white border-t border-b border-gray-300 rounded-lg shadow p-4"
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
    </section>
  );
}
