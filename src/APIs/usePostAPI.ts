import { useContext } from "react";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { MessagesContext } from "src/contexts";

import { useApi, ExtractPathParams } from "./utils";

type Error = { message: string; errors?: { [name: string]: string } };

type Config = {
  invalidateKeys?: QueryKey;
};

export function usePostAPI<R, T, P = any, TPath extends string = string>(
  path: TPath,
  config: Config = {}
) {
  const { invalidateKeys } = config;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const api = useApi();
  const { addError } = useContext(MessagesContext);

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
      const response = await api.post<R & Error>(path, data, { params });

      if (response.status === 401) navigate("/login");
      if (response.data.errors) {
        addError({
          messages: Object.values(response.data.errors),
          context: {
            route: path,
            request_body: { params, data },
            response: {
              code: response.status,
              errors: Object.values(response.data.errors),
            },
          },
        });
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
