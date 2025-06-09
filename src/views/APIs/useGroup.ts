import { useDeleteAPI, useGetAPI, usePostAPI } from "src/APIs";

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

type DeleteGroupRequest = {
  id: number;
};

type DeleteGroupResponse = {
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

type AllGroupsResponse = {
  data: {
    current_page: number;
    data: {
      id: number;
      name: string;
      salary: number;
      color: string;
      conditions: {
        id: number;
        name: string;
        params: string;
      }[];
      number_of_beneficiaries: number;
      percent_of_beneficiaries: number;
    }[];
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  message: string;
};

export function useGroup() {
  const createGroup = usePostAPI<CreateGroupResponse, CreateGroupRequest>(
    "groups"
  ).mutateAsync;
  const deleteGroup = useDeleteAPI<DeleteGroupResponse, DeleteGroupRequest>(
    "groups/:id"
  ).mutateAsync;
  const showGroups = () => useGetAPI<AllGroupsResponse>("groups");

  return {
    createGroup,
    deleteGroup,
    showGroups,
  };
}
