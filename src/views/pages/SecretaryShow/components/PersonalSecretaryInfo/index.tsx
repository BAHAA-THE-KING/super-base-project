import {
  CardContent,
  Grid2,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Control } from "react-hook-form";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { BButton, BCard, BTypography } from "src/components/Base";
import { FormInput } from "src/components";

import { useBaseTranslation } from "src/hooks";

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

type Props = {
  control: Control<Form>;
  isAdd: boolean;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  isValid: boolean;
  isDirty: boolean;
  submit: () => void;
  handleDelete: () => void;
};

const i18ns = [
  "secretary_name",
  "secretary_address",
  "secretary_birth_info",
  "secretary_mobile",
  "secretary_salary",
  "edit",
  "terminate_secretary",
  "save_changes",
  "cancel",
  "save_new_secretary",
  "add_new_secretary",
  "edit_secretary",
];

export function PersonalSecretaryInfo({
  control,
  isAdd,
  isEdit,
  setIsEdit,
  isValid,
  isDirty,
  submit,
  handleDelete,
}: Props) {
  const [
    SecretaryNameText,
    SecretaryAddressText,
    SecretaryBirthInfoText,
    SecretaryMobileText,
    SecretarySalaryText,
    EditText,
    TerminateSecretaryText,
    SaveChangesText,
    CancelText,
    SaveNewSecretaryText,
    AddNewSecretaryText,
    EditSecretaryText,
  ] = useBaseTranslation(i18ns);

  return (
    <BCard
      sx={{
        m: 1,
        width: "100%",
      }}
      animations={{ transitions: "slideInBottom" }}
    >
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
                        handleDelete();
                        bindMenu(popupState).onClose();
                      }}
                    >
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <ListItemText>
                        <BTypography variant="body2">
                          {TerminateSecretaryText}
                        </BTypography>
                      </ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          )}
          <BTypography variant="h5" fontWeight={"bold"}>
            {isAdd ? AddNewSecretaryText : EditSecretaryText}
          </BTypography>
        </Stack>
      </CardContent>
      <CardContent>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={SecretaryNameText}
              name="name"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={SecretaryAddressText}
              name="address"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={SecretaryBirthInfoText}
              name="birth"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={SecretaryMobileText}
              name="mobile"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={SecretarySalaryText}
              name="salary"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}></Grid2>
          <Grid2 size={{ xs: 'auto' }}>
            {(isEdit || isAdd) && (
              <Stack
                flexDirection={{
                  sx: "column",
                  md: "row",
                }}
                justifyContent={{
                  sx: "flex-start",
                  md: isAdd ? "flex-end" : "space-between",
                }}
                alignItems={"stretch"}
              >
                {isEdit && (
                  <BButton onClick={() => setIsEdit(false)}>
                    {CancelText}
                  </BButton>
                )}
                <BButton
                  variant="contained"
                  disabled={isAdd ? !isValid : !isDirty}
                  onClick={submit}
                >
                  {isAdd ? SaveNewSecretaryText : SaveChangesText}
                </BButton>
              </Stack>
            )}
          </Grid2>
        </Grid2>
      </CardContent>
    </BCard>
  );
}
