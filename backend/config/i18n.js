import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const initializeI18n = async () => {
  await i18next
    .use(Backend)
    .init({
      lng: 'fr', // default language
      fallbackLng: 'fr',
      debug: process.env.NODE_ENV === 'development',
      
      backend: {
        loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'),
      },
      
      interpolation: {
        escapeValue: false, // not needed for server side
      },
      
      saveMissing: false,
      
      ns: ['translation'],
      defaultNS: 'translation',
    });
  
  return i18next;
};

export const getTranslation = (key, language = 'fr', options = {}) => {
  return i18next.getFixedT(language)(key, options);
};

export default i18next;
