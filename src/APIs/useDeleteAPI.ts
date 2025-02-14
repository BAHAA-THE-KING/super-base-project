import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "./utils";
import { ExtractPathParams } from "./utils/ExtractPathParams";

type Config = {
  invalidateKeys?: QueryKey;
};

export function useDeleteAPI<R, P = any, TPath extends string = string>(
  path: TPath,
  config: Config = {}
) {
  const { invalidateKeys } = config;

  const queryClient = useQueryClient();

  return useMutation(
    async (
      params:
        | ExtractPathParams<TPath>
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
