import { IkeaDoorSensor, IkeaDoorSensorState } from "./ikeaDoorSensor";
import { PlantSoilSensor, PlantSoilSensorState } from "./plantSoilSensor";
import {
  TemperatureHumiditySensor,
  TemperatureHumiditySensorState,
} from "./temperatureHumiditySensor";

export type RawDevice = {
  friendly_name: string;
  ieee_address: string;
  model_id: DeviceType;
};

export enum DeviceType {
  DOOR_SENSOR = "PARASOLL Door/Window Sensor",
  TEMPERATURE_SENSOR = "TH01",
  PLANT_SOIL_SENSOR = "ZS-304Z",
}

export type ZigbeeDeviceBase = {
  ieeeAddress: string;
  friendlyName: string;
};

export type ZigbeeDevice =
  | IkeaDoorSensor
  | TemperatureHumiditySensor
  | PlantSoilSensor; // Will add more devices here
export type ZigbeeDeviceState =
  | IkeaDoorSensorState
  | TemperatureHumiditySensorState
  | PlantSoilSensorState;
