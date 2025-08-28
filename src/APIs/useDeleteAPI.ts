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

      if (response.status === 401) {
        throw "Unauthorized";
      }
      if (response.data.errors) {
        throw { errors: response.data.errors, status: response.status, params };
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
      onError: (
        err: "Unauthorized" | { errors: string[]; status: number; params: any }
      ) => {
        if (err === "Unauthorized") navigate("/login");
        else
          addError({
            messages: Object.values(err.errors),
            context: {
              route: path,
              request_body: { params: err.params },
              response: {
                code: err.status,
                errors: Object.values(err.errors),
              },
            },
          });
      },
    }
  );
}
