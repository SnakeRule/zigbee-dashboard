"use client";

import { ZigbeeDeviceContext } from "@/providers/zigbeeDeviceProvider";
import { useContext, useMemo } from "react";
import { DeviceType, ZigbeeDevice } from "@/zigbee-devices/types";
import TemperatureSensorDetails from "./temperatureSensorDetails/temperatureSensorDetails";
import SoilSensorDetails from "./soilSensorDetails/soilSensorDetails";
import styles from "./deviceScreen.module.css";
import { DeviceHeader } from "./deviceHeader/deviceHeader";

type DeviceScreenProps = {
  ieeeAddress: string;
};

export default function DeviceScreen({ ieeeAddress }: DeviceScreenProps) {
  const { devices } = useContext(ZigbeeDeviceContext);

  const device: ZigbeeDevice | undefined = useMemo(() => {
    return devices[ieeeAddress];
  }, [devices, ieeeAddress]);

  const renderDeviceDetails = () => {
    switch (device.deviceType) {
      case DeviceType.TEMPERATURE_SENSOR: {
        return <TemperatureSensorDetails sensor={device} />;
      }
      case DeviceType.PLANT_SOIL_SENSOR: {
        return <SoilSensorDetails sensor={device} />;
      }
    }
  };

  return device ? (
    <div className={styles["details-container"]}>
      <DeviceHeader friendlyName={device.friendlyName} />
      {renderDeviceDetails()}
    </div>
  ) : null;
}
