import { IkeaDoorSensor } from "@/zigbee-devices/types";
import { Card } from "../card/card";
import styles from "./doorSensorCard.module.css";
import {
  BatteryFullIcon,
  BatteryLowIcon,
  BatteryMediumIcon,
  DoorClosed,
  DoorOpen,
} from "lucide-react";

type DoorSensorCardProps = {
  sensors: IkeaDoorSensor[];
};

const ICON_SIZE = 18;

function getBatteryIcon(batteryLevel: IkeaDoorSensor["battery"]) {
  if (!batteryLevel || batteryLevel <= 35) {
    return <BatteryLowIcon size={ICON_SIZE} />;
  }
  if (batteryLevel <= 75) {
    return <BatteryMediumIcon size={ICON_SIZE} />;
  }
  return <BatteryFullIcon size={ICON_SIZE} />;
}

function getDoorIcon(contact: IkeaDoorSensor["contact"]) {
  return contact ? (
    <DoorClosed size={ICON_SIZE} />
  ) : (
    <DoorOpen size={ICON_SIZE} />
  );
}

export function DoorSensorCard({ sensors }: DoorSensorCardProps) {
  return (
    <Card>
      <div className={styles["door-sensor-card"]}>
        <h3 className={styles["sensor-name-label"]}>Ovet</h3>
        <div className={styles["lower-container"]}>
          {sensors.map((sensor) => {
            return (
              <div
                className={styles["device-container"]}
                key={sensor.ieeeAddress}
              >
                <span>{sensor.friendlyName}</span>
                <div className={styles["values-container"]}>
                  {getDoorIcon(sensor.contact)}
                  <span>{sensor.contact ? "Kiinni" : "Auki"}</span>
                  <div className={styles["battery-container"]}>
                    <span>{sensor.battery ?? 0}%</span>
                    {getBatteryIcon(sensor.battery)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
