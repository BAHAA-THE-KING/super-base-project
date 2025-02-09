import { ThemeProvider } from "@emotion/react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { useSetPreferences } from "src/hooks";

import themes from "src/themes";

import enTranslations from "src/translations/en.json";
import arTranslations from "src/translations/ar.json";

import { usePreferredTheme } from "src/globals";

import { AppRouter } from "./routes/AppRouter";

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
  const [theme] = usePreferredTheme();

  return (
    <ThemeProvider theme={themes[theme]}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
