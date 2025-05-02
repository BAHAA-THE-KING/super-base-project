import { Stack } from "@mui/material";

import { BaseHeader } from "./Base";
import ThemeToggle from "./ThemeToggle";
import VoiceToggle from "./VoiceToggle";
import LanguageSelector from "./LanguageSelector";
import SidebarToggle from "./SidebarToggle";
import GoBack from "./GoBack";

export function Header() {
  return (
    <BaseHeader boxShadow={1}>
      <Stack flexDirection={"row"} gap={2}>
        <GoBack />
      </Stack>
      <Stack flexDirection={"row"} gap={2}>
        <SidebarToggle />
        <VoiceToggle />
        <ThemeToggle />
        <LanguageSelector />
      </Stack>
    </BaseHeader>
  );
}
