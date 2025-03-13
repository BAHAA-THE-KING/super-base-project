import React from "react";
import { Box, Grid2 } from "@mui/material";
import { t } from "i18next";

import { MapsHomeWorkOutlined as MapsHomeWorkOutlinedIcon } from "@mui/icons-material";

import { BaseButton, BaseCard } from "src/components/Base";

import { useHomePageData } from "src/views/data";

import { useBaseTranslation } from "src/hooks";

const i18ns = ["click_please"];
export const Home = ({ Component }: { Component: React.FC }) => {
  const [ClickPleaseText] = useBaseTranslation(i18ns);

  const {} = useHomePageData();

  return (
    <>
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12 }}>
          <BaseButton variant="text">{ClickPleaseText}</BaseButton>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <BaseButton
            variant="outlined"
            color="error"
            startIcon={<Component />}
          >
            {ClickPleaseText}
          </BaseButton>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <BaseButton
            variant="contained"
            color="success"
            startIcon={<Component />}
          >
            {ClickPleaseText}
          </BaseButton>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <BaseCard sx={{ height: "100px" }} color="primary">
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Box>
                <MapsHomeWorkOutlinedIcon fontSize="large" />
              </Box>
              <Box>{ClickPleaseText}</Box>
            </Box>
          </BaseCard>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <BaseCard sx={{ height: "100px" }} color="secondary">
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Box>
                <MapsHomeWorkOutlinedIcon fontSize="large" />
              </Box>
              <Box>{ClickPleaseText}</Box>
            </Box>
          </BaseCard>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <BaseCard sx={{ height: "100px" }} color="success">
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Box>
                <MapsHomeWorkOutlinedIcon fontSize="large" />
              </Box>
              <Box>{ClickPleaseText}</Box>
            </Box>
          </BaseCard>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <BaseCard sx={{ height: "100px" }} color="info">
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Box>
                <MapsHomeWorkOutlinedIcon fontSize="large" />
              </Box>
              <Box>{ClickPleaseText}</Box>
            </Box>
          </BaseCard>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <BaseCard sx={{ height: "100px" }} color="warning">
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Box>
                <MapsHomeWorkOutlinedIcon fontSize="large" />
              </Box>
              <Box>{ClickPleaseText}</Box>
            </Box>
          </BaseCard>
        </Grid2>
        <Grid2 size={{ xs: 2 }}>
          <BaseCard sx={{ height: "100px" }} color="error">
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Box>
                <MapsHomeWorkOutlinedIcon fontSize="large" />
              </Box>
              <Box>{ClickPleaseText}</Box>
            </Box>
          </BaseCard>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <BaseCard sx={{ height: "100px" }}>
            <Box
              width={"100%"}
              height={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Box>
                <MapsHomeWorkOutlinedIcon fontSize="large" />
              </Box>
              <Box>{ClickPleaseText}</Box>
            </Box>
          </BaseCard>
        </Grid2>
      </Grid2>
    </>
  );
};
