"use client";

import { DoorSensorCard } from "@/components/door-sensor-card/doorSensorCard";
import useWebsocketClient from "@/hooks/useWebsocketClient";
import { DeviceType } from "@/zigbee-devices/types";
import styles from "./page.module.css";

export default function Home() {
  const { devices } = useWebsocketClient();

  return (
    devices && (
      <div className={styles["dashboard-items-container"]}>
        {Object.keys(devices).map((key) => {
          const device = devices[key];
          if (device.deviceType === DeviceType.DOOR_SENSOR) {
            return <DoorSensorCard sensor={device} key={device.ieeeAddress} />;
          }
        })}
      </div>
    )
  );
}
