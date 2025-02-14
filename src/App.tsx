import { ThemeProvider } from "@emotion/react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 5 * 60 * 1000, // cache for 5 minutes
      staleTime: 5 * 60 * 1000, // cache for 5 minutes
      refetchOnWindowFocus: false, // don't refetch if the user swap windows
      refetchOnReconnect: true, // refetch when connection detected
      refetchOnMount: false, // don't refetch if the component mounts
      retry: 3, // stop after 3 failures
    },
  },
});

function App() {
  useSetPreferences();
  const [theme] = usePreferredTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themes[theme]}>
        <AppRouter />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
