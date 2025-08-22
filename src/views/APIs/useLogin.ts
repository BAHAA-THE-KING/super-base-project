import { usePostAPI } from "src/APIs";

type LoginResponse = {
  data: {
    admin: {
      id: number;
      username: string;
      joined_at: string;
      roles: {
        id: number;
        name: string;
        view: string;
      }[];
    };
    token: string;
  };
  message: string;
};
type LoginRequest = {
  username: string;
  password: string;
};

export function useLogin() {
  const loginAPI = usePostAPI<LoginResponse, LoginRequest>(
    "/auth/dashboard/login"
  ).mutateAsync;

  return { loginAPI };
}
