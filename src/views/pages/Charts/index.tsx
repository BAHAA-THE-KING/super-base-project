import { useMemo } from "react";

import { Box, type Palette, useTheme } from "@mui/material";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// ReportsLineChart configurations
import configs from "./configs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { useData } from "./data";

export function Charts() {
  const data = useData();

  const { palette } = useTheme();

  const {
    bgcolor,
    charts,
  }: {
    bgcolor?: keyof Palette | string;
    charts: {
      color?: keyof Palette | string;
      areacolor?: keyof Palette | string;
      label?: string;
      curvy?: boolean;
      data: any[];
    }[];
  } = {
    //bgcolor: "darkblue",
    charts: [
      {
        areacolor: "blue",
        curvy: true,
        data: data.map((e) => e.value * 0.5),
      },
      {
        color: "white",
        label: "myData",
        curvy: false,
        data: data.map((e) => e.value),
      },
    ],
  };

  const { options } = configs();

  return (
    <Box display={"flex"} flexGrow={1}>
      <Box padding="1rem">
        {useMemo(
          () => (
            <Box
              bgcolor={
                (palette as Record<string, any>)[bgcolor ?? ""]?.main || bgcolor
              }
              borderRadius="10px"
              py={2}
              pr={0.5}
              mt={-5}
              width={"50rem"}
              height={"20rem"}
            >
              <Line
                data={{
                  labels: data.map((e, i) =>
                    e.date.toLocaleDateString("sv-Se").slice(0, 7)
                  ),
                  datasets: charts.map((chart) => ({
                    label: chart.label,
                    cubicInterpolationMode: chart.curvy
                      ? "monotone"
                      : "default",
                    pointRadius: 5,
                    pointBorderColor: "transparent",
                    pointBackgroundColor:
                      (palette as Record<string, any>)[chart.color ?? ""]
                        ?.main || chart.color,
                    borderColor:
                      (palette as Record<string, any>)[chart.color ?? ""]
                        ?.main || chart.color,
                    borderWidth: 4,
                    backgroundColor:
                      (palette as Record<string, any>)[chart.areacolor ?? ""]
                        ?.main || chart.areacolor,
                    fill: Boolean(chart.areacolor),
                    data: chart.data,
                  })),
                }}
                options={options}
                redraw
              />
            </Box>
          ),
          [charts]
        )}
      </Box>
    </Box>
  );
}
