import { useContext } from "react";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { MessagesContext } from "src/contexts";

import { useApi, ExtractPathParams } from "./utils";

type Error = { message: string; errors?: { [name: string]: string } };

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
  const api = useApi();
  const { addError } = useContext(MessagesContext);

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
      const response = await api.patch<R & Error>(path, data, { params });

      if (response.status === 401) {
        throw "Unauthorized";
      }
      if (response.data.errors) {
        throw {
          errors: response.data.errors,
          status: response.status,
          params,
          data,
        };
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
        err:
          | "Unauthorized"
          | { errors: string[]; status: number; params: any; data: any }
      ) => {
        if (err === "Unauthorized") navigate("/login");
        else
          addError({
            messages: Object.values(err.errors),
            context: {
              route: path,
              request_body: { params: err.params, data: err.data },
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
