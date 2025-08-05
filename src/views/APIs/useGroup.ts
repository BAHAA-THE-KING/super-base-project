import { useDeleteAPI, useGetAPI, usePostAPI, usePutAPI } from "src/APIs";

type CreateGroupRequest = {
  name: string;
  salary: string;
  color: string;
  conditions: {
    id: number;
    params: string;
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
    salary: number;
    color: string;
    conditions: {
      id: number;
      name: string;
      param: string;
    }[];
    number_of_beneficiaries: number;
    percentage_of_beneficiaries: number;
  }[];
  message: string;
};

type ShowGroupResponse = {
  data?: {
    id: number;
    name: string;
    salary: number;
    color: "primary" | "secondary" | "info" | "success" | "warning" | "error";
    number_of_beneficiaries: number;
    percentage_of_beneficiaries: number;
    conditions: {
      id: number;
      name: string;
      param: string;
    }[];
  };
  message: string;
};

type EditGroupResponse = {
  data: {
    id: number;
    name: string;
    salary: string;
    color: string;
    number_of_beneficiaries: number;
    percentage_of_beneficiaries: number;
    conditions: {
      id: number;
      name: string;
      param: string;
    }[];
  };
  message: string;
};
type EditGroupRequest = {
  name?: string;
  salary?: number;
  color?: string;
  conditions?: {
    id: number;
    params: string;
  }[];
};

export function useGroup() {
  const createGroupAPI = usePostAPI<CreateGroupResponse, CreateGroupRequest>(
    "/dashboard/groups/create",
    {
      invalidateKeys: ["groups"],
    }
  ).mutateAsync;
  const editGroupAPI = usePutAPI<EditGroupResponse, EditGroupRequest>(
    "/dashboard/groups/update/:groupId",
    {
      invalidateKeys: ["groups"],
    }
  ).mutateAsync;
  const deleteGroup = useDeleteAPI<DeleteGroupResponse, DeleteGroupRequest>(
    "/dashboard/groups/delete/:id",
    {
      invalidateKeys: ["groups"],
    }
  ).mutateAsync;
  const showGroups = () =>
    useGetAPI<AllGroupsResponse>("/dashboard/groups/all", {
      defaultData: {
        message: "wait",
        data: [],
      },
      keys: ["groups"],
    });
  const showGroup = (groupId: number) =>
    useGetAPI<ShowGroupResponse>("/dashboard/groups/show/:groupId", {
      defaultData: {
        message: "wait",
      },
      params: { groupId },
      enabled: Boolean(groupId),
      keys: ["groups"],
    });

  return {
    createGroupAPI,
    deleteGroup,
    showGroups,
    showGroup,
    editGroupAPI,
  };
}
