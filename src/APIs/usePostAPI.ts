import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "src/utils";

type Config = {
  invalidateKeys?: QueryKey;
  filters?: {
    [key: string]: string | number;
  };
};

export function usePostAPI<R, T>(path: string, config: Config = {}) {
  const { invalidateKeys, filters } = config;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: T) => api.post<R>(path, data, { params: filters }),
    onSuccess: () => {
      console.log("Query Success, invalidating:", invalidateKeys);
      if (invalidateKeys) {
        queryClient.invalidateQueries({ queryKey: invalidateKeys });
      }
    },
  });
}
