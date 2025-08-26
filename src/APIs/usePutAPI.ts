import { useContext } from "react";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { MessagesContext } from "src/contexts";

import { useApi, ExtractPathParams } from "./utils";

type Config = {
  invalidateKeys?: QueryKey;
};

export function usePutAPI<
  R extends { message: string; errors: { [name: string]: string } },
  T,
  P = any,
  TPath extends string = string
>(path: TPath, config: Config = {}) {
  const { invalidateKeys } = config;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const api = useApi();
  const { addErrors } = useContext(MessagesContext);

  return useMutation(
    async ({
      data,
      params,
    }: {
      data: T;
      params?:
        | ExtractPathParams<TPath>
        | P
        | { [key: string]: string | number };
    }) => {
      const response = await api.put<R>(path, data, { params });

      if (response.status === 401) navigate("/login");
      if (response.data.errors) {
        addErrors(
          Object.entries(response.data.errors).map(([k, v]) => ({
            message: v,
            context: {
              route: path,
              request_body: { params, data },
              response: {
                code: response.status,
                errors: Object.values(response.data.errors),
              },
            },
          }))
        );
      }

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
