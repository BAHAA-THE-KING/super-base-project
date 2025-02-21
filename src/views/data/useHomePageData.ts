import { useState } from "react";

import { useUsers } from "../APIs";

export function useHomePageData() {
  const [params, setParams] = useState<Partial<{ name: string }>>({});

  const { addUser, getAllUsers, deleteUser } = useUsers();

  const { data: usersResponse } = getAllUsers(params);

  const users = usersResponse?.map((e) => ({
    id: e.id,
    fullname: e.name,
  }));

  return { users, addUser, deleteUser, params, setParams };
}
