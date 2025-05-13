import { Box, Card, CardContent, Stack, SvgIcon } from "@mui/material";

import {
  GiMeat as GiMeatIcon,
  GiClothes as GiClothesIcon,
} from "react-icons/gi";
import { FaBowlRice as FaBowlRiceIcon } from "react-icons/fa6";
import { IoFastFood as IoFastFoodIcon } from "react-icons/io5";
import { TbPackages as TbPackagesIcon } from "react-icons/tb";

import { BTypography } from "src/components/Base";

import { Plan } from "../../data";

type Props = {
  plan: Plan;
};
export function PlanCard({ plan }: Props) {
  const color =
    plan.type === "clothes"
      ? "primary"
      : plan.type === "meat"
      ? "error"
      : plan.type === "rice"
      ? "warning"
      : plan.type === "food"
      ? "success"
      : "info";
  return (
    <Card sx={{ width: "100%", height: "100%", textAlign: "center" }}>
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
            bgcolor={(theme) => theme.palette[color].lighter}
          >
            <Box
              height={"100px"}
              width={"100px"}
              sx={{ aspectRatio: 1 }}
              position={"relative"}
              borderRadius={"50%"}
              bgcolor={(theme) => theme.palette[color].light}
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
                {plan.type === "clothes" ? (
                  <GiClothesIcon />
                ) : plan.type === "meat" ? (
                  <GiMeatIcon />
                ) : plan.type === "rice" ? (
                  <FaBowlRiceIcon />
                ) : plan.type === "food" ? (
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
    </Card>
  );
}
