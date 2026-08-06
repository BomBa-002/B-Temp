/**
 * Internationalization setup with English default and Arabic RTL support.
 * @module i18n
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from '@/i18n/locales/ar.json';
import en from '@/i18n/locales/en.json';

const savedLanguage = typeof window === 'undefined' ? 'en' : window.localStorage.getItem('language') ?? 'en';

void i18n.use(initReactI18next).init({ resources: { en: { translation: en }, ar: { translation: ar } }, lng: savedLanguage, fallbackLng: 'en', interpolation: { escapeValue: false } });

/** Updates language and document direction. */
export async function setLanguage(language: 'en' | 'ar') {
  await i18n.changeLanguage(language);
  window.localStorage.setItem('language', language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
}

if (typeof document !== 'undefined') {
  document.documentElement.lang = savedLanguage;
  document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
}

export default i18n;
