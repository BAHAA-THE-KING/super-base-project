import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Skeleton, Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  DoctorAttendanceInfo,
  DoctorDeletePopup,
  PersonalDoctorInfo,
} from "./components";

import { useDoctorData } from "src/views/data";

import { MessagesContext } from "src/contexts";

import { varAlpha } from "src/themes/styles";

import { Doctor } from "src/types/data/Doctor";

type Form = {
  name: string;
  address: string;
  birth_date: string;
  birth_place: string;
  mobile: string;
  specification: string;
  price: string;
  attendance_schedules: {
    from: string;
    to: string;
    days: { id: number; name: string }[];
  }[];
};

export function DoctorsShow({ isAdd = false }: { isAdd?: boolean }) {
  const navigate = useNavigate();
  const { doctorId: doctorIdParam } = useParams();
  const doctorId = Number(doctorIdParam);
  if ((!doctorId || doctorId <= 0) && !isAdd) {
    navigate("/clinic/doctors");
    return <></>;
  }

  const [wantToDelete, setWantToDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    doctor,
    getDoctorLoading,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    createDoctorLoading,
    updateDoctorLoading,
    deleteDoctorLoading,
  } = useDoctorData(doctorId);

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
      specification: "",
      price: "",
      attendance_schedules: [],
    },
  });

  useEffect(() => {
    if (doctor) reset(doctor);
  }, [doctor, isEdit]);

  const submit = handleSubmit((data) => {
    if (isEdit) {
      return updateDoctor(data, doctorId).then(() =>
        navigate("/clinic/doctors")
      );
    } else {
      return createDoctor(data).then((res) =>
        navigate(`/clinic/doctors/${res.data.id}`)
      );
    }
  });
  function handleDelete() {
    return deleteDoctor(doctorId).then(() => navigate("/clinic/doctors"));
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
      {!isAdd && getDoctorLoading ? (
        <>
          <Skeleton
            sx={{
              width: {
                xs: "100%",
                md: "50%",
              },
              m: 1,
            }}
            height={800}
            variant="rounded"
          />
          <Skeleton
            sx={{ width: "100%", m: 1 }}
            height={800}
            variant="rounded"
          />
        </>
      ) : (
        <>
          <PersonalDoctorInfo
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
            createDoctorLoading={createDoctorLoading}
            updateDoctorLoading={updateDoctorLoading}
            deleteDoctorLoading={deleteDoctorLoading}
          />
          <DoctorAttendanceInfo
            control={control}
            isAdd={isAdd}
            isEdit={isEdit}
          />
          <DoctorDeletePopup
            doctor={
              wantToDelete && doctor
                ? { id: doctorId, name: (doctor as Doctor).name }
                : null
            }
            handleDelete={handleDelete}
            close={() => setWantToDelete(false)}
          />
        </>
      )}
    </Stack>
  );
}
