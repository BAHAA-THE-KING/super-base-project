import { useContext } from "react";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { MessagesContext } from "src/contexts";

import { useApi, ExtractPathParams } from "./utils";

type Error = { message: string; errors?: { [name: string]: string } };

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
  const { addError } = useContext(MessagesContext);

  return useMutation(
    async (
      params:
        | ExtractPathParams<TPath>
        | P
        | {
            [key: string]: string | number;
          }
    ) => {
      const response = await api.delete<R & Error>(path, { params });

      if (response.status === 401) navigate("/login");
      if (response.data.errors) {
        addError({
          messages: Object.values(response.data.errors),
          context: {
            route: path,
            request_body: { params },
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
            refetchType: "all",
            predicate: ({ queryKey }) => {
              return invalidateKeys.some((e) => queryKey.includes(e));
            },
          });
        }
      },
    }
  );
}
