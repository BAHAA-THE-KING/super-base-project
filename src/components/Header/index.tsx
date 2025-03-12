import React from "react";
import { Box } from "@mui/material";

import { BaseHeader } from "./Base";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./UserMenu";
import SidebarToggle from "./SidebarToggle";

const Header: React.FC = () => {
  return (
    <BaseHeader boxShadow={1}>
      <Box display="flex">
        <SidebarToggle />
      </Box>
      <Box display="flex" gap={2}>
        <ThemeToggle />
        <LanguageSelector />
        <UserMenu />
      </Box>
    </BaseHeader>
  );
};

export { Header };
