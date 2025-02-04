import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { useSetPreferences } from "src/hooks";

import { lightTheme, darkTheme } from "src/themes";

import enTranslations from "src/translations/en.json";
import arTranslations from "src/translations/ar.json";
import { usePreferredTheme } from "./globals";

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
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Button>asd</Button>
    </ThemeProvider>
  );
}

export default App;
