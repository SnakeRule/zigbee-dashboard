import { DeviceType } from "@/zigbee-devices/types";

export type useDeviceDetailsReturnValue = {
  created_at: string;
  value: number;
}[];

type useDeviceDetailsPropsBase = {
  ieeeAddress: string;
  currentValue: number;
  timeFrom: string;
};

export type useDeviceDetailsProps = useDeviceDetailsPropsBase & {
  sensor: DeviceType;
  target: "humidity" | "temperature" | "illuminance" | "soil_moisture";
};
