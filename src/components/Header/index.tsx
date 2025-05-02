import React from "react";
import { Box } from "@mui/material";

import { BaseHeader } from "./Base";
import ThemeToggle from "./ThemeToggle";
import VoiceToggle from "./VoiceToggle";
import LanguageSelector from "./LanguageSelector";
import SidebarToggle from "./SidebarToggle";

const Header: React.FC = () => {
  return (
    <BaseHeader boxShadow={1}>
      <Box display="flex" gap={2}>
        <SidebarToggle />
        <VoiceToggle />
        <ThemeToggle />
        <LanguageSelector />
      </Box>
    </BaseHeader>
  );
};

export { Header };
