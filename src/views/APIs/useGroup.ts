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
    id: number;
    name: string;
    salary: string;
    color: "error" | "primary" | "secondary" | "info" | "success" | "warning";
    conditions: {
      id: number;
      name: string;
      params: string;
    }[];
    number_of_beneficiaries: number;
    percent_of_beneficiaries: number;
  }[];
  message: string;
};

export function useGroup() {
  const createGroup = usePostAPI<CreateGroupResponse, CreateGroupRequest>(
    "groups"
  ).mutateAsync;
  const deleteGroup = useDeleteAPI<DeleteGroupResponse, DeleteGroupRequest>(
    "groups/:id"
  ).mutateAsync;
  const showGroups = () =>
    useGetAPI<AllGroupsResponse>("/dashboard/groups/all", {
      defaultData: {
        message: "wait",
        data: [],
      },
      keys: ["groups"],
    });

  return {
    createGroup,
    deleteGroup,
    showGroups,
  };
}
