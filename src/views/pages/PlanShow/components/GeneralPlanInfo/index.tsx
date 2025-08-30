import { useEffect } from "react";
import {
  Box,
  CardContent,
  ListItemIcon,
  MenuItem,
  Stack,
  Menu,
  ListItemText,
  Grid2,
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useFieldArray, useForm, type Control } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
  DoDisturb as DoDisturbIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { FormDate, FormInput, FormSelect } from "src/components";
import { BButton, BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

type Form = {
  name: string;
  description: string;
  portion: number;
  category_id: number;
  is_finished: boolean;
  created_at: string;
  plan_attributes: {
    id: number | string;
    attribute_id: number;
    attribute: {
      id: number;
      name: string;
    };
    weight: number;
  }[];
};

type Props = {
  control: Control<Form, any>;
  isDirty: boolean;
  handleSubmit: () => void;
  handleTerminate: () => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  isAdd: boolean;
  attributes: { id: number; name: string }[];
  aiInfo: string;
  categories: { id: number; name: string }[];
};

const i18ns = [
  "general_info",
  "plan_name",
  "plan_description",
  "plan_portion",
  "plan_type",
  "plan_start_date",
  "edit",
  "terminate_plan",
  "save_changes",
  "cancel",
  "criteria",
  "criterion",
  "weight",
];
export function GeneralPlanInfo({
  control,
  isDirty,
  handleSubmit,
  handleTerminate,
  isEdit,
  setIsEdit,
  isAdd,
  attributes,
  aiInfo,
  categories,
}: Props) {
  const [
    GeneralInfoText,
    PlanNameText,
    PlanDescriptionText,
    PlanPortionText,
    PlanTypeText,
    PlanStartDateText,
    EditText,
    TerminatePlanText,
    SaveChangesText,
    CancelText,
    CriteriaText,
    CriterionText,
    WeightText,
  ] = useBaseTranslation(i18ns);

  const { fields: selectedAttributes, append } = useFieldArray({
    control,
    name: "plan_attributes",
  });

  const {
    control: control1,
    watch,
    reset,
  } = useForm<{ criterion_id: number }>({
    defaultValues: { criterion_id: 0 },
  });

  useEffect(() => {
    const criterion_id = watch("criterion_id");
    const attribute = attributes.find((e) => e.id === criterion_id);
    if (attribute)
      append({
        id: uuidv4(),
        attribute_id: criterion_id,
        attribute,
        weight: 0,
      });

    reset({ criterion_id: 0 });
  }, [watch("criterion_id")]);

  return (
    <BCard sx={{ m: 1 }} animations={{ transitions: "slideInBottom" }}>
      <CardContent>
        <Stack flexDirection={"row"} alignItems={"center"}>
          {isAdd || (
            <PopupState variant="popover">
              {(popupState) => (
                <>
                  <BButton
                    icon={<MoreVertIcon />}
                    {...bindTrigger(popupState)}
                  />
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={() => {
                        setIsEdit(true);
                        bindMenu(popupState).onClose();
                      }}
                    >
                      <ListItemIcon>
                        <EditIcon fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText>
                        <BTypography variant="body2">{EditText}</BTypography>
                      </ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleTerminate();
                        bindMenu(popupState).onClose();
                      }}
                    >
                      <ListItemIcon>
                        <DoDisturbIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText>
                        <BTypography variant="body2">
                          {TerminatePlanText}
                        </BTypography>
                      </ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          )}
          <BTypography variant="h5" fontWeight={"bold"}>
            {GeneralInfoText}
          </BTypography>
        </Stack>
      </CardContent>
      <CardContent>
        <Grid2 container spacing={10}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FormInput
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={PlanNameText}
              name="name"
              rules={{ required: true }}
            />
            <FormInput
              inputProps={{ variant: "outlined" }}
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={PlanDescriptionText}
              name="description"
              rules={{ required: true }}
              multiline
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FormInput
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={PlanPortionText}
              name="portion"
              rules={{ required: true }}
            />
            <FormSelect
              readOnly={!isEdit && !isAdd}
              options={categories}
              sx={{ my: 1 }}
              control={control}
              label={PlanTypeText}
              name="category_id"
              rules={{ required: true }}
            />
            <FormDate
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={PlanStartDateText}
              name="created_at"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <BTypography variant="h6">{CriteriaText}</BTypography>
            {selectedAttributes.map((e, idx) => (
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                gap={3}
              >
                <BTypography flex={1}>{e.attribute.name}</BTypography>
                <FormInput
                  readOnly={!isAdd}
                  sx={{ flex: 1 }}
                  control={control}
                  label={WeightText}
                  name={`plan_attributes.${idx}.weight`}
                  rules={{ required: true }}
                />
              </Box>
            ))}
            {isAdd && (
              <FormSelect
                control={control1}
                label={CriterionText}
                name="criterion_id"
                options={attributes.filter(
                  (e) =>
                    !selectedAttributes.find((ee) => ee.attribute_id === e.id)
                )}
              />
            )}
          </Grid2>
        </Grid2>
        {isEdit && (
          <Stack
            width={"max-content"}
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
            <BButton sx={{ mx: 3 }} onClick={() => setIsEdit(false)}>
              {CancelText}
            </BButton>
            <BButton
              variant="contained"
              disabled={!isDirty}
              onClick={handleSubmit}
            >
              {SaveChangesText}
            </BButton>
          </Stack>
        )}
        {isAdd && (
          <BButton
            variant="contained"
            disabled={!isDirty}
            onClick={handleSubmit}
          >
            {SaveChangesText}
          </BButton>
        )}
        <BTypography sx={(theme) => ({ color: theme.palette.error.main })}>
          {aiInfo.split("\n").reduce(
            (p, e) => (
              <>
                {p}
                {e}
                <br />
              </>
            ),
            <></>
          )}
        </BTypography>
      </CardContent>
    </BCard>
  );
}
