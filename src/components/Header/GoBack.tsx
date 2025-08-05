import { useNavigate } from "react-router";
import { SvgIcon } from "@mui/material";

import { RiArrowGoBackFill as RiArrowGoBackFillIcon } from "react-icons/ri";

import { BTooltip } from "../Base";
import { BaseIconButton } from "./Base";

import { useBaseTranslation } from "src/hooks";

const i18ns = ["go_back"];

export default function GoBack() {
  const [GoBackText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  return (
    <BTooltip title={GoBackText}>
      <BaseIconButton onClick={() => navigate(-1)}>
        <SvgIcon
          sx={(theme) => ({
            scale: theme.direction === "rtl" ? "-1 1" : "1 1",
          })}
        >
          <RiArrowGoBackFillIcon />
        </SvgIcon>
      </BaseIconButton>
    </BTooltip>
  );
}
