import { useRecoilState } from "recoil";

import { languageAtom, themeAtom } from "./atoms";

export const usePreferredLanguage = () => useRecoilState(languageAtom);
export const usePreferredTheme = () => useRecoilState(themeAtom);
