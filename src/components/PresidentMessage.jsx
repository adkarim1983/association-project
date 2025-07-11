import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import presidentImg from "../assets/image2.jpg";
import i18next from "i18next";

export default function PresidentMessage() {
  const { t } = useTranslation();
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

const currentLanguage = i18next.language;
console.log("Current Language:", currentLanguage);
const isArabic = currentLanguage === "ar";

  return (
    <section className="bg-gray-100 py-4 px-14 mx-7 mt-25 rounded-lg">
      <div
        className={`flex flex-col gap-4 overflow-hidden cursor-pointer md:items-center md:flex-row`}
        onMouseEnter={() => {
          setIsPaused(true);
          setShowFullMessage(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
          setShowFullMessage(false);
        }}
      >
        <h2 className="text-base md:text-lg font-bold text-blue-800 whitespace-nowrap mx-10">
          {t("president_title")}
        </h2>

        {!showFullMessage ? (
          <div ref={scrollRef} className="flex-1 overflow-hidden">
            <div className="inline-block whitespace-nowrap text-gray-700 text-sm md:text-base min-w-max">
              {t("president_text")}
            </div>
          </div>
        ) : (
          <div className={`flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-lg shadow-md w-full mt-2 md:flex-row`}>
            <img
              src={presidentImg}
              alt="Président"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow"
            />
            <p className="text-gray-700 text-sm sm:text-base text-justify sm:max-w-2xl">
              {t("president_full_text")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}