import React, { ComponentType, useEffect } from "react";
import { Stack } from "@mui/material";

import { Header } from "src/components";
import { useNavigate } from "react-router";

export function withHomeLayout<T extends object>(
  Component: ComponentType<T>
): React.FC<T> {
  return function (props: T) {
    const navigate = useNavigate();

    useEffect(() => {
      window.cookieStore
        .get({ name: "token" })
        .then((token) => !token && navigate("/login"));
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
