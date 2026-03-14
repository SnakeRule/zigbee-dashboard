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
  sensor: IkeaDoorSensor;
};

const ICON_SIZE = 64;

export function DoorSensorCard({ sensor }: DoorSensorCardProps) {
  return (
    <Card>
      <div className={styles["door-sensor-card"]}>
        <h3 className={styles["sensor-name-label"]}>{sensor.friendlyName}</h3>
        <div className={styles["lower-container"]}>
          {sensor.contact ? (
            <DoorClosed size={ICON_SIZE} />
          ) : (
            <DoorOpen size={ICON_SIZE} />
          )}
          <div className={styles["values-container"]}>
            <span>{`Tila: ${sensor.contact ? "Kiinni" : "Auki"}`}</span>
            <div className={styles["battery-container"]}>
              {sensor.battery ? (
                sensor.battery > 75 ? (
                  <BatteryFullIcon />
                ) : sensor.battery > 35 ? (
                  <BatteryMediumIcon />
                ) : (
                  <BatteryLowIcon />
                )
              ) : null}
              <span>{sensor.battery}%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
