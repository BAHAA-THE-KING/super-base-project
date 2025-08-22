import { useState } from "react";

import { useLogin } from "../APIs";

export function useLoginData() {
  const { loginAPI } = useLogin();
  const [loginLoading, setLoginLoading] = useState(false);
  const login = (data: { username: string; password: string }) => {
    setLoginLoading(true);
    return loginAPI({ data })
      .then((response) => window.cookieStore.set("token", response.data.token))
      .finally(() => setLoginLoading(false));
  };

  return { login, loginLoading };
}
