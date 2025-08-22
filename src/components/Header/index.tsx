import { Stack } from "@mui/material";

import { BaseHeader } from "./Base";
import ThemeToggle from "./ThemeToggle";
import VoiceToggle from "./VoiceToggle";
import LanguageSelector from "./LanguageSelector";
import SidebarToggle from "./SidebarToggle";
import GoBack from "./GoBack";

export function Header({ isAuth = false }: { isAuth?: boolean }) {
  return (
    <BaseHeader boxShadow={1}>
      <Stack flexDirection={"row"} gap={2}>
        {isAuth || <GoBack />}
      </Stack>
      <Stack flexDirection={"row"} gap={2}>
        {isAuth || <SidebarToggle />}
        <VoiceToggle />
        <ThemeToggle />
        <LanguageSelector />
      </Stack>
    </BaseHeader>
  );
}
