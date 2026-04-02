import { ReactNode } from "react";
import styles from "./sensorValues.module.css";
import { Text } from "@/components/text/text";
import Link from "next/link";

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
    <Link href={`/device/${name}`} className={styles["device-container"]}>
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
          <Text tag="span" variant="text-regular">
            {value.value}
          </Text>
        </div>
      ))}
    </Link>
  );
}
