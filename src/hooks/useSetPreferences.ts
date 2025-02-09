import { useEffect } from "react";

import {
  usePreferredLanguage,
  usePreferredTheme,
  usePreferredDirection,
  type Languages,
} from "src/globals";

import { Themes } from "src/types/Themes";

export function useSetPreferences() {
  const [, setLang] = usePreferredLanguage();
  const [, setTheme] = usePreferredTheme();
  const [, setDirection] = usePreferredDirection();
  useEffect(() => {
    const preferredLanguage = localStorage.getItem("preferredLanguage");
    const preferredTheme = localStorage.getItem("preferredTheme");
    if (preferredLanguage) setLang(preferredLanguage as Languages);
    if (preferredTheme) setTheme(preferredTheme as Themes);
    if (preferredLanguage)
      setDirection(preferredLanguage === "ar" ? "rtl" : "ltr");
  }, []);
}
