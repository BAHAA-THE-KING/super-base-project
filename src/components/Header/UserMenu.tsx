import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import { BaseIconButton } from "./Base";
import { BaseTooltip } from "src/components/Base";

const UserMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <BaseTooltip title={"account"}>
        <BaseIconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <AccountCircle />
        </BaseIconButton>
      </BaseTooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
