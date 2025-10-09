"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import ar from "./locales/ar.json";
import hi from "./locales/hi.json";

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  ar: { translation: ar },
  hi: { translation: hi }
} as const;

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: ["en", "ru", "ar", "hi"],
      interpolation: { escapeValue: false },
      detection: {
        order: ["querystring", "cookie", "localStorage", "navigator"],
      },
    });
}

export default i18n;


