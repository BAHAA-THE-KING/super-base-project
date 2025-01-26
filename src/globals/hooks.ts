import { useRecoilState } from "recoil";
import i18next from "i18next";

import { languageAtom, Languages, themeAtom } from "./atoms";

export const usePreferredLanguage = () => {
  const [language, setLanguage] = useRecoilState(languageAtom);

  const setPreferredLanguage = (lang: Languages) => {
    i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  return [language, setPreferredLanguage] as const;
};

export const usePreferredTheme = () => useRecoilState(themeAtom);
