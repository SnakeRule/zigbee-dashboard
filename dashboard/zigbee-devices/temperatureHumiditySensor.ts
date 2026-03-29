import { DeviceType, ZigbeeDeviceBase } from "./types";

export type TemperatureHumiditySensorState = {
  temperature?: number;
  humidity?: number;
  battery?: number;
};

export type TemperatureHumiditySensor = ZigbeeDeviceBase &
  TemperatureHumiditySensorState & {
    deviceType: DeviceType.TEMPERATURE_SENSOR;
  };
