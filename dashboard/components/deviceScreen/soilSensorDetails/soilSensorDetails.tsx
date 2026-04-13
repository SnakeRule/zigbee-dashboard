"use client";

import { LineChart } from "@/components/charts/lineChart";
import { Text } from "@/components/text/text";
import styles from "./soilSensorDetails.module.css";
import { Card } from "@/components/card/card";
import { useDeviceDetails } from "@/hooks/deviceDetails/useDeviceDetails";
import { DeviceType } from "@/zigbee-devices/types";
import { PlantSoilSensor } from "@/zigbee-devices/plantSoilSensor";

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
              Mullan kosteus
            </Text>
            <Text tag="p" variant="text-regular-bold">
              {`${sensor.soil_moisture}%`}
            </Text>
            {moistureData.data && (
              <LineChart data={moistureData.data} unit="C" min={0} max={100} />
            )}
          </div>
        </Card>
        <Card>
          <div className={styles.chartCard}>
            <Text tag="h3" variant="text-regular">
              Valoisuus
            </Text>
            <Text tag="p" variant="text-regular-bold">
              {`${sensor.illuminance}lx`}
            </Text>
            {illuminanceData.data && (
              <LineChart data={illuminanceData.data} unit="lx" />
            )}
          </div>
        </Card>
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
            <Text tag="h3" variant="text-regular">
              Ilmankosteus
            </Text>
            <Text tag="p" variant="text-regular-bold">
              {`${sensor.humidity}%`}
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
