import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { SecretaryDeletePopup, PersonalSecretaryInfo } from "./components";

import { useSecretaryData } from "../SecretaryAll/data";

import { varAlpha } from "src/themes/styles";

type Form = {
  name: string;
  address: string;
  birth: string;
  mobile: string;
  salary: string;
  attendance_schedule: {
    from: string;
    to: string;
    days: string[];
  };
};

export function SecretaryShow({ isAdd = false }: { isAdd?: boolean }) {
  const navigate = useNavigate();
  const { secretaryId: secretaryIdParam } = useParams();
  const secretaryId = Number(secretaryIdParam);
  if ((!secretaryId || secretaryId <= 0) && !isAdd) {
    navigate("/clinic/secretary");
    return <></>;
  }

  const [wantToDelete, setWantToDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    secretaries,
    isLoading,
    createSecretary,
    editSecretary,
    deleteSecretary,
  } = useSecretaryData();
  const secretary = secretaries.find((e) => e.id === secretaryId)!;

  const {
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { isDirty, isValid },
  } = useForm<Form>({
    defaultValues: {
      name: "",
      address: "",
      birth: "",
      mobile: "",
      salary: "",
      attendance_schedule: {
        from: "",
        to: "",
        days: [],
      },
    },
  });

  useEffect(() => {
    if (secretary) reset(secretary);
  }, [secretary, isEdit]);

  const submit = handleSubmit((data) => {
    if (isEdit) {
      createSecretary({ data }).then(() => navigate("/clinic/secretary"));
    } else {
      editSecretary({
        data: data,
      }).then(() => navigate("/clinic/secretary"));
    }
  });
  function handleDelete() {
    return deleteSecretary({ id: secretary?.id });
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
            ? varAlpha(theme.palette.primary.darkerChannel, 0.2)
            : theme.palette.primary.lighter,
      })}
    >
      <PersonalSecretaryInfo
        control={control}
        setValue={setValue}
        isAdd={isAdd}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isValid={isValid}
        isDirty={isDirty}
        submit={submit}
        handleDelete={handleDelete}
      />
      <SecretaryDeletePopup
        secretary={wantToDelete && secretary ? secretary : null}
        handleDelete={handleDelete}
        close={() => setWantToDelete(false)}
      />
    </Stack>
  );
}
