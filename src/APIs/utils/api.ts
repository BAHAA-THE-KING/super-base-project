import { Axios } from "axios";
import Cookies from "js-cookie";
import { buildUrl } from "./urlBuilder";

const api = new Axios({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((request) => {
  const token = Cookies.get("token");
  if (token) {
    request.headers.Authorization = "Bearer " + token;
  }
  const data = request.data;
  if (data) {
    request.data = JSON.stringify(request.data);
  }

  // Add support for path variables in the URL
  if (request.url) {
    request.url = buildUrl(request.url, request.params);
  }
  return request;
});

api.interceptors.response.use((response) => {
  response.data = JSON.parse(response.data);
  return response;
});

export { api };
