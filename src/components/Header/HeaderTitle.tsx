import React from "react";
import { useLocation } from "react-router";

import { BaseHeaderTitle } from "./Base";

const HeaderTitle: React.FC = () => {
  const location = useLocation();
  return (
    <BaseHeaderTitle>
      {location.pathname.replace("/", "").toUpperCase()}
    </BaseHeaderTitle>
  );
};

export default HeaderTitle;
