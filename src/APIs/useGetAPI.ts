import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "src/utils";

type Config<R> = {
  enabled?: boolean;
  keys?: any[];
  invalidateKeys?: QueryKey;
  filters?: {
    [key: string]: string | number;
  };
  defaultData?: R;
};

export function useGetAPI<R>(path: string, config: Config<R> = {}) {
  const {
    enabled = true,
    keys = [],
    invalidateKeys,
    filters,
    defaultData,
  } = config;

  const queryClient = useQueryClient();

  return useQuery(
    [path, filters, ...keys],
    async ({ signal }) =>
      (await api.get<R>(path, { params: filters, signal })).data,
    {
      enabled,
      placeholderData: defaultData,
      onSuccess: () => {
        if (invalidateKeys) {
          queryClient.invalidateQueries(invalidateKeys);
        }
      },
    }
  );
}
