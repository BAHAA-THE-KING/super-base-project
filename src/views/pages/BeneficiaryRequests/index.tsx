import { useNavigate, useParams } from "react-router";
import {
  Stack,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  SvgIcon,
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import { Inventory as InventoryIcon } from "@mui/icons-material";
import { FaHandHoldingUsd as FaHandHoldingUsdIcon } from "react-icons/fa";
import { FaPrescriptionBottleAlt as FaPrescriptionBottleAltIcon } from "react-icons/fa";

import { BButton, BCircularProgress } from "src/components/Base";
import { RequestsTable } from "./components";

import { useBaseTranslation } from "src/hooks";

import { useRequestsData } from "./data";

const i18ns = [
  "add_request",
  "emergency_aids",
  "prescription_exchange",
  "special_materials",
];
export function ShowBeneficiaryRequests() {
  const { beneficiaryId } = useParams();
  const navigate = useNavigate();

  const [
    AddRequestText,
    EmergencyAidsText,
    PrescriptionExchangeText,
    SpecialMaterialsText,
  ] = useBaseTranslation(i18ns);

  const { isLoading, requests } = useRequestsData(Number(beneficiaryId));

  return (
    <Stack alignItems={"flex-start"}>
      {isLoading ? (
        <Stack justifyContent={"center"} alignItems={"center"}>
          <BCircularProgress />
        </Stack>
      ) : null}
      <PopupState variant="popover">
        {(popupState) => (
          <>
            <BButton
              variant="contained"
              sx={{ mb: 2 }}
              {...bindTrigger(popupState)}
            >
              {AddRequestText}
            </BButton>
            <Menu {...bindMenu(popupState)}>
              <MenuItem
                onClick={() =>
                  navigate("/requests/add/emergency_aids", {
                    state: { beneficiaryId },
                  })
                }
              >
                <ListItemIcon>
                  <SvgIcon color="warning">
                    <FaHandHoldingUsdIcon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText>{EmergencyAidsText}</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/requests/add/prescription_exchange", {
                    state: { beneficiaryId },
                  })
                }
              >
                <ListItemIcon>
                  <SvgIcon color="error">
                    <FaPrescriptionBottleAltIcon />
                  </SvgIcon>
                </ListItemIcon>
                <ListItemText>{PrescriptionExchangeText}</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  navigate("/requests/add/special_materials", {
                    state: { beneficiaryId },
                  })
                }
              >
                <ListItemIcon>
                  <InventoryIcon color="secondary" />
                </ListItemIcon>
                <ListItemText>{SpecialMaterialsText}</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </PopupState>
      <RequestsTable requests={requests} />
    </Stack>
  );
}
