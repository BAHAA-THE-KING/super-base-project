import { useEffect } from "react";

import {
  usePreferredLanguage,
  usePreferredTheme,
  type Languages,
  type Themes,
} from "src/globals";

export function useSetPreferences() {
  const [lang, setLang] = usePreferredLanguage();
  const [theme, setTheme] = usePreferredTheme();
  useEffect(() => {
    const preferredLanguage = localStorage.getItem("preferredLanguage");
    const preferredTheme = localStorage.getItem("preferredTheme");
    setLang(preferredLanguage as Languages);
    setTheme(preferredTheme as Themes);
  }, []);
  useEffect(() => {
    localStorage.setItem("preferredLanguage", lang);
    localStorage.setItem("preferredTheme", theme);
  }, [lang, theme]);
}
