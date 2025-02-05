import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";

import { usePreferredLanguage } from "src/globals";
import { BaseIconButton } from "./Base";
import { BaseTooltip } from "src/components/Base";

const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = usePreferredLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  return (
    <>
      <BaseTooltip title={"language"}>
        <BaseIconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <LanguageIcon />
        </BaseIconButton>
      </BaseTooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => setLanguage("ar")}
          selected={language === "ar"}
        >
          Arabic
        </MenuItem>
        <MenuItem
          onClick={() => setLanguage("en")}
          selected={language === "en"}
        >
          English
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelector;
