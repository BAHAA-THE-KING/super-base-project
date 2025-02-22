import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";

import { api, ExtractPathParams } from "./utils";

type Config<R, P> = {
  enabled?: boolean;
  keys?: any[];
  invalidateKeys?: QueryKey;
  params?:
    | P
    | {
        [key: string]: string | number;
      };
  defaultData?: R;
};

export function useGetAPI<R, TPath extends string = string>(
  path: TPath,
  config: Config<R, ExtractPathParams<TPath>> = {}
) {
  const {
    enabled = true,
    keys = [],
    invalidateKeys,
    params,
    defaultData,
  } = config;

  const queryClient = useQueryClient();

  return useQuery(
    [path, params, ...keys],
    async ({ signal }) => (await api.get<R>(path, { params, signal })).data,
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
