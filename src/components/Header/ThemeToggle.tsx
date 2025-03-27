import React from "react";
import {
  Brightness4Outlined as Brightness4OutlinedIcon,
  Brightness7Outlined as Brightness7OutlinedIcon,
  TerminalOutlined as TerminalOutlinedIcon,
} from "@mui/icons-material";

import { BaseIconButton } from "./Base";

import { usePreferredTheme } from "src/globals";
import { BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

const i18ns = ["theme"];
const ThemeToggle: React.FC = () => {
  const [ThemeText] = useBaseTranslation(i18ns);

  const [theme, setTheme] = usePreferredTheme();

  return (
    <BTooltip title={ThemeText}>
      <BaseIconButton
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "dark" ? (
          <Brightness4OutlinedIcon />
        ) : (
          <Brightness7OutlinedIcon />
        )}
      </BaseIconButton>
    </BTooltip>
  );
};

export default ThemeToggle;
