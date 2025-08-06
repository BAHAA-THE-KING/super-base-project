import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { api, ExtractPathParams } from "./utils";

type Config = {
  invalidateKeys?: QueryKey;
};

export function usePostAPI<R, T, P = any, TPath extends string = string>(
  path: TPath,
  config: Config = {}
) {
  const { invalidateKeys } = config;

  const queryClient = useQueryClient();

  return useMutation(
    async ({
      data,
      params,
    }: {
      data: T; // | FormData;
      params?:
        | ExtractPathParams<TPath>
        | P
        | {
            [key: string]: string | number;
          };
    }) => {
      const headers: any = {};
      if (data instanceof FormData) {
        headers["Content-Type"] = "application/json";
      }

      return (
        await api.post<R>(path, data, {
          params,
          headers,
        })
      ).data;
    },
    {
      onSuccess: () => {
        if (invalidateKeys) {
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) => {
              return invalidateKeys.some((e) => queryKey.includes(e));
            },
          });
        }
      },
    }
  );
}
