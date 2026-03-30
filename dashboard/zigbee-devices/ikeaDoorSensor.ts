import { DeviceType, ZigbeeDeviceBase } from "./types";

export type IkeaDoorSensor = ZigbeeDeviceBase &
  IkeaDoorSensorState & {
    deviceType: DeviceType.DOOR_SENSOR;
  };

export type IkeaDoorSensorState = {
  ieeeAddress: string;
  contact?: boolean;
  battery?: number;
};
