import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Button, Container, Typography } from "@mui/material";
import { t } from "i18next";

const MainErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" color="error" gutterBottom>
        {t("something_went_wrong")}
      </Typography>
      <Typography variant="body1">
        {error.message || t("an_unexpected_error_occurred") + "."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={resetErrorBoundary}
        sx={{ mt: 2 }}
      >
        {t("try_again")}
      </Button>
    </Container>
  );
};

export { MainErrorFallback };
