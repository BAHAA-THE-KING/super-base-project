import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Button, Container, Typography } from "@mui/material";

import { useBaseTranslation } from "src/hooks";

const i18ns = [
  "something_went_wrong",
  "an_unexpected_error_occurred",
  "try_again",
];
const MainErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const [SomethingWentWrongText, AnUnexpectedErrorOccurredText, TryAgainText] =
    useBaseTranslation(i18ns);

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
        {SomethingWentWrongText}
      </Typography>
      <Typography variant="body1">
        {error.message || AnUnexpectedErrorOccurredText + "."}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={resetErrorBoundary}
        sx={{ mt: 2 }}
      >
        {TryAgainText}
      </Button>
    </Container>
  );
};

export { MainErrorFallback };
