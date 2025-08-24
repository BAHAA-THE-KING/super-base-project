import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";

import {
  DoctorAttendanceInfo,
  DoctorDeletePopup,
  PersonalDoctorInfo,
} from "./components";

import { useDoctorsData } from "../Doctors/data";

import { varAlpha } from "src/themes/styles";

type Form = {
  name: string;
  address: string;
  birth: string;
  mobile: string;
  specification: string;
  price: string;
  attendance_schedules: {
    from: string;
    to: string;
    days: string[];
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

  const { doctors, isLoading, createDoctor, editDoctor, deleteDoctor } =
    useDoctorsData();
  const doctor = doctors.find((e) => e.id === doctorId)!;

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isValid },
  } = useForm<Form>({
    defaultValues: {
      name: "",
      address: "",
      birth: "",
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
      createDoctor({
        data: {
          ...data,
        },
      }).then(() => navigate("/clinic/doctors"));
    } else {
      editDoctor({
        data: data,
      }).then(() => navigate("/clinic/doctors"));
    }
  });
  function handleDelete() {
    return deleteDoctor({ id: doctor?.id });
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
      <PersonalDoctorInfo
        control={control}
        isAdd={isAdd}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        isValid={isValid}
        isDirty={isDirty}
        submit={submit}
        handleDelete={handleDelete}
      />
      <DoctorAttendanceInfo control={control} isAdd={isAdd} isEdit={isEdit} />
      <DoctorDeletePopup
        doctor={wantToDelete && doctor ? doctor : null}
        handleDelete={handleDelete}
        close={() => setWantToDelete(false)}
      />
    </Stack>
  );
}
