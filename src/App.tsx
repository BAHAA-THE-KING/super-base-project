import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { useSetPreferences } from "src/hooks";

import enTranslations from "src/translations/en.json";
import arTranslations from "src/translations/ar.json";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    ar: {
      translation: arTranslations,
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  useSetPreferences();

  return <></>;
}

export default App;
