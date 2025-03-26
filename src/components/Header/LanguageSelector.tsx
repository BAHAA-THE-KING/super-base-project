import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { LanguageOutlined as LanguageOutlinedIcon } from "@mui/icons-material";

import { usePreferredLanguage } from "src/globals";
import { BaseIconButton } from "./Base";
import { BaseTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

const i18ns = ["arabic", "english", "language"];
const LanguageSelector: React.FC = () => {
  const [ArabicText, EnglishText, LanguageText] = useBaseTranslation(i18ns);

  const [language, setLanguage] = usePreferredLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  return (
    <>
      <BaseTooltip title={LanguageText}>
        <BaseIconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <LanguageOutlinedIcon />
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
          {ArabicText}
        </MenuItem>
        <MenuItem
          onClick={() => setLanguage("en")}
          selected={language === "en"}
        >
          {EnglishText}
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageSelector;
