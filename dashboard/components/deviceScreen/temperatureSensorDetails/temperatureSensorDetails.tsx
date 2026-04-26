"use client";

import { TemperatureHumiditySensor } from "@/zigbee-devices/temperatureHumiditySensor";
import styles from "./temperatureSensorDetails.module.css";
import ChartCard from "../chartCard/chartCard";

type TemperatureSensorDetailsProps = {
  sensor: TemperatureHumiditySensor;
  timeFrom: string;
};

export default function TemperatureSensorDetails({
  sensor,
  timeFrom,
}: TemperatureSensorDetailsProps) {
  return (
    <div className={styles.cardsContainer}>
      <ChartCard
        currentValue={sensor.temperature}
        label="Lämpötila"
        unit="°C"
        min={10}
        max={40}
        ieeeAddress={sensor.ieeeAddress}
        sensor={sensor.deviceType}
        target="temperature"
        timeFrom={timeFrom}
      />
      <ChartCard
        currentValue={sensor.humidity}
        label="Ilmankosteus"
        unit="°%"
        min={0}
        max={100}
        ieeeAddress={sensor.ieeeAddress}
        sensor={sensor.deviceType}
        target="humidity"
        timeFrom={timeFrom}
      />
    </div>
  );
}
