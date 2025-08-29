import { useEffect } from "react";
import { Box, Grid2, SvgIcon } from "@mui/material";
import { useForm } from "react-hook-form";

import { FaMosque } from "react-icons/fa6";
import { IoTicket } from "react-icons/io5";
import { RiBankFill } from "react-icons/ri";
import { MdEmojiEvents } from "react-icons/md";
import { FaMoneyBillWave, FaMoneyCheck } from "react-icons/fa";

import { FormDate, FormInput, Popup } from "src/components";
import { BButton, BTypography } from "src/components/Base";
import { IconSelect } from "..";

import { useBaseTranslation } from "src/hooks";
import { useShowEmployeeData } from "../../data";

import { Employee, EmployeeHistory } from "src/types/data/Employee";

type Form = Omit<EmployeeHistory, "id">;

type Props = {
  open: boolean;
  close: () => void;
  employee: Employee;
};

const i18ns = [
  "add_new_task",
  "type",
  "date",
  "description",
  "expenses",
  "gain",
  "composition",
  "save_new_task",
  "icon",
];
export function TaskPopup({ open, close, employee }: Props) {
  const [
    AddNewTaskText,
    TypeText,
    DateText,
    DescriptionText,
    ExpensesText,
    GainText,
    CompositionText,
    SaveNewTaskText,
    IconText,
  ] = useBaseTranslation(i18ns);

  const { employees, createNewTask } = useShowEmployeeData();

  const { control, reset, handleSubmit } = useForm<Form>({
    defaultValues: {
      date: new Date().toLocaleDateString("fr-Ca"),
      type: "",
      expenses: 0,
      gain: 0,
      composition: 0,
      description: "",
      icon: "",
    },
  });

  useEffect(() => {
    reset({
      date: new Date().toLocaleDateString("fr-Ca"),
      type: "",
      expenses: 0,
      composition: 0,
      description: "",
    });
  }, [open]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // createNewTask({ ...data, employee_id: employee.id });
  });

  return (
    <Popup open={open} close={close}>
      <BTypography variant="h5" fontWeight={"bold"}>
        {AddNewTaskText} {employee.first_name} {employee.last_name}
      </BTypography>
      <Box mt={5}>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormDate
              control={control}
              label={DateText}
              name="date"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <IconSelect
              options={[
                {
                  id: "mosque",
                  icon: (
                    <SvgIcon color="success">
                      <FaMosque />
                    </SvgIcon>
                  ),
                },
                {
                  id: "donation_book",
                  icon: (
                    <SvgIcon color="primary">
                      <IoTicket />
                    </SvgIcon>
                  ),
                },
                {
                  id: "bill",
                  icon: (
                    <SvgIcon color="warning">
                      <RiBankFill />
                    </SvgIcon>
                  ),
                },
                {
                  id: "event",
                  icon: (
                    <SvgIcon color="secondary">
                      <MdEmojiEvents />
                    </SvgIcon>
                  ),
                },
                {
                  id: "card",
                  icon: (
                    <SvgIcon color="error">
                      <FaMoneyCheck />
                    </SvgIcon>
                  ),
                },
                {
                  id: "other",
                  icon: (
                    <SvgIcon color="info">
                      <FaMoneyBillWave />
                    </SvgIcon>
                  ),
                },
              ]}
              control={control}
              label={IconText}
              name="icon"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={TypeText}
              name="type"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={ExpensesText}
              name="expenses"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={GainText}
              name="gain"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <FormInput
              control={control}
              label={CompositionText}
              name="composition"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
            <FormInput
              control={control}
              label={DescriptionText}
              name="description"
              rules={{ required: true }}
              multiline
              inputProps={{ variant: "outlined" }}
            />
          </Grid2>
          <Grid2 size={12} mt={3}>
            <Box>
              <BButton variant="contained" color="primary" onClick={onSubmit}>
                {SaveNewTaskText}
              </BButton>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </Popup>
  );
}
