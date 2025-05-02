import { useNavigate } from "react-router";

import { BButton, BTypography } from "src/components/Base";
import { BaseContainer } from "./components";

import { useBaseTranslation } from "src/hooks";

const i18ns = ["go_back", "not_found_message"];

export function NotFound() {
  const [GoBackText, NotFoundMessageText] = useBaseTranslation(i18ns);

  const navigate = useNavigate();

  return (
    <BaseContainer>
      <BTypography variant="h1" color="primary" fontWeight="bold">
        404
      </BTypography>
      <BTypography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
        {NotFoundMessageText}
      </BTypography>
      <BButton variant="contained" color="primary" onClick={() => navigate(-1)}>
        {GoBackText}
      </BButton>
    </BaseContainer>
  );
}
