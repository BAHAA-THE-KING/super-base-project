import { Box, CardContent, Stack, SvgIcon } from "@mui/material";
import { Link } from "react-router";

import {
  GiMeat as GiMeatIcon,
  GiClothes as GiClothesIcon,
} from "react-icons/gi";
import { FaBowlRice as FaBowlRiceIcon } from "react-icons/fa6";
import { IoFastFood as IoFastFoodIcon } from "react-icons/io5";
import { TbPackages as TbPackagesIcon } from "react-icons/tb";

import { BCard, BTypography } from "src/components/Base";

import { Plan } from "src/views/data";

type Props = {
  plan: Plan;
};
export function PlanCard({ plan }: Props) {
  const color =
    plan.category.name === "clothes" || plan.category.name.includes("ملابس")
      ? "primary"
      : plan.category.name === "meat" || plan.category.name.includes("لحوم")
      ? "error"
      : plan.category.name === "rice" || plan.category.name.includes("حبوب")
      ? "warning"
      : plan.category.name === "food" || plan.category.name.includes("طعام")
      ? "success"
      : "info";
  return (
    <Link to={plan.id.toString()}>
      <BCard
        sx={{
          width: "100%",
          height: "100%",
          textAlign: "center",
          cursor: "pointer",
        }}
        animations={{ transitions: "slideInBottom", gestures: "elevate" }}
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
                  ? theme.palette[color].lighter
                  : theme.palette[color].darker
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
                    ? theme.palette[color].light
                    : theme.palette[color].dark
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
                  color={color}
                >
                  {plan.category.name === "clothes" ? (
                    <GiClothesIcon />
                  ) : plan.category.name === "meat" ? (
                    <GiMeatIcon />
                  ) : plan.category.name === "rice" ? (
                    <FaBowlRiceIcon />
                  ) : plan.category.name === "food" ? (
                    <IoFastFoodIcon />
                  ) : (
                    <TbPackagesIcon />
                  )}
                </SvgIcon>
              </Box>
            </Box>
          </Stack>
        </CardContent>
        <CardContent>
          <BTypography>{plan.name}</BTypography>
        </CardContent>
      </BCard>
    </Link>
  );
}
