import { Card } from "@/components/card/card";
import { LineChart } from "@/components/charts/lineChart";
import { Text } from "@/components/text/text";
import { useDeviceDetails } from "@/hooks/deviceDetails/useDeviceDetails";
import styles from "./chartCard.module.css";

type ChartChardProps = {
  currentValue: number | undefined;
  deviceData: ReturnType<typeof useDeviceDetails>;
  unit: string;
  min?: number;
  max?: number;
  label: string;
};

export default function ChartCard({
  deviceData,
  currentValue,
  label,
  unit,
  max,
  min,
}: ChartChardProps) {
  return (
    <Card className={styles["chart-card"]}>
      <div className={styles["chart-card-content"]}>
        <div className={styles["chart-card-labels-container"]}>
          <Text
            tag="h3"
            variant="text-regular"
            className={styles["cart-card-label"]}
          >
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
        {deviceData.data && (
          <LineChart
            data={deviceData.data}
            unit={unit}
            min={min}
            max={max}
            label={label}
          />
        )}
      </div>
    </Card>
  );
}
