import React from "react";
import { Link, useLocation } from "react-router";
import { t } from "i18next";

import { BaseTypography } from "src/components/Base";
import { BaseHeaderTitle } from "./Base";

const HeaderTitle: React.FC = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);

  return (
    <BaseHeaderTitle>
      {path.split("/").map((e, i, arr) => (
        <>
          <Link to={"/" + e}>
            <BaseTypography variant="h6">{t(e)}</BaseTypography>
          </Link>
          {i !== arr.length - 1 ? (
            <BaseTypography mx={0.5}>/</BaseTypography>
          ) : null}
        </>
      ))}
    </BaseHeaderTitle>
  );
};

export default HeaderTitle;
