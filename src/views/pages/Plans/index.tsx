import { useMemo } from "react";
import { Grid2, Skeleton, Stack } from "@mui/material";

import { BDataGrid } from "src/components/Base";
import { AddPlanCard, PlanCard } from "./components";

import { usePlansColumns } from "./hooks";

import { usePlansData } from "src/views/data";

import { varAlpha } from "src/themes/styles";

export function Plans() {
  const { plans, getPlansLoading } = usePlansData();

  const top4Plans = useMemo(
    () => plans.filter((plan) => !plan.is_finished).slice(0, 4),
    [plans]
  );

  const columns = usePlansColumns();

  return (
    <Stack
      width={"100%"}
      height={"100%"}
      borderRadius={1}
      p={3}
      sx={(theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? varAlpha(theme.palette.secondary.darkerChannel, 0.2)
            : theme.palette.secondary.lighter,
      })}
    >
      <Grid2 container spacing={3} mb={2}>
        {top4Plans.map((plan) => (
          <Grid2 key={plan.id} size={{ xs: 12, md: 2.4 }}>
            <PlanCard plan={plan} />
          </Grid2>
        ))}
        {getPlansLoading
          ? new Array(4).fill(null).map((_, i) => (
              <Grid2 key={i} size={{ xs: 12, md: 2.4 }}>
                <Skeleton variant="rounded" width={"100%"} height={240} />
              </Grid2>
            ))
          : null}
        <AddPlanCard />
      </Grid2>
      <BDataGrid columns={columns} rows={plans} loading={getPlansLoading} />
    </Stack>
  );
}
