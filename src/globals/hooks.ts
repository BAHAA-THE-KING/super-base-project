import { useRecoilState } from "recoil";
import i18next from "i18next";

import {
  directionAtom,
  languageAtom,
  Languages,
  sidebarOpenAtom,
  themeAtom,
  voiceInputAtom,
} from "./atoms";

export const usePreferredLanguage = () => {
  const [language, setLanguage] = useRecoilState(languageAtom);

  const setPreferredLanguage = (lang: Languages) => {
    i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  return [language, setPreferredLanguage] as const;
};

export const usePreferredTheme = () => useRecoilState(themeAtom);
export const useDirection = () => useRecoilState(directionAtom);
export const useSidebarOpen = () => useRecoilState(sidebarOpenAtom);
export const useVoiceInput = () => useRecoilState(voiceInputAtom);
