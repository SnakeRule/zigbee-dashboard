"use client";

import { DoorSensorCard } from "@/components/door-sensor-card/doorSensorCard";
import useWebsocketClient from "@/hooks/useWebsocketClient";
import { DeviceType } from "@/zigbee-devices/types";
import styles from "./page.module.css";

export default function Home() {
  const { devices } = useWebsocketClient();

  const doors = Object.values(devices).filter(
    (device) => device.deviceType === DeviceType.DOOR_SENSOR,
  );

  return (
    devices && (
      <div className={styles["dashboard-items-container"]}>
        <DoorSensorCard sensors={doors} />
      </div>
    )
  );
}
