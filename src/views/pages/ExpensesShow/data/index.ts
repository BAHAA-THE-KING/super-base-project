import { useMemo } from "react";

export function useExpenseShowData(expenseId: number) {
  const expense = useMemo(
    () => ({
      id: expenseId,
      request_id: 119,
      request_status: "pending",
      type: "Maintenance",
      amount: 3000,
      description: "Scheduled software updates and bug fixes.",
      to: "Software Solutions Ltd.",
    }),
    []
  );

  const getExpenseLoading = false;

  const createExpenseLoading = false;
  const editExpenseLoading = false;
  const deleteExpenseLoading = false;
  const createExpense = async (data: any) => {};
  const editExpense = async (data: any) => {};
  const deleteExpense = async (data: any) => {};

  return {
    expense,
    getExpenseLoading,
    createExpense,
    createExpenseLoading,
    editExpense,
    editExpenseLoading,
    deleteExpense,
    deleteExpenseLoading,
  };
}
