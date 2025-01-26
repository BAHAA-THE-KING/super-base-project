import { atom } from "recoil";

export type Languages = "en" | "ar";
export const languageAtom = atom<Languages>({
  key: "language",
  default: "en",
});

export type Themes = "light" | "dark";
export const themeAtom = atom<Themes>({
  key: "theme",
  default: "light",
});
