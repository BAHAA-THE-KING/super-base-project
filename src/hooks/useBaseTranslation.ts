import { t } from "i18next";

export function useBaseTranslation(keys: string[]) {
  return keys.map((e) => t(e));
}
