import { Aid } from "src/types/data/Aid";
import { useAids } from "src/views/APIs";

export function useAidsTabData(beneficiary_id: number) {
  const { getAllAvailableAids } = useAids();
  const { isLoading, data: aidsResponse } = getAllAvailableAids({
    beneficiary_id: beneficiary_id.toString(),
  });

  const aids: Aid[] = aidsResponse?.data?.map((e) => ({})) ?? [];

  return { isLoading, aids };
}
