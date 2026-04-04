"use client";

import { ZigbeeDeviceContext } from "@/providers/zigbeeDeviceProvider";
import { useContext } from "react";
import { Text } from "../text/text";
import { DeviceType } from "@/zigbee-devices/types";
import TemperatureSensorDetails from "./temperatureSensorDetails/temperatureSensorDetails";

type DeviceScreenProps = {
  ieeeAddress: string;
};

export default function DeviceScreen({ ieeeAddress }: DeviceScreenProps) {
  const { devices } = useContext(ZigbeeDeviceContext);

  const device = devices[ieeeAddress];

  const renderDeviceDetails = () => {
    switch (device.deviceType) {
      case DeviceType.TEMPERATURE_SENSOR: {
        return <TemperatureSensorDetails sensor={device} />;
      }
    }
  };

  return renderDeviceDetails();
}
