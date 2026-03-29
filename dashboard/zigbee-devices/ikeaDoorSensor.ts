import { DeviceType, ZigbeeDeviceBase } from "./types";

export type IkeaDoorSensor = ZigbeeDeviceBase &
  IkeaDoorSensorState & {
    deviceType: DeviceType.DOOR_SENSOR;
  };

export type IkeaDoorSensorState = {
  contact?: boolean;
  battery?: number;
};
