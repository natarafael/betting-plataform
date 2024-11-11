import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all translation files
import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enBetting from "./locales/en/betting.json";
import ptCommon from "./locales/pt/common.json";
import ptAuth from "./locales/pt/auth.json";
import ptBetting from "./locales/pt/betting.json";

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    betting: enBetting,
  },
  pt: {
    common: ptCommon,
    auth: ptAuth,
    betting: ptBetting,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    defaultNS: "common", // Default namespace
    supportedLngs: ["en", "pt"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: typeof enCommon;
      auth: typeof enAuth;
      betting: typeof enBetting;
    };
  }
}
