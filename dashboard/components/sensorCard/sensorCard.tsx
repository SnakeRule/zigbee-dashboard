import { ReactNode } from "react";
import { Card } from "../card/card";
import styles from "./sensorCard.module.css";

type SensorCardProps = {
  title: string;

  children: ReactNode;
};

export function SensorCard({ title, children }: SensorCardProps) {
  return (
    <Card>
      <div className={styles["sensor-card"]}>
        <h3 className={styles["sensor-name-label"]}>{title}</h3>
        <div className={styles["lower-container"]}>{children}</div>
      </div>
    </Card>
  );
}
