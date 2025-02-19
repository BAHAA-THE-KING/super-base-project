import { atom } from "recoil";

import { Themes } from "src/types/Themes";

export type Languages = "en" | "ar";
export const languageAtom = atom<Languages>({
  key: "language",
  default: "en",
  effects: [
    ({ onSet }) => {
      onSet((lang) => localStorage.setItem("preferredLanguage", lang));
    },
  ],
});

export const themeAtom = atom<Themes>({
  key: "theme",
  default: "light",
  effects: [
    ({ onSet }) => {
      onSet((theme) => localStorage.setItem("preferredTheme", theme));
    },
  ],
});

export type Directions = "ltr" | "rtl";
export const directionAtom = atom<Directions>({
  key: "direction",
  default: "ltr",
  effects: [
    ({ onSet }) => {
      onSet((dir) => (document.dir = dir));
    },
  ],
});
