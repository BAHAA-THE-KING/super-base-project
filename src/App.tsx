import { useEffect } from "react";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { ErrorBoundary } from "react-error-boundary";

import { useSetPreferences } from "src/hooks";

import themes from "src/themes";

import enTranslations from "src/translations/en.json";
import arTranslations from "src/translations/ar.json";

import {
  usePreferredDirection,
  usePreferredLanguage,
  usePreferredTheme,
} from "src/globals";

import { AppRouter } from "./routes/AppRouter";

import { MainErrorFallback } from "./ErrorFallbacks";

// Multi-lang config
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

// Query cache config
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

// RTL theme config
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  useSetPreferences();
  const [theme] = usePreferredTheme();
  const [lang] = usePreferredLanguage();
  const [dir, setDirection] = usePreferredDirection();

  const currentTheme = themes[theme];

  useEffect(() => {
    const newDir = lang === "ar" ? "rtl" : "ltr";
    setDirection(newDir);
  }, [lang]);
  useEffect(() => {
    currentTheme.direction = dir;
  }, [dir]);

  const app = (
    <ThemeProvider theme={currentTheme}>
      <AppRouter />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );

  return (
    <ErrorBoundary fallbackRender={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {dir === "ltr" ? (
          app
        ) : (
          <CacheProvider value={cacheRtl}>{app}</CacheProvider>
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
