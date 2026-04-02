export enum DeviceType {
  DOOR_SENSOR = "PARASOLL Door/Window Sensor",
  TEMPERATURE_SENSOR = "TH01",
  PLANT_SOIL_SENSOR = "ZS-304Z",
}

export type ZigbeeDeviceBase = {
  ieee_address: string;
  friendly_name: string;
};

export type DoorSensor = ZigbeeDeviceBase & {
  model_id: DeviceType.DOOR_SENSOR;
  contact?: boolean;
  battery?: number;
};

export type PlantSoilSensor = ZigbeeDeviceBase & {
  model_id: DeviceType.PLANT_SOIL_SENSOR;
  temperature?: number;
  humidity?: number;
  soil_moisture?: number;
  illuminance?: number;
  battery_state?: string;
};

export type TemperatureHumiditySensor = ZigbeeDeviceBase & {
  model_id: DeviceType.TEMPERATURE_SENSOR;
  temperature?: number;
  humidity?: number;
  battery?: number;
};

export type ZigbeeDevice =
  | DoorSensor
  | PlantSoilSensor
  | TemperatureHumiditySensor;
