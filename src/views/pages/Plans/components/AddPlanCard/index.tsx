import { Box, CardContent, Stack, SvgIcon } from "@mui/material";
import { Link } from "react-router";

import { Add } from "@mui/icons-material";

import { BCard, BTypography } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";

const i18ns = ["add_new_plan"];
export function AddPlanCard() {
  const [AddNewPlanText] = useBaseTranslation(i18ns);
  return (
    <Link to={"add"}>
      <BCard
        sx={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          cursor: "pointer",
        }}
        animations={{ transitions: "slideInLeft", gestures: "elevate" }}
      >
        <CardContent>
          <Stack width={"100%"} alignItems={"center"}>
            <Box
              height={"150px"}
              width={"150px"}
              sx={{ aspectRatio: 1 }}
              position={"relative"}
              borderRadius={"50%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              bgcolor={(theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.secondary.lighter
                  : theme.palette.secondary.darker
              }
            >
              <Box
                height={"100px"}
                width={"100px"}
                sx={{ aspectRatio: 1 }}
                position={"relative"}
                borderRadius={"50%"}
                bgcolor={(theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.secondary.light
                    : theme.palette.secondary.dark
                }
              >
                <SvgIcon
                  sx={{
                    scale: 3,
                    position: "absolute",
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(CALC(-50% / 3), CALC(-50% / 3))",
                  }}
                  color={"secondary"}
                >
                  <Add />
                </SvgIcon>
              </Box>
            </Box>
          </Stack>
        </CardContent>
        <CardContent>
          <BTypography>{AddNewPlanText}</BTypography>
        </CardContent>
      </BCard>
    </Link>
  );
}
