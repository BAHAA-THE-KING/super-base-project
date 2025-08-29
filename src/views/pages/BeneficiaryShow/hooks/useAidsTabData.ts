import { AvailableAid } from "src/types/data/AvailableAid";

export function useAidsTabData(beneficiary_id: number) {
  const aids: AvailableAid[] = [];

  return { isLoading: false, aids };
}
