import { t } from "i18next";

import ar from "src/translations/ar.json";

export function useBaseTranslation(keys: string[]) {
  return keys.map((e) => {
    if (e in ar) {
      return t(e);
    }
    throw new Error(`Invalid Translation "${e}"`);
  });
}
