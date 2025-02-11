import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "src/utils";

type Config = {
  invalidateKeys?: QueryKey;
  filters?: {
    [key: string]: string | number;
  };
};

export function usePatchAPI<R, T>(path: string, config: Config = {}) {
  const { invalidateKeys, filters } = config;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: T) => api.patch<R>(path, data, { params: filters }),
    onSuccess: () => {
      if (invalidateKeys) {
        queryClient.invalidateQueries(invalidateKeys);
      }
    },
  });
}
