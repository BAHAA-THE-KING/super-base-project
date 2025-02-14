import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "./utils";
import { ExtractPathParams } from "./utils/ExtractPathParams";

type Config = {
  invalidateKeys?: QueryKey;
};

export function useDeleteAPI<R, P = any>(path: string, config: Config = {}) {
  const { invalidateKeys } = config;

  const queryClient = useQueryClient();

  return useMutation(
    async (
      params:
        | ExtractPathParams<typeof path>
        | P
        | {
            [key: string]: string | number;
          }
    ) => (await api.delete<R>(path, { params })).data,
    {
      onSuccess: () => {
        if (invalidateKeys) {
          queryClient.invalidateQueries(invalidateKeys);
        }
      },
    }
  );
}
