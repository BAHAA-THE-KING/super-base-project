import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "src/utils";

type Config = {
  invalidateKeys?: QueryKey;
};

export function usePatchAPI<R, T, P = any>(path: string, config: Config = {}) {
  const { invalidateKeys } = config;

  const queryClient = useQueryClient();

  return useMutation(
    async ({
      data,
      params,
    }: {
      data: T;
      params?:
        | P
        | {
            [key: string]: string | number;
          };
    }) => (await api.patch<R>(path, data, { params })).data,
    {
      onSuccess: () => {
        if (invalidateKeys) {
          queryClient.invalidateQueries(invalidateKeys);
        }
      },
    }
  );
}
