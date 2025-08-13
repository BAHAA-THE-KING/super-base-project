import { Aid } from "src/types/data/Aid";

export function useAidsTabData(beneficiary_id: number) {
  const aids: Aid[] = [];

  return { isLoading: false, aids };
}
