import { useEffect } from "react";

import {
  usePreferredLanguage,
  usePreferredTheme,
  type Languages,
  type Themes,
} from "src/globals";

export function useSetPreferences() {
  const [, setLang] = usePreferredLanguage();
  const [, setTheme] = usePreferredTheme();
  useEffect(() => {
    const preferredLanguage = localStorage.getItem("preferredLanguage");
    const preferredTheme = localStorage.getItem("preferredTheme");
    setLang(preferredLanguage as Languages);
    setTheme(preferredTheme as Themes);
  }, []);
}
