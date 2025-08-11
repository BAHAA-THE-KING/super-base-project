import {
  Box,
  CardContent,
  ListItemIcon,
  MenuItem,
  Stack,
  Menu,
  ListItemText,
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { type Control } from "react-hook-form";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { FormInput, FormSelect } from "src/components";
import { BButton, BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

type Form = {
  name: string;
  salary: string;
  color: string;
  conditions: {
    id: number;
    name: string;
    param: {
      op: "<" | ">" | "<=" | ">=" | "==" | "!=" | "";
      value: number | "";
    };
  }[];
};

type Props = {
  control: Control<Form>;
  isDirty: boolean;
  isValid: boolean;
  handleSubmit: () => void;
  handleDelete: () => void;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  isAdd: boolean;
  isLoading: boolean;
};

const i18ns = [
  "general_info",
  "group_name",
  "group_salary",
  "group_color",
  "edit",
  "delete_group",
  "save_changes",
  "cancel",
  "save_new_group",
  "color_1",
  "color_2",
  "color_3",
  "color_4",
  "color_5",
  "color_6",
];
export function GeneralGroupInfo({
  control,
  isDirty,
  isValid,
  handleSubmit,
  handleDelete,
  isEdit,
  setIsEdit,
  isAdd,
  isLoading,
}: Props) {
  const [
    GeneralInfoText,
    GroupNameText,
    GroupSalaryText,
    GroupColorText,
    EditText,
    DeleteGroupText,
    SaveChangesText,
    CancelText,
    SaveNewGroupText,
    Color1Text,
    Color2Text,
    Color3Text,
    Color4Text,
    Color5Text,
    Color6Text,
  ] = useBaseTranslation(i18ns);
  return (
    <BCard
      sx={{
        m: 1,
        width: {
          xs: "100%",
          md: "30%",
        },
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
                          {DeleteGroupText}
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
        <FormInput
          sx={{ my: 1 }}
          control={control}
          label={GroupNameText}
          name="name"
          rules={{ required: true }}
          inputProps={{
            slotProps: {
              input: { readOnly: !(isEdit || isAdd) },
            },
          }}
        />
        <FormSelect
          readOnly={!(isEdit || isAdd)}
          options={[
            { id: "primary", name: Color1Text },
            { id: "secondary", name: Color2Text },
            { id: "info", name: Color3Text },
            { id: "success", name: Color4Text },
            { id: "warning", name: Color5Text },
            { id: "error", name: Color6Text },
          ]}
          sx={{ my: 1 }}
          control={control}
          label={GroupColorText}
          name="color"
          rules={{ required: true }}
          renderOption={(params, option) => (
            <Box
              {...(params as any)}
              data-focus="true"
              bgcolor={(theme) => theme.palette[option.id as "primary"].main}
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
          inputProps={{
            slotProps: {
              input: { readOnly: !(isEdit || isAdd) },
            },
          }}
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
              onClick={handleSubmit}
              loading={isLoading}
            >
              {isAdd ? SaveNewGroupText : SaveChangesText}
            </BButton>
          </Stack>
        )}
      </CardContent>
    </BCard>
  );
}
