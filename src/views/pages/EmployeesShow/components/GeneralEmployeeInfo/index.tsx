import {
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

import { FormDate, FormInput } from "src/components";
import { BButton, BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

type Form = {
  first_name: string;
  last_name: string;
  father_name: string;
  national_number: string;
  birth_date: string;
  birth_place: string;
  joined_at: string;
  salary: number;
};

type Props = {
  control: Control<Form, any>;
  isDirty: boolean;
  handleSubmit: () => void;
  handleTerminate: () => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  isAdd: boolean;
  aiInfo: string;
};

const i18ns = [
  "general_info",
  "first_name",
  "last_name",
  "father_name",
  "national_number",
  "birth_date",
  "birth_place",
  "joined_at",
  "salary",
  "edit",
  "terminate_employee",
  "save_changes",
  "cancel",
];
export function GeneralEmployeeInfo({
  control,
  isDirty,
  handleSubmit,
  handleTerminate,
  isEdit,
  setIsEdit,
  isAdd,
  aiInfo,
}: Props) {
  const [
    GeneralInfoText,
    FirstNameText,
    LastNameText,
    FatherNameText,
    NationalNumberText,
    BirthDateText,
    BirthPlaceText,
    JoinedAtText,
    SalaryText,
    EditText,
    TerminateEmployeeText,
    SaveChangesText,
    CancelText,
  ] = useBaseTranslation(i18ns);

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
                          {TerminateEmployeeText}
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
              label={FirstNameText}
              name="first_name"
              rules={{ required: true }}
            />
            <FormInput
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={LastNameText}
              name="last_name"
              rules={{ required: true }}
            />
            <FormInput
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={FatherNameText}
              name="father_name"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FormDate
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={BirthDateText}
              name="birth_date"
              rules={{ required: true }}
            />
            <FormInput
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={BirthPlaceText}
              name="birth_place"
              rules={{ required: true }}
            />
            <FormInput
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={NationalNumberText}
              name="national_number"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <FormDate
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={JoinedAtText}
              name="joined_at"
              rules={{ required: true }}
            />
            <FormInput
              readOnly={!isEdit && !isAdd}
              sx={{ my: 1 }}
              control={control}
              label={SalaryText}
              name="salary"
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
