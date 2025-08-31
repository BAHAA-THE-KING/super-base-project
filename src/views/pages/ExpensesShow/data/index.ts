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
  const createExpense = async (_: any) => {};
  const editExpense = async (_: any) => {};

  return {
    expense,
    getExpenseLoading,
    createExpense,
    createExpenseLoading,
    editExpense,
    editExpenseLoading,
  };
}
