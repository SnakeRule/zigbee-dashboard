import { Card } from "@/components/card/card";
import { LineChart } from "@/components/charts/lineChart";
import { Text } from "@/components/text/text";
import { useDeviceDetails } from "@/hooks/deviceDetails/useDeviceDetails";
import styles from "./chartCard.module.css";
import { useDeviceDetailsProps } from "@/hooks/deviceDetails/types";

type ChartChardProps = {
  currentValue: number | undefined;
  unit: string;
  min?: number;
  max?: number;
  label: string;
  ieeeAddress: string;
  sensor: useDeviceDetailsProps["sensor"];
  target: useDeviceDetailsProps["target"];
  timeFrom: string;
};

export default function ChartCard({
  currentValue = 0,
  label,
  unit,
  max,
  min,
  ieeeAddress,
  sensor,
  target,
  timeFrom,
}: ChartChardProps) {
  const deviceData = useDeviceDetails({
    ieeeAddress,
    currentValue,
    sensor,
    target,
    timeFrom,
  });

  return (
    <Card className={styles["chart-card"]} padding={8}>
      <div className={styles["chart-card-content"]}>
        <div className={styles["chart-card-labels-container"]}>
          <Text tag="h3" variant="text-regular">
            {label}
          </Text>
          <Text
            tag="p"
            variant="text-regular-bold"
            className={styles["cart-card-label"]}
          >
            {`${currentValue ?? "-"} ${unit}`}
          </Text>
        </div>
        <LineChart
          data={deviceData.data}
          unit={unit}
          min={min}
          max={max}
          label={label}
        />
      </div>
    </Card>
  );
}
