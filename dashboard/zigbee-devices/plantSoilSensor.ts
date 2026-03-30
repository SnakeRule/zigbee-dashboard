import { DeviceType, ZigbeeDeviceBase } from "./types";

export type PlantSoilSensorState = {
  ieeeAddress: string;
  temperature?: number;
  humidity?: number;
  soil_moisture?: number;
  illuminance?: number;
  battery_state?: string;
};

export type PlantSoilSensor = ZigbeeDeviceBase &
  PlantSoilSensorState & {
    deviceType: DeviceType.PLANT_SOIL_SENSOR;
  };
