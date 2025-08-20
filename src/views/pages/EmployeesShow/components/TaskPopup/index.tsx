import { useEffect } from "react";
import { Box, Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect, Popup } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useShowEmployeeData } from "../../data";

import { Employee } from "src/types/data/Employee";

type Form = {
  type: string;
  date: string;
  description: string;
  expenses: number;
  gain: number;
  composition: number;
};

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
            <FormInput
              control={control}
              label={DateText}
              name="date"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            {/* TODO: add some type */}
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
