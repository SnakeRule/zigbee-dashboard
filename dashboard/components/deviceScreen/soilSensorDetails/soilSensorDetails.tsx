"use client";

import styles from "./soilSensorDetails.module.css";
import { useDeviceDetails } from "@/hooks/deviceDetails/useDeviceDetails";
import { DeviceType } from "@/zigbee-devices/types";
import { PlantSoilSensor } from "@/zigbee-devices/plantSoilSensor";
import ChartCard from "../chartCard/chartCard";

type SoilSensorDetailsProps = { sensor: PlantSoilSensor };

export default function SoilSensorDetails({ sensor }: SoilSensorDetailsProps) {
  const temperatureData = useDeviceDetails({
    ieeAddress: sensor.ieeeAddress,
    currentValue: sensor.temperature ?? 0,
    sensor: DeviceType.PLANT_SOIL_SENSOR,
    target: "temperature",
  });
  const humidityData = useDeviceDetails({
    ieeAddress: sensor.ieeeAddress,
    currentValue: sensor.humidity ?? 0,
    sensor: DeviceType.PLANT_SOIL_SENSOR,
    target: "humidity",
  });
  const moistureData = useDeviceDetails({
    ieeAddress: sensor.ieeeAddress,
    currentValue: sensor.soil_moisture ?? 0,
    sensor: DeviceType.PLANT_SOIL_SENSOR,
    target: "soil_moisture",
  });
  const illuminanceData = useDeviceDetails({
    ieeAddress: sensor.ieeeAddress,
    currentValue: sensor.illuminance ?? 0,
    sensor: DeviceType.PLANT_SOIL_SENSOR,
    target: "illuminance",
  });

  return (
    <>
      <div className={styles.cardsContainer}>
        <ChartCard
          currentValue={sensor.soil_moisture}
          deviceData={moistureData}
          label="Mullan kosteus"
          unit="%"
          min={0}
          max={100}
        />
        <ChartCard
          currentValue={sensor.illuminance}
          deviceData={illuminanceData}
          label="Valoisuus"
          unit="lx"
        />
      </div>
      <div className={styles.cardsContainer}>
        <ChartCard
          currentValue={sensor.temperature}
          deviceData={temperatureData}
          label="Lämpötila"
          unit="°C"
          min={10}
          max={40}
        />
        <ChartCard
          currentValue={sensor.humidity}
          deviceData={humidityData}
          label="Ilmankosteus"
          unit="°%"
          min={0}
          max={100}
        />
      </div>
    </>
  );
}
