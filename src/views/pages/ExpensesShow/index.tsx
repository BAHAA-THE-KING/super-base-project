import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { ExpenseInfo } from "./components";

import { useExpenseShowData } from "./data";

import { varAlpha } from "src/themes/styles";
import { MessagesContext } from "src/contexts";

type Form = {
  id: number;
  type: string;
  amount: number;
  description: string;
  to: string;
};

export function ExpensesShow({ isAdd = false }: { isAdd?: boolean }) {
  const navigate = useNavigate();
  const { expenseId: expenseIdParam } = useParams();
  const expenseId = Number(expenseIdParam);
  if ((!expenseId || expenseId <= 0) && !isAdd) {
    navigate("/accountant/expenses");
    return <></>;
  }

  const [wantToDelete, setWantToDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    expense,
    getExpenseLoading,
    createExpense,
    createExpenseLoading,
    editExpense,
    editExpenseLoading,
    deleteExpense,
    deleteExpenseLoading,
  } = useExpenseShowData(expenseId);

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<Form>({
    defaultValues: {
      type: "",
      amount: 0,
      description: "",
      to: "",
    },
  });

  useEffect(() => {
    if (expense) reset(expense);
  }, [expense, isEdit]);

  const submit = handleSubmit((data) => {
    if (expense.request_status !== "pending") return;
    if (isEdit) {
      createExpense({ data }).then(() => navigate("/accountant/expenses"));
    } else {
      editExpense({
        data: data,
      }).then(() => navigate("/accountant/expenses"));
    }
  });
  function handleDelete() {
    return deleteExpense({ id: expense?.id });
  }

  const { aiInfo } = useContext(MessagesContext);

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      borderRadius={1}
      flexDirection={{
        sx: "column",
        md: "row",
      }}
      justifyContent={"flex-start"}
      p={3}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.primary.darkerChannel, 0.2)
            : theme.palette.primary.lighter,
      })}
    >
      <ExpenseInfo
        control={control}
        isAdd={isAdd}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isValid={isValid}
        isDirty={isDirty}
        submit={submit}
        request_status={expense.request_status as any}
        aiInfo={aiInfo}
      />
    </Stack>
  );
}
