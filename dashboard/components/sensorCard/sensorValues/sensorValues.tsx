import { ReactNode } from "react";
import styles from "./sensorValues.module.css";
import { Text } from "@/components/text/text";
import Link from "next/link";
import { ValueIndicator } from "@/components/valueIndicator/valueIndicator";

type SensorValue = {
  title?: string;
  value: string;
  icon?: ReactNode;
  unit?: string;
  min?: number;
  max?: number;
};

type SensorValuesProps = {
  name: string;
  ieeeAddress: string;
  values: SensorValue[];
};

export function SensorValues({ name, ieeeAddress, values }: SensorValuesProps) {
  console.log(values.map((value) => value));

  return (
    <Link
      href={`/device/${ieeeAddress}`}
      className={styles["device-container"]}
    >
      <Text tag="h4" variant="text-large">
        {name}
      </Text>
      {values.map((value) => (
        <div className={styles["values-container"]} key={value.title}>
          {value.title && (
            <Text tag="span" variant="text-regular">
              {value.title}
            </Text>
          )}
          {value.icon && value.icon}
          {!isNaN(parseFloat(value.value)) &&
          value.unit !== undefined &&
          value.min !== undefined &&
          value.max !== undefined ? (
            <ValueIndicator
              currentValue={parseFloat(value.value)}
              min={value.min}
              max={value.max}
              unit={value.unit}
            />
          ) : (
            <Text tag="span" variant="text-regular">
              {value.value}
            </Text>
          )}
        </div>
      ))}
    </Link>
  );
}
