import { ReactNode } from "react";
import { Card } from "../card/card";
import styles from "./sensorCard.module.css";
import { Text } from "../text/text";

type SensorCardProps = {
  title: string;

  children: ReactNode;
};

export function SensorCard({ title, children }: SensorCardProps) {
  return (
    <Card>
      <div className={styles["sensor-card"]}>
        <Text
          tag="h3"
          variant="text-header-small"
          className={styles["sensor-name-label"]}
        >
          {title}
        </Text>
        <div className={styles["lower-container"]}>{children}</div>
      </div>
    </Card>
  );
}
