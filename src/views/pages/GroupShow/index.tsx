import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  ConditionsGroupInfo,
  GeneralGroupInfo,
  GroupDeletePopup,
} from "./components";

import { useGroupData } from "src/views/data";

import { varAlpha } from "src/themes/styles";

type Form = {
  name: string;
  salary: string;
  color: string;
  conditions: {
    id: number;
    name: string;
    param: {
      op: "<" | ">" | "<=" | ">=" | "==" | "!=" | "";
      value: number | "";
    };
  }[];
};

export function GroupShow() {
  const navigate = useNavigate();
  const { groupId: groupIdParam } = useParams();
  const groupId = Number(groupIdParam);
  const isAdd = groupIdParam === "add";
  if ((!groupId || groupId <= 0) && !isAdd) {
    navigate("/groups");
    return <></>;
  }

  const {
    group,
    conditions,
    createGroup,
    deleteGroup,
    editGroup,
    getGroupLoading,
    getConditionsLoading,
  } = useGroupData(groupId);
  if (!group && !getGroupLoading && !isAdd) {
    navigate("/groups");
    return <></>;
  }

  const [wantToDelete, setWantToDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    reset,
    handleSubmit,
    control,
    getValues,
    formState: { isDirty, isValid },
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
        conditions: group.conditions.map((e) => ({
          id: e.id,
          name: e.name,
          param: {
            op: e.param.op,
            value: e.param.value,
          },
        })),
      });
  }, [group, isEdit]);

  const submit = handleSubmit((data) => {
    if (isAdd)
      createGroup({
        name: data.name,
        salary: data.salary,
        color: data.color as
          | "primary"
          | "secondary"
          | "info"
          | "success"
          | "warning"
          | "error",
        conditions: data.conditions.map((e) => ({
          id: e.id,
          name: e.name,
          params: `{"op":"${e.param.op}","value":${e.param.value}}`,
        })),
      }).then((res) => navigate("/groups/" + res.data.id));
    else if (group)
      editGroup(group.id, {
        name: data.name,
        color: data.color as
          | "primary"
          | "secondary"
          | "info"
          | "success"
          | "warning"
          | "error",
        conditions: data.conditions.map((e) => ({
          id: e.id,
          name: e.name,
          params: `{"op":"${e.param.op}","value":${e.param.value}}`,
        })),
      }).then(() => navigate("/groups"));
  });
  function handleDelete() {
    return deleteGroup({ id: group?.id });
  }

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
      {(isAdd && getConditionsLoading) || (!isAdd && getGroupLoading) ? (
        <Stack width={"100%"} alignItems={"stretch"} gap={2} flex={5}>
          <Stack flexDirection={"row"} gap={2}>
            <Skeleton width={"30%"} height={800} variant="rounded" />
            <Skeleton width={"100%"} height={800} variant="rounded" />
          </Stack>
        </Stack>
      ) : (
        <>
          <GeneralGroupInfo
            control={control}
            isDirty={isDirty}
            isValid={isValid}
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
        </>
      )}
      <GroupDeletePopup
        group={wantToDelete && group ? group : null}
        handleDelete={handleDelete}
        close={() => setWantToDelete(false)}
      />
    </Stack>
  );
}
