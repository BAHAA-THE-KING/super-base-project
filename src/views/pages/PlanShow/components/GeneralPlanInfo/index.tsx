import {
  Box,
  Card,
  CardContent,
  ListItemIcon,
  MenuItem,
  Stack,
  Menu,
  ListItemText,
  Grid2,
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { type Control } from "react-hook-form";

import {
  DoDisturb as DoDisturbIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { FormInput, FormSelect } from "src/components";
import { BButton, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

type Form = {
  name: string;
  description: string;
  portion: string;
  type: "meat" | "food" | "rice" | "clothes" | "other";
  is_finished: boolean;
  created_at: string;
  plan_attributes: {
    id: number;
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
  "meat",
  "food",
  "rice",
  "clothes",
  "other",
];
export function GeneralPlanInfo({
  control,
  isDirty,
  handleSubmit,
  handleTerminate,
  isEdit,
  setIsEdit,
  isAdd,
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
    MeatText,
    FoodText,
    RiceText,
    ClothesText,
    OtherText,
  ] = useBaseTranslation(i18ns);
  return (
    <Card sx={{ m: 1 }}>
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
              sx={{ my: 1 }}
              control={control}
              label={PlanNameText}
              name="name"
              rules={{ required: true }}
            />
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={PlanDescriptionText}
              name="description"
              rules={{ required: true }}
              inputProps={{
                variant: "outlined",
              }}
              multiline
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={PlanPortionText}
              name="portion"
              rules={{ required: true }}
            />
            <FormSelect
              options={[
                { id: "meat", name: MeatText },
                { id: "food", name: FoodText },
                { id: "rice", name: RiceText },
                { id: "clothes", name: ClothesText },
                { id: "other", name: OtherText },
              ]}
              sx={{ my: 1 }}
              control={control}
              label={PlanTypeText}
              name="type"
              rules={{ required: true }}
              renderOption={(params, option) => (
                <Box
                  {...params}
                  bgcolor={(theme) =>
                    theme.palette[
                      option.id === "clothes"
                        ? "primary"
                        : option.id === "meat"
                        ? "error"
                        : option.id === "rice"
                        ? "warning"
                        : option.id === "food"
                        ? "success"
                        : "info"
                    ].main
                  }
                >
                  {option.name}
                </Box>
              )}
            />
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={PlanStartDateText}
              name="created_at"
              rules={{ required: true }}
            />
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
      </CardContent>
    </Card>
  );
}
