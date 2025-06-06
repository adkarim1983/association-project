import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importer les traductions
import translationFR from "./locales/fr/translation.json";
import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";

// Initialisation
i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: translationFR },
    en: { translation: translationEN },
    ar: { translation: translationAR },
  },
  lng: "fr", // langue par défaut
  fallbackLng: "fr", // langue de secours
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
