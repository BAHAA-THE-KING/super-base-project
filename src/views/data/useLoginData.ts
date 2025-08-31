import { useState } from "react";

import { useLogin } from "../APIs";
import { useCookies } from "react-cookie";

export function useLoginData() {
  const { loginAPI } = useLogin();
  const [loginLoading, setLoginLoading] = useState(false);
  const [, setCookies] = useCookies(["token"]);

  const login = (data: { username: string; password: string }) => {
    setLoginLoading(true);
    return loginAPI({ data })
      .then((response) => setCookies("token", response.data.token))
      .finally(() => setLoginLoading(false));
  };

  return { login, loginLoading };
}
