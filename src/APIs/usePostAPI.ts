import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { api, ExtractPathParams } from "./utils";

type Config = {
  invalidateKeys?: QueryKey;
};

export function usePostAPI<R, T, P = any>(path: string, config: Config = {}) {
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
        | {
            [key: string]: string | number;
          };
    }) => (await api.post<R>(path, data, { params })).data,
    {
      onSuccess: () => {
        console.log("Query Success, invalidating:", invalidateKeys);
        if (invalidateKeys) {
          queryClient.invalidateQueries({ queryKey: invalidateKeys });
        }
      },
    }
  );
}
