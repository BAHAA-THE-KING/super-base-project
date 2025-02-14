import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { api, ExtractPathParams } from "./utils";

type Config = {
  invalidateKeys?: QueryKey;
};

export function usePutAPI<R, T, P = any>(path: string, config: Config = {}) {
  const { invalidateKeys } = config;

  const queryClient = useQueryClient();

  return useMutation(
    async ({
      data,
      params,
    }: {
      data: T;
      params?:
        | ExtractPathParams<typeof path>
        | P
        | { [key: string]: string | number };
    }) => (await api.put<R>(path, data, { params })).data,
    {
      onSuccess: () => {
        if (invalidateKeys) {
          queryClient.invalidateQueries(invalidateKeys);
        }
      },
    }
  );
}
