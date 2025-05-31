import { usePostAPI } from "src/APIs";

type CreateGroupRequest = {
  name: string;
  salary: string;
  color: string;
  conditions: {
    id: string;
    params: {
      op: "<" | ">" | "<=" | ">=" | "==" | "!=";
      value: string;
    };
  }[];
};

type CreateGroupResponse = {
  data: {
    id: number;
    name: string;
    salary: number;
    color: string;
    conditions: {
      id: number;
      name: string;
    }[];
  };
  message: string;
};

export function useGroup() {
  const createGroup = usePostAPI<CreateGroupResponse, CreateGroupRequest>(
    "groups"
  ).mutateAsync;

  return {
    createGroup,
  };
}
