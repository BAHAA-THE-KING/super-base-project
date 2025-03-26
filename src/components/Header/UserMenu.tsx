import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { AccountCircleOutlined as AccountCircleOutlinedIcon } from "@mui/icons-material";

import { BaseIconButton } from "./Base";
import { BTooltip } from "src/components/Base";

const UserMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  return (
    <>
      <BTooltip title={"account"}>
        <BaseIconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <AccountCircleOutlinedIcon />
        </BaseIconButton>
      </BTooltip>
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
