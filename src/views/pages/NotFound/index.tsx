import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router";

import { BaseContainer } from "./components";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <BaseContainer>
      <Typography variant="h1" color="primary" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 2 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </BaseContainer>
  );
}
