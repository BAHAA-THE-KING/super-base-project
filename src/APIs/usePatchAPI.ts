import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { api, ExtractPathParams } from "./utils";

type Config = {
  invalidateKeys?: QueryKey;
};

export function usePatchAPI<R, T, P = any, TPath extends string = string>(
  path: TPath,
  config: Config = {}
) {
  const { invalidateKeys } = config;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      data,
      params,
    }: {
      data: T;
      params?:
        | ExtractPathParams<TPath>
        | P
        | {
            [key: string]: string | number;
          };
    }) => {
      const response = await api.patch<R>(path, data, { params });

      if (response.status === 401) navigate("/login");

      return response.data;
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
