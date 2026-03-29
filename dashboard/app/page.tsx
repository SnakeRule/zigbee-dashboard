"use client";

import { DoorSensorCard } from "@/components/door-sensor-card/doorSensorCard";
import useWebsocketClient from "@/hooks/useWebsocketClient";
import { DeviceType } from "@/zigbee-devices/types";
import styles from "./page.module.css";
import { TemperatureSensorCard } from "@/components/temperatureSensorCard/temperatureSensorCard";
import { PlantSoilSensorCard } from "@/components/plantSoilSensorCard/plantSoilSensorCard";

export default function Home() {
  const { devices } = useWebsocketClient();

  const doors = Object.values(devices).filter(
    (device) => device.deviceType === DeviceType.DOOR_SENSOR,
  );
  const tempetureSensors = Object.values(devices).filter(
    (device) => device.deviceType === DeviceType.TEMPERATURE_SENSOR,
  );
  const plantSoilSensors = Object.values(devices).filter(
    (device) => device.deviceType === DeviceType.PLANT_SOIL_SENSOR,
  );

  return (
    devices && (
      <div className={styles["dashboard-items-container"]}>
        <TemperatureSensorCard sensors={tempetureSensors} />
        <PlantSoilSensorCard sensors={plantSoilSensors} />
        <DoorSensorCard sensors={doors} />
      </div>
    )
  );
}
