import { atom } from "recoil";

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

export type Themes = "light" | "dark";
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
      onSet((direction) =>
        localStorage.setItem("preferredDirection", direction)
      );
    },
  ],
});
