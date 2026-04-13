import type { ChartData, Point } from "chart.js";
import { DateTime } from "luxon";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-luxon";

type LineChartProps = {
  data: {
    value: number;
    created_at: string;
  }[];
  unit: string;
  min?: number;
  max?: number;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale,
);

export function LineChart({ data, unit, min, max }: LineChartProps) {
  const chartData: ChartData<"line", (number | Point | null)[]> = {
    datasets: [
      {
        data: data.map((item) => ({
          y: item.value,
          x: DateTime.fromFormat(item.created_at, "yyyy-MM-dd HH:mm:ss", {
            zone: "utc",
          }).toMillis(),
        })),
        label: `Lämpötila (${unit})`,
      },
    ],
  };

  return (
    <Line
      options={{
        parsing: false,
        scales: {
          y: {
            max: max,
            min: min,
          },
          x: {
            grid: {
              drawTicks: false,
            },
            type: "time",
            time: {
              displayFormats: {
                hour: "HH:mm",
                day: "d.M.",
                week: "d.M.",
                month: "MM.yyyy",
              },
              tooltipFormat: "dd.MM.yyyy HH:mm",
            },
          },
        },
      }}
      data={chartData}
    />
  );
}
