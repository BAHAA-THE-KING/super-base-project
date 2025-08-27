import {
  Box,
  CardContent,
  Grid2,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Control, UseFormSetValue } from "react-hook-form";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";

import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { BButton, BCard, BTypography } from "src/components/Base";
import { FormInput } from "src/components";
import { AIFormButton } from "src/views/components";

import { useBaseTranslation } from "src/hooks";

type Form = {
  name: string;
  address: string;
  birth_date: string;
  birth_place: string;
  mobile: string;
  salary: string;
};

type Props = {
  control: Control<Form>;
  setValue: UseFormSetValue<Form>;
  isAdd: boolean;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  isValid: boolean;
  isDirty: boolean;
  submit: () => void;
  handleDelete: () => void;
  aiInfo: string;
  credentials: { username: string; generated_password: string };
  loading: boolean;
};

const i18ns = [
  "secretary_name",
  "secretary_address",
  "secretary_birth_date",
  "secretary_birth_place",
  "secretary_mobile",
  "secretary_salary",
  "edit",
  "terminate_secretary",
  "save_changes",
  "cancel",
  "save_new_secretary",
  "add_new_secretary",
  "edit_secretary",
  "new_username",
  "new_password",
];

export function PersonalSecretaryInfo({
  control,
  setValue,
  isAdd,
  isEdit,
  setIsEdit,
  isValid,
  isDirty,
  submit,
  handleDelete,
  aiInfo,
  credentials,
  loading,
}: Props) {
  const [
    SecretaryNameText,
    SecretaryAddressText,
    SecretaryBirthDateText,
    SecretaryBirthPlaceText,
    SecretaryMobileText,
    SecretarySalaryText,
    EditText,
    TerminateSecretaryText,
    SaveChangesText,
    CancelText,
    SaveNewSecretaryText,
    AddNewSecretaryText,
    EditSecretaryText,
    NewUsernameText,
    NewPasswordText,
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
        <Stack flexDirection={"row"} alignItems={"center"} gap={3}>
          <Box display={"flex"} alignItems={"center"}>
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
          </Box>
          {(isAdd || isEdit) && <AIFormButton setValue={setValue} />}
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
              label={SecretaryBirthDateText}
              name="birth_date"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={SecretaryBirthPlaceText}
              name="birth_place"
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
          <Grid2 size={{ xs: "auto" }}>
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
                  loading={loading}
                >
                  {isAdd ? SaveNewSecretaryText : SaveChangesText}
                </BButton>
              </Stack>
            )}
            {credentials && (
              <Stack gap={2}>
                <Stack flexDirection={"row"} alignItems={"flex-end"}>
                  <BTypography variant="h6" fontWeight={"bold"}>
                    {NewUsernameText}:&nbsp;
                  </BTypography>
                  <BTypography>{credentials.username}</BTypography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"flex-end"}>
                  <BTypography variant="h6" fontWeight={"bold"}>
                    {NewPasswordText}:&nbsp;
                  </BTypography>
                  <BTypography>{credentials.generated_password}</BTypography>
                </Stack>
              </Stack>
            )}
          </Grid2>
          <Grid2 size={{ xs: 12 }}>
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
          </Grid2>
        </Grid2>
      </CardContent>
    </BCard>
  );
}
