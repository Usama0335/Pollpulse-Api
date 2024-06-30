// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en/translation.json';
import fi from './locales/fi/translation.json';
import sv from './locales/sv/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    fi: {
      translation: fi,
    },
    sv: {
      translation: sv,
    },
  },
  lng: localStorage.getItem('language') || 'en', // default language
  fallbackLng: 'en', // fallback language
  interpolation: {
    escapeValue: false, // React already safes from xss
  },
});

export default i18n;
