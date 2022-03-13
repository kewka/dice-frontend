import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en'],
    fallbackLng: 'en',
    // debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
