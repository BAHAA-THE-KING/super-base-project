import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "src/utils";

type Config = {
  invalidateKeys?: QueryKey;
  filters?: {
    [key: string]: string | number;
  };
};

export function useDeleteAPI<R>(path: string, config: Config = {}) {
  const { invalidateKeys, filters } = config;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete<R>(path, { params: filters }),
    onSuccess: () => {
      if (invalidateKeys) {
        queryClient.invalidateQueries(invalidateKeys);
      }
    },
  });
}
