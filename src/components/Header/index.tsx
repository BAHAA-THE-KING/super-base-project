import React from "react";
import { Box } from "@mui/material";

import { BaseHeader } from "./Base";
import HeaderTitle from "./HeaderTitle";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
  return (
    <BaseHeader boxShadow={1}>
      <HeaderTitle />
      <Box display="flex" gap={2}>
        <ThemeToggle />
        <LanguageSelector />
        <UserMenu />
      </Box>
    </BaseHeader>
  );
};

export { Header };
