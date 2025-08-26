import { useMemo } from "react";
import { Axios } from "axios";
import { useCookies } from "react-cookie";

import { buildUrl } from "./urlBuilder";
import { usePreferredLanguage } from "src/globals";

export function useApi() {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [lang] = usePreferredLanguage();

  const api = useMemo(() => {
    const newInstance = new Axios({
      baseURL: "http://localhost:8000/api",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        lang,
      },
    });

    newInstance.interceptors.request.use((request) => {
      if (token) {
        request.headers.Authorization = "Bearer " + token;
      }
      const data = request.data;
      if (!(data instanceof FormData)) {
        request.data = JSON.stringify(request.data);
      }

      // Add support for path variables in the URL
      if (request.url) {
        request.url = buildUrl(request.url, request.params);
      }
      return request;
    });

    newInstance.interceptors.response.use((response) => {
      response.data = JSON.parse(response.data);
      return response;
    });

    return newInstance;
  }, [token, lang]);

  return api;
}
