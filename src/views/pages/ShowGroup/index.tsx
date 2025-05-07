import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Card,
  CardContent,
  ListItemIcon,
  MenuItem,
  Stack,
  Menu,
  ListItemText,
} from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { FormInput, FormSelect } from "src/components";
import { BButton, BTooltip, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { useShowGroupData } from "./hooks";

import { varAlpha } from "src/themes/styles";

import { Condition } from "src/types/data/SingleBeneficiary";

type Form = {
  name: string;
  salary: string;
  color: string;
  conditions: Condition[];
};

const i18ns = [
  "general_info",
  "group_name",
  "group_salary",
  "conditions",
  "group_color",
  "add_new_condition",
  "edit",
  "delete_group",
  "save_changes",
  "cancel",
];
export function ShowGroup() {
  const navigate = useNavigate();
  const { groupId: groupIdParam } = useParams();
  const groupId = Number(groupIdParam);
  if (!groupId || groupId <= 0) return navigate(-1);

  const { group, conditions, isLoading } = useShowGroupData(groupId);
  if (!group) return navigate(-1);

  const [
    GeneralInfoText,
    GroupNameText,
    GroupSalaryText,
    ConditionsText,
    GroupColorText,
    AddNewConditionText,
    EditText,
    DeleteGroupText,
    SaveChangesText,
    CancelText,
  ] = useBaseTranslation(i18ns);

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
  const { fields, append, remove } = useFieldArray({
    name: "conditions",
    control,
    keyName: "key",
  });
  useEffect(() => {
    if (group)
      reset({
        name: group.name,
        salary: group.salary,
        color: group.color,
        conditions: group.conditions,
      });
  }, [group]);

  const {
    reset: reset1,
    control: control1,
    watch: watch1,
  } = useForm<{
    condition: Condition;
  }>({
    defaultValues: {
      condition: { id: 0, name: "" },
    },
  });
  useEffect(() => {
    if (watch1()?.condition?.id) {
      const data = watch1();

      if (!fields.find((e) => e.id === data.condition.id))
        append(data.condition);

      reset1();
    }
  }, [watch1()?.condition?.id]);

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
      <Card
        sx={{
          m: 1,
          width: {
            xs: "100%",
            md: "30%",
          },
        }}
      >
        <CardContent>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <PopupState variant="popover">
              {(popupState) => (
                <>
                  <BButton
                    icon={<MoreVertIcon />}
                    {...bindTrigger(popupState)}
                  />
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={() => {}}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText>
                        <BTypography variant="body2">{EditText}</BTypography>
                      </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => {}}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText>
                        <BTypography variant="body2">
                          {DeleteGroupText}
                        </BTypography>
                      </ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
            <BTypography variant="h5" fontWeight={"bold"}>
              {GeneralInfoText}
            </BTypography>
          </Stack>
        </CardContent>
        <CardContent>
          <FormInput
            sx={{ my: 1 }}
            control={control}
            label={GroupNameText}
            name="name"
            rules={{ required: true }}
          />
          <FormSelect
            options={[
              { id: "primary", name: "primary" },
              { id: "secondary", name: "secondary" },
              { id: "info", name: "info" },
              { id: "success", name: "success" },
              { id: "warning", name: "warning" },
              { id: "error", name: "error" },
            ]}
            sx={{ my: 1 }}
            control={control}
            label={GroupColorText}
            name="color"
            rules={{ required: true }}
            renderOption={(params, option) => (
              <Box
                {...params}
                bgcolor={(theme) =>
                  theme.palette[option.name as "primary"].main
                }
              >
                {option.name}
              </Box>
            )}
          />
          <FormInput
            sx={{ my: 1 }}
            control={control}
            label={GroupSalaryText}
            name="salary"
            rules={{ required: true }}
          />
          <Stack
            flexDirection={{
              sx: "column",
              md: "row",
            }}
            justifyContent={{
              sx: "flex-start",
              md: "space-between",
            }}
            alignItems={"stretch"}
          >
            <BButton>{CancelText}</BButton>
            <BButton variant="contained" disabled={!isDirty}>
              {SaveChangesText}
            </BButton>
          </Stack>
        </CardContent>
      </Card>
      <Card
        sx={{
          m: 1,
          width: "100%",
        }}
      >
        <CardContent>
          <BTypography variant="h5" fontWeight={"bold"}>
            {ConditionsText}
          </BTypography>
        </CardContent>
        <CardContent>
          <Stack
            sx={{
              width: {
                sx: "100%",
                md: "50%",
              },
            }}
          >
            {fields.map((field, i) => (
              <Stack
                key={field.id}
                flexDirection={"row"}
                alignItems={"center"}
                my={1}
              >
                <BButton
                  size="small"
                  sx={{ mx: 1 }}
                  icon={<CloseIcon fontSize="small" color={"error"} />}
                  animations={{ gestures: "wiggleHarder" }}
                  onClick={() => {
                    remove(i);
                  }}
                />
                <BTypography>{field.name}</BTypography>
              </Stack>
            ))}
            <FormSelect
              options={conditions}
              sx={{ my: 1 }}
              control={control1}
              label={AddNewConditionText}
              name="condition"
              rules={{
                validate: () => Boolean(getValues("conditions").length),
              }}
            />
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
