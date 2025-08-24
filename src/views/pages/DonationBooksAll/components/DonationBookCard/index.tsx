import { Box, CardContent, Stack, SvgIcon } from "@mui/material";
import { Link } from "react-router";

import { FaBook as FaBookIcon } from "react-icons/fa";

import { BCard, BTypography } from "src/components/Base";

import { DonationBook } from "src/types/data/DonationBook";

type Props = {
  book: DonationBook;
};
export function DonationBookCard({ book }: Props) {
  return (
    <Link to={book.id.toString()}>
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
                  ? theme.palette.info.lighter
                  : theme.palette.info.darker
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
                    ? theme.palette.info.light
                    : theme.palette.info.dark
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
                  color={"info"}
                >
                  <FaBookIcon />
                </SvgIcon>
              </Box>
            </Box>
          </Stack>
        </CardContent>
        <CardContent>
          <BTypography fontWeight={"bold"}>{book.number}</BTypography>
          <BTypography>{book.category}</BTypography>
        </CardContent>
      </BCard>
    </Link>
  );
}
