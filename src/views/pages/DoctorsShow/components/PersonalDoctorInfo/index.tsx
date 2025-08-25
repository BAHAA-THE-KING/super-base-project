import {
  Box,
  CardContent,
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
};

const i18ns = [
  "doctor_name",
  "doctor_address",
  "doctor_birth_info",
  "doctor_mobile",
  "doctor_price",
  "doctor_specification",
  "edit",
  "terminate_doctor",
  "save_changes",
  "cancel",
  "save_new_doctor",
  "add_new_doctor",
  "edit_doctor",
];

export function PersonalDoctorInfo({
  control,
  setValue,
  isAdd,
  isEdit,
  setIsEdit,
  isValid,
  isDirty,
  submit,
  handleDelete,
}: Props) {
  const [
    DoctorNameText,
    DoctorAddressText,
    DoctorBirthInfoText,
    DoctorMobileText,
    DoctorPriceText,
    DoctorSpecificationText,
    EditText,
    TerminateDoctorText,
    SaveChangesText,
    CancelText,
    SaveNewDoctorText,
    AddNewDoctorText,
    EditDoctorText,
  ] = useBaseTranslation(i18ns);

  return (
    <BCard
      sx={{
        m: 1,
        width: {
          xs: "100%",
          md: "50%",
        },
      }}
      animations={{ transitions: "slideInBottom" }}
    >
      <CardContent>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
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
                            {TerminateDoctorText}
                          </BTypography>
                        </ListItemText>
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </PopupState>
            )}
            <BTypography variant="h5" fontWeight={"bold"}>
              {isAdd ? AddNewDoctorText : EditDoctorText}
            </BTypography>
          </Box>
          {(isAdd || isEdit) && <AIFormButton setValue={setValue} />}
        </Stack>
      </CardContent>
      <CardContent>
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={DoctorNameText}
          name="name"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={DoctorAddressText}
          name="address"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={DoctorBirthInfoText}
          name="birth"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={DoctorMobileText}
          name="mobile"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={DoctorSpecificationText}
          name="specification"
          rules={{ required: true }}
        />
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={DoctorPriceText}
          name="price"
          rules={{ required: true }}
        />
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
              <BButton onClick={() => setIsEdit(false)}>{CancelText}</BButton>
            )}
            <BButton
              variant="contained"
              disabled={isAdd ? !isValid : !isDirty}
              onClick={submit}
            >
              {isAdd ? SaveNewDoctorText : SaveChangesText}
            </BButton>
          </Stack>
        )}
      </CardContent>
    </BCard>
  );
}
