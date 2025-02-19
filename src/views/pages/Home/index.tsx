import React, { useState } from "react";
import { Divider, Grid2, IconButton, TextField } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

import { BaseButton, BaseTooltip, BaseTypography } from "src/components/Base";

import { useHomePageData } from "src/views/data";

export const Home = ({ Component }: { Component: React.FC }) => {
  const [params, setParams] = useState<Partial<{ name: string }>>({});
  const { users, addUser, deleteUser } = useHomePageData(params);

  return (
    <>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="search"
            onChange={({ target: { value } }) => setParams({ name: value })}
            fullWidth
          />
        </Grid2>
        {users?.map((e) => (
          <React.Fragment key={e.id}>
            <Grid2 size={{ xs: 11 }}>
              <BaseTypography variant="h5">name: {e.fullname}</BaseTypography>
            </Grid2>
            <Grid2 size={{ xs: 1 }}>
              <BaseTooltip title={"delete user"}>
                <IconButton
                  onClick={() => deleteUser({ userId: e.id })}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </BaseTooltip>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Divider />
            </Grid2>
          </React.Fragment>
        ))}
        <Grid2 size={{ xs: 12 }}>
          <BaseButton
            variant="contained"
            color={"error"}
            startIcon={<Component />}
            animations={{
              gestures: "rotate",
              transitions: "faceInOnce",
            }}
            onClick={() => {
              addUser({
                data: { name: "koko" + Math.random(), age: 16 },
              });
            }}
          >
            click me
          </BaseButton>
        </Grid2>
      </Grid2>
    </>
  );
};
