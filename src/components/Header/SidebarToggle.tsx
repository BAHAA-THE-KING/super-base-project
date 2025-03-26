import React from "react";

import {
  MenuOpenOutlined as MenuOpenOutlinedIcon,
  MenuOutlined as MenuOutlinedIcon,
} from "@mui/icons-material";

import { BaseTooltip } from "src/components/Base";
import { BaseIconButton } from "./Base";

import { useDirection, useSidebarOpen } from "src/globals";
import { useBaseTranslation } from "src/hooks";

const i18ns = ["open_sidebar", "close_sidebar"];

const SidebarToggle: React.FC = () => {
  const [OpenSidebarText, CloseSidebarText] = useBaseTranslation(i18ns);
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen();
  const [direction] = useDirection();
  return (
    <BaseTooltip title={sidebarOpen ? CloseSidebarText : OpenSidebarText}>
      <BaseIconButton onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? (
          direction === "ltr" ? (
            <MenuOpenOutlinedIcon sx={{ scale: "-1 1" }} />
          ) : (
            <MenuOpenOutlinedIcon />
          )
        ) : (
          <MenuOutlinedIcon />
        )}
      </BaseIconButton>
    </BaseTooltip>
  );
};

export default SidebarToggle;
