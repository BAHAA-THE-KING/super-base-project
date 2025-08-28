import { useContext } from "react";
import { QueryKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { MessagesContext } from "src/contexts";

import { useApi, ExtractPathParams } from "./utils";

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

type Error = { message: string; errors?: { [name: string]: string } };

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

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const api = useApi();
  const { addError } = useContext(MessagesContext);

  return useQuery(
    [path, params, ...keys],
    async ({ signal }) => {
      const response = await api.get<R & Error>(path, { params, signal });

      if (response.status === 401) {
        throw "Unauthorized";
      }
      if (response.data.errors) {
        throw { errors: response.data.errors, status: response.status };
      }

      return response.data;
    },
    {
      enabled,
      placeholderData: defaultData,
      onSuccess: () => {
        if (invalidateKeys) {
          queryClient.invalidateQueries({
            predicate: ({ queryKey }) => {
              return invalidateKeys.some((e) => queryKey.includes(e));
            },
          });
        }
      },
      onError: (err: "Unauthorized" | { errors: string[]; status: number }) => {
        if (err === "Unauthorized") navigate("/login");
        else
          addError({
            messages: Object.values(err.errors),
            context: {
              route: path,
              request_body: { params },
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
