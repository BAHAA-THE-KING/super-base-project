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
} from "@mui/icons-material";

import { BButton, BCard, BTypography } from "src/components/Base";
import { FormInput } from "src/components";

import { useBaseTranslation } from "src/hooks";

type Form = {
  id: number;
  from: string;
  amount: number;
  details: string;
};

type Props = {
  control: Control<Form>;
  isAdd: boolean;
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  isValid: boolean;
  isDirty: boolean;
  submit: () => void;
};

const i18ns = [
  "number",
  "from",
  "amount",
  "details",
  "edit",
  "save_changes",
  "cancel",
  "save_new_expense",
  "add_new_expense",
  "edit_expense",
];

export function DonationInfo({
  control,
  isAdd,
  isEdit,
  setIsEdit,
  isValid,
  isDirty,
  submit,
}: Props) {
  const [
    NumberText,
    FromText,
    AmountText,
    DetailsText,
    EditText,
    SaveChangesText,
    CancelText,
    SaveNewExpenseText,
    AddNewExpenseText,
    EditExpenseText,
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
          {isAdd ? null : (
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
                  </Menu>
                </>
              )}
            </PopupState>
          )}
          <BTypography variant="h5" fontWeight={"bold"}>
            {isAdd ? AddNewExpenseText : EditExpenseText}
          </BTypography>
        </Stack>
      </CardContent>
      <CardContent>
        <Grid2 container spacing={3}>
          {isAdd ? null : (
            <Grid2 size={{ xs: 4 }}>
              <FormInput
                sx={{ my: 1 }}
                control={control}
                label={NumberText}
                name="id"
                rules={{ required: true }}
                disabled
              />
            </Grid2>
          )}
          <Grid2 size={{ xs: 12 }}></Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={FromText}
              name="from"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={AmountText}
              name="amount"
              rules={{ required: true }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12 }}></Grid2>
          <Grid2 size={{ xs: 4 }}>
            <FormInput
              sx={{ my: 1 }}
              control={control}
              label={DetailsText}
              name="details"
              rules={{ required: true }}
              multiline
              inputProps={{
                variant: "outlined",
              }}
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
                >
                  {isAdd ? SaveNewExpenseText : SaveChangesText}
                </BButton>
              </Stack>
            )}
          </Grid2>
        </Grid2>
      </CardContent>
    </BCard>
  );
}
