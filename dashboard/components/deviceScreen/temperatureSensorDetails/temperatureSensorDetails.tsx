"use client";

import { LineChart } from "@/components/charts/lineChart";
import { Text } from "@/components/text/text";
import { TemperatureHumiditySensor } from "@/zigbee-devices/temperatureHumiditySensor";
import styles from "./temperatureSensorDetails.module.css";
import { Card } from "@/components/card/card";
import { useDeviceDetails } from "@/hooks/deviceDetails/useDeviceDetails";
import { DeviceType } from "@/zigbee-devices/types";

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
        <Text tag="h1" variant="text-xl">
          {sensor.friendlyName}
        </Text>
      </div>
      <div className={styles.cardsContainer}>
        <Card>
          <div className={styles.chartCard}>
            <Text tag="h3" variant="text-regular">
              Lämpötila
            </Text>
            <Text tag="p" variant="text-regular-bold">
              {`${sensor.temperature}°C`}
            </Text>
            {temperatureData.data && (
              <LineChart
                data={temperatureData.data}
                unit="C"
                min={10}
                max={35}
              />
            )}
          </div>
        </Card>
        <Card>
          <div className={styles.chartCard}>
            <Text tag="p" variant="text-regular-bold">
              {sensor.humidity}
            </Text>
            {humidityData.data && (
              <LineChart data={humidityData.data} unit="%" min={0} max={100} />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
