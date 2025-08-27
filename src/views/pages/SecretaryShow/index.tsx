import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Skeleton, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import { SecretaryDeletePopup, PersonalSecretaryInfo } from "./components";

import { MessagesContext } from "src/contexts";

import { varAlpha } from "src/themes/styles";
import { useSecretaryData } from "src/views/data/useSecretaryData";

type Form = {
  name: string;
  address: string;
  birth_date: string;
  birth_place: string;
  mobile: string;
  salary: string;
};

export function SecretaryShow({ isAdd = false }: { isAdd?: boolean }) {
  const navigate = useNavigate();
  const { secretaryId: secretaryIdParam } = useParams();
  const { state } = useLocation();
  const secretaryId = Number(secretaryIdParam);
  if ((!secretaryId || secretaryId <= 0) && !isAdd) {
    navigate("/clinic/secretary");
    return <></>;
  }

  const [wantToDelete, setWantToDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    secretary,
    getSecretaryLoading,
    createSecretary,
    updateSecretary,
    deleteSecretary,
    createSecretaryLoading,
    updateSecretaryLoading,
    deleteSecretaryLoading,
  } = useSecretaryData(secretaryId);

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
      birth_date: "",
      birth_place: "",
      mobile: "",
      salary: "",
    },
  });

  useEffect(() => {
    if (secretary) reset(secretary);
  }, [secretary, isEdit]);

  const submit = handleSubmit((data) => {
    if (isEdit) {
      updateSecretary(data, secretaryId).then(() => setIsEdit(false));
    } else {
      createSecretary(data).then((res) =>
        navigate(`/clinic/secretary/${res.data.secretary.id.toString()}`, {
          state: { credentials: res.data.credentials },
        })
      );
    }
  });
  function handleDelete() {
    setWantToDelete(true);
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
      {!isAdd && getSecretaryLoading ? (
        <>
          <Skeleton
            sx={{ width: "100%", m: 1 }}
            height={800}
            variant="rounded"
          />
        </>
      ) : (
        <>
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
            aiInfo={aiInfo}
            credentials={state?.credentials}
            loading={
              createSecretaryLoading ||
              updateSecretaryLoading ||
              deleteSecretaryLoading
            }
          />
          <SecretaryDeletePopup
            secretary={
              wantToDelete && secretary
                ? { id: secretaryId, name: secretary.name }
                : null
            }
            handleDelete={() =>
              deleteSecretary(secretaryId).then(() =>
                navigate("/clinic/secretary")
              )
            }
            close={() => setWantToDelete(false)}
          />
        </>
      )}
    </Stack>
  );
}
