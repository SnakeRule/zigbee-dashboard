import { ReactNode } from "react";
import styles from "./sensorValues.module.css";

type SensorValue = {
  title?: string;
  value: string;
  icon?: ReactNode;
};

type SensorValuesProps = {
  name: string;
  values: SensorValue[];
};

export function SensorValues({ name, values }: SensorValuesProps) {
  return (
    <div className={styles["device-container"]}>
      <span>{name}</span>
      {values.map((value) => (
        <div className={styles["values-container"]} key={value.title}>
          {value.title && <span>{value.title}</span>}
          {value.icon && value.icon}
          <span>{value.value}</span>
        </div>
      ))}
    </div>
  );
}
