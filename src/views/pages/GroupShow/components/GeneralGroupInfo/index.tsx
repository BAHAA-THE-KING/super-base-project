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
    params: {
      op: "<" | ">" | "<=" | ">=" | "==" | "!=";
      value: number;
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
              bgcolor={(theme) => theme.palette[option.name as "primary"].main}
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
            >
              {SaveChangesText}
            </BButton>
          </Stack>
        )}
      </CardContent>
    </BCard>
  );
}
