import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { useApi, ExtractPathParams } from "./utils";

type Config = {
  invalidateKeys?: QueryKey;
};

export function useDeleteAPI<R, P = any, TPath extends string = string>(
  path: TPath,
  config: Config = {}
) {
  const { invalidateKeys } = config;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const api = useApi();

  return useMutation(
    async (
      params:
        | ExtractPathParams<TPath>
        | P
        | {
            [key: string]: string | number;
          }
    ) => {
      const response = await api.delete<R>(path, { params });

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
