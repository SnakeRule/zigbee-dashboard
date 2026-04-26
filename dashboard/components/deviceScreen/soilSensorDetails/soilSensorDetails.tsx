"use client";

import styles from "./soilSensorDetails.module.css";
import { PlantSoilSensor } from "@/zigbee-devices/plantSoilSensor";
import ChartCard from "../chartCard/chartCard";

type SoilSensorDetailsProps = { sensor: PlantSoilSensor; timeFrom: string };

export default function SoilSensorDetails({
  sensor,
  timeFrom,
}: SoilSensorDetailsProps) {
  return (
    <>
      <div className={styles.cardsContainer}>
        <ChartCard
          currentValue={sensor.soil_moisture}
          label="Mullan kosteus"
          unit="%"
          min={0}
          max={100}
          ieeeAddress={sensor.ieeeAddress}
          sensor={sensor.deviceType}
          target="soil_moisture"
          timeFrom={timeFrom}
        />
        <ChartCard
          currentValue={sensor.illuminance}
          label="Valoisuus"
          unit="lx"
          ieeeAddress={sensor.ieeeAddress}
          sensor={sensor.deviceType}
          target="illuminance"
          timeFrom={timeFrom}
        />
      </div>
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
    </>
  );
}
