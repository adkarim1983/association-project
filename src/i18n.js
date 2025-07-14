import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importer les traductions
import translationFR from "./locales/fr/translation.json";
import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";

// Initialisation
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: translationFR },
      en: { translation: translationEN },
      ar: { translation: translationAR },
    },
    fallbackLng: "fr", // langue de secours
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
