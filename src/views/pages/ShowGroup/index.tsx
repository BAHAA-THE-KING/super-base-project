import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  ConditionsGroupInfo,
  GeneralGroupInfo,
  GroupDeletePopup,
} from "./components";

import { useShowGroupData } from "./hooks";

import { varAlpha } from "src/themes/styles";

import { Condition } from "src/types/data/SingleBeneficiary";

type Form = {
  name: string;
  salary: string;
  color: string;
  conditions: Condition[];
};

export function ShowGroup() {
  const navigate = useNavigate();
  const { groupId: groupIdParam } = useParams();
  const groupId = Number(groupIdParam);
  const isAdd = groupIdParam === "add";
  if ((!groupId || groupId <= 0) && !isAdd) return navigate(-1);

  const { group, conditions, isLoading } = useShowGroupData(groupId);
  if (!group) return navigate(-1);

  const [wantToDelete, setWantToDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    reset,
    handleSubmit,
    control,
    getValues,
    formState: { isDirty },
  } = useForm<Form>({
    defaultValues: {
      name: "",
      salary: "",
      color: "",
      conditions: [],
    },
  });

  useEffect(() => {
    if (group)
      reset({
        name: group.name,
        salary: group.salary,
        color: group.color,
        conditions: group.conditions,
      });
  }, [group, isEdit]);

  function submit() {
    handleSubmit((data) => {
      console.log(data);
    });
  }
  function handleDelete() {}

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
            ? varAlpha(theme.palette.secondary.darkerChannel, 0.2)
            : theme.palette.secondary.lighter,
      })}
    >
      <GeneralGroupInfo
        control={control}
        isDirty={isDirty}
        handleSubmit={submit}
        handleDelete={() => setWantToDelete(true)}
        isAdd={isAdd}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <ConditionsGroupInfo
        control={control}
        conditions={conditions}
        getValues={getValues}
        isAdd={isAdd}
        isEdit={isEdit}
      />
      <GroupDeletePopup
        group={wantToDelete ? group : null}
        handleDelete={handleDelete}
        close={() => setWantToDelete(false)}
      />
    </Stack>
  );
}
