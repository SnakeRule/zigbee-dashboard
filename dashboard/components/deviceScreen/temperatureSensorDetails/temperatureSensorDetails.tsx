"use client";

import { Text } from "@/components/text/text";
import { TemperatureHumiditySensor } from "@/zigbee-devices/temperatureHumiditySensor";
import styles from "./temperatureSensorDetails.module.css";
import { useDeviceDetails } from "@/hooks/deviceDetails/useDeviceDetails";
import { DeviceType } from "@/zigbee-devices/types";
import ChartCard from "../chartCard/chartCard";
import DeviceName from "../deviceName/deviceName";

type TemperatureSensorDetailsProps = { sensor: TemperatureHumiditySensor };

export default function TemperatureSensorDetails({
  sensor,
}: TemperatureSensorDetailsProps) {
  const temperatureData = useDeviceDetails({
    ieeAddress: sensor.ieeeAddress,
    currentValue: sensor.temperature ?? 0,
    sensor: DeviceType.TEMPERATURE_SENSOR,
    target: "temperature",
  });
  const humidityData = useDeviceDetails({
    ieeAddress: sensor.ieeeAddress,
    currentValue: sensor.humidity ?? 0,
    sensor: DeviceType.TEMPERATURE_SENSOR,
    target: "humidity",
  });

  return (
    <div className={styles["details-container"]}>
      <div className={styles.headerContainer}>
        <DeviceName friendlyName={sensor.friendlyName} />
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
    </div>
  );
}
