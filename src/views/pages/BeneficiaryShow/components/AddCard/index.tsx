import { CardContent } from "@mui/material";

import { Add } from "@mui/icons-material";

import { BCard } from "src/components/Base";

type Props = {
  onAdd: () => void;
};

export function AddCard({ onAdd }: Props) {
  return (
    <BCard
      sx={{ flex: 1, cursor: "pointer" }}
      animations={{ transitions: "slideInBottom" }}
      onClick={onAdd}
    >
      <CardContent
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Add sx={{ fontSize: 100 }} />
      </CardContent>
    </BCard>
  );
}
