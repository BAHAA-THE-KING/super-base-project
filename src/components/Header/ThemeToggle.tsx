import React from "react";
import {
  Brightness4Outlined as Brightness4OutlinedIcon,
  Brightness7Outlined as Brightness7OutlinedIcon,
  TerminalOutlined as TerminalOutlinedIcon,
} from "@mui/icons-material";

import { BaseIconButton } from "./Base";

import { usePreferredTheme } from "src/globals";
import { BaseTooltip } from "src/components/Base";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = usePreferredTheme();
  return (
    <BaseTooltip title={"theme"}>
      <BaseIconButton
        onClick={() =>
          setTheme(
            theme === "light" ? "dark" : theme === "dark" ? "hacker" : "light"
          )
        }
      >
        {theme === "dark" ? (
          <Brightness4OutlinedIcon />
        ) : theme === "hacker" ? (
          <TerminalOutlinedIcon />
        ) : (
          <Brightness7OutlinedIcon />
        )}
      </BaseIconButton>
    </BaseTooltip>
  );
};

export default ThemeToggle;
