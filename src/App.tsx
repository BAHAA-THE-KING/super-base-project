import { useEffect, useMemo } from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
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
  useDirection,
  usePreferredLanguage,
  usePreferredTheme,
} from "src/globals";

import { MessagesProvider } from "src/contexts";

import { AppRouter } from "src/routes/AppRouter";

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
      refetchOnMount: true, // don't refetch if the component mounts
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
  const [dir, setDirection] = useDirection();

  const currentTheme = useMemo(() => {
    const currentTheme = themes[theme];
    currentTheme.direction = dir;
    return currentTheme;
  }, [themes, theme, dir]);

  useEffect(() => {
    const newDir = lang === "ar" ? "rtl" : "ltr";
    setDirection(newDir);
  }, [lang]);

  return (
    <ErrorBoundary fallbackRender={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {dir === "ltr" ? (
          <>
            <CssBaseline />
            <ThemeProvider theme={currentTheme}>
              <MessagesProvider>
                <AppRouter />
              </MessagesProvider>
              <ReactQueryDevtools initialIsOpen={false} panelPosition="right" />
            </ThemeProvider>
          </>
        ) : (
          <CacheProvider value={cacheRtl}>
            <CssBaseline />
            <ThemeProvider theme={currentTheme}>
              <MessagesProvider>
                <AppRouter />
              </MessagesProvider>
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </CacheProvider>
        )}
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
