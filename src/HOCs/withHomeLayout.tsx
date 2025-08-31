import React, { ComponentType, useEffect } from "react";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

import { Header } from "src/components";

export function withHomeLayout<T extends object>(
  Component: ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    const navigate = useNavigate();
    const [cookies] = useCookies(["token"]);

    useEffect(() => {
      const token = cookies.token;
      if (!token) navigate("/login");
    }, []);

    return (
      <Stack
        direction={"row"}
        minHeight={"100vh"}
        bgcolor={(theme) => theme.palette.background.default}
        overflow={"auto"}
      >
        <Stack
          width={`100%`}
          m={1}
          sx={(theme) => ({
            transition: theme.transitions.create(["transform", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.shorter,
            }),
          })}
        >
          <Header isAuth />
          <Component {...props} />
        </Stack>
      </Stack>
    );
  };
}
