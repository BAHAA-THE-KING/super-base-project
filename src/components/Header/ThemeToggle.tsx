import React from "react";
import { Brightness4, Brightness7, Terminal } from "@mui/icons-material";

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
          <Brightness4 />
        ) : theme === "hacker" ? (
          <Terminal />
        ) : (
          <Brightness7 />
        )}
      </BaseIconButton>
    </BaseTooltip>
  );
};

export default ThemeToggle;
