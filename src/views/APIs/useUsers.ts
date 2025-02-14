import { useDeleteAPI, useGetAPI, usePostAPI } from "src/APIs";

export function useUsers() {
  const getAllUsers = (filters: Partial<{ name: string }>) =>
    useGetAPI<{ id: number; name: string; age: number }[]>("/all", {
      defaultData: [],
      params: filters,
    });

  const addUser = usePostAPI<
    { id: number; name: string; age: number },
    { name: string; age: number }
  >("/create", { invalidateKeys: ["/all"] }).mutateAsync;

  const deleteUser = useDeleteAPI<any, { userId: number }>("/delete/:userId", {
    invalidateKeys: ["/all"],
  }).mutateAsync;

  return { getAllUsers, addUser, deleteUser };
}
