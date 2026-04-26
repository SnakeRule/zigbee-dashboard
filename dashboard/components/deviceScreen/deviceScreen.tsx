"use client";

import { ZigbeeDeviceContext } from "@/providers/zigbeeDeviceProvider";
import { useContext, useMemo, useState } from "react";
import { DeviceType, ZigbeeDevice } from "@/zigbee-devices/types";
import TemperatureSensorDetails from "./temperatureSensorDetails/temperatureSensorDetails";
import SoilSensorDetails from "./soilSensorDetails/soilSensorDetails";
import styles from "./deviceScreen.module.css";
import { DeviceHeader } from "./deviceHeader/deviceHeader";
import { DateTime } from "luxon";

type DeviceScreenProps = {
  ieeeAddress: string;
};

export default function DeviceScreen({ ieeeAddress }: DeviceScreenProps) {
  const { devices } = useContext(ZigbeeDeviceContext);
  const [timeFrom, setTimeFrom] = useState(
    DateTime.now().minus({ days: 7 }).toISO(),
  );

  const device: ZigbeeDevice | undefined = useMemo(() => {
    return devices[ieeeAddress];
  }, [devices, ieeeAddress]);

  const renderDeviceDetails = () => {
    switch (device.deviceType) {
      case DeviceType.TEMPERATURE_SENSOR: {
        return <TemperatureSensorDetails sensor={device} timeFrom={timeFrom} />;
      }
      case DeviceType.PLANT_SOIL_SENSOR: {
        return <SoilSensorDetails sensor={device} timeFrom={timeFrom} />;
      }
    }
  };

  return device ? (
    <div className={styles["details-container"]}>
      <DeviceHeader
        friendlyName={device.friendlyName}
        setTimeFrom={setTimeFrom}
      />
      {renderDeviceDetails()}
    </div>
  ) : null;
}
