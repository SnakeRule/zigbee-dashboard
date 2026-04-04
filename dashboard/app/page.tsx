"use client";

import { DoorSensorCard } from "@/components/door-sensor-card/doorSensorCard";
import { DeviceType } from "@/zigbee-devices/types";
import styles from "./page.module.css";
import { TemperatureSensorCard } from "@/components/temperatureSensorCard/temperatureSensorCard";
import { PlantSoilSensorCard } from "@/components/plantSoilSensorCard/plantSoilSensorCard";
import { filterDevices } from "@/zigbee-devices/deviceHandler";
import { ZigbeeDeviceContext } from "@/providers/zigbeeDeviceProvider";
import { useContext } from "react";

export default function Home() {
  const { devices } = useContext(ZigbeeDeviceContext);

  const doors = filterDevices(devices, DeviceType.DOOR_SENSOR);
  const tempetureSensors = filterDevices(
    devices,
    DeviceType.TEMPERATURE_SENSOR,
  );
  const plantSoilSensors = filterDevices(devices, DeviceType.PLANT_SOIL_SENSOR);

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
